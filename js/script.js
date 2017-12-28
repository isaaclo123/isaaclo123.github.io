// menu init

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

window.onload = () => {
  menuInit(pages, social); // eslint-disable-line no-undef
};

// router

const routes = {
  '': {
    url: '/home/home.html',
  },
  resume: {
    url: '/resume/resume.html',
  },
  projects: {
    url: '/projects/projects.html',
  },
  music: {
    url: '/music/music.html',
  },
  contact: {
    url: '/contact/contact.html',
  },
};

// route view based on page change

window.onhashchange = () => {
  setTimeout(() => {
    router(routes); // eslint-disable-line no-undef
  }, 400);
};
