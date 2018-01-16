import Slides from 'lib/slides';
import loadImage from 'lib/image';

import vinyl from 'pages/music/vinyl.jpg';

require('./music.scss');

export default () => {
  window.slides = new Slides();
  loadImage(vinyl, 'vinyl');
};
