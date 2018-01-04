// image loading

function loadImage(image, imageElement = document.getElementById('image')) { // eslint-disable-line no-unused-vars
  if (fetch) {
    fetch(image, {
      method: 'GET',
      headers: {},
      mode: 'cors',
      cache: 'default',
    }).then(response =>
      response.blob()).then((theBlob) => {
      imageElement.src = URL.createObjectURL(theBlob); // eslint-disable-line no-param-reassign
    });
  } else {
    imageElement.setAttribute('src', image);
  }
}

function loadImages(selector) { // eslint-disable-line no-unused-vars
  document.body.querySelectorAll(selector).forEach((val) => {
    if (val.getAttribute('img-src')) loadImage(val.getAttribute('img-src'), val);
  });
}
