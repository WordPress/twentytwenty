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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/src/functions/cover-modals.js":
/*!*************************************************!*\
  !*** ./assets/js/src/functions/cover-modals.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./assets/js/src/functions/helper.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    if (document.querySelector('.cover-modal')) {
      // Handle cover modals when they're toggled
      this.onToggle(); // When toggled, untoggle if visitor clicks on the wrapping element of the modal

      this.outsideUntoggle(); // Close on escape key press

      this.closeOnEscape(); // Show a cover modal on load, if the query string says so

      this.showOnLoadandClick(); // Hide and show modals before and after their animations have played out

      this.hideAndShowModals();
    }
  },
  // Handle cover modals when they're toggled
  onToggle: function onToggle() {
    document.querySelector('.cover-modal').addEventListener('toggled', function (event) {
      var modal = event.target,
          body = document.querySelector('body');

      if (modal.classList.contains('active')) {
        body.classList.add('showing-modal');
      } else {
        body.classList.remove('showing-modal');
        body.classList.add('hiding-modal'); // Remove the hiding class after a delay, when animations have been run

        setTimeout(function () {
          body.classList.remove('hiding-modal');
        }, 500);
      }
    });
  },
  // Close modal on outside click
  outsideUntoggle: function outsideUntoggle() {
    var _this = this;

    document.addEventListener('click', function (event) {
      var target = event.target;
      var modal = document.querySelector('.cover-modal.active');

      if (target === modal) {
        _this.untoggleModal(target);
      }
    });
  },
  // Close modal on escape key press
  closeOnEscape: function closeOnEscape() {
    var _this2 = this;

    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
        event.preventDefault();
        document.querySelectorAll('.cover-modal.active').forEach(function (element) {
          _this2.untoggleModal(element);
        });
      }
    });
  },
  // Show modals on load
  showOnLoadandClick: function showOnLoadandClick() {
    var _this3 = this;

    var key = 'modal'; // Load based on query string

    if (window.location.search.indexOf(key) !== -1) {
      var modalTargetString = Object(_helper__WEBPACK_IMPORTED_MODULE_0__["getQueryStringValue"])(key),
          modalTarget = document.querySelector("#".concat(modalTargetString, "-modal"));

      if (modalTargetString && modalTarget.length) {
        setTimeout(function () {
          modalTarget.classList.add('active').triggerHandler('toggled');
          _this3.scrollLock = true;
        }, 250);
      }
    } // Check for modal matching querystring when clicking a link
    // Format: www.url.com?modal=modal-id


    document.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function (event) {
        // Load based on query string
        if (event.target.href && event.target.href.indexOf(key) !== -1) {
          var _modalTargetString = Object(_helper__WEBPACK_IMPORTED_MODULE_0__["getQueryStringValue"])(key, event.target.attr('href')),
              _modalTarget = document.querySelector("#".concat(_modalTargetString));

          if (_modalTargetString && _modalTarget.length) {
            _modalTarget.classList.add('active').triggerHandler('toggled');

            _this3.scrollLock = true;
            return false;
          }
        }
      });
    });
  },
  // Hide and show modals before and after their animations have played out
  hideAndShowModals: function hideAndShowModals() {
    var modals = document.querySelectorAll('.cover-modal'); // Show the modal

    modals.forEach(function (modal) {
      modal.addEventListener('toggle-target-before-inactive', function (event) {
        if (event.target !== modal) {
          return;
        }

        modal.classList.add('show-modal');
      }); // Hide the modal after a delay, so animations have time to play out

      modal.addEventListener('toggle-target-after-inactive', function (event) {
        if (event.target !== modal) {
          return;
        }

        setTimeout(function () {
          modal.classList.remove('show-modal');
        }, 500);
      });
    });
  },
  // Untoggle a modal
  untoggleModal: function untoggleModal(modal) {
    var modalToggle = false; // If the modal has specified the string (ID or class) used by toggles to target it, untoggle the toggles with that target string
    // The modal-target-string must match the string toggles use to target the modal

    if (modal.dataset.modalTargetString) {
      var modalTargetClass = modal.dataset.modalTargetString;
      modalToggle = document.querySelector("*[data-toggle-target=\"".concat(modalTargetClass, "\"]"));
    } // If a modal toggle exists, trigger it so all of the toggle options are included


    if (modalToggle) {
      modalToggle.click(); // If one doesn't exist, just hide the modal
    } else {
      modal.classList.remove('active');
    }
  }
});

/***/ }),

