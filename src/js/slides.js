// slide generation

export default class {
  constructor( // eslint-disable-line no-unused-vars
    icon = 'fa-link',
    tooltip = undefined,
    // interval = 25000,
    slideClass = 'slide',
    view = 'view',
    options = {},
  ) {
    this.slideId = 0;
    this.view = document.getElementById(view);
    this.slides = this.view.getElementsByClassName(slideClass);
    this.slidePanels = [];
    this.actionHandler = options.actionHandler;
    this.onSlideChange = options.onSlideChange;
    this.animationDuration = options.animationDuration || 320;
    this.transitionMode = options.transitionMode || 'horizontal';
    this.transitionDirection = 'next';
    this.hasInitialized = false;

    // init

    // create timer
    // window.timer = null;

    console.log('new slide created');

    // boolean for currently in animation
    this.inAnimation = false;

    // creates timer
    // this.interval = interval;
    // this.timerReset();

    // function for creating indicator slide buttons
    function buttonCreate(buttonType, tooltip) {
      const el = document.createElement('div');
      if (tooltip !== undefined) {
        el.title = tooltip;
      }
      el.classList.add('button');
      el.classList.add(`button-${buttonType}`);
      return el;
    }

    // creates buttons with icon inside
    function iconButtonCreate(buttonType, iconType, tooltip) {
      const el = buttonCreate(buttonType, tooltip);
      const elIcon = document.createElement('i');
      elIcon.classList.add('fa');
      elIcon.classList.add(String(iconType));
      el.appendChild(elIcon);
      return el;
    }

    // add forward and backwards buttons

    // create next button
    const nextEl = iconButtonCreate('next', 'fa-angle-right', 'Next Slide');
    nextEl.onclick = () => {
      this.next();
    };

    // create prev button
    const prevEl = iconButtonCreate('prev', 'fa-angle-left', 'Previous Slide');
    prevEl.onclick = () => {
      this.prev();
    };

    // add buttons to view
    this.view.appendChild(nextEl);
    this.view.appendChild(prevEl);
    this.indicatorEl = buttonCreate('indicator');
    this.actionEl = iconButtonCreate('action', String(icon), tooltip);
    this.actionEl.onclick = () => {
      const slide = this.slides[this.slideId];
      const link = slide.getAttribute('data-link');

      if (this.actionHandler) {
        this.actionHandler({
          actionEl: this.actionEl,
          link,
          slide,
          slideId: this.slideId,
        });
        return;
      }
      window.location.href = link;
    };
    this.view.appendChild(this.indicatorEl);
    this.view.appendChild(this.actionEl);

    // wrap existing slide content so only the inner panel animates
    for (let i = 0; i < this.slides.length; i += 1) {
      const panelEl = document.createElement('div');
      panelEl.classList.add('slide-panel');

      const slideChildren = Array.from(this.slides[i].childNodes);
      for (let j = 0; j < slideChildren.length; j += 1) {
        const child = slideChildren[j];
        if (
          child.nodeType === Node.ELEMENT_NODE
          && (child.classList.contains('slide-static') || child.hasAttribute('data-slide-static'))
        ) {
          continue;
        } else {
          panelEl.appendChild(child);
        }
      }

      this.slides[i].appendChild(panelEl);
      this.slidePanels.push(panelEl);
    }

    this.goto(this.slideId, this.slides.length - 1);
  }

  // // resets timer
  // timerReset() {
  //   if (window.timer) {
  //     clearInterval(window.timer);
  //   }
  //   window.timer = setInterval(() => {
  //     this.slideshow();
  //   }, this.interval);
  // }

  // actions that actually show the slides
  // slideshow() {
  //   this.next(false);
  // }

  // goes to next slide in slideshow, loops around
  next(reset = true) {
    // don't allow slide to change if currently in animation
    if (this.inAnimation) {
      return;
    }

    const prevId = this.slideId;
    this.transitionDirection = 'next';
    this.slideId += 1;
    if (this.slideId > this.slides.length - 1) {
      this.slideId = 0;
    }

    this.goto(this.slideId, prevId);
    // if (reset) {
    //   this.timerReset();
    // }
  }

