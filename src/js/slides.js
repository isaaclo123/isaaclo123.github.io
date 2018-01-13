// slide generation

export default class {
  constructor( // eslint-disable-line no-unused-vars
    interval = 10000,
    slideClass = 'slide',
    indicator = 'indicator',
  ) {
    this.slideId = 0;
    this.slides = document.getElementsByClassName(slideClass);
    this.indicator = document.getElementById(indicator);
    this.interval = interval;

    // creates timer
    this.timer = setInterval(() => {
      this.slideshow();
    }, this.interval);
    // init

    this.goto(0);
  }

  // actions that actually show the slides
  slideshow() {
    this.next();
  }

  // resets timer
  timerReset() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.slideshow();
    }, this.interval);
  }

  // goes to next slide in slideshow, loops around
  next() {
    this.slideId += 1;
    if (this.slideId > this.slides.length - 1) {
      this.slideId = 0;
    }
    this.goto(this.slideId);
    clearInterval(this.timer);
    this.timerReset();
    this.indicate();
  }

  // goes to previous slide in slideshow, loops around
  prev() {
    this.slideId -= 1;
    if (this.slideId < 0) {
      this.slideId = this.slides.length - 1;
    }
    this.goto(this.slideId);
    this.timerReset();
    this.indicate();
  }

  // sets slideshow to page with id
  goto(id) {
    for (let i = 0; i < this.slides.length; i += 1) {
      this.slides[i].style.display = 'none';
    }
    this.slides[id].style.display = 'block';
    this.indicate();
  }

  // set page
  indicate() {
    this.indicator.textContent = `${String(this.slideId + 1)} / ${String(this.slides.length)}`;
  }
}