/***/ "./assets/js/src/functions/dynamic-screen-height.js":
/*!**********************************************************!*\
  !*** ./assets/js/src/functions/dynamic-screen-height.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    var _this = this;

    this.setScreenHeight();
    setTimeout(function () {
      _this.setScreenHeight();
    }, 500);
    window.addEventListener('resize', function () {
      _this.setScreenHeight();
    });
  },
  setScreenHeight: function setScreenHeight() {
    var screenHeight = document.querySelector('.screen-height');

    if (screenHeight) {
      screenHeight.style.minHeight = window.innerHeight;
    }
  }
});

/***/ }),

/***/ "./assets/js/src/functions/focus-management.js":
/*!*****************************************************!*\
  !*** ./assets/js/src/functions/focus-management.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // If the visitor tabs out of the main menu, return focus to the navigation toggle
    // Also, if the visitor tabs into a hidden element, move the focus to the element after the hidden element
    this.focusLoop();
  },
  focusLoop: function focusLoop() {
    document.addEventListener('focusin', function (event) {
      var element = event.target;
      var menuModal = document.querySelector('.menu-modal');
      var headerToggles = document.querySelector('.header-toggles');
      var searchModal = document.querySelector('.search-modal');

      if (menuModal.classList.contains('.active')) {
        if (!menuModal.contains(element) && !headerToggles.contains(element)) {
          document.querySelector('.nav-toggle').focus();
        }
      } else if (!searchModal.classList.contains('.active')) {
        if (!searchModal.contains(element)) {
          searchModal.querySelector('.search-field').focus();
        }
      }
    });
  }
});

/***/ }),

/***/ "./assets/js/src/functions/helper.js":
/*!*******************************************!*\
  !*** ./assets/js/src/functions/helper.js ***!
  \*******************************************/
/*! exports provided: twentytwentyToggleAttribute, getQueryStringValue, slideToggle, findParents, easing, scrollTo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "twentytwentyToggleAttribute", function() { return twentytwentyToggleAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryStringValue", function() { return getQueryStringValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slideToggle", function() { return slideToggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findParents", function() { return findParents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easing", function() { return easing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollTo", function() { return scrollTo; });
function twentytwentyToggleAttribute(element, attribute) {
  var trueVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var falseVal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (element[attribute] !== trueVal) {
    element.setAttribute(attribute, trueVal);
  } else {
    element.setAttribute(attribute, falseVal);
  }
}
var getQueryStringValue = function getQueryStringValue() {
  var vars = [];
  var hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }

  return vars;
};

var slideUp = function slideUp(target, duration) {
  target.style.transitionProperty = 'height, margin, padding';
  /* [1.1] */

  target.style.transitionDuration = duration + 'ms';
  /* [1.2] */

  target.style.boxSizing = 'border-box';
  /* [2] */

  target.style.height = target.offsetHeight + 'px';
  /* [3] */

  target.style.height = 0;
  /* [4] */

  target.style.paddingTop = 0;
  /* [5.1] */

  target.style.paddingBottom = 0;
  /* [5.2] */

  target.style.marginTop = 0;
  /* [6.1] */

  target.style.marginBottom = 0;
  /* [7.2] */

  target.style.overflow = 'hidden';
  /* [7] */

  window.setTimeout(function () {
    target.style.display = 'none';
    /* [8] */

    target.style.removeProperty('height');
    /* [9] */

    target.style.removeProperty('padding-top');
    /* [10.1] */

    target.style.removeProperty('padding-bottom');
    /* [10.2] */

    target.style.removeProperty('margin-top');
    /* [11.1] */

    target.style.removeProperty('margin-bottom');
    /* [11.2] */

    target.style.removeProperty('overflow');
    /* [12] */

    target.style.removeProperty('transition-duration');
    /* [13.1] */

    target.style.removeProperty('transition-property');
    /* [13.2] */
  }, duration);
};

