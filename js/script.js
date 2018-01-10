// menu init

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
/*
const social = [
  ['icon-social-facebook', 'https://www.facebook.com/isaaclo123'],
  ['icon-social-linkedin', 'https://www.linkedin.com/in/isaac-lo-325587124/'],
  ['icon-social-github', 'https://github.com/isaaclo123'],
];
*/

// router

const routes = {
  '': {
    page: './pages/home/home.html',
    script: './pages/home/home.js',
  },
  home: {
    page: './pages/home/home.html',
    script: './pages/home/home.js',
  },
  resume: {
    page: './pages/resume/resume.html',
    script: './pages/resume/resume.js',
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
