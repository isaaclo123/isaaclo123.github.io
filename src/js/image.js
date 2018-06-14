// image loading

export default (image, imageElement) => { // eslint-disable-line no-unused-vars
  // get last image element (fix reloading same page)
  const imgIds = document.querySelectorAll(`#${imageElement}`);
  const el = imgIds[imgIds.length - 1];
  el.setAttribute('src', image);
};
