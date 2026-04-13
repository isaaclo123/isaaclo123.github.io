// sets up circular menu
const hoverLeaveTimeouts = new Map();

function clearHoverLeaveTimeout(className) {
  const timeoutId = hoverLeaveTimeouts.get(className);

  if (timeoutId) {
    window.clearTimeout(timeoutId);
    hoverLeaveTimeouts.delete(className);
  }
}

function gotoUrl(url) {
  // eslint-disable-line no-unused-vars
  // goes to URL
  window.location.href = url;
}

function gotoHash(hash) {
  // eslint-disable-line no-unused-vars
  window.location.hash = `/${hash}`;
}

function hover(el, isActive) {
  // eslint-disable-line no-unused-vars
  const className = el.classList.item(0);
  clearHoverLeaveTimeout(className);

  if (!isActive) {
    const timeoutId = window.setTimeout(() => {
      const elements = document.getElementsByClassName(className);

      for (let i = 0; i < elements.length; i += 1) {
        elements[i].classList.remove('highlight-hover');
      }

      hoverLeaveTimeouts.delete(className);
    }, 45);

    hoverLeaveTimeouts.set(className, timeoutId);
    return;
  }

  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i += 1) {
    elements[i].classList.toggle('highlight-hover', isActive);
    if (isActive) {
      elements[i].classList.remove('highlight-click');
    }
  }
}

function click(el, isActive) {
  // eslint-disable-line no-unused-vars
  const className = el.classList.item(0);
  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i += 1) {
    elements[i].classList.toggle('highlight-click', isActive);
  }
}

function menuSelect(page) {
  const oldElements = document.querySelectorAll('.current-menu-item');
  for (let i = 0; i < oldElements.length; i += 1) {
    oldElements[i].classList.remove('current-menu-item');
  }

  const elements = document.querySelectorAll(`.menu-${page}`);
  for (let i = 0; i < elements.length; i += 1) {
    elements[i].classList.add('current-menu-item');
  }
}

function menuInit(pages, social) {
  // eslint-disable-line no-unused-vars
  // initializes circular menu
  const ANIMATION_STEP_MS = 12;

  function applyIntroAnimation(element, order) {
    element.classList.add('menu-intro');
    element.style.animationDelay = `${order * ANIMATION_STEP_MS}ms`;
    element.addEventListener('animationend', () => {
      element.classList.remove('menu-intro');
      element.style.animationDelay = '';
      element.style.opacity = '1';
    }, { once: true });
  }

  function createChar(i, name, character) {
    // create span for rotated elements
    const outer = document.createElement('span');
    outer.classList.add(`char${i.toString()}`);
    const inner = document.createElement('p');
    // add rotated character styling class
    inner.classList.add(`menu-${name}`);

    if (name !== 'seperator') {
      // add linking to character
      inner.onclick = () => {
        gotoHash(name);
      };
      // add hover behavior
      inner.onmouseenter = () => {
        hover(inner, true);
      };
      inner.onmouseleave = () => {
        hover(inner, false);
      };
      // add mouseclick behavior
      inner.onmousedown = () => {
        click(inner, true);
      };
      inner.onmouseup = () => {
        click(inner, false);
      };
    }

    // get text for the letter
    const text = document.createTextNode(character);
    inner.appendChild(text);
    outer.appendChild(inner);
    applyIntroAnimation(inner, i - 1);

    return outer;
  }

  function addSeperator(i, el) {
    const sep1 = createChar(i, 'seperator', ' ');
    el.appendChild(sep1);
    const sep2 = createChar(i + 1, 'seperator', '|');
    el.appendChild(sep2);
    const sep3 = createChar(i + 2, 'seperator', ' ');
    el.appendChild(sep3);
  }

  const el = document.getElementsByTagName('nav')[0];
  let i = 1;

  // add page links
  for (let j = 0; j < pages.length; j += 1) {
    for (let k = 0; k < pages[j][1].length; k += 1) {
      // add character
      const character = createChar(i, pages[j][0], pages[j][1][k]);
      el.appendChild(character);
      // increment counter
      i += 1;
    }

    // add seperator
    addSeperator(i, el);
    i += 3;
  }

  // add social links
  i -= 1;

  for (let j = 0; j < social.length; j += 1) {
    // add a space
    const space = createChar(i, 'seperator', ' ');
    el.appendChild(space);
    i += 1;

    // create span for rotated elements
    const letter = document.createElement('span');
    // add rotated character styling class
    letter.classList.add(`char${i.toString()}`);

    // create icon for social link
    const icon = document.createElement('i');
    icon.className += social[j][0];
    icon.setAttribute('aria-hidden', 'true');
    // add linking
    icon.onclick = () => {
      gotoUrl(social[j][1]);
    };

    // add hover behavior
    icon.onmouseenter = () => {
      hover(icon, true);
    };
    icon.onmouseleave = () => {
      hover(icon, false);
    };
    // add mouseclick behavior
    icon.onmousedown = () => {
      click(icon, true);
    };
    icon.onmouseup = () => {
      click(icon, false);
    };

    // add letter to DOM
    letter.appendChild(icon);
    applyIntroAnimation(icon, i - 1);
    el.appendChild(letter);

    // increment counter
    i += 1;
  }
  // add seperator
  addSeperator(i, el);
}

export { gotoUrl, gotoHash, hover, menuInit, menuSelect };
