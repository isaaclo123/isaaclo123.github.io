// slide generation

export default class {
  constructor( // eslint-disable-line no-unused-vars
    icon = 'fa-link',
    interval = 20000,
    slideClass = 'slide',
    view = 'view',
  ) {
    this.slideId = 0;
    this.slides = document.getElementsByClassName(slideClass);
    this.view = document.getElementById(view);

    // init

    // boolean for currently in animation
    this.inAnimation = false;

    // creates timer
    this.interval = interval;
    this.timerReset();

    // function for creating indicator slide buttons
    function buttonCreate(buttonType) {
      const el = document.createElement('div');
      el.classList.add('button');
      el.classList.add(`button-${buttonType}`);
      return el;
    }

    // creates buttons with icon inside
    function iconButtonCreate(buttonType, iconType) {
      const el = buttonCreate(buttonType);
      const elIcon = document.createElement('i');
      elIcon.classList.add('fa');
      elIcon.classList.add(String(iconType));
      el.appendChild(elIcon);
      return el;
    }

    // add forward and backwards buttons

    // create next button
    const nextEl = iconButtonCreate('next', 'fa-angle-right');
    nextEl.onclick = () => { this.next(); };

    // create prev button
    const prevEl = iconButtonCreate('prev', 'fa-angle-left');
    prevEl.onclick = () => { this.prev(); };

    // add buttons to view
    this.view.appendChild(nextEl);
    this.view.appendChild(prevEl);

    // add indicator numbers to pages
    for (let i = 0; i < this.slides.length; i += 1) {
      const indicatorEl = buttonCreate('indicator');
      indicatorEl.textContent = `${String(i + 1)} / ${String(this.slides.length)}`;
      this.slides[i].appendChild(indicatorEl);
    }

    // add actions to page

    for (let i = 0; i < this.slides.length; i += 1) {
      const link = this.slides[i].getAttribute('data-link');
      const actionEl = iconButtonCreate('action', String(icon));
      actionEl.onclick = () => {
        window.location.href = link;
      };
      this.slides[i].appendChild(actionEl);
    }

    this.goto(this.slideId, this.slides.length - 1);
  }

  // resets timer
  timerReset() {
    if (window.timer) {
      clearInterval(window.timer);
    }
    window.timer = setInterval(() => {
      this.slideshow();
    }, this.interval);
  }

  // actions that actually show the slides
  slideshow() {
    this.next(false);
  }

  // goes to next slide in slideshow, loops around
  next(reset = true) {
    // don't allow slide to change if currently in animation
    if (this.inAnimation) {
      return;
    }
    const prevId = this.slideId;
    this.slideId += 1;
    if (this.slideId > this.slides.length - 1) {
      this.slideId = 0;
    }
    this.goto(this.slideId, prevId);
    if (reset) {
      this.timerReset();
    }
  }

  // goes to previous slide in slideshow, loops around
  prev(reset = true) {
    // don't allow slide to change if currently in animation
    if (this.inAnimation) {
      return;
    }
    const prevId = this.slideId;
    this.slideId -= 1;
    if (this.slideId < 0) {
      this.slideId = this.slides.length - 1;
    }
    this.goto(this.slideId, prevId);
    if (reset) {
      this.timerReset();
    }
  }

  // sets slideshow to page with id
  goto(id, prevId) {
    console.log('prev slide id');
    console.log(prevId);
    console.log('next slide id');
    console.log(id);
    console.log('----');

    for (let i = 0; i < this.slides.length; i += 1) {
      // hide all slides
      this.slides[i].style.display = 'none'; // eslint-disable-line no-param-reassign
    }

    // indicate animation is starting
    this.inAnimation = true;

    // leave previous slide visible, add fade-out class
    this.slides[prevId].style.display = 'block'; // eslint-disable-line no-param-reassign
    this.slides[prevId].classList.add('fade-out');

    // make new slide visible, add  fade in class
    this.slides[id].style.display = 'block'; // eslint-disable-line no-param-reassign
    this.slides[id].classList.add('fade-in');

    setTimeout(() => {
      // remove fade classes
      this.slides[id].classList.remove('fade-in');
      this.slides[prevId].classList.remove('fade-out');

      // hide previous slide
      this.slides[prevId].style.display = 'none'; // eslint-disable-line no-param-reassign
      // no longer in animatoin
      this.inAnimation = false;
    }, 200);
  }
}
