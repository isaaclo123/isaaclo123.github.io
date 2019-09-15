import Slides from '@/js/slides';
import loadImage from '@/js/image';

import nixos from '@/pages/projects/nixos.png';
import kanetus from '@/pages/projects/kanetuslogo.png';
import reddit from '@/pages/projects/reddit.png';
import sol from '@/pages/projects/solcircle.png';
import leaflet from '@/pages/projects/leafWhite.png';

require('@/pages/projects/projects.scss');

export default () => {
  window.slides = new Slides();
  loadImage(nixos, 'nixos');
  loadImage(kanetus, 'kanetus');
  loadImage(reddit, 'reddit');
  loadImage(sol, 'sol');
  loadImage(leaflet, 'leaflet');
};
