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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _router = __webpack_require__(1);

var _router2 = _interopRequireDefault(_router);

var _menu = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// index.js

// import libraries
window.gotoUrl = _menu.gotoUrl;
window.gotoHash = _menu.gotoHash;
window.hover = _menu.hover;

// page scripts
var homeLoad = __webpack_require__(3);
var resumeLoad = __webpack_require__(6);

// import pages
var home = __webpack_require__(8);
var resume = __webpack_require__(9);

// import css/sass
__webpack_require__(10);

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
    // script: './pages/resume/resume.js',
  },
  projects: {
    page: './pages/projects/projects.html'
    // script: projectLoad(), // eslint-disable-line no-undef
  },
  music: {
    page: './pages/music/music.html'
    // script: musicLoad(), // eslint-disable-line no-undef
  },
  contact: {
    page: './pages/contact/contact.html'
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
/* 1 */
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
/* 2 */
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
      inner.setAttribute('onclick', 'gotoHash(\'' + name + '\')');
      // add hover behavior
      inner.setAttribute('onmouseover', 'hover(this)');
      inner.setAttribute('onmouseout', 'hover(this)');
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

  for (var _j = 0; _j < social.length; _j += 1) {
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
    icon.setAttribute('onclick', 'gotoUrl(\'' + social[_j][1] + '\')');
    // add hover behavior
    icon.setAttribute('onmouseover', 'hover(this)');
    icon.setAttribute('onmouseout', 'hover(this)');

    // add letter to DOM
    letter.appendChild(icon);
    el.appendChild(letter);

    // increment counter
    i += 1;
  }
  // add seperator
  addSeperator(i, el);
}

exports.gotoUrl = gotoUrl;
exports.gotoHash = gotoHash;
exports.hover = hover;
exports.menuInit = menuInit;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_image__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lib_image__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_pages_home_face_jpg__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_pages_home_face_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_pages_home_face_jpg__);



