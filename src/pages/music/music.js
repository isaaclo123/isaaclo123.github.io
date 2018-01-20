import Slides from 'lib/slides';

require('./music.scss');

export default () => {
  window.slides = new Slides('fa-play');
};
