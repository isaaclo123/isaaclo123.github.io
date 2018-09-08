import Slides from '@/js/slides';
import loadImage from '@/js/image';

import kanetus from '@/pages/projects/kanetuslogo.png';
import sol from '@/pages/projects/solcircle.png';
import leaflet from '@/pages/projects/leafWhite.png';
import fastflow from '@/pages/projects/fficon.png';

require('@/pages/projects/projects.scss');

export default () => {
  window.slides = new Slides();
  loadImage(kanetus, 'kanetus');
  loadImage(sol, 'sol');
  loadImage(leaflet, 'leaflet');
  loadImage(fastflow, 'fastflow');
};
