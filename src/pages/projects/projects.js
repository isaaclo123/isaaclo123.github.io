import Slides from '@/js/slides';
import loadImage from '@/js/image';

import fastflow from '@/pages/projects/FastFlowIcon.png';
import leaflet from '@/pages/projects/leafGreen.png';
import kanetus from '@/pages/projects/kanetus.png';

require('@/pages/projects/projects.scss');

export default () => {
  window.slides = new Slides();
  loadImage(fastflow, 'fastflow');
  loadImage(leaflet, 'leaflet');
  loadImage(kanetus, 'kanetus');
};
