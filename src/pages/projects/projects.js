import Slides from '@/js/slides';
import loadImage from '@/js/image';

import receipt from '@/pages/projects/receipt.png';
import ansible from '@/pages/projects/ansible.png';
import nixos from '@/pages/projects/nixos.png';
import farm from '@/pages/projects/farm.png';
import kanetus from '@/pages/projects/kanetuslogo.png';
import reddit from '@/pages/projects/reddit.png';
import sol from '@/pages/projects/solcircle.png';

require('@/pages/projects/projects.scss');

export default () => {
  window.slides = new Slides();
  loadImage(receipt, 'receipt');
  loadImage(ansible, 'ansible');
  loadImage(nixos, 'nixos');
  loadImage(farm, 'farm');
  loadImage(kanetus, 'kanetus');
  loadImage(reddit, 'reddit');
  loadImage(sol, 'sol');
};
