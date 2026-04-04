import Slides from '@/js/slides';

require('@/pages/music/music.scss');

export default () => {
  const audio = new Audio();
  const activeAudioClass = 'is-audio-active';
  const playingAudioClass = 'is-audio-playing';
  const buttonState = new Map();
  const ROTATION_MS_PER_TURN = 3200;
  const ROTATION_DEG_PER_MS = 360 / ROTATION_MS_PER_TURN;

  let rafId = null;
  let activeSlide = null;
  let rotationBase = 0;
  let rotationStartedAt = 0;
  let isFinishingRotation = false;

  const setRotation = (slide, degrees) => {
    slide.style.setProperty('--record-rotation', `${degrees}deg`);
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

  const clearActivePlayback = ({ resetProgress, resetRotation } = { resetProgress: false, resetRotation: false }) => {
    stopRotationLoop();
    isFinishingRotation = false;
    buttonState.forEach((slide, actionEl) => {
      updateButtonIcon(actionEl, false);
      slide.classList.remove(activeAudioClass);
      slide.classList.remove(playingAudioClass);
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
    setProgress(slide, audio.currentTime / audio.duration);
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
};
