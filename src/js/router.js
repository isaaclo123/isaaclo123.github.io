// router

import { gotoUrl, gotoHash, hover, menuInit, menuSelect } from '@/js/menu'; // eslint-disable-line no-unused-vars

const DEFAULT_TITLE = 'Isaac Lo';
const BASE_TRANSITION_DURATION = 360;
const ROTATION_DEGREES = 108;
const REVERSE_ROTATION_DEGREES = 180;
const MENU_ORDER = ['home', 'resume', 'projects', 'music', 'contact'];
const LENS_EDGE_FLIP_ORIGIN = '14.5% 85.5%';

const cubicBezier = (p1x, p1y, p2x, p2y) => {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  const sampleCurveX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleCurveY = (t) => ((ay * t + by) * t + cy) * t;
  const sampleCurveDerivativeX = (t) => (3 * ax * t + 2 * bx) * t + cx;

  return (progress) => {
    if (progress <= 0) {
      return 0;
    }

    if (progress >= 1) {
      return 1;
    }

    let t = progress;

    for (let i = 0; i < 6; i += 1) {
      const derivative = sampleCurveDerivativeX(t);

      if (Math.abs(derivative) < 1e-6) {
        break;
      }

      const delta = sampleCurveX(t) - progress;
      t -= delta / derivative;
    }

    if (t < 0 || t > 1) {
      let lower = 0;
      let upper = 1;
      t = progress;

      for (let i = 0; i < 8; i += 1) {
        const xEstimate = sampleCurveX(t);

        if (Math.abs(xEstimate - progress) < 1e-6) {
          break;
        }

        if (progress > xEstimate) {
          lower = t;
        } else {
          upper = t;
        }

        t = (lower + upper) / 2;
      }
    }

    return sampleCurveY(t);
  };
};

const routeEase = cubicBezier(0.22, 0.61, 0.36, 1);

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
    return 1;
  }
  return toIndex < fromIndex ? -1 : 1;
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
  const previousRouteName = oldView.dataset.routeName || oldView.dataset.menuName || 'home';
  const nextRouteName = currentRoute.menuname || route || 'home';
  const rotationDirection = getRotationDirection(previousRouteName, nextRouteName);
  const oldHasBorder = !!(oldPage && oldPage.classList.contains('page-border'));
  const newHasBorder = !!(newPage && newPage.classList.contains('page-border'));

  Object.assign(oldView.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    opacity: '1',
    zIndex: rotationDirection < 0 ? '2' : '1',
  });

  Object.assign(view.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    opacity: '1',
    zIndex: rotationDirection < 0 ? '1' : '2',
  });

  parent.appendChild(view);

  const oldPageBackground = oldPage ? window.getComputedStyle(oldPage).backgroundColor : '';
  const newPageBackground = newPage ? window.getComputedStyle(newPage).backgroundColor : '';
  const activeRotationDegrees = rotationDirection < 0 ? REVERSE_ROTATION_DEGREES : ROTATION_DEGREES;
  const transitionDuration = BASE_TRANSITION_DURATION * (activeRotationDegrees / ROTATION_DEGREES);

  parent.classList.add('is-route-transitioning');
  view.dataset.routeName = nextRouteName;
  view.dataset.menuName = nextRouteName;

  if (oldFace) {
    oldFace.classList.add('is-route-flipping');
    oldFace.style.transformOrigin = LENS_EDGE_FLIP_ORIGIN;
    oldFace.style.transform = getLensTransform(0, 1);
    oldFace.style.opacity = '1';
    oldFace.style.backgroundColor = isTransparent(oldPageBackground) ? '' : oldPageBackground;
  }

  if (newFace) {
    newFace.classList.add('is-route-flipping');
    newFace.style.transformOrigin = LENS_EDGE_FLIP_ORIGIN;
    newFace.style.transform = getLensTransform(rotationDirection < 0 ? 0 : ROTATION_DEGREES, 0.96);
    newFace.style.opacity = rotationDirection < 0 ? '1' : '0';
    newFace.style.backgroundColor = isTransparent(newPageBackground) ? '' : newPageBackground;
    if (newHasBorder) {
      newFace.classList.add('has-route-border');
    }
  }

  if (rotationDirection < 0) {
    if (oldPage) {
      oldPage.classList.add('is-route-transition-shell');
      if (oldHasBorder && oldFace) {
        oldFace.classList.add('has-route-border');
      }
    }

    if (newPage) {
      newPage.classList.add('is-route-transition-shell');
    }
  } else if (newPage) {
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
      zIndex: '',
    });

    if (newFace) {
      newFace.style.backgroundColor = '';
      newFace.style.transformOrigin = '';
      newFace.classList.remove('has-route-border');
    }

    if (oldFace) {
      oldFace.style.transformOrigin = '';
      oldFace.classList.remove('has-route-border');
    }

    if (newPage) {
      newPage.classList.remove('is-route-transition-shell');
    }

    if (oldPage) {
      oldPage.classList.remove('is-route-transition-shell');
    }

    parent.classList.remove('is-route-transitioning');

    parent.style.minHeight = `${view.offsetHeight}px`;
    requestAnimationFrame(() => {
      parent.style.minHeight = '';
    });

  };

  const animationStart = performance.now();

  const animate = (now) => {
    const rawProgress = Math.min((now - animationStart) / transitionDuration, 1);
    const easedProgress = routeEase(rawProgress);

    if (oldFace) {
      oldFace.style.opacity = '1';
      oldFace.style.zIndex = rotationDirection < 0 ? '2' : '1';
      oldFace.style.transform = getLensTransform(
        rotationDirection < 0 ? REVERSE_ROTATION_DEGREES * easedProgress : 0,
        1,
      );
    }

    if (newFace) {
      newFace.style.opacity = '1';
      newFace.style.transform = getLensTransform(
        rotationDirection < 0 ? 0 : rotationDirection * ROTATION_DEGREES * (1 - easedProgress),
        1,
      );
      newFace.style.zIndex = rotationDirection < 0 ? '1' : '2';
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