/* harmony default export */ __webpack_exports__["default"] = (() => {
  // eslint-disable-line no-unused-vars
  Object(__WEBPACK_IMPORTED_MODULE_0_lib_image__["loadImage"])(__WEBPACK_IMPORTED_MODULE_1_pages_home_face_jpg___default.a);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// image loading

function loadImage(image) {
  var imageElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.getElementById('image');
  // eslint-disable-line no-unused-vars
  imageElement.setAttribute('src', image);
}

function loadImages(selector) {
  var imgAttribute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'img-src';
  // eslint-disable-line no-unused-vars
  document.body.querySelectorAll(selector).forEach(function (val) {
    if (val.getAttribute(imgAttribute)) loadImage(val.getAttribute(imgAttribute), val);
  });
}

exports.loadImage = loadImage;
exports.loadImages = loadImages;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "public/df0f287cde96908a6ac347161ab798c0.jpg";

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_slides__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_slides___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lib_slides__);


/* harmony default export */ __webpack_exports__["default"] = (() => {
  window.slides = new __WEBPACK_IMPORTED_MODULE_0_lib_slides___default.a();
});

/***/ }),
/* 7 */
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
    var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;

    var _this = this;

    var slideClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'slide';
    var indicator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'indicator';

    _classCallCheck(this, _class);

    this.slideId = 0;
    this.slides = document.getElementsByClassName(slideClass);
    this.indicator = document.getElementById(indicator);
    this.interval = interval;

    // creates timer
    this.timer = setInterval(function () {
      _this.slideshow();
    }, this.interval);
    // init

    this.goto(0);
  }

  // actions that actually show the slides


  _createClass(_class, [{
    key: 'slideshow',
    value: function slideshow() {
      this.next();
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
      this.slideId += 1;
      if (this.slideId > this.slides.length - 1) {
        this.slideId = 0;
      }
      this.goto(this.slideId);
      clearInterval(this.timer);
      this.timerReset();
    }

    // goes to previous slide in slideshow, loops around

  }, {
    key: 'prev',
    value: function prev() {
      this.slideId -= 1;
      if (this.slideId < 0) {
        this.slideId = this.slides.length - 1;
      }
      this.goto(this.slideId);
      this.timerReset();
    }

    // sets slideshow to page with id

  }, {
    key: 'goto',
    value: function goto(id) {
      for (var i = 0; i < this.slides.length; i += 1) {
        this.slides[i].style.display = 'none';
      }
      this.slides[id].style.display = 'block';
      this.indicate();
    }

    // set page

  }, {
    key: 'indicate',
    value: function indicate() {
      this.indicator.textContent = String(this.slideId + 1) + ' / ' + String(this.slides.length);
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "<div class=\"page\">\n  <img id=\"image\" class=\"page-fit\"></img>\n</div>\n";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div class=\"page page-dark\">\n  <div class=\"content slide\">\n    <h1>Education</h1>\n    <span>\n      <ul>\n        <li>\n          <b>University of Minnesota</b>\n          <br>\n          <b>Twin Cities</b>\n          <br>\n          <u>Computer Science</u> Major\n          <br>GPA: <u>3.81</u>\n        </li>\n        <li>\n          <b>Leland High School</b>\n          <br><u>National Merit Finalist</u>\n          <br>GPA: <u>3.84</u>\n        </li>\n      </ul>\n    </span>\n  </div>\n\n  <div class=\"content slide\">\n    <h1>Work<br>Experience</h1>\n    <span>\n      <p>\n        <b>Interim Software Developer</b>\n        <br>\n        <b>(21st Century Education)</b>\n        <br>\n        Installed a company <u>server</u>\n        <br>\n        Set up a company <u>event page</u>\n        <br>\n        Wrote code for <u>21Vocab</u>\n      </p>\n    </span>\n  </div>\n\n  <div class=\"content slide\">\n    <h1>Teaching<br>Experience</h1>\n    <span>\n      <ul>\n        <li>\n          <b>Math and Coding</b> (2015-16)\n          <br>\n          Taught <u>Tkinter</u> to children\n          <br>\n          at San Jose Library\n        </li>\n        <li>\n          <b>Coding for Fun</b> (Fall 2015)\n          <br>\n          Taught <u>Scratch</u> to children\n          <br>\n          at Carden Academy Almaden\n        </li>\n      </ul>\n    </span>\n  </div>\n\n  <!--\n  <div class=\"content slide\">\n    <h1>Activities</h1>\n    <span>\n      <ul>\n        <li>\n          <b>Chair</b> (2015-17)\n          <br>\n          Leland Congressional Debate</li>\n        <li>\n          <b>Secretary</b> (2015-17)\n          <br>\n          Leland Magic Club\n        </li>\n        <li>\n          <b>Secretary</b> (2014-16)\n          <br>\n          Leland Domino Club\n        </li>\n      </ul>\n    </span>\n  </div>\n  -->\n\n  <div class=\"content slide\">\n    <h1>Skills</h1>\n    <span>\n      <ul>\n        <li>\n          <b>Backend</b>: Python, Django\n          <br>\n          Java, SQL</li>\n        <li>\n          <b>Frontend</b>: HTML, CSS, JS,\n          <br>\n          AngularJS, Vue.js, Jekyll\n        </li>\n        <li>\n          <b>Misc</b>: Linux, Git, GPG\n          <br>\n          SSH, Pandoc, LATEX\n        </li>\n      </ul>\n    </span>\n  </div>\n\n</div>\n<div class=\"button button-prev\" onclick=\"slides.prev()\"><i class=\"fa fa-angle-left\"></i></div>\n<div class=\"button button-next\" onclick=\"slides.next()\"><i class=\"fa fa-angle-right\"></i></div>\n<div class=\"button button-download\" onclick=\"gotoUrl('/resume.pdf')\"><i class=\"fa fa-arrow-down\"></i></div>\n<div class=\"button button-indicator\" id=\"indicator\"></div>\n";

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);