var slideDown = function slideDown(target, duration) {
  target.style.removeProperty('display');
  /* [1] */

  var display = window.getComputedStyle(target).display;

  if (display === 'none') {
    /* [2] */
    display = 'block';
  }

  target.style.display = display;
  var height = target.offsetHeight;
  /* [3] */

  target.style.height = 0;
  /* [4] */

  target.style.paddingTop = 0;
  /* [5.1] */

  target.style.paddingBottom = 0;
  /* [5.2] */

  target.style.marginTop = 0;
  /* [6.1] */

  target.style.marginBottom = 0;
  /* [6.2] */

  target.style.overflow = 'hidden';
  /* [7] */

  target.style.boxSizing = 'border-box';
  /* [8] */

  target.style.transitionProperty = 'height, margin, padding';
  /* [9.1] */

  target.style.transitionDuration = duration + 'ms';
  /* [9.2] */

  target.style.height = height + 'px';
  /* [10] */

  target.style.removeProperty('padding-top');
  /* [11.1] */

  target.style.removeProperty('padding-bottom');
  /* [11.2] */

  target.style.removeProperty('margin-top');
  /* [12.1] */

  target.style.removeProperty('margin-bottom');
  /* [12.2] */

  window.setTimeout(function () {
    target.style.removeProperty('height');
    /* [13] */

    target.style.removeProperty('overflow');
    /* [14] */

    target.style.removeProperty('transition-duration');
    /* [15.1] */

    target.style.removeProperty('transition-property');
    /* [15.2] */
  }, duration);
};

var slideToggle = function slideToggle(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration);
  }

  return slideUp(target, duration);
};
/**
 * traverses the DOM up to find elements matching the query
 *
 * @param {HTMLElement} target
 * @param {string} query
 * @return {NodeList} parents matching query
 */

var findParents = function findParents(target, query) {
  var parents = []; // recursively go up the DOM adding matches to the parents array

  var traverse = function traverse(item) {
    var parent = item.parentNode;

    if (parent instanceof HTMLElement) {
      if (parent.matches(query)) {
        parents.push(parent);
      }

      traverse(parent);
    }
  };

  traverse(target);
  return parents;
}; // easing functions http://goo.gl/5HLl8

var easing = {
  easeInOutQuad: function easeInOutQuad(t, b, c, d) {
    t /= d / 2;

    if (t < 1) {
      return c / 2 * t * t + b;
    }

    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  },
  easeInCubic: function easeInCubic(t, b, c, d) {
    var tc = (t /= d) * t * t;
    return b + c * tc;
  },
  inOutQuintic: function inOutQuintic(t, b, c, d) {
    var ts = (t /= d) * t,
        tc = ts * t;
    return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
  }
};
var scrollTo = function scrollTo(to, callback, duration) {
  var move = function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  };

  var position = function position() {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
  };

  var start = position();
  var change = to - start;
  var increment = 20;
  var currentTime = 0;
  duration = typeof duration === 'undefined' ? 500 : duration;

  var animateScroll = function animateScroll() {
    // increment the time
    currentTime += increment; // find the value with the quadratic in-out easing function

    var val = easing.easeInOutQuad(currentTime, start, change, duration); // move the document.body

    move(val); // do the animation unless its over

    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll);
    } else if (callback && typeof callback === 'function') {
      // the animation is done so lets callback
      callback();
    }
  };

  animateScroll();
};

/***/ }),

