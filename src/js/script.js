// script.js

// import libraries
import router from '@/js/router';
import { gotoUrl, gotoHash, hover, menuInit } from '@/js/menu'; // eslint-disable-line no-unused-vars

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

// import css/sass
import '@/../node_modules/font-awesome/scss/font-awesome.scss';
import '@/sass/style.scss';

// menu info

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
  },
  projects: {
    page: projects,
    load: projectLoad,
  },
  music: {
    page: music,
    load: musicLoad,
  },
  contact: {
    page: contact,
    load: contactLoad,
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
