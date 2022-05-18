import Slides from '@/js/slides';
import loadImage from '@/js/image';

import vvvvvv from '@/pages/projects/vvvvvv.png';
import receipt from '@/pages/projects/receipt.png';
import ansible from '@/pages/projects/ansible.png';
import nixos from '@/pages/projects/nixos.png';
import farm from '@/pages/projects/farm.png';
import kanetus from '@/pages/projects/kanetuslogo.png';
import reddit from '@/pages/projects/reddit.png';

require('@/pages/projects/projects.scss');

export default () => {
  window.slides = new Slides(undefined, 'Link to Project');
  loadImage(vvvvvv, 'vvvvvv');
  loadImage(receipt, 'receipt');
  loadImage(ansible, 'ansible');
  loadImage(nixos, 'nixos');
  loadImage(farm, 'farm');
  loadImage(kanetus, 'kanetus');
  loadImage(reddit, 'reddit');
};