/***/ "./assets/js/src/functions/instrinsic-ratio-videos.js":
/*!************************************************************!*\
  !*** ./assets/js/src/functions/instrinsic-ratio-videos.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    var _this = this;

    this.makeFit();
    window.addEventListener('fit-videos', function () {
      _this.makeFit();
    });
    window.addEventListener('resize', function () {
      _this.makeFit();
    });
  },
  makeFit: function makeFit() {
    document.querySelectorAll('iframe, object, video').forEach(function (video) {
      var container = video.parentNode; // Skip videos we want to ignore

      if (video.classList.contains('intrinsic-ignore') || video.parentNode.classList.contains('intrinsic-ignore')) {
        return true;
      }

      if (!video.dataset.origwidth) {
        // Get the video element proportions
        video.setAttribute('data-origwidth', video.width);
        video.setAttribute('data-origheight', video.height);
      }

      var iTargetWidth = container.offsetWidth; // Get ratio from proportions

      var ratio = iTargetWidth / video.dataset.origwidth; // Scale based on ratio, thus retaining proportions

      video.style.width = "".concat(iTargetWidth, "px");
      video.style.height = "".concat(video.dataset.origheight * ratio, "px");
    });
  }
});

/***/ }),

/***/ "./assets/js/src/functions/interval-scroll.js":
/*!****************************************************!*\
  !*** ./assets/js/src/functions/interval-scroll.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    var didScroll = false; // Check for the scroll event

    window.addEventListener('scroll', function () {
      didScroll = true;
    }); // Once every 250ms, check if we have scrolled, and if we have, do the intensive stuff

    setInterval(function () {
      if (didScroll) {
        didScroll = false; // When this triggers, we know that we have scrolled

        window.dispatchEvent(new Event('did-interval-scroll'));
      }
    }, 250);
  }
});

/***/ }),

/***/ "./assets/js/src/functions/main-menu.js":
/*!**********************************************!*\
  !*** ./assets/js/src/functions/main-menu.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./assets/js/src/functions/helper.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // If the current menu item is in a sub level, expand all the levels higher up on load
    this.expandLevel();
  },
  expandLevel: function expandLevel() {
    var mainMenu = document.querySelector('.main-menu');
    var activeMenuItem = mainMenu.querySelector('.current-menu-item');

    if (activeMenuItem) {
      Object(_helper__WEBPACK_IMPORTED_MODULE_0__["findParents"])(activeMenuItem, 'li').forEach(function (element) {
        var subMenuToggle = element.querySelector('.sub-menu-toggle');

        if (subMenuToggle) {
          subMenuToggle.click();
        }
      });
    }
  }
});

/***/ }),

/***/ "./assets/js/src/functions/resize-end.js":
/*!***********************************************!*\
  !*** ./assets/js/src/functions/resize-end.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        // Trigger this at the end of screen resizing
        window.dispatchEvent(new Event('resize-end'));
      }, 250);
    });
  }
});

/***/ }),

/***/ "./assets/js/src/functions/scroll-lock.js":
/*!************************************************!*\
  !*** ./assets/js/src/functions/scroll-lock.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // Init variables
    window.scrollLocked = false;
    window.prevScroll = {
      scrollX: window.scrollX,
      scrollY: window.scrollY
    };
    window.prevLockStyles = {};
    window.lockStyles = {
      overflowY: 'scroll',
      position: 'fixed',
      width: '100%'
    }; // Instantiate cache in case someone tries to unlock before locking

    this.saveStyles();
  },
  // Save context's inline styles in cache
  saveStyles: function saveStyles() {
    window.prevLockStyles = document.querySelector('html').style;
  },
  // Lock the scroll (do not call this directly)
  lock: function lock() {
    var appliedLock = {};

    if (window.scrollLocked) {
      return;
    } // Save scroll state and styles


    window.prevScroll = {
      scrollX: window.scrollX,
      scrollY: window.scrollY
    };
    this.saveStyles(); // Compose our applied CSS, with scroll state as styles

    appliedLock = _objectSpread({}, window.lockStyles, {}, {
      left: -window.scrollX + 'px',
      top: -window.scrollY + 'px'
    }); // Then lock styles and state

    var html = document.querySelector('html');
    Object.keys(appliedLock).forEach(function (style) {
      html.style[style] = appliedLock[style];
    });
    window.scrollX = 0;
    window.scrollY = 0;
    window.scrollLocked = true;
  },
  // Unlock the scroll (do not call this directly)
  unlock: function unlock() {
    if (!window.scrollLocked) {
      return;
    }

    var html = document.querySelector('html'); // Revert styles and state

    Object.keys(window.prevLockStyles).forEach(function (style) {
      html.style[style] = window.prevLockStyles[style];
    });
    window.screenX = window.prevScroll.scrollX;
    window.scrollY = window.prevScroll.scrollY;
    window.scrollLocked = false;
  },
  // Call this to lock or unlock the scroll
  setTo: function setTo(on) {
    // If an argument is passed, lock or unlock accordingly
    if (arguments.length) {
      if (on) {
        this.lock();
      } else {
        this.unlock();
      } // If not, toggle to the inverse state

    } else if (window.scrollLocked) {
      this.unlock();
    } else {
      this.lock();
    }
  }
});

/***/ }),

