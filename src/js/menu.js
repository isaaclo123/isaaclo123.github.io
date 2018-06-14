// sets up circular menu

function gotoUrl(url) { // eslint-disable-line no-unused-vars
  // goes to URL
  window.location.href = url;
}

function gotoHash(hash) { // eslint-disable-line no-unused-vars
  window.location.hash = `/${hash}`;
}

function hover(el) { // eslint-disable-line no-unused-vars
  // highlight or unhighlight element
  console.log('hover event');
  const className = el.classList.item(0);
  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i += 1) {
    elements[i].classList.toggle('highlight-hover');
    elements[i].classList.toggle('highlight-click', false);
  }
}

function click(el) { // eslint-disable-line no-unused-vars
  // highlight or unhighlight element
  console.log('click event');
  const className = el.classList.item(0);
  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i += 1) {
    elements[i].classList.toggle('highlight-click');
  }
}

function menuInit(pages, social) { // eslint-disable-line no-unused-vars
  // initializes circular menu

  function createChar(i, name, character) {
    // create span for rotated elements
    const outer = document.createElement('span');
    outer.classList.add(`char${i.toString()}`);
    const inner = document.createElement('p');
    // add rotated character styling class
    inner.classList.add(name);

    if (name !== 'seperator') {
      // add linking to character
      inner.onclick = () => {
        gotoHash(name);
      };
      // add hover behavior
      inner.onmouseover = () => {
        hover(inner);
      };
      inner.onmouseout = () => {
        hover(inner);
      };
      // add mouseclick behavior
      inner.onmousedown = () => {
        click(inner);
      };
      inner.onmouseup = () => {
        click(inner);
      };
    }

    // get text for the letter
    const text = document.createTextNode(character);
    inner.appendChild(text);
    outer.appendChild(inner);

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
    icon.onmouseover = () => {
      hover(icon);
    };
    icon.onmouseout = () => {
      hover(icon);
    };
    // add mouseclick behavior
    icon.onmousedown = () => {
      click(icon);
    };
    icon.onmouseup = () => {
      click(icon);
    };

    // add letter to DOM
    letter.appendChild(icon);
    el.appendChild(letter);

    // increment counter
    i += 1;
  }
  // add seperator
  addSeperator(i, el);
}

export { gotoUrl, gotoHash, hover, menuInit };
