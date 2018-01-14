import Slides from 'lib/slides';
import loadImage from 'lib/image';

import fastflow from 'pages/projects/FastFlowIcon.png';
import leaflet from 'pages/projects/leafGreen.png';

require('./projects.scss');

export default () => {
  window.slides = new Slides();
  loadImage(fastflow, 'fastflow');
  loadImage(leaflet, 'leaflet');
};
