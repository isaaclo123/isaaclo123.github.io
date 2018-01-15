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

    this.goto(this.slideId);
  }

  // actions that actually show the slides
  slideshow() {
    this.next(false);
  }

  // resets timer
  timerReset() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.slideshow();
    }, this.interval);
  }

  // goes to next slide in slideshow, loops around
  next(reset = true) {
    this.slideId += 1;
    if (this.slideId > this.slides.length - 1) {
      this.slideId = 0;
    }
    this.goto(this.slideId);
    if (reset) {
      clearInterval(this.timer);
      this.timerReset();
    }
  }

  // goes to previous slide in slideshow, loops around
  prev(reset = true) {
    this.slideId -= 1;
    if (this.slideId < 0) {
      this.slideId = this.slides.length - 1;
    }
    this.goto(this.slideId);
    this.timerReset();
    if (reset) {
      clearInterval(this.timer);
      this.timerReset();
    }
  }
  /*
  // sets slideshow to page with id
  goto(id) {
    for (let i = 0; i < this.slides.length; i += 1) {
      this.slides[i].style.display = 'none';
    }
    this.slides[id].style.display = 'block';
    this.indicator.textContent = `${String(this.slideId + 1)} / ${String(this.slides.length)}`;
  }
   *
  */
  // sets slideshow to page with id
  goto(id) {
    function gotoId(theId, slides, callback) {
      for (let i = 0; i < slides.length; i += 1) {
        slides[i].style.display = 'none'; // eslint-disable-line no-param-reassign
      }
      slides[theId].style.display = 'block'; // eslint-disable-line no-param-reassign
      callback();
    }

    gotoId(id, this.slides, () => {
      this.indicator.textContent = `${String(this.slideId + 1)} / ${String(this.slides.length)}`;
    });
  }
}
