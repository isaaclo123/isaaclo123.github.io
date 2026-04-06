// router

import { gotoUrl, gotoHash, hover, menuInit, menuSelect } from '@/js/menu'; // eslint-disable-line no-unused-vars

const DEFAULT_TITLE = 'Isaac Lo';
const TRANSITION_DURATION = 160;

// Fast, smooth ease-out
const easeOutCubic = (t) => 1 - ((1 - t) ** 3);

export default (routeData, element = 'view') => {
  const route = window.location.hash.slice(2);

  if (!(route in routeData)) {
    window.location = '';
    return;
  }

  const currentRoute = routeData[route];
  const oldView = document.getElementById(element);

  if (!oldView) {
    throw new Error(`Router could not find element with id "${element}"`);
  }

  const parent = oldView.parentNode;

  if (window.getComputedStyle(parent).position === 'static') {
    parent.style.position = 'relative';
  }

  const oldHeight = oldView.offsetHeight;
  parent.style.minHeight = `${oldHeight}px`;

  oldView.id = `${element}-old`;

  const view = document.createElement('div');
  view.id = element;
  view.innerHTML = currentRoute.page;

  Object.assign(oldView.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    opacity: '1',
  });

  Object.assign(view.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    opacity: '0',
  });

  parent.appendChild(view);

  const finishTransition = () => {
    if (oldView.parentNode) {
      oldView.parentNode.removeChild(oldView);
    }

    Object.assign(view.style, {
      position: '',
      inset: '',
      width: '',
      opacity: '1',
    });

    parent.style.minHeight = `${view.offsetHeight}px`;
    requestAnimationFrame(() => {
      parent.style.minHeight = '';
    });
  };

  const animationStart = performance.now();

  const animate = (now) => {
    const rawProgress = Math.min((now - animationStart) / TRANSITION_DURATION, 1);
    const easedProgress = easeOutCubic(rawProgress);

    // New page appears quickly
    view.style.opacity = String(easedProgress);

    // Old page gets out of the way a bit faster
    oldView.style.opacity = String(1 - Math.min(easedProgress * 1.15, 1));

    if (rawProgress < 1) {
      window.requestAnimationFrame(animate);
      return;
    }

    finishTransition();
  };

  window.requestAnimationFrame(animate);

  document.title = currentRoute.title || DEFAULT_TITLE;

  if ('load' in currentRoute && currentRoute.load && typeof currentRoute.load.default === 'function') {
    currentRoute.load.default();
  }

  if (currentRoute.menuname) {
    menuSelect(currentRoute.menuname);
  }
};

