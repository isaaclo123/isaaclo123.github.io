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
