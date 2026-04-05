import Slides from '@/js/slides';

require('@/pages/resume/resume.scss');

export default () => {
  const LEGAL_MARGIN_OFFSET = 14.4; // 0.9rem at 16px root

  const getVisibleSlides = () => Array.from(
    document.querySelectorAll('.resume-page .content.slide'),
  ).filter((slide) => window.getComputedStyle(slide).display !== 'none');

  const alignResumeLines = (slides = getVisibleSlides()) => {
    const slideList = Array.isArray(slides) ? slides : Array.from(slides);

    slideList.forEach((slide) => {
      const title = slide.querySelector('h1');
      const copy = slide.querySelector('.resume-copy');
      const firstLineEl = copy ? copy.querySelector('p, li') : null;

      if (!title || !copy || !firstLineEl) {
        return;
      }

      const slideRect = slide.getBoundingClientRect();
      const copyRect = copy.getBoundingClientRect();
      const firstTextLineRect = firstLineEl.getClientRects()[0];
      const titleLineRect = title.getClientRects()[0];

      if (!titleLineRect || !firstTextLineRect || slideRect.height === 0) {
        return;
      }

      const lineHeight = parseFloat(window.getComputedStyle(firstLineEl).lineHeight);
      const titleRuleTop = titleLineRect.bottom - slideRect.top;
      const legalMarginLeft = copyRect.left - slideRect.left - LEGAL_MARGIN_OFFSET;

      slide.style.setProperty('--resume-title-rule-top', `${titleRuleTop}px`);
      slide.style.setProperty('--resume-line-gap', `${lineHeight}px`);
      slide.style.setProperty('--legal-margin-left', `${legalMarginLeft}px`);
    });
  };

  window.slides = new Slides('fa-paperclip', 'Download Resume', 'slide', 'view', {
    transition: 'page-turn',
    onSlideChange: ({ currentSlide }) => {
      requestAnimationFrame(() => {
        alignResumeLines([currentSlide]);
      });
    },
  });

  requestAnimationFrame(() => {
    alignResumeLines();
  });

  const handleResize = () => {
    requestAnimationFrame(() => {
      alignResumeLines();
    });
  };

  window.addEventListener('resize', handleResize);

  const previousCleanup = window.__slidesCleanup;
  window.__slidesCleanup = () => {
    window.removeEventListener('resize', handleResize);
    if (previousCleanup) {
      previousCleanup();
    }
  };
};
