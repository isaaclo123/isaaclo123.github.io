// image loading

function loadImage(image, imageElement = document.getElementById('image')) { // eslint-disable-line no-unused-vars
  imageElement.setAttribute('src', image);
}

function loadImages(selector, imgAttribute = 'img-src') { // eslint-disable-line no-unused-vars
  document.body.querySelectorAll(selector).forEach((val) => {
    if (val.getAttribute(imgAttribute)) loadImage(val.getAttribute(imgAttribute), val);
  });
}

export { loadImage, loadImages };