/***/ "./assets/js/src/functions/smooth-scroll.js":
/*!**************************************************!*\
  !*** ./assets/js/src/functions/smooth-scroll.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./assets/js/src/functions/helper.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // Scroll to anchor
    this.scrollToAnchor(); // Scroll to element

    this.scrollToElement();
  },
  // Scroll to anchor
  scrollToAnchor: function scrollToAnchor() {
    var anchorElements = document.querySelectorAll('a[href*="#"]');

    _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(anchorElements).filter(function (element) {
      if (element.href === '#' || element.href === '#0' || element.classList.contains('.do-not-scroll') || element.classList.contains('skip-link')) {
        return false;
      }

      return true;
    }).forEach(function (element) {
      element.addEventListener('click', function (event) {
        // On-page links
        if (window.location.hostname === event.target.hostname) {
          // Figure out element to scroll to
          var target = window.location.hash !== '' && document.querySelector(window.location.hash);
          target = target ? target : document.querySelector(event.target.hash); // Does a scroll target exist?

          if (target) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault(); // Get options

            var additionalOffset = event.target.dataset.additionalOffset;
            var scrollSpeed = event.target.dataset.scrollSpeed ? event.target.dataset.scrollSpeed : 500; // Determine offset

            var originalOffset = target.getBoundingClientRect().top + window.pageYOffset;
            var scrollOffset = additionalOffset ? originalOffset + additionalOffset : originalOffset;
            Object(_helper__WEBPACK_IMPORTED_MODULE_1__["scrollTo"])(scrollOffset, null, scrollSpeed);
            window.location.hash = event.target.hash.slice(1);
          }
        }
      });
    });
  },
  // Scroll to element
  scrollToElement: function scrollToElement() {
    var scrollToElement = document.querySelector('*[data-scroll-to]');

    if (scrollToElement) {
      scrollToElement.addEventListener('click', function (event) {
        // Figure out element to scroll to
        var target = event.target.dataset.scrollTo; // Make sure said element exists

        if (target) {
          event.preventDefault(); // Get options

          var additionalOffset = event.target.dataset.additionalOffset,
              scrollSpeed = event.target.dataset.scrollSpeed ? event.target.dataset.scrollSpeed : 500; // Determine offset

          var originalOffset = target.getBoundingClientRect().top + window.pageYOffset,
              scrollOffset = additionalOffset ? originalOffset + additionalOffset : originalOffset;
          Object(_helper__WEBPACK_IMPORTED_MODULE_1__["scrollTo"])(scrollOffset, null, scrollSpeed);
        }
      });
    }
  }
});

/***/ }),

