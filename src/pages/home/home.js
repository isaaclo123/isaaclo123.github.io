import loadImage from '@/js/image';
import face from '@/pages/home/face.jpg';

export default () => { // eslint-disable-line no-unused-vars
  console.log('loading image for home');
  loadImage(face, 'image');
};
