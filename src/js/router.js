// router

import { gotoUrl, gotoHash, hover, menuInit, menuSelect } from '@/js/menu'; // eslint-disable-line no-unused-vars

const DEFAULT_TITLE = 'Isaac Lo';

export default (routeData, element = 'view') => {
  // eslint-disable-line no-unused-vars
  const route = window.location.hash.slice(2, window.location.hash.length);
  if (route in routeData) {
    // get change view to old view
    const oldView = document.getElementById(element);
    oldView.id = `${element}-old`;

    // create view for new content
    const view = document.createElement('div');
    view.id = element;
    view.style.opacity = 0;
    // add new content view to DOM
    document.body.appendChild(view);

    // changes new view's page
    view.innerHTML = routeData[route].page;

    // load scripts for new view
    const script = document.createElement('script');
    script.onload = () => {
      load(); // eslint-disable-line no-undef
    };

    // animate
    let opacity = 0;

    const animationInterval = setInterval(() => {
      if (opacity >= 1) {
        // set opacity to full
        view.style.opacity = 1;
        // stop this interval
        clearInterval(animationInterval);
        // remove old view
        oldView.parentNode.removeChild(oldView);
      } else {
        console.log(opacity);
        opacity += 0.05;
        view.style.opacity = opacity;
      }
    }, 0.4);

    // change document title
    if (routeData[route].title) {
      document.title = routeData[route].title;
    } else {
      document.title = DEFAULT_TITLE;
    }

    // script loader

    if ('load' in routeData[route]) {
      routeData[route].load.default();
    }
  } else {
    window.location = '';
  }

  // menu select the current page
  menuSelect(routeData[route].menuname);
};
