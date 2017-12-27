function goto(url) { // eslint-disable-line no-unused-vars
  // goes to URL
  window.location.href = url;
}

function hover(el) { // eslint-disable-line no-unused-vars
  // highlight or unhighlight element
  const className = el.classList.item(0);
  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i += 1) {
    elements[i].classList.toggle('highlight');
  }
}

function getBaseURL() {
  // gets base URL
  const arr = window.location.href.split('/');
  delete arr[arr.length - 1];
  return arr.join('/');
}

function menuInit() {
  // initializes circular menu

  const pages = [
    ['home', 'ISAAC LO'],
    ['resume', 'RESUME'],
    ['projects', 'PROJECTS'],
    ['music', 'MUSIC'],
    ['contact', 'CONTACT ME'],
  ];

  const social = [
    ['icon-social-facebook', 'https://www.facebook.com/isaaclo123'],
    ['icon-social-linkedin', 'https://www.linkedin.com/in/isaac-lo-325587124/'],
    ['icon-social-github', 'https://github.com/isaaclo123'],
  ];

  function createChar(i, name, character) {
    // create span for rotated elements
    const outer = document.createElement('span');
    outer.classList.add(`char${i.toString()}`);
    const inner = document.createElement('p');
    // add rotated character styling class
    inner.classList.add(name);

    // add linking to character
    inner.setAttribute('onclick', `goto(${getBaseURL()}${name})`);
    // add hover behavior
    inner.setAttribute('onmouseover', 'hover(this)');
    inner.setAttribute('onmouseout', 'hover(this)');


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
    icon.classList.add(social[j][0]);
    // icon.classList.add('fa'); for fa-icons
    icon.setAttribute('aria-hidden', 'true');
    // add linking
    icon.setAttribute('onclick', `goto('${social[j][1]}')`);
    // add hover behavior
    icon.setAttribute('onmouseover', 'hover(this)');
    icon.setAttribute('onmouseout', 'hover(this)');

    // add letter to DOM
    letter.appendChild(icon);
    el.appendChild(letter);

    // increment counter
    i += 1;
  }
  // add seperator
  addSeperator(i, el);
}

window.onload = () => {
  menuInit();
};

// router
/*
function router() {
  const route = window.location.hash.slice(2, window.location.hash.length);
}

window.onhashchange = () => {
  setTimeout(() => {
    router();
  }, 400);
};
*/
