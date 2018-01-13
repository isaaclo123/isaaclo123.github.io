// index.js

// import libraries
import router from 'lib';
import 'lib/menu';

// page scripts
import homeLoad from 'pages/home';
import resumeLoad from 'pages/resume';

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
    page: './pages/home/home.html',
    load: homeLoad(),
  },
  home: {
    page: './pages/home/home.html',
    load: homeLoad(),
  },
  resume: {
    page: './pages/resume/resume.html',
    load: resumeLoad(),
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
  router(routes); // eslint-disable-line no-undef
  // goto home page when page first loads
};

// route view based on page change

window.onhashchange = () => {
  setTimeout(() => {
    router(routes); // eslint-disable-line no-undef
  }, 400);
};

window.onbeforeunload = () => {
  router(routes); // eslint-disable-line no-undef
};
