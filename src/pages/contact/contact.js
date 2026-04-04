require('@/pages/contact/contact.scss');

export default () => {
  const wheels = document.querySelectorAll('[data-dial-wheel]');
  const wheel = wheels[wheels.length - 1];
  if (!wheel) {
    return;
  }

  const FINGER_STOP_ANGLE = 28;
  const INNER_RADIUS_RATIO = 0.38;
  const OUTER_RADIUS_RATIO = 0.92;

  let rotation = 0;
  let isDragging = false;
  let pointerId = null;
  let previousAngle = null;
  let maxRotation = 0;

  const normalizeDelta = (delta) => {
    if (delta > 180) {
      return delta - 360;
    }
    if (delta < -180) {
      return delta + 360;
    }
    return delta;
  };

  const normalizePositiveAngle = angle => ((angle % 360) + 360) % 360;

  const getCenter = () => {
    const rect = wheel.getBoundingClientRect();
    return {
      x: rect.left + (rect.width / 2),
      y: rect.top + (rect.height / 2),
      radius: rect.width / 2,
    };
  };

  const getPointerAngle = (event) => {
    const center = getCenter();
    const dx = event.clientX - center.x;
    const dy = event.clientY - center.y;
    const distance = Math.hypot(dx, dy);
    if (distance < center.radius * INNER_RADIUS_RATIO || distance > center.radius * OUTER_RADIUS_RATIO) {
      return null;
    }
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const applyRotation = (nextRotation) => {
    rotation = Math.max(0, Math.min(maxRotation, nextRotation));
    wheel.style.transform = `rotate(${rotation}deg)`;
  };

  const releaseDial = () => {
    isDragging = false;
    pointerId = null;
    previousAngle = null;
    maxRotation = 0;
    wheel.classList.remove('is-dragging');
    applyRotation(0);
  };

  wheel.addEventListener('pointerdown', (event) => {
    if (event.target.closest('a')) {
      return;
    }

    const angle = getPointerAngle(event);
    if (angle === null) {
      return;
    }

    isDragging = true;
    pointerId = event.pointerId;
    previousAngle = angle;
    maxRotation = normalizePositiveAngle(FINGER_STOP_ANGLE - angle);
    wheel.classList.add('is-dragging');
    wheel.setPointerCapture(pointerId);
    event.preventDefault();
  });

  wheel.addEventListener('pointermove', (event) => {
    if (!isDragging || event.pointerId !== pointerId) {
      return;
    }

    const angle = getPointerAngle(event);
    if (angle === null || previousAngle === null) {
      return;
    }

    const delta = normalizeDelta(angle - previousAngle);
    previousAngle = angle;
    applyRotation(rotation + delta);
    event.preventDefault();
  });

  wheel.addEventListener('pointerup', (event) => {
    if (!isDragging || event.pointerId !== pointerId) {
      return;
    }
    releaseDial();
  });

  wheel.addEventListener('pointercancel', (event) => {
    if (!isDragging || event.pointerId !== pointerId) {
      return;
    }
    releaseDial();
  });

  wheel.addEventListener('lostpointercapture', () => {
    if (isDragging) {
      releaseDial();
    }
  });
};
