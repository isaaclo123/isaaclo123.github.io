// slide generation

export default class {
  constructor( // eslint-disable-line no-unused-vars
    icon = 'fa-link',
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
    window.timer = setInterval(() => {
      this.slideshow();
    }, this.interval);

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

    this.goto(this.slideId);
  }


  // actions that actually show the slides
  slideshow() {
    this.next(false);
  }

  // resets timer
  timerReset() {
    clearInterval(window.timer);
    window.timer = setInterval(() => {
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
      window.timerReset();
    }
  }

  // goes to previous slide in slideshow, loops around
  prev(reset = true) {
    this.slideId -= 1;
    if (this.slideId < 0) {
      this.slideId = this.slides.length - 1;
    }
    this.goto(this.slideId);
    if (reset) {
      window.timerReset();
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
