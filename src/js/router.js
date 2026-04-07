// router

import { gotoUrl, gotoHash, hover, menuInit, menuSelect } from '@/js/menu'; // eslint-disable-line no-unused-vars

const DEFAULT_TITLE = 'Isaac Lo';
const TRANSITION_DURATION = 360;
const ROTATION_DEGREES = 108;
const MENU_ORDER = ['home', 'resume', 'projects', 'music', 'contact'];

// Fast, smooth ease-out
const easeOutQuint = (t) => 1 - ((1 - t) ** 5);

const getTransitionRoot = (view) => view.querySelector('.page') || view;
const getLensTransform = (degrees, scale = 1) => `rotate(${degrees}deg) scale(${scale})`;
const getExistingFlipFace = (page) => Array.from(page.children)
  .find((child) => child.classList.contains('page-flip-face'));
const isTransparent = (color) => color === 'rgba(0, 0, 0, 0)' || color === 'transparent';
const getMenuIndex = (name) => MENU_ORDER.indexOf(name);
const getRotationDirection = (fromName, toName) => {
  const fromIndex = getMenuIndex(fromName);
  const toIndex = getMenuIndex(toName);

  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return -1;
  }
  return toIndex < fromIndex ? 1 : -1;
};

const ensureFlipFace = (view) => {
  const page = getTransitionRoot(view);

  if (!page) {
    return null;
  }

  const existingFace = getExistingFlipFace(page);

  if (existingFace) {
    return existingFace;
  }

  const face = document.createElement('div');
  face.className = 'page-flip-face';

  while (page.firstChild) {
    face.appendChild(page.firstChild);
  }

  const routeControls = Array.from(view.children)
    .filter((child) => child.classList.contains('button'));

  for (let i = 0; i < routeControls.length; i += 1) {
    face.appendChild(routeControls[i]);
  }

  page.appendChild(face);
  return face;
};

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
  const oldPage = getTransitionRoot(oldView);
  const newPage = getTransitionRoot(view);
  const oldFace = ensureFlipFace(oldView);
  const newFace = ensureFlipFace(view);

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
    opacity: '1',
  });

  parent.appendChild(view);

  const oldPageBackground = oldPage ? window.getComputedStyle(oldPage).backgroundColor : '';
  const newPageBackground = newPage ? window.getComputedStyle(newPage).backgroundColor : '';
  const previousRouteName = oldView.dataset.routeName || oldView.dataset.menuName || 'home';
  const nextRouteName = currentRoute.menuname || route || 'home';
  const rotationDirection = getRotationDirection(previousRouteName, nextRouteName);
  const oldHasBorder = !!(oldPage && oldPage.classList.contains('page-border'));
  const newHasBorder = !!(newPage && newPage.classList.contains('page-border'));

  parent.classList.add('is-route-transitioning');
  if (newPage && newPage.classList.contains('page-border')) {
    parent.classList.add('is-route-border-transition');
  }
  view.dataset.routeName = nextRouteName;
  view.dataset.menuName = nextRouteName;

  if (oldFace) {
    oldFace.classList.add('is-route-flipping');
    oldFace.style.transform = getLensTransform(0, 1);
    oldFace.style.opacity = '1';
    oldFace.style.backgroundColor = isTransparent(oldPageBackground) ? '' : oldPageBackground;
  }

  if (newFace) {
    newFace.classList.add('is-route-flipping');
    if (newHasBorder) {
      newFace.classList.add('has-route-border');
    }
    newFace.style.transform = getLensTransform(ROTATION_DEGREES, 0.96);
    newFace.style.opacity = '0';
    newFace.style.backgroundColor = isTransparent(newPageBackground) ? '' : newPageBackground;
  }

  if (newHasBorder) {
    newPage.classList.add('is-route-transition-shell');
  }

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

    if (newPage) {
      newPage.classList.remove('is-route-transition-shell');
    }

    if (oldPage) {
      oldPage.classList.remove('is-route-transition-shell');
    }

    if (newFace) {
      newFace.style.backgroundColor = '';
      newFace.classList.remove('has-route-border');
    }

    parent.classList.remove('is-route-transitioning');
    parent.classList.remove('is-route-border-transition');

    parent.style.minHeight = `${view.offsetHeight}px`;
    requestAnimationFrame(() => {
      parent.style.minHeight = '';
    });
  };

  const animationStart = performance.now();

  const animate = (now) => {
    const rawProgress = Math.min((now - animationStart) / TRANSITION_DURATION, 1);
    const incomingProgress = easeOutQuint(rawProgress);
    const shouldHideOldShellBorder = oldHasBorder && newHasBorder && rawProgress > 0.18;

    if (oldPage) {
      oldPage.classList.toggle('is-route-transition-shell', shouldHideOldShellBorder);
    }

    if (oldFace) {
      oldFace.style.transform = getLensTransform(0, 1);
      oldFace.style.opacity = '1';
      oldFace.style.zIndex = '1';
    }

    if (newFace) {
      newFace.style.opacity = '1';
      newFace.style.transform = getLensTransform(
        rotationDirection * ROTATION_DEGREES * (1 - incomingProgress),
        1,
      );
      newFace.style.zIndex = '2';
    }

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
