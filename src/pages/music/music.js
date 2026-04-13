import Slides from '@/js/slides';

require('@/pages/music/music.scss');

export default () => {
  const audio = new Audio();
  audio.preload = 'metadata';
  const activeAudioClass = 'is-audio-active';
  const playingAudioClass = 'is-audio-playing';
  const buttonState = new Map();
  const trackState = new Map();
  const ROTATION_MS_PER_TURN = 3200;
  const ROTATION_DEG_PER_MS = 360 / ROTATION_MS_PER_TURN;
  const SCRATCH_SECONDS_PER_TURN = (ROTATION_MS_PER_TURN / 1000) * 2.5;
  const SCRATCH_INNER_RADIUS_RATIO = 0.08;

  let rafId = null;
  let activeSlide = null;
  let rotationBase = 0;
  let rotationStartedAt = 0;
  let isFinishingRotation = false;
  let scratchPointerId = null;
  let scratchPreviousAngle = null;
  let scratchWasPlaying = false;
  let scratchSlide = null;

  const setRotation = (slide, degrees) => {
    slide.style.setProperty('--record-rotation', `${degrees}deg`);
  };

  const getSlides = () => document.querySelectorAll('.music-page .slide');

  const getTrackState = (slide) => {
    const audioSource = slide?.dataset.audio;
    if (!audioSource) {
      return null;
    }

    if (!trackState.has(audioSource)) {
      trackState.set(audioSource, {
        currentTime: 0,
        progress: 0,
        rotation: 0,
      });
    }

    return trackState.get(audioSource);
  };

  const normalizeDelta = (delta) => {
    if (delta > 180) {
      return delta - 360;
    }
    if (delta < -180) {
      return delta + 360;
    }
    return delta;
  };

  const getRecordCenter = (recordFace) => {
    const rect = recordFace.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return null;
    }

    return {
      x: rect.left + (rect.width / 2),
      y: rect.top + (rect.height / 2),
      radius: Math.min(rect.width, rect.height) / 2,
    };
  };

  const getPointerAngle = (recordFace, event) => {
    const center = getRecordCenter(recordFace);
    if (!center) {
      return null;
    }

    const dx = event.clientX - center.x;
    const dy = event.clientY - center.y;
    const distance = Math.hypot(dx, dy);
    if (distance < center.radius * SCRATCH_INNER_RADIUS_RATIO || distance > center.radius) {
      return null;
    }

    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const isPointerOverSlideControl = (event) => {
    const hoveredEl = document.elementFromPoint(event.clientX, event.clientY);
    return Boolean(hoveredEl && hoveredEl.closest('.button'));
  };

  const getCurrentRotation = (now = performance.now(), { ignorePaused = false } = {}) => {
    if ((!ignorePaused && !isFinishingRotation && audio.paused) || !activeSlide) {
      return rotationBase;
    }
    return rotationBase + ((now - rotationStartedAt) * ROTATION_DEG_PER_MS);
  };

  const stopRotationLoop = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const syncRotationBase = (now = performance.now(), options = {}) => {
    rotationBase = getCurrentRotation(now, options);
    if (activeSlide) {
      setRotation(activeSlide, rotationBase);
    }
  };

  const tickRotation = (now) => {
    if (!activeSlide || (!isFinishingRotation && audio.paused)) {
      rafId = null;
      return;
    }
    setRotation(activeSlide, getCurrentRotation(now));
    rafId = requestAnimationFrame(tickRotation);
  };

  const startRotationLoop = () => {
    stopRotationLoop();
    isFinishingRotation = false;
    rotationStartedAt = performance.now();
    rafId = requestAnimationFrame(tickRotation);
  };

  const updateButtonIcon = (actionEl, isPlaying) => {
    const icon = actionEl.querySelector('i');
    if (!icon) {
      return;
    }
    icon.classList.toggle('fa-play', !isPlaying);
    icon.classList.toggle('fa-pause', isPlaying);
  };

  const setProgress = (slide, progress) => {
    const clamped = Math.max(0, Math.min(1, progress));
    slide.style.setProperty('--record-progress', clamped);
    slide.classList.toggle('has-record-progress', clamped > 0.001);
  };

  const saveTrackState = (slide, { syncRotation = false } = {}) => {
    const state = getTrackState(slide);
    if (!state) {
      return;
    }

    if (slide === activeSlide && audio.dataset.activeSource === slide.dataset.audio) {
      if (syncRotation) {
        syncRotationBase(performance.now(), { ignorePaused: true });
      }
      state.currentTime = audio.currentTime;
      state.rotation = rotationBase;
      if (audio.duration) {
        state.progress = audio.currentTime / audio.duration;
      }
    }
  };

  const applyTrackState = (slide) => {
    const state = getTrackState(slide);
    if (!state) {
      return;
    }

    setProgress(slide, state.progress);
    setRotation(slide, state.rotation);
    slide.classList.toggle(activeAudioClass, state.progress > 0.001 || slide === activeSlide);
    slide.classList.toggle(
      playingAudioClass,
      slide === activeSlide && !audio.paused && scratchSlide !== slide,
    );

  };

  const refreshSlidesUi = () => {
    getSlides().forEach(applyTrackState);
  };

  const syncCurrentTrackState = ({ syncRotation = false } = {}) => {
    if (!activeSlide) {
      return;
    }

    saveTrackState(activeSlide, { syncRotation });
    applyTrackState(activeSlide);
  };

  const syncProgress = (slide) => {
    if (!slide) {
      return;
    }

    const state = getTrackState(slide);
    if (!state) {
      return;
    }

    if (!audio.duration) {
      setProgress(slide, state.progress);
      return;
    }

    state.currentTime = audio.currentTime;
    state.progress = audio.currentTime / audio.duration;
    setProgress(slide, state.progress);
  };

  const clearActivePlayback = ({ resetProgress, resetRotation } = { resetProgress: false, resetRotation: false }) => {
    stopRotationLoop();
    isFinishingRotation = false;
    scratchPointerId = null;
    scratchPreviousAngle = null;
    scratchWasPlaying = false;
    if (scratchSlide) {
      scratchSlide.classList.remove('is-scratching');
    }
    scratchSlide = null;
    getSlides().forEach((slide) => {
      const state = getTrackState(slide);
      if (state && resetProgress) {
        state.currentTime = 0;
        state.progress = 0;
      }
      if (state && resetRotation) {
        state.rotation = 0;
      }
    });
    buttonState.forEach((slide, actionEl) => {
      updateButtonIcon(actionEl, false);
      slide.classList.remove('is-scratching');
    });
    if (resetRotation) {
      rotationBase = 0;
    }
    refreshSlidesUi();
  };

  const stopPlayback = ({ resetProgress, resetRotation } = { resetProgress: true, resetRotation: true }) => {
    if (!audio.paused) {
      syncCurrentTrackState({ syncRotation: true });
    } else {
      stopRotationLoop();
    }
    audio.pause();
    if (resetProgress) {
      audio.currentTime = 0;
    }
    clearActivePlayback({ resetProgress, resetRotation });
    if (resetProgress) {
      activeSlide = null;
      audio.dataset.activeSource = '';
    }
  };

  const pausePlayback = () => {
    syncCurrentTrackState({ syncRotation: true });
    stopRotationLoop();
    audio.pause();
    buttonState.forEach((slide, actionEl) => {
      updateButtonIcon(actionEl, false);
    });
    refreshSlidesUi();
  };

  const toggleSlidePlayback = async (actionEl, slide) => {
    const audioSource = slide?.dataset.audio;
    buttonState.set(actionEl, slide);

    if (!audioSource) {
      return;
    }

    if (audio.dataset.activeSource === audioSource && !audio.paused) {
      pausePlayback();
      return;
    }

    if (audio.dataset.activeSource === audioSource && audio.paused) {
      activateTrack(slide);
      updateButtonIcon(actionEl, true);

      try {
        await audio.play();
        startRotationLoop();
        refreshSlidesUi();
      } catch (error) {
        pausePlayback();
      }
      return;
    }

    if (activeSlide) {
      saveTrackState(activeSlide, { syncRotation: true });
    }
    stopRotationLoop();
    audio.pause();
    activateTrack(slide);
    updateButtonIcon(actionEl, true);

    try {
      await audio.play();
      startRotationLoop();
      refreshSlidesUi();
    } catch (error) {
      pausePlayback();
      updateButtonIcon(actionEl, false);
    }
  };

  audio.addEventListener('timeupdate', () => {
    const actionEl = [...buttonState.keys()].find(button => buttonState.get(button).dataset.audio === audio.dataset.activeSource);
    if (!actionEl || !audio.duration) {
      return;
    }
    const slide = buttonState.get(actionEl);
    syncProgress(slide);
  });

  audio.addEventListener('error', () => {
    stopPlayback();
  });

  const handleSlideChange = ({ currentSlide, currentSlideId, previousSlide, previousSlideId }) => {
    if (currentSlideId !== previousSlideId && previousSlide === activeSlide) {
      syncCurrentTrackState({ syncRotation: true });
      stopRotationLoop();
      audio.pause();
      refreshSlidesUi();
    }

    if (currentSlide) {
      applyTrackState(currentSlide);
    }

    if (window.slides?.actionEl) {
      updateButtonIcon(
        window.slides.actionEl,
        currentSlide === activeSlide && !audio.paused,
      );
    }
  };

  const activateTrack = (slide) => {
    const state = getTrackState(slide);
    if (!state) {
      return;
    }

    if (activeSlide && activeSlide !== slide) {
      saveTrackState(activeSlide, { syncRotation: true });
    }

    activeSlide = slide;
    rotationBase = state.rotation;
    setRotation(slide, state.rotation);
    setProgress(slide, state.progress);
    audio.src = slide.dataset.audio;
    audio.dataset.activeSource = slide.dataset.audio;
    audio.currentTime = state.currentTime;
    refreshSlidesUi();
  };

  const loadTrackMetadata = (slide) => new Promise((resolve) => {
    if (!slide?.dataset.audio) {
      resolve();
      return;
    }

    if (audio.dataset.activeSource !== slide.dataset.audio) {
      activateTrack(slide);
    }

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      resolve();
      return;
    }

    const handleReady = () => {
      audio.removeEventListener('loadedmetadata', handleReady);
      audio.removeEventListener('canplay', handleReady);
      resolve();
    };

    audio.addEventListener('loadedmetadata', handleReady, { once: true });
    audio.addEventListener('canplay', handleReady, { once: true });
    audio.load();
  });

  window.slides = new Slides('fa-play', 'Play Music', 'slide', 'view', {
    transitionMode: 'music-spin',
    animationDuration: 420,
    actionHandler: ({ actionEl, slide }) => {
      toggleSlidePlayback(actionEl, slide);
    },
    keyHandler: (event) => {
      const isActionKey = event.key === 'Enter' || event.code === 'Space' || event.key === ' ' || event.key === 'Spacebar';
      if (!isActionKey || event.repeat) {
        return false;
      }

      const slide = window.slides?.slides?.[window.slides.slideId];
      const actionEl = window.slides?.actionEl;
      if (!slide || !actionEl) {
        return false;
      }

      event.preventDefault();
      toggleSlidePlayback(actionEl, slide);
      return true;
    },
    onSlideChange: handleSlideChange,
  });

  audio.addEventListener('ended', async () => {
    if (!activeSlide) {
      stopPlayback();
      return;
    }

    syncRotationBase(performance.now(), { ignorePaused: true });
    stopRotationLoop();

    const slide = activeSlide;
    const currentRotation = ((rotationBase % 360) + 360) % 360;
    const remainingRotation = currentRotation === 0 ? 0 : 360 - currentRotation;
    const finalRotation = rotationBase + remainingRotation;

    if (remainingRotation > 0) {
      isFinishingRotation = true;
      rotationStartedAt = performance.now();
      rafId = requestAnimationFrame(function finishTick(now) {
        const nextRotation = getCurrentRotation(now);
        if (nextRotation >= finalRotation) {
          rotationBase = finalRotation;
          setRotation(slide, finalRotation);
          rafId = null;
          isFinishingRotation = false;
          return;
        }
        setRotation(slide, nextRotation);
        rafId = requestAnimationFrame(finishTick);
      });
      await new Promise((resolve) => {
        const waitForFinish = () => {
          if (rafId === null && !isFinishingRotation) {
            resolve();
            return;
          }
          requestAnimationFrame(waitForFinish);
        };
        requestAnimationFrame(waitForFinish);
      });
    }

    audio.pause();
    audio.currentTime = 0;
    const state = getTrackState(slide);
    if (state) {
      state.currentTime = 0;
      state.progress = 0;
      state.rotation = 0;
    }
    clearActivePlayback({ resetProgress: true, resetRotation: false });
    activeSlide = null;
    audio.dataset.activeSource = '';
  });

  const seekByRotationDelta = (slide, deltaDegrees) => {
    if (!slide || !audio.duration) {
      return;
    }

    const nextTime = audio.currentTime + ((deltaDegrees / 360) * SCRATCH_SECONDS_PER_TURN);
    audio.currentTime = Math.max(0, Math.min(audio.duration, nextTime));
    syncProgress(slide);
    saveTrackState(slide);
  };

  const finishScratch = async () => {
    if (!scratchSlide) {
      return;
    }

    const slide = scratchSlide;
    slide.classList.remove('is-scratching');
    scratchPointerId = null;
    scratchPreviousAngle = null;
    scratchSlide = null;

    if (!scratchWasPlaying || activeSlide !== slide || audio.dataset.activeSource !== slide.dataset.audio) {
      scratchWasPlaying = false;
      return;
    }

    scratchWasPlaying = false;
    buttonState.forEach((buttonSlide, actionEl) => {
      updateButtonIcon(actionEl, buttonSlide === slide);
      buttonSlide.classList.toggle(playingAudioClass, buttonSlide === slide);
    });

    try {
      await audio.play();
      startRotationLoop();
    } catch (error) {
      pausePlayback();
    }
  };

  const attachScratchHandlers = (slide) => {
    const recordFace = slide.querySelector('.record-face');
    if (!recordFace) {
      return;
    }

    recordFace.addEventListener('pointerdown', async (event) => {
      if (event.button !== 0) {
        return;
      }

      const audioSource = slide.dataset.audio;
      if (!audioSource) {
        return;
      }

      if (activeSlide !== slide || audio.dataset.activeSource !== audioSource) {
        if (activeSlide) {
          saveTrackState(activeSlide, { syncRotation: true });
        }
        stopRotationLoop();
        audio.pause();
        activateTrack(slide);
      }

      if (!audio.duration) {
        await loadTrackMetadata(slide);
      }

      const angle = getPointerAngle(recordFace, event);
      if (angle === null || activeSlide !== slide || audio.dataset.activeSource !== audioSource || !audio.duration) {
        return;
      }

      scratchPointerId = event.pointerId;
      scratchPreviousAngle = angle;
      scratchWasPlaying = !audio.paused;
      scratchSlide = slide;

      slide.classList.add('is-scratching');
      syncCurrentTrackState({ syncRotation: true });
      stopRotationLoop();
      audio.pause();
      buttonState.forEach((buttonSlide, actionEl) => {
        updateButtonIcon(actionEl, false);
      });
      refreshSlidesUi();

      recordFace.setPointerCapture(event.pointerId);
      event.preventDefault();
    });

    recordFace.addEventListener('pointermove', (event) => {
      if (scratchPointerId !== event.pointerId || scratchSlide !== slide) {
        return;
      }

      const angle = getPointerAngle(recordFace, event);
      if (isPointerOverSlideControl(event)) {
        if (angle !== null) {
          scratchPreviousAngle = angle;
        }
        return;
      }

      if (angle === null) {
        scratchPreviousAngle = null;
        return;
      }

      if (scratchPreviousAngle === null) {
        scratchPreviousAngle = angle;
        return;
      }

      const delta = normalizeDelta(angle - scratchPreviousAngle);
      scratchPreviousAngle = angle;
      rotationBase += delta;
      const state = getTrackState(slide);
      if (state) {
        state.rotation = rotationBase;
      }
      setRotation(slide, rotationBase);
      seekByRotationDelta(slide, delta);
      event.preventDefault();
    });

    const releaseScratch = (event) => {
      if (scratchPointerId !== event.pointerId || scratchSlide !== slide) {
        return;
      }

      finishScratch();
    };

    recordFace.addEventListener('pointerup', releaseScratch);
    recordFace.addEventListener('pointercancel', releaseScratch);
    recordFace.addEventListener('lostpointercapture', () => {
      if (scratchSlide === slide) {
        finishScratch();
      }
    });
  };

  getSlides().forEach((slide) => {
    getTrackState(slide);
    applyTrackState(slide);
    attachScratchHandlers(slide);
  });

  // Ensure audio stops when navigating away. The router swaps views but page JS can remain loaded;
  // expose stopPlayback so a single global hashchange listener can call the latest handler.
  window.__stopMusicPlayback = stopPlayback;
  if (!window.__music_hashchange_handler_added) {
    window.addEventListener('hashchange', () => {
      if (typeof window.__stopMusicPlayback === 'function') {
        window.__stopMusicPlayback({resetRotation: false});
      }
    });
    window.__music_hashchange_handler_added = true;
  }
};
