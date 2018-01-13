// index.js

// import libraries
import router from 'lib/router';
import { gotoUrl, gotoHash, hover, menuInit } from 'lib/menu';

window.gotoUrl = gotoUrl;
window.gotoHash = gotoHash;
window.hover = hover;

// page scripts
const homeLoad = require('pages/home/home');
const resumeLoad = require('pages/resume/resume');

// import pages
const home = require('pages/home/home.html');
const resume = require('pages/resume/resume.html');

// import css/sass
require('sass/style.scss');

// import fonts
// require('npm/font-awesome/css/font-awesome.min.css');

const pages = [
  ['home', 'ISAAC LO'],
  ['resume', 'RESUME'],
  ['projects', 'PROJECTS'],
  ['music', 'MUSIC'],
  ['contact', 'CONTACT ME'],
];

const social = [
  ['fa-facebook fa', 'https://www.facebook.com/isaaclo123'],
  ['fa-linkedin fa', 'https://www.linkedin.com/in/isaac-lo-325587124/'],
  ['fa-github fa', 'https://github.com/isaaclo123'],
];

// router

const routes = {
  '': {
    page: home,
    load: homeLoad,
  },
  home: {
    page: home,
    load: homeLoad,
  },
  resume: {
    page: resume,
    load: resumeLoad,
    // script: './pages/resume/resume.js',
  },
  projects: {
    page: './pages/projects/projects.html',
    // script: projectLoad(), // eslint-disable-line no-undef
  },
  music: {
    page: './pages/music/music.html',
    // script: musicLoad(), // eslint-disable-line no-undef
  },
  contact: {
    page: './pages/contact/contact.html',
    // script: contactLoad(), // eslint-disable-line no-undef
  },
};

// page

window.onload = () => {
  menuInit(pages, social); // eslint-disable-line no-undef
  router(routes);
  // goto home page when page first loads
};

// route view based on page change

window.onhashchange = () => {
  setTimeout(() => {
    router(routes);
  }, 400);
};

window.onbeforeunload = () => {
  router(routes);
};
