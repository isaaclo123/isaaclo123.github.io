// image loading

export default (image, imageElement, options = {}) => { // eslint-disable-line no-unused-vars
  // get last image element (fix reloading same page)
  const imgIds = document.querySelectorAll(`#${imageElement}`);
  const el = imgIds[imgIds.length - 1];
  const { onLoadComplete = null } = options;

  if (!el) {
    return;
  }

  const finishLoad = () => {
    if (typeof onLoadComplete === 'function') {
      onLoadComplete();
    }
  };

  const preloadImage = new Image();
  preloadImage.decoding = 'async';

  const revealImage = () => {
    el.classList.remove('is-image-loaded');
    el.setAttribute('src', image);
    requestAnimationFrame(() => {
      el.classList.add('is-image-loaded');
      finishLoad();
    });
  };

  preloadImage.onload = () => {
    if (typeof preloadImage.decode === 'function') {
      preloadImage.decode()
        .catch(() => {})
        .then(revealImage);
      return;
    }

    revealImage();
  };

  preloadImage.onerror = revealImage;
  preloadImage.src = image;
};
