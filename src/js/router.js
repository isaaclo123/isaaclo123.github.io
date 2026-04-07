// router

import { gotoUrl, gotoHash, hover, menuInit, menuSelect } from '@/js/menu'; // eslint-disable-line no-unused-vars

const DEFAULT_TITLE = 'Isaac Lo';
const TRANSITION_DURATION = 520;
const ROTATION_DEGREES = 108;
const MENU_ORDER = ['home', 'resume', 'projects', 'music', 'contact'];

// Fast, smooth ease-out
const easeOutCubic = (t) => 1 - ((1 - t) ** 3);
const easeInOutCubic = (t) => (t < 0.5 ? 4 * (t ** 3) : 1 - (((-2 * t) + 2) ** 3) / 2);

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
const getRouteSequence = (fromName, toName) => {
  const fromIndex = getMenuIndex(fromName);
  const toIndex = getMenuIndex(toName);

  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return [toName];
  }

  const direction = getRotationDirection(fromName, toName);
  const step = direction === 1 ? -1 : 1;
  const sequence = [];
  let index = fromIndex;

  while (true) {
    index += step;
    sequence.push(MENU_ORDER[index]);

    if (index === toIndex) {
      break;
    }
  }

  return sequence;
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

const createRouteView = (routeName, route, element, isFinalView = false) => {
  const view = document.createElement('div');
  view.innerHTML = route.page;
  view.dataset.routeName = routeName;
  view.dataset.menuName = routeName;

  if (isFinalView) {
    view.id = element;
  } else {
    view.className = 'route-transition-view';
  }

  Object.assign(view.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    opacity: '1',
  });

  const page = getTransitionRoot(view);
  const face = ensureFlipFace(view);

  if (face) {
    face.classList.add('is-route-flipping');
    face.style.transform = getLensTransform(ROTATION_DEGREES, 0.96);
    face.style.opacity = '1';
    face.style.zIndex = '2';
  }

  return {
    view,
    page,
    face,
    route,
    routeName,
    isFinalView,
  };
};

const initializeTransitionView = (transitionView, element) => {
  const { route, view, isFinalView } = transitionView;

  if (!route || !route.load || typeof route.load.default !== 'function') {
    return false;
  }

  if (!isFinalView) {
    view.id = element;
  }

  route.load.default();

  if (!isFinalView) {
    view.removeAttribute('id');
    view.className = 'route-transition-view';
  }

  return true;
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
  const oldPage = getTransitionRoot(oldView);
  const oldFace = ensureFlipFace(oldView);

  Object.assign(oldView.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    opacity: '1',
  });

  const oldPageBackground = oldPage ? window.getComputedStyle(oldPage).backgroundColor : '';
  const previousRouteName = oldView.dataset.routeName || oldView.dataset.menuName || 'home';
  const nextRouteName = currentRoute.menuname || route || 'home';
  const rotationDirection = getRotationDirection(previousRouteName, nextRouteName);
  const routeSequence = getRouteSequence(previousRouteName, nextRouteName);
  const transitionViews = routeSequence
    .map((routeName, index) => {
      const routeRecord = routeData[routeName] || routeData[currentRoute.menuname] || currentRoute;
      return createRouteView(routeName, routeRecord, element, index === routeSequence.length - 1);
    });
  const finalTransitionView = transitionViews[transitionViews.length - 1];
  const view = finalTransitionView.view;

  for (let i = 0; i < transitionViews.length; i += 1) {
    parent.appendChild(transitionViews[i].view);
  }

  let finalViewInitialized = false;

  for (let i = 0; i < transitionViews.length; i += 1) {
    const didInitialize = initializeTransitionView(transitionViews[i], element);
    if (didInitialize && transitionViews[i].isFinalView) {
      finalViewInitialized = true;
    }
  }

  for (let i = 0; i < transitionViews.length; i += 1) {
    const transitionView = transitionViews[i];
    const backgroundColor = transitionView.page
      ? window.getComputedStyle(transitionView.page).backgroundColor
      : '';

    if (transitionView.face) {
      transitionView.face.style.backgroundColor = isTransparent(backgroundColor) ? '' : backgroundColor;
    }

    if (transitionView.page && !isTransparent(backgroundColor)) {
      transitionView.page.classList.add('is-route-transition-shell');
    }
  }

  parent.classList.add('is-route-transitioning');

  if (oldFace) {
    oldFace.classList.add('is-route-flipping');
    oldFace.style.transform = getLensTransform(0, 1);
    oldFace.style.opacity = '1';
    oldFace.style.backgroundColor = isTransparent(oldPageBackground) ? '' : oldPageBackground;
  }

  if (oldPage && !isTransparent(oldPageBackground)) {
    oldPage.classList.add('is-route-transition-shell');
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

    for (let i = 0; i < transitionViews.length; i += 1) {
      const transitionView = transitionViews[i];

      if (transitionView.isFinalView) {
        if (transitionView.page) {
          transitionView.page.classList.remove('is-route-transition-shell');
        }
        if (transitionView.face) {
          transitionView.face.style.backgroundColor = '';
          transitionView.face.style.zIndex = '';
        }
      } else if (transitionView.view.parentNode) {
        transitionView.view.parentNode.removeChild(transitionView.view);
      }
    }

    parent.classList.remove('is-route-transitioning');

    parent.style.minHeight = `${view.offsetHeight}px`;
    requestAnimationFrame(() => {
      parent.style.minHeight = '';
    });
  };

  const animationStart = performance.now();

  const animate = (now) => {
    const rawProgress = Math.min((now - animationStart) / TRANSITION_DURATION, 1);
    const segmentCount = transitionViews.length;

    if (oldFace) {
      oldFace.style.transform = getLensTransform(0, 1);
      oldFace.style.opacity = '1';
      oldFace.style.zIndex = '1';
    }

    for (let i = 0; i < transitionViews.length; i += 1) {
      const transitionView = transitionViews[i];
      const { face } = transitionView;

      if (!face) {
        continue;
      }

      const segmentStart = i / segmentCount;
      const segmentEnd = (i + 1) / segmentCount;
      const localRaw = Math.min(Math.max((rawProgress - segmentStart) / (segmentEnd - segmentStart), 0), 1);
      const localProgress = easeOutCubic(localRaw);

      if (rawProgress < segmentStart) {
        face.style.transform = getLensTransform(rotationDirection * ROTATION_DEGREES, 1);
        face.style.opacity = '0';
        face.style.zIndex = '2';
      } else if (rawProgress >= segmentEnd) {
        face.style.transform = getLensTransform(0, 1);
        face.style.opacity = '1';
        face.style.zIndex = '1';
      } else {
        face.style.transform = getLensTransform(
          rotationDirection * ROTATION_DEGREES * (1 - localProgress),
          1,
        );
        face.style.opacity = '1';
        face.style.zIndex = '2';
      }
    }

    if (rawProgress < 1) {
      window.requestAnimationFrame(animate);
      return;
    }

    finishTransition();
  };

  window.requestAnimationFrame(animate);

  document.title = currentRoute.title || DEFAULT_TITLE;

  if (!finalViewInitialized && 'load' in currentRoute && currentRoute.load && typeof currentRoute.load.default === 'function') {
    currentRoute.load.default();
  }

  if (currentRoute.menuname) {
    menuSelect(currentRoute.menuname);
  }
};
