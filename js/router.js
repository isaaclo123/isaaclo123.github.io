// router

function router(routeData, element = 'view') { // eslint-disable-line no-unused-vars
  const route = window.location.hash.slice(2, window.location.hash.length);
  if (route in routeData) {
    const view = document.getElementById(element);
    const reader = new FileReader();

    // script loader
    const script = document.createElement('script');
    script.onload = () => {
      load(); // eslint-disable-line no-undef
    };

    fetch(routeData[route].page, {
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
        // animate
      }, 400);
      if ('script' in routeData[route]) {
        // script loading
        script.src = routeData[route].script;
        view.appendChild(script);
      }
    };
  } else {
    window.location = '';
  }
}
