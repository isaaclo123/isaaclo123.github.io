// slide generation

function Slides( // eslint-disable-line no-unused-vars
  slideData,
  interval = 5000,
  titleElement = document.getElementById('slide-title'),
  descriptionElement = document.getElementById('slide-description'),
  indicatorElement = document.getElementById('indicator'),
) {
  this.slideId = -1;
  this.slideData = slideData;
  this.title = titleElement;
  this.description = descriptionElement;
  this.indicator = indicatorElement;

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
    if (this.slideId > this.slideData.length - 1) {
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
      this.slideId = this.slideData.length - 1;
    }
    this.goto(this.slideId);
    this.timerReset();
    this.indicate();
  };

  // sets slideshow to page with id
  this.goto = (id) => {
    this.title.innerHTML = this.slideData[id].title;
    this.description.innerHTML = this.slideData[id].description;
  };

  // set page
  this.indicate = () => {
    this.indicator.textContent = `${String(this.slideId + 1)} / ${String(this.slideData.length)}`;
  };

  // init

  this.goto(0);
}
