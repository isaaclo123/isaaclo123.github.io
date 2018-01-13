// slide generation

function Slides( // eslint-disable-line no-unused-vars
  interval = 10000,
  slideClass = 'slide',
  indicator = 'indicator',
) {
  this.slideId = -1;
  this.slides = document.getElementsByClassName(slideClass);
  this.indicator = document.getElementById(indicator);

  // actions that actually show the slides
  this.slideshow = () => {
    this.next();
  };

  // creates timer
  this.timer = setInterval(() => {
    this.slideshow();
  });

  // resets timer
  this.timerReset = (sleepInterval = interval) => {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.slideshow();
    }, sleepInterval);
  };

  // goes to next slide in slideshow, loops around
  this.next = () => {
    this.slideId += 1;
    if (this.slideId > this.slides.length - 1) {
      this.slideId = 0;
    }
    this.goto(this.slideId);
    clearInterval(this.timer);
    this.timerReset();
    this.indicate();
  };

  // goes to previous slide in slideshow, loops around
  this.prev = () => {
    this.slideId -= 1;
    if (this.slideId < 0) {
      this.slideId = this.slides.length - 1;
    }
    this.goto(this.slideId);
    this.timerReset();
    this.indicate();
  };

  // sets slideshow to page with id
  this.goto = (id) => {
    for (let i = 0; i < this.slides.length; i += 1) {
      this.slides[i].style.display = 'none';
    }
    this.slides[id].style.display = 'block';
    this.indicate();
  };

  // set page
  this.indicate = () => {
    this.indicator.textContent = `${String(this.slideId + 1)} / ${String(this.slides.length)}`;
  };

  // init

  this.goto(0);
}