/***/ "./assets/js/src/functions/toggles.js":
/*!********************************************!*\
  !*** ./assets/js/src/functions/toggles.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scroll_lock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll-lock */ "./assets/js/src/functions/scroll-lock.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ "./assets/js/src/functions/helper.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  init: function init() {
    // Do the toggle
    this.toggle(); // Check for toggle/untoggle on resize

    this.resizeCheck(); // Check for untoggle on escape key press

    this.untoggleOnEscapeKeyPress();
  },
  // Do the toggle
  toggle: function toggle() {
    document.querySelectorAll('*[data-toggle-target]').forEach(function (element) {
      element.addEventListener('click', function () {
        // Get our targets
        var toggle = element;
        var targetString = toggle.dataset.toggleTarget;
        var target;

        if (targetString === 'next') {
          target = toggle.nextSibling;
        } else {
          target = document.querySelector(targetString);
        } // Trigger events on the toggle targets before they are toggled


        if (target.classList.contains('active')) {
          target.dispatchEvent(new Event('toggle-target-before-active'));
        } else {
          target.dispatchEvent(new Event('toggle-target-before-inactive'));
        } // Get the class to toggle, if specified


        var classToToggle = toggle.dataset.classToToggle ? toggle.dataset.classToToggle : 'active'; // For cover modals, set a short timeout duration so the class animations have time to play out

        var timeOutTime = 0;

        if (target.classList.contains('cover-modal')) {
          timeOutTime = 10;
        }

        setTimeout(function () {
          // Toggle the target of the clicked toggle
          if (toggle.dataset.toggleType === 'slidetoggle') {
            var duration = toggle.dataset.toggleDuration ? toggle.dataset.toggleDuration : 250;
            Object(_helper__WEBPACK_IMPORTED_MODULE_1__["slideToggle"])(target, duration);
          } else {
            target.classList.toggle(classToToggle);
          } // If the toggle target is 'next', only give the clicked toggle the active class


          if (targetString === 'next') {
            toggle.classList.toggle('active'); // If not, toggle all toggles with this toggle target
          } else {
            document.querySelector("*[data-toggle-target=\"".concat(targetString, "\"]")).classList.toggle('active');
          } // Toggle aria-expanded on the target


          Object(_helper__WEBPACK_IMPORTED_MODULE_1__["twentytwentyToggleAttribute"])(target, 'aria-expanded', 'true', 'false'); // Toggle aria-pressed on the toggle

          Object(_helper__WEBPACK_IMPORTED_MODULE_1__["twentytwentyToggleAttribute"])(toggle, 'aria-pressed', 'true', 'false'); // Toggle body class

          if (toggle.dataset.toggleBodyClass) {
            document.querySelector('body').classList.toggle(toggle.dataset.toggleBodyClass);
          } // Check whether to lock the screen


          if (toggle.dataset.lockScreen) {
            _scroll_lock__WEBPACK_IMPORTED_MODULE_0__["default"].setTo(true);
          } else if (toggle.dataset.unlockScreen) {
            _scroll_lock__WEBPACK_IMPORTED_MODULE_0__["default"].setTo(false);
          } else if (toggle.dataset.toggleScreenLock) {
            _scroll_lock__WEBPACK_IMPORTED_MODULE_0__["default"].setTo();
          } // Check whether to set focus


          if (toggle.dataset.setFocus) {
            var focusElement = document.querySelector(toggle.dataset.setFocus);

            if (focusElement.length) {
              if (toggle.classList.contains('.active')) {
                focusElement.focus();
              } else {
                focusElement.blur();
              }
            }
          } // Trigger the toggled event on the toggle target


          target.dispatchEvent(new Event('toggled')); // Trigger events on the toggle targets after they are toggled

          if (target.classList.contains('active')) {
            target.dispatchEvent(new Event('toggle-target-after-active'));
          } else {
            target.dispatchEvent(new Event('toggle-target-after-inactive'));
          }
        }, timeOutTime);
        return false;
      });
    });
  },
  // Check for toggle/untoggle on screen resize
  resizeCheck: function resizeCheck() {
    if (document.querySelectorAll('*[data-untoggle-above], *[data-untoggle-below], *[data-toggle-above], *[data-toggle-below]').length) {
      window.addEventListener('resize', function () {
        var winWidth = window.innerWidth,
            toggles = document.querySelectorAll('.toggle');
        toggles.forEach(function (toggle) {
          var unToggleAbove = toggle.dataset.untoggleAbove,
              unToggleBelow = toggle.dataset.untoggleBelow,
              toggleAbove = toggle.dataset.toggleAbove,
              toggleBelow = toggle.dataset.toggleBelow; // If no width comparison is set, continue

          if (!unToggleAbove && !unToggleBelow && !toggleAbove && !toggleBelow) {
            return;
          } // If the toggle width comparison is true, toggle the toggle


          if ((unToggleAbove && winWidth > unToggleAbove || unToggleBelow && winWidth < unToggleBelow) && toggle.classList.contains('active') || (toggleAbove && winWidth > toggleAbove || toggleBelow && winWidth < toggleBelow) && !toggle.classList.contains('active')) {
            toggle.click();
          }
        });
      });
    }
  },
  // Close toggle on escape key press
  untoggleOnEscapeKeyPress: function untoggleOnEscapeKeyPress() {
    document.addEventListener('keyup', function (event) {
      if (event.key === 'Escape') {
        document.querySelectorAll('*[data-untoggle-on-escape].active').forEach(function (element) {
          if (element.classList.contains('active')) {
            element.click();
          }
        });
      }
    });
  }
});

