import Slides from 'lib/slides';

require('./resume.scss');

export default () => {
  window.slides = new Slides('fa-arrow-down');
};
