// slide generation

export default class {
  constructor( // eslint-disable-line no-unused-vars
    actionIcon = 'fa-link',
    interval = 10000,
    slideClass = 'slide',
    view = 'view',
  ) {
    this.slideId = 0;
    this.slides = document.getElementsByClassName(slideClass);
    this.view = document.getElementById(view);

    // init

    // creates timer
    this.interval = interval;
    this.timer = setInterval(() => {
      this.slideshow();
    }, this.interval);

    // function for creating indicator slide buttons
    function buttonCreate(buttonType) {
      const el = document.createElement('div');
      el.classList.add('button');
      el.classList.add(`button-${buttonType}`);
      return el;
    }

    // function for creating icon elements
    function iconCreate(iconType) {
      const el = document.createElement('i');
      el.classList.add('fa');
      el.classList.add(String(iconType));
      return el;
    }

    // add forward and backwards buttons

    // create next button
    const nextEl = buttonCreate('next');
    const nextIcon = iconCreate('fa-angle-right');
    nextEl.appendChild(nextIcon);
    nextEl.onclick = () => { this.next(); };

    // create prev button
    const prevEl = buttonCreate('prev');
    const prevIcon = iconCreate('fa-angle-left');
    prevEl.appendChild(prevIcon);
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

    for (let i = 0; i < actions.urls.length; i += 1) {
      const actionEl = buttonCreate('action');
      const actionIcon = iconCreate(String(actions.icon));
      actionEl.appendChild(actionIcon);
      actionEl.onclick = () => {
        window.location.href = actions.urls[i];
      };
    }

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

  // sets slideshow to page with id
  goto(id) {
    for (let i = 0; i < this.slides.length; i += 1) {
      this.slides[i].style.display = 'none'; // eslint-disable-line no-param-reassign
    }
    this.slides[id].style.display = 'block'; // eslint-disable-line no-param-reassign
  }
}
