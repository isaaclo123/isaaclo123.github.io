// router

import { gotoUrl, gotoHash, hover, menuInit, menuSelect } from '@/js/menu'; // eslint-disable-line no-unused-vars

const DEFAULT_TITLE = 'Isaac Lo';
const TRANSITION_DURATION = 560;
const ROTATION_DEGREES = 89.5;

// Fast, smooth ease-out
const easeOutCubic = (t) => 1 - ((1 - t) ** 3);
const easeInOutCubic = (t) => (t < 0.5 ? 4 * (t ** 3) : 1 - (((-2 * t) + 2) ** 3) / 2);
let nextFlipAxis = 'x';

const getTransitionRoot = (view) => view.querySelector('.page') || view;
const getFlipTransform = (axis, degrees) => `rotate${axis.toUpperCase()}(${degrees}deg)`;
const getExistingFlipFace = (page) => Array.from(page.children)
  .find((child) => child.classList.contains('page-flip-face'));
const isTransparent = (color) => color === 'rgba(0, 0, 0, 0)' || color === 'transparent';

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

  const hasExistingContent = oldView.innerHTML.trim().length > 0;
  const flipAxis = nextFlipAxis;
  const outgoingDuration = TRANSITION_DURATION / 2;
  const incomingDuration = TRANSITION_DURATION / 2;
  const oldPageBackground = oldPage ? window.getComputedStyle(oldPage).backgroundColor : '';
  const newPageBackground = newPage ? window.getComputedStyle(newPage).backgroundColor : '';

  parent.classList.add('is-route-transitioning');

  if (oldFace) {
    oldFace.classList.add('is-route-flipping');
    oldFace.style.transform = getFlipTransform(flipAxis, 0);
    oldFace.style.opacity = '1';
    oldFace.style.backgroundColor = isTransparent(oldPageBackground) ? '' : oldPageBackground;
  }

  if (oldPage && !isTransparent(oldPageBackground)) {
    oldPage.classList.add('is-route-transition-shell');
  }

  if (newFace) {
    newFace.classList.add('is-route-flipping');
    newFace.style.transform = getFlipTransform(flipAxis, -ROTATION_DEGREES);
    newFace.style.opacity = '0';
    newFace.style.backgroundColor = isTransparent(newPageBackground) ? '' : newPageBackground;
  }

  if (newPage && !isTransparent(newPageBackground)) {
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

    if (newFace) {
      newFace.style.backgroundColor = '';
    }

    parent.classList.remove('is-route-transitioning');

    parent.style.minHeight = `${view.offsetHeight}px`;
    requestAnimationFrame(() => {
      parent.style.minHeight = '';
    });
  };

  const animationStart = performance.now();

  const animate = (now) => {
    const elapsed = now - animationStart;

    if (elapsed <= outgoingDuration) {
      const outgoingProgress = easeInOutCubic(Math.min(elapsed / outgoingDuration, 1));

      if (oldFace) {
        oldFace.style.transform = getFlipTransform(flipAxis, ROTATION_DEGREES * outgoingProgress);
        oldFace.style.opacity = String(1 - Math.max(0, (outgoingProgress - 0.72) / 0.28));
      }

      if (newFace) {
        newFace.style.opacity = '0';
      }
    } else {
      const incomingElapsed = Math.min(elapsed - outgoingDuration, incomingDuration);
      const incomingProgress = easeOutCubic(Math.min(incomingElapsed / incomingDuration, 1));

      if (oldFace) {
        oldFace.style.opacity = '0';
      }

      if (newFace) {
        newFace.style.opacity = '1';
        newFace.style.transform = getFlipTransform(
          flipAxis,
          -ROTATION_DEGREES + (ROTATION_DEGREES * incomingProgress),
        );
      }
    }

    if (elapsed < TRANSITION_DURATION) {
      window.requestAnimationFrame(animate);
      return;
    }

    if (hasExistingContent) {
      nextFlipAxis = flipAxis === 'x' ? 'y' : 'x';
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