/***/ }),

/***/ "./assets/js/src/index.js":
/*!********************************!*\
  !*** ./assets/js/src/index.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functions_interval_scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions/interval-scroll */ "./assets/js/src/functions/interval-scroll.js");
/* harmony import */ var _functions_resize_end__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions/resize-end */ "./assets/js/src/functions/resize-end.js");
/* harmony import */ var _functions_toggles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functions/toggles */ "./assets/js/src/functions/toggles.js");
/* harmony import */ var _functions_cover_modals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./functions/cover-modals */ "./assets/js/src/functions/cover-modals.js");
/* harmony import */ var _functions_instrinsic_ratio_videos__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./functions/instrinsic-ratio-videos */ "./assets/js/src/functions/instrinsic-ratio-videos.js");
/* harmony import */ var _functions_smooth_scroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./functions/smooth-scroll */ "./assets/js/src/functions/smooth-scroll.js");
/* harmony import */ var _functions_scroll_lock__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./functions/scroll-lock */ "./assets/js/src/functions/scroll-lock.js");
/* harmony import */ var _functions_main_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./functions/main-menu */ "./assets/js/src/functions/main-menu.js");
/* harmony import */ var _functions_focus_management__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./functions/focus-management */ "./assets/js/src/functions/focus-management.js");
/* harmony import */ var _functions_dynamic_screen_height__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./functions/dynamic-screen-height */ "./assets/js/src/functions/dynamic-screen-height.js");











_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  _functions_interval_scroll__WEBPACK_IMPORTED_MODULE_1__["default"].init();
  _functions_resize_end__WEBPACK_IMPORTED_MODULE_2__["default"].init();
  _functions_toggles__WEBPACK_IMPORTED_MODULE_3__["default"].init();
  _functions_cover_modals__WEBPACK_IMPORTED_MODULE_4__["default"].init();
  _functions_instrinsic_ratio_videos__WEBPACK_IMPORTED_MODULE_5__["default"].init();
  _functions_smooth_scroll__WEBPACK_IMPORTED_MODULE_6__["default"].init();
  _functions_scroll_lock__WEBPACK_IMPORTED_MODULE_7__["default"].init();
  _functions_main_menu__WEBPACK_IMPORTED_MODULE_8__["default"].init();
  _functions_focus_management__WEBPACK_IMPORTED_MODULE_9__["default"].init();
  _functions_dynamic_screen_height__WEBPACK_IMPORTED_MODULE_10__["default"].init();
});

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "@wordpress/dom-ready":
/*!*******************************************!*\
  !*** external {"this":["wp","domReady"]} ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["domReady"]; }());

/***/ })

/******/ });
//# sourceMappingURL=index.js.map