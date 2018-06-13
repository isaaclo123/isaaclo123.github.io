import Slides from '@/js/slides';

require('@/pages/resume/resume.scss');

export default () => {
  window.slides = new Slides('fa-arrow-down');
};
