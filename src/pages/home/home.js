import loadImage from '@/js/image';
import face from '@/pages/home/face.jpg';
import face640 from '@/pages/home/face-640.jpg';
import face960 from '@/pages/home/face-960.jpg';
import face1440 from '@/pages/home/face-1440.jpg';

export default () => { // eslint-disable-line no-unused-vars
  const viewportPixels = Math.min(window.innerWidth, window.innerHeight) * window.devicePixelRatio;

  if (viewportPixels <= 640) {
    loadImage(face640, 'image');
    return;
  }

  if (viewportPixels <= 960) {
    loadImage(face960, 'image');
    return;
  }

  if (viewportPixels <= 1440) {
    loadImage(face1440, 'image');
    return;
  }

  loadImage(face, 'image');
};