  // goes to previous slide in slideshow, loops around
  prev(reset = true) {
    // don't allow slide to change if currently in animation
    if (this.inAnimation) {
      return;
    }

    const prevId = this.slideId;
    this.transitionDirection = 'prev';
    this.slideId -= 1;
    if (this.slideId < 0) {
      this.slideId = this.slides.length - 1;
    }

    this.goto(this.slideId, prevId);
    // if (reset) {
    //   this.timerReset();
    // }
  }

  // sets slideshow to page with id
  goto(id, prevId) {
    console.log('prev slide id');
    console.log(prevId);
    console.log('next slide id');
    console.log(id);
    console.log('----');

    const nextSlide = this.slides[id];
    const previousSlide = this.slides[prevId];
    const nextPanel = this.slidePanels[id];
    const previousPanel = this.slidePanels[prevId];
    this.indicatorEl.textContent = `${String(id + 1)} / ${String(this.slides.length)}`;

    // hide all slides and reset transition state
    for (let i = 0; i < this.slides.length; i += 1) {
      this.slides[i].style.display = 'none'; // eslint-disable-line no-param-reassign
      this.slides[i].style.zIndex = '';
      this.slides[i].classList.remove('is-active');
      this.slidePanels[i].style.transform = '';
      this.slidePanels[i].classList.remove('is-animating');
      this.slidePanels[i].classList.remove('is-transitioning-in');
      this.slidePanels[i].classList.remove('is-transitioning-out');
    }

    if (!this.hasInitialized || id === prevId) {
      nextSlide.style.display = 'block';
      nextSlide.style.zIndex = 1;
      nextSlide.classList.add('is-active');
      this.hasInitialized = true;

      if (this.onSlideChange) {
        this.onSlideChange({
          currentSlide: nextSlide,
          currentSlideId: id,
          previousSlide,
          previousSlideId: prevId,
        });
      }

      return;
    }

    // indicate animation is starting
    this.inAnimation = true;

    previousSlide.style.display = 'block';
    previousSlide.style.zIndex = 0;
    previousSlide.classList.add('is-active');

    if (this.transitionMode === 'music-spin') {
      nextSlide.style.display = 'none';
      nextSlide.style.zIndex = '';
      nextSlide.classList.remove('is-active');
      previousPanel.classList.add('is-transitioning-out');
    } else {
      nextSlide.style.display = 'block';
      nextSlide.style.zIndex = 1;
      nextSlide.classList.add('is-active');

      const enteringTransform = this.transitionDirection === 'prev' ? 'translateX(-100%)' : 'translateX(100%)';
      const leavingTransform = this.transitionDirection === 'prev' ? 'translateX(100%)' : 'translateX(-100%)';

      previousPanel.style.transform = 'translateX(0)';
      previousPanel.classList.add('is-animating');
      nextPanel.style.transform = enteringTransform;
      nextPanel.classList.add('is-animating');

      window.requestAnimationFrame(() => {
        nextPanel.style.transform = 'translateX(0)';
        previousPanel.style.transform = leavingTransform;
      });
    }

    if (this.transitionMode === 'music-spin') {
      window.setTimeout(() => {
        previousSlide.classList.remove('is-active');
        previousSlide.style.display = 'none'; // eslint-disable-line no-param-reassign
        nextSlide.style.display = 'block';
        nextSlide.style.zIndex = 1;
        nextSlide.classList.add('is-active');
        nextPanel.classList.add('is-transitioning-in');
      }, Math.round(this.animationDuration * 0.45));
    }

    window.setTimeout(() => {
      previousSlide.classList.remove('is-active');
      previousSlide.style.display = 'none'; // eslint-disable-line no-param-reassign
      previousSlide.style.zIndex = '';
      previousPanel.classList.remove('is-animating');
      previousPanel.style.transform = '';

      nextSlide.style.zIndex = 1;
      nextPanel.classList.remove('is-animating');
      nextPanel.style.transform = '';
      nextPanel.classList.remove('is-transitioning-in');
      previousPanel.classList.remove('is-transitioning-out');

      // no longer in animation
      this.inAnimation = false;

      if (this.onSlideChange) {
        this.onSlideChange({
          currentSlide: nextSlide,
          currentSlideId: id,
          previousSlide,
          previousSlideId: prevId,
        });
      }
    }, this.animationDuration);
  }
}
