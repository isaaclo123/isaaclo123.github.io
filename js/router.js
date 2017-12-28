// router

function router(routeData) { // eslint-disable-line no-unused-vars
  const route = window.location.hash.slice(2, window.location.hash.length);
  if (route in routeData) {
    const view = document.getElementById('view');
    const reader = new FileReader();

    fetch(routeData[route].url, {
      method: 'GET',
      headers: {},
      mode: 'cors',
      cache: 'default',
    }).then(response =>
      response.blob()).then((theBlob) => {
      reader.readAsText(theBlob);
    });

    reader.onload = () => {
      view.innerHTML = reader.result;
      setTimeout(() => {
        // document.getElementById("left").classList.add('load')
        // document.getElementById("right").classList.add('load')
      }, 400);
      routeData[route].script();
    };
  } else {
    window.location = '';
  }
}

