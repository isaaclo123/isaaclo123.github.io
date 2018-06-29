import Slides from '@/js/slides';
import loadImage from '@/js/image';

import kanetus from '@/pages/projects/kanetus.png';
import sol from '@/pages/projects/solstudios.png';
import leaflet from '@/pages/projects/leafGreen.png';
import fastflow from '@/pages/projects/FastFlowIcon.png';

require('@/pages/projects/projects.scss');

export default () => {
  window.slides = new Slides();
  loadImage(kanetus, 'kanetus');
  loadImage(sol, 'sol');
  loadImage(leaflet, 'leaflet');
  loadImage(fastflow, 'fastflow');
};
