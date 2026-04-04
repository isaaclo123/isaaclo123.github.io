import Slides from '@/js/slides';

require('@/pages/music/music.scss');

export default () => {
  const audio = new Audio();
  const activeAudioClass = 'is-audio-active';
  const playingAudioClass = 'is-audio-playing';
  const buttonState = new Map();

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

  const clearActivePlayback = ({ resetProgress } = { resetProgress: false }) => {
    buttonState.forEach((slide, actionEl) => {
      updateButtonIcon(actionEl, false);
      slide.classList.remove(activeAudioClass);
      slide.classList.remove(playingAudioClass);
      if (resetProgress) {
        setProgress(slide, 0);
      }
    });
  };

  const stopPlayback = ({ resetProgress } = { resetProgress: true }) => {
    audio.pause();
    if (resetProgress) {
      audio.currentTime = 0;
    }
    clearActivePlayback({ resetProgress });
  };

  const pausePlayback = () => {
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

  audio.addEventListener('ended', () => {
    stopPlayback();
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
        slide.classList.add(activeAudioClass);
        slide.classList.add(playingAudioClass);
        updateButtonIcon(actionEl, true);

        try {
          await audio.play();
        } catch (error) {
          pausePlayback();
        }
        return;
      }

      clearActivePlayback({ resetProgress: true });
      slide.classList.add(activeAudioClass);
      slide.classList.add(playingAudioClass);
      updateButtonIcon(actionEl, true);

      if (audio.dataset.activeSource !== audioSource) {
        audio.src = audioSource;
        audio.dataset.activeSource = audioSource;
        audio.currentTime = 0;
      }

      try {
        await audio.play();
      } catch (error) {
        clearActivePlayback({ resetProgress: true });
        updateButtonIcon(actionEl, false);
      }
    },
    onSlideChange: handleSlideChange,
  });
};
