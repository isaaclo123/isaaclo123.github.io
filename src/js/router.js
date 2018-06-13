// router

export default (routeData, element = 'view') => { // eslint-disable-line no-unused-vars
  const route = window.location.hash.slice(2, window.location.hash.length);
  if (route in routeData) {
    const view = document.getElementById(element);

    // script loader
    const script = document.createElement('script');

    script.onload = () => {
      load(); // eslint-disable-line no-undef
    };

    // changes page
    view.innerHTML = routeData[route].page;

    // stop any timers running for any slides or pages
    console.log('stop timers');
    console.log('before');
    console.log(window.timer);

    // stop timer
    if (window.timer) {
      clearInterval(window.timer);
    }

    console.log('after');
    console.log(window.timer);
    console.log('----');

    setTimeout(() => {
      // animate
    }, 400);
    if ('load' in routeData[route]) {
      routeData[route].load.default();
    }
  } else {
    window.location = '';
  }
};
