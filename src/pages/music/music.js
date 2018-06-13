import Slides from '@/js/slides';

require('@/pages/music/music.scss');

export default () => {
  window.slides = new Slides('fa-play');
};
