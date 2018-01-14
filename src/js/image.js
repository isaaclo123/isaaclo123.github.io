// image loading

export default (image, imageElement) => { // eslint-disable-line no-unused-vars
  const el = document.getElementById(imageElement);
  el.setAttribute('src', image);
};
