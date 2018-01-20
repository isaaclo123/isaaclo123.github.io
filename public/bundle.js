/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// slide generation

var _class = function () {
  function _class() {
    var icon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'fa-link';
    var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;

    var _this = this;

    var slideClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'slide';
    var view = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'view';

    _classCallCheck(this, _class);

    this.slideId = 0;
    this.slides = document.getElementsByClassName(slideClass);
    this.view = document.getElementById(view);

    // init

    // creates timer
    this.interval = interval;
    this.timer = setInterval(function () {
      _this.slideshow();
    }, this.interval);

    // function for creating indicator slide buttons
    function buttonCreate(buttonType) {
      var el = document.createElement('div');
      el.classList.add('button');
      el.classList.add('button-' + buttonType);
      return el;
    }

    // creates buttons with icon inside
    function iconButtonCreate(buttonType, iconType) {
      var el = buttonCreate(buttonType);
      var elIcon = document.createElement('i');
      elIcon.classList.add('fa');
      elIcon.classList.add(String(iconType));
      el.appendChild(elIcon);
      return el;
    }

    // add forward and backwards buttons

    // create next button
    var nextEl = iconButtonCreate('next', 'fa-angle-right');
    nextEl.onclick = function () {
      _this.next();
    };

    // create prev button
    var prevEl = iconButtonCreate('prev', 'fa-angle-left');
    prevEl.onclick = function () {
      _this.next();
    };

    // add buttons to view
    this.view.appendChild(nextEl);
    this.view.appendChild(prevEl);

    // add indicator numbers to pages
    for (var i = 0; i < this.slides.length; i += 1) {
      var indicatorEl = buttonCreate('indicator');
      indicatorEl.textContent = String(i + 1) + ' / ' + String(this.slides.length);
      this.slides[i].appendChild(indicatorEl);
    }

    // add actions to page

    var _loop = function _loop(_i) {
      var link = _this.slides[_i].getAttribute('data-link');
      var actionEl = iconButtonCreate('action', String(icon));
      actionEl.onclick = function () {
        window.location.href = link;
      };
      _this.slides[_i].appendChild(actionEl);
    };

    for (var _i = 0; _i < this.slides.length; _i += 1) {
      _loop(_i);
    }

    this.goto(this.slideId);
  }

  // actions that actually show the slides


  _createClass(_class, [{
    key: 'slideshow',
    value: function slideshow() {
      this.next(false);
    }

    // resets timer

  }, {
    key: 'timerReset',
    value: function timerReset() {
      var _this2 = this;

      clearInterval(this.timer);
      this.timer = setInterval(function () {
        _this2.slideshow();
      }, this.interval);
    }

    // goes to next slide in slideshow, loops around

  }, {
    key: 'next',
    value: function next() {
      var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

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

  }, {
    key: 'prev',
    value: function prev() {
      var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

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

  }, {
    key: 'goto',
    value: function goto(id) {
      for (var i = 0; i < this.slides.length; i += 1) {
        this.slides[i].style.display = 'none'; // eslint-disable-line no-param-reassign
      }
      this.slides[id].style.display = 'block'; // eslint-disable-line no-param-reassign
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// image loading

exports.default = function (image, imageElement) {
  // eslint-disable-line no-unused-vars
  var el = document.getElementById(imageElement);
  el.setAttribute('src', image);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _router = __webpack_require__(3);

var _router2 = _interopRequireDefault(_router);

var _menu = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars

// page scripts
// script.js

// import libraries
var homeLoad = __webpack_require__(5);
var resumeLoad = __webpack_require__(7);
var projectLoad = __webpack_require__(9);
var musicLoad = __webpack_require__(14);

// import pages
var home = __webpack_require__(16);
var resume = __webpack_require__(17);
var projects = __webpack_require__(18);
var music = __webpack_require__(19);

// import css/sass
__webpack_require__(20);

// import fonts
// require('npm/font-awesome/css/font-awesome.min.css');

var pages = [['home', 'ISAAC LO'], ['resume', 'RESUME'], ['projects', 'PROJECTS'], ['music', 'MUSIC'], ['contact', 'CONTACT ME']];

var social = [['fa-facebook fa', 'https://www.facebook.com/isaaclo123'], ['fa-linkedin fa', 'https://www.linkedin.com/in/isaac-lo-325587124/'], ['fa-github fa', 'https://github.com/isaaclo123']];

// router

var routes = {
  '': {
    page: home,
    load: homeLoad
  },
  home: {
    page: home,
    load: homeLoad
  },
  resume: {
    page: resume,
    load: resumeLoad
  },
  projects: {
    page: projects,
    load: projectLoad
  },
  music: {
    page: music,
    load: musicLoad
  },
  contact: {
    page: null
    // script: contactLoad(), // eslint-disable-line no-undef
  }
};

// page

window.onload = function () {
  (0, _menu.menuInit)(pages, social); // eslint-disable-line no-undef
  (0, _router2.default)(routes);
  // goto home page when page first loads
};

// route view based on page change

window.onhashchange = function () {
  setTimeout(function () {
    (0, _router2.default)(routes);
  }, 400);
};

window.onbeforeunload = function () {
  (0, _router2.default)(routes);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// router

exports.default = function (routeData) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'view';
  // eslint-disable-line no-unused-vars
  var route = window.location.hash.slice(2, window.location.hash.length);
  if (route in routeData) {
    var view = document.getElementById(element);

    // script loader
    var script = document.createElement('script');

    script.onload = function () {
      load(); // eslint-disable-line no-undef
    };

    // changes page
    view.innerHTML = routeData[route].page;
    setTimeout(function () {
      // animate
    }, 400);
    if ('load' in routeData[route]) {
      routeData[route].load.default();
    }
  } else {
    window.location = '';
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// sets up circular menu

function gotoUrl(url) {
  // eslint-disable-line no-unused-vars
  // goes to URL
  window.location.href = url;
}

function gotoHash(hash) {
  // eslint-disable-line no-unused-vars
  window.location.hash = '/' + hash;
}

function hover(el) {
  // eslint-disable-line no-unused-vars
  // highlight or unhighlight element
  var className = el.classList.item(0);
  var elements = document.getElementsByClassName(className);

  for (var i = 0; i < elements.length; i += 1) {
    elements[i].classList.toggle('highlight');
  }
}

function menuInit(pages, social) {
  // eslint-disable-line no-unused-vars
  // initializes circular menu

  function createChar(i, name, character) {
    // create span for rotated elements
    var outer = document.createElement('span');
    outer.classList.add('char' + i.toString());
    var inner = document.createElement('p');
    // add rotated character styling class
    inner.classList.add(name);

    if (name !== 'seperator') {
      // add linking to character
      inner.onclick = function () {
        gotoHash(name);
      };
      // add hover behavior
      inner.onmouseover = function () {
        hover(inner);
      };
      inner.onmouseout = function () {
        hover(inner);
      };
    }

    // get text for the letter
    var text = document.createTextNode(character);
    inner.appendChild(text);
    outer.appendChild(inner);

    return outer;
  }

  function addSeperator(i, el) {
    var sep1 = createChar(i, 'seperator', ' ');
    el.appendChild(sep1);
    var sep2 = createChar(i + 1, 'seperator', '|');
    el.appendChild(sep2);
    var sep3 = createChar(i + 2, 'seperator', ' ');
    el.appendChild(sep3);
  }

  var el = document.getElementsByTagName('nav')[0];
  var i = 1;

  // add page links
  for (var j = 0; j < pages.length; j += 1) {
    for (var k = 0; k < pages[j][1].length; k += 1) {
      // add character
      var character = createChar(i, pages[j][0], pages[j][1][k]);
      el.appendChild(character);
      // increment counter
      i += 1;
    }
    // add seperator
    addSeperator(i, el);
    i += 3;
  }

  // add social links
  i -= 1;

  var _loop = function _loop(_j) {
    // add a space
    var space = createChar(i, 'seperator', ' ');
    el.appendChild(space);
    i += 1;

    // create span for rotated elements
    var letter = document.createElement('span');
    // add rotated character styling class
    letter.classList.add('char' + i.toString());

    // create icon for social link
    var icon = document.createElement('i');
    icon.className += social[_j][0];
    icon.setAttribute('aria-hidden', 'true');
    // add linking
    icon.onclick = function () {
      gotoUrl(social[_j][1]);
    };

    // add hover behavior
    icon.onmouseover = function () {
      hover(icon);
    };
    icon.onmouseout = function () {
      hover(icon);
    };

    // add letter to DOM
    letter.appendChild(icon);
    el.appendChild(letter);

    // increment counter
    i += 1;
  };

  for (var _j = 0; _j < social.length; _j += 1) {
    _loop(_j);
  }
  // add seperator
  addSeperator(i, el);
}

exports.gotoUrl = gotoUrl;
exports.gotoHash = gotoHash;
exports.hover = hover;
exports.menuInit = menuInit;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _image = __webpack_require__(1);

var _image2 = _interopRequireDefault(_image);

var _face = __webpack_require__(6);

var _face2 = _interopRequireDefault(_face);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  // eslint-disable-line no-unused-vars
  (0, _image2.default)(_face2.default, 'image');
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/df0f287cde96908a6ac347161ab798c0.jpg";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slides = __webpack_require__(0);

var _slides2 = _interopRequireDefault(_slides);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(8);

exports.default = function () {
  window.slides = new _slides2.default('fa-arrow-down');
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slides = __webpack_require__(0);

var _slides2 = _interopRequireDefault(_slides);

var _image = __webpack_require__(1);

var _image2 = _interopRequireDefault(_image);

var _FastFlowIcon = __webpack_require__(10);

var _FastFlowIcon2 = _interopRequireDefault(_FastFlowIcon);

var _leafGreen = __webpack_require__(11);

var _leafGreen2 = _interopRequireDefault(_leafGreen);

var _wakeIo = __webpack_require__(12);

var _wakeIo2 = _interopRequireDefault(_wakeIo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(13);

exports.default = function () {
  window.slides = new _slides2.default();
  (0, _image2.default)(_FastFlowIcon2.default, 'fastflow');
  (0, _image2.default)(_leafGreen2.default, 'leaflet');
  (0, _image2.default)(_wakeIo2.default, 'wakeio');
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/5e8949b3fa02c93504efc5649a43f2bb.png";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/2d91a6ef0ec79733d73d5b6e4479d9d0.png";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/fb2ff74a900b232c17a7f63d99095e87.png";

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slides = __webpack_require__(0);

var _slides2 = _interopRequireDefault(_slides);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(15);

exports.default = function () {
  window.slides = new _slides2.default('fa-play');
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<div class=\"page\">\n  <img id=\"image\" class=\"page-background\"></img>\n</div>\n";

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "<div class=\"page page-border resume-page\">\n  <div class=\"content slide\" data-link=\"/public/resume.pdf\">\n    <h1>Education</h1>\n    <span>\n      <ul>\n        <li>\n          <b>University of Minnesota</b>\n          <br>\n          <b>Twin Cities</b>\n          <br>\n          <u>Computer Science</u> Major\n          <br>GPA: <u>3.81</u>\n        </li>\n        <li>\n          <b>Leland High School</b>\n          <br><u>National Merit Finalist</u>\n          <br>GPA: <u>3.84</u>\n        </li>\n      </ul>\n    </span>\n  </div>\n\n  <div class=\"content slide\" data-link=\"/public/resume.pdf\">\n    <h1>Work<br>Experience</h1>\n    <span>\n      <p>\n        <b>Interim Software Developer</b>\n        <br>\n        <b>(21st Century Education)</b>\n        <br>\n        Installed a company <u>server</u>\n        <br>\n        Set up a company <u>event page</u>\n        <br>\n        Wrote code for <u>21Vocab</u>\n      </p>\n    </span>\n  </div>\n\n  <div class=\"content slide\" data-link=\"/public/resume.pdf\">\n    <h1>Teaching<br>Experience</h1>\n    <span>\n      <ul>\n        <li>\n          <b>Math and Coding</b> (2015-16)\n          <br>\n          Taught <u>Tkinter</u> to children\n          <br>\n          at San Jose Library\n        </li>\n        <li>\n          <b>Coding for Fun</b> (Fall 2015)\n          <br>\n          Taught <u>Scratch</u> to children\n          <br>\n          at Carden Academy Almaden\n        </li>\n      </ul>\n    </span>\n  </div>\n\n  <!--\n  <div class=\"content slide\">\n    <h1>Activities</h1>\n    <span>\n      <ul>\n        <li>\n          <b>Chair</b> (2015-17)\n          <br>\n          Leland Congressional Debate</li>\n        <li>\n          <b>Secretary</b> (2015-17)\n          <br>\n          Leland Magic Club\n        </li>\n        <li>\n          <b>Secretary</b> (2014-16)\n          <br>\n          Leland Domino Club\n        </li>\n      </ul>\n    </span>\n  </div>\n  -->\n\n  <div class=\"content slide\" data-link=\"/public/resume.pdf\">\n    <h1>Skills</h1>\n    <span>\n      <ul>\n        <li>\n          <b>Backend</b>: Python, Django\n          <br>\n          Java, SQL</li>\n        <li>\n          <b>Frontend</b>: HTML, CSS, JS,\n          <br>\n          AngularJS, Vue.js, Jekyll\n        </li>\n        <li>\n          <b>Misc</b>: Linux, Git, GPG\n          <br>\n          SSH, Pandoc, LATEX\n        </li>\n      </ul>\n    </span>\n  </div>\n\n</div>\n";

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "<div class=\"page projects-page\">\n\n  <div class=\"content slide\" data-link=\"https://flow.fastflowdebate.com/\">\n    <img id=\"fastflow\" class=\"page-background page-border\"></img>\n    <h1><span>FastFlow</span></h1>\n    <span>\n      <p>\n        <b>Software for better\n        <br>\n        and faster debate.</b>\n        <br>\n        Wrote <u>interface</u> code\n        <br>\n        and <u>project website</u>.\n      </p>\n    </span>\n  </div>\n\n  <div class=\"content slide\" data-link=\"https://github.com/Zarkoix/LeafletServer\">\n    <img id=\"leaflet\" class=\"page-background page-border\"></img>\n    <h1><span>Leaflet</span></h1>\n    <span>\n      <p>\n        <b>Minimalistic and\n        <br>\n        effective notetaking.</b>\n        <br>\n        Wrote a <u>GraphQL</u> API\n        <br>\n        with <u>Django</u> and <u>Python</u>.\n      </p>\n    </span>\n  </div>\n\n  <div class=\"content slide\" data-link=\"https://github.com/isaaclo123/wake-io\">\n    <img id=\"wakeio\" class=\"page-background page-border\"></img>\n    <h1><span>Wake.io</span></h1>\n    <span>\n      <p>\n        <b>An Open Source Fatigue\n        <br>\n        monitoring solution.</b>\n        <br>\n        A prototype written with\n        <br>\n        <u>Vue.js</u> and <u>Python</u>.\n      </p>\n    </span>\n  </div>\n</div>\n";

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "<div class=\"page music-page page-border\">\n\n  <div id=\"stone-free\" class=\"content slide\" data-link=\"https://www.facebook.com/isaaclo123/videos/1625041427552454/\">\n    <div class=\"record\"></div>\n    <span class=\"label label-top\">STONE<br>FREE</span>\n    <span class=\"label label-left\">Jimi</span>\n    <span class=\"label label-right\">Hendrix</span>\n    <span class=\"label label-bottom\">\n      covered by\n      <br>\n      Isaac Lo\n    </span>\n  </div>\n\n  <div id=\"crossroads\" class=\"content slide\" data-link=\"https://www.facebook.com/isaaclo123/videos/1543546355701962/\">\n    <div class=\"record\"></div>\n    <span class=\"label label-top\">CROSS<br>ROADS</span>\n    <span class=\"label label-left\">Eric</span>\n    <span class=\"label label-right\">Clapton</span>\n    <span class=\"label label-bottom\">\n      covered by\n      <br>\n      Isaac Lo\n    </span>\n  </div>\n\n</div>\n";

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);