// router

import { gotoUrl, gotoHash, hover, menuInit, menuSelect } from '@/js/menu'; // eslint-disable-line no-unused-vars

const DEFAULT_TITLE = 'Isaac Lo';
const TRANSITION_DURATION = 220;

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

  // Make sure the parent can stack transitioning views
  if (window.getComputedStyle(parent).position === 'static') {
    parent.style.position = 'relative';
  }

  // Lock parent height during transition so layout does not jump
  const oldHeight = oldView.offsetHeight;
  parent.style.minHeight = `${oldHeight}px`;

  // Rename old view
  oldView.id = `${element}-old`;

  // Create new view
  const view = document.createElement('div');
  view.id = element;
  view.innerHTML = currentRoute.page;

  // Stack both views on top of each other
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

    // Restore new view to normal document flow
    Object.assign(view.style, {
      position: '',
      inset: '',
      width: '',
      opacity: '1',
    });

    // Resize parent to match new content, then unlock
    parent.style.minHeight = `${view.offsetHeight}px`;
    requestAnimationFrame(() => {
      parent.style.minHeight = '';
    });
  };

  const animationStart = performance.now();

  const animate = (now) => {
    const progress = Math.min((now - animationStart) / TRANSITION_DURATION, 1);

    view.style.opacity = String(progress);
    oldView.style.opacity = String(1 - progress);

    if (progress < 1) {
      window.requestAnimationFrame(animate);
      return;
    }

    finishTransition();
  };

  window.requestAnimationFrame(animate);

  // Change document title
  document.title = currentRoute.title || DEFAULT_TITLE;

  // Run page-specific loader
  if ('load' in currentRoute && currentRoute.load && typeof currentRoute.load.default === 'function') {
    currentRoute.load.default();
  }

  // Menu select current page
  if (currentRoute.menuname) {
    menuSelect(currentRoute.menuname);
  }
};
