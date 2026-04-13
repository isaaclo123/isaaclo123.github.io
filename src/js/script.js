// script.js

// import libraries
import router from '@/js/router';
import { gotoUrl, gotoHash, hover, menuInit, menuSelect } from '@/js/menu'; // eslint-disable-line no-unused-vars

// import css/sass
import '@/../node_modules/font-awesome/scss/font-awesome.scss';
import '@/sass/style.scss';

// page scripts
const homeLoad = require('@/pages/home/home');
const resumeLoad = require('@/pages/resume/resume');
const projectLoad = require('@/pages/projects/projects');
const musicLoad = require('@/pages/music/music');
const contactLoad = require('@/pages/contact/contact');

// import pages
const home = require('@/pages/home/home.html');
const resume = require('@/pages/resume/resume.html');
const projects = require('@/pages/projects/projects.html');
const music = require('@/pages/music/music.html');
const contact = require('@/pages/contact/contact.html');

// menu info

const pages = [
  ['home', 'ISAAC LO'],
  ['resume', 'RESUME'],
  ['projects', 'PROJECTS'],
  ['music', 'MUSIC'],
  ['contact', 'CONTACT ME'],
];

const social = [
  ['fa-google fa', 'mailto:isaaclo123@gmail.com'],
  ['fa-linkedin fa', 'https://www.linkedin.com/in/isaac-lo-325587124/'],
  ['fa-github fa', 'https://github.com/isaaclo123'],
];

const pageOrder = pages.map(([routeName]) => routeName);

const isEditableTarget = (target) => {
  if (!target) {
    return false;
  }

  const tagName = target.tagName;
  return target.isContentEditable || tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT';
};

const getCurrentPageIndex = () => {
  const activeView = document.getElementById('view');
  const routeName = activeView?.dataset.routeName || window.location.hash.slice(2) || 'home';
  const currentIndex = pageOrder.indexOf(routeName);
  return currentIndex === -1 ? 0 : currentIndex;
};

const registerPageKeyboardNavigation = () => {
  if (window.__page_keyboard_navigation_registered) {
    return;
  }

  window.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || isEditableTarget(event.target)) {
      return;
    }

    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      return;
    }

    const currentIndex = getCurrentPageIndex();
    const direction = event.key === 'ArrowDown' ? 1 : -1;
    const nextIndex = (currentIndex + direction + pageOrder.length) % pageOrder.length;
    const nextPage = pageOrder[nextIndex];

    if (!nextPage || nextIndex === currentIndex) {
      return;
    }

    event.preventDefault();
    gotoHash(nextPage);
  });

  window.__page_keyboard_navigation_registered = true;
};

// router

const routes = {
  '': {
    page: home,
    load: homeLoad,
    title: 'Isaac Lo - Home',
    menuname: 'home',
  },
  home: {
    page: home,
    load: homeLoad,
    title: 'Isaac Lo - Home',
    menuname: 'home',
  },
  resume: {
    page: resume,
    load: resumeLoad,
    title: 'Isaac Lo - Resume',
    menuname: 'resume',
  },
  projects: {
    page: projects,
    load: projectLoad,
    title: 'Isaac Lo - Projects',
    menuname: 'projects',
  },
  music: {
    page: music,
    load: musicLoad,
    title: 'Isaac Lo - Music',
    menuname: 'music',
  },
  contact: {
    page: contact,
    load: contactLoad,
    title: 'Isaac Lo - Contact',
    menuname: 'contact',
  },
};

// page

window.onload = () => {
  menuInit(pages, social); // eslint-disable-line no-undef
  registerPageKeyboardNavigation();
  router(routes);
  // goto home page when page first loads
};

// route view based on page change

window.onhashchange = () => {
  router(routes);
};
