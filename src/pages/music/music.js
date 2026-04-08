import Slides from '@/js/slides';

require('@/pages/music/music.scss');

export default () => {
  const audio = new Audio();
  const activeAudioClass = 'is-audio-active';
  const playingAudioClass = 'is-audio-playing';
  const buttonState = new Map();
  const ROTATION_MS_PER_TURN = 3200;
  const ROTATION_DEG_PER_MS = 360 / ROTATION_MS_PER_TURN;
  const SCRATCH_SECONDS_PER_TURN = ROTATION_MS_PER_TURN / 1000;
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

  const syncProgress = (slide) => {
    if (!slide) {
      return;
    }

    if (!audio.duration) {
      setProgress(slide, 0);
      return;
    }

    setProgress(slide, audio.currentTime / audio.duration);
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
    buttonState.forEach((slide, actionEl) => {
      updateButtonIcon(actionEl, false);
      slide.classList.remove(activeAudioClass);
      slide.classList.remove(playingAudioClass);
      slide.classList.remove('is-scratching');
      if (resetProgress) {
        setProgress(slide, 0);
      }
      if (resetRotation) {
        setRotation(slide, 0);
      }
    });
    if (resetRotation) {
      rotationBase = 0;
    }
  };

  const stopPlayback = ({ resetProgress, resetRotation } = { resetProgress: true, resetRotation: true }) => {
    if (!audio.paused) {
      syncRotationBase();
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
    syncRotationBase(performance.now(), { ignorePaused: true });
    stopRotationLoop();
    audio.pause();
    buttonState.forEach((slide, actionEl) => {
      updateButtonIcon(actionEl, false);
      slide.classList.remove(playingAudioClass);
    });
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

  const handleSlideChange = ({ currentSlideId, previousSlideId }) => {
    if (currentSlideId !== previousSlideId && !audio.paused) {
      stopPlayback();
    }
  };

  window.slides = new Slides('fa-play', 'Play Music', 'slide', 'view', {
    transitionMode: 'music-spin',
    animationDuration: 420,
    actionHandler: async ({ actionEl, slide }) => {
      const audioSource = slide.dataset.audio;
      buttonState.set(actionEl, slide);

      if (!audioSource) {
        return;
      }

      if (audio.dataset.activeSource === audioSource && !audio.paused) {
        pausePlayback();
        return;
      }

      if (audio.dataset.activeSource === audioSource && audio.paused) {
        activeSlide = slide;
        slide.classList.add(activeAudioClass);
        slide.classList.add(playingAudioClass);
        updateButtonIcon(actionEl, true);

        try {
          await audio.play();
          startRotationLoop();
        } catch (error) {
          pausePlayback();
        }
        return;
      }

      clearActivePlayback({ resetProgress: true, resetRotation: true });
      slide.classList.add(activeAudioClass);
      slide.classList.add(playingAudioClass);
      updateButtonIcon(actionEl, true);
      activeSlide = slide;
      setRotation(slide, 0);
      rotationBase = 0;

      if (audio.dataset.activeSource !== audioSource) {
        audio.src = audioSource;
        audio.dataset.activeSource = audioSource;
        audio.currentTime = 0;
      }

      try {
        await audio.play();
        startRotationLoop();
      } catch (error) {
        clearActivePlayback({ resetProgress: true, resetRotation: true });
        updateButtonIcon(actionEl, false);
      }
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

    recordFace.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) {
        return;
      }

      const audioSource = slide.dataset.audio;
      if (!audioSource || activeSlide !== slide || audio.dataset.activeSource !== audioSource || !audio.duration) {
        return;
      }

      const angle = getPointerAngle(recordFace, event);
      if (angle === null) {
        return;
      }

      scratchPointerId = event.pointerId;
      scratchPreviousAngle = angle;
      scratchWasPlaying = !audio.paused;
      scratchSlide = slide;

      slide.classList.add('is-scratching');
      syncRotationBase(performance.now(), { ignorePaused: true });
      stopRotationLoop();
      audio.pause();
      buttonState.forEach((buttonSlide, actionEl) => {
        updateButtonIcon(actionEl, false);
        buttonSlide.classList.remove(playingAudioClass);
      });

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

  document.querySelectorAll('.music-page .slide').forEach(attachScratchHandlers);

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
