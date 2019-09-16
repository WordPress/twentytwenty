/*	-----------------------------------------------------------------------------------------------
	Namespace
--------------------------------------------------------------------------------------------------- */

var twentytwenty = twentytwenty || {}

/*	-----------------------------------------------------------------------------------------------
	Cover Modals
--------------------------------------------------------------------------------------------------- */

twentytwenty.coverModals = {

	init: function () {
		if (document.querySelector('.cover-modal')) {
			// Handle cover modals when they're toggled
			this.onToggle();

			// When toggled, untoggle if visitor clicks on the wrapping element of the modal
			this.outsideUntoggle();

			// Close on escape key press
			this.closeOnEscape();

			// Show a cover modal on load, if the query string says so
			this.showOnLoadandClick();

			// Hide and show modals before and after their animations have played out
			this.hideAndShowModals();
		}
	},

	// Handle cover modals when they're toggled
	onToggle: function () {
		document.querySelector('.cover-modal').addEventListener('toggled', function (event) {
			var modal = event.target,
				body = document.querySelector('body');

			if (modal.classList.contains('active')) {
				body.classList.add('showing-modal');
			} else {
				body.classList.remove('showing-modal');
				body.classList.add('hiding-modal');

				// Remove the hiding class after a delay, when animations have been run
				setTimeout(function () {
					body.classList.remove('hiding-modal');
				}, 500);
			}
		});
	},

	// Close modal on outside click
	outsideUntoggle: function () {
		document.addEventListener('click', function (event) {
			var target = event.target;
			var modal = document.querySelector('.cover-modal.active');

			if (target === modal) {
				this.untoggleModal(target);
			}
		}.bind(this));
	},

	// Close modal on escape key press
	closeOnEscape: function () {
		document.addEventListener('keydown', function (event) {
			if (event.keyCode === 27) {
				event.preventDefault();
				document.querySelectorAll('.cover-modal.active').forEach(function (element) {
					this.untoggleModal(element);
				}.bind(this));
			}
		}.bind(this));
	},

	// Show modals on load
	showOnLoadandClick: function () {
		var key = 'modal';

		// Load based on query string
		if (window.location.search.indexOf(key) !== -1) {
			var modalTargetString = twentytwentyGetQueryStringValue(key),
				modalTarget = document.querySelector('#' + modalTargetString + '-modal');

			if (modalTargetString && modalTarget.length) {
				setTimeout(function () {
					modalTarget.classList.add('active').triggerHandler('toggled');
					this.scrollLock = true;
				}.bind(this), 250);
			}
		}

		// Check for modal matching querystring when clicking a link
		// Format: www.url.com?modal=modal-id
		document.querySelectorAll('a').forEach(function (link) {
			link.addEventListener('click', function (event) {
				// Load based on query string
				if (event.target.href && event.target.href.indexOf(key) !== -1) {
					var modalTargetString = twentytwentyGetQueryStringValue(key, event.target.attr('href')),
						modalTarget = document.querySelector('#' + modalTargetString);

					if (modalTargetString && modalTarget.length) {
						modalTarget.classList.add('active').triggerHandler('toggled');
						this.scrollLock = true;

						return false;
					}
				}
			}.bind(this));
		});
	},

	// Hide and show modals before and after their animations have played out
	hideAndShowModals: function () {
		var modals = document.querySelectorAll('.cover-modal');

		// Show the modal
		modals.forEach(function (modal) {
			modal.addEventListener('toggle-target-before-inactive', function (event) {
				if (event.target !== modal) {
					return;
				}

				modal.classList.add('show-modal');
			});

			// Hide the modal after a delay, so animations have time to play out
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
	untoggleModal: function (modal) {
		var modalToggle = false;

		// If the modal has specified the string (ID or class) used by toggles to target it, untoggle the toggles with that target string
		// The modal-target-string must match the string toggles use to target the modal
		if (modal.dataset.modalTargetString) {
			var modalTargetClass = modal.dataset.modalTargetString;
			modalToggle = document.querySelector('*[data-toggle-target="' + modalTargetClass + '"]');
		}

		// If a modal toggle exists, trigger it so all of the toggle options are included
		if (modalToggle) {
			modalToggle.click();

			// If one doesn't exist, just hide the modal
		} else {
			modal.classList.remove('active');
		}
	},

}; // twentytwenty.coverModals

/*	-----------------------------------------------------------------------------------------------
	Focus Management
--------------------------------------------------------------------------------------------------- */

twentytwenty.focusManagement = {

	init: function () {
		// If the visitor tabs out of the main menu, return focus to the navigation toggle
		// Also, if the visitor tabs into a hidden element, move the focus to the element after the hidden element
		this.focusLoop();
	},

	focusLoop: function () {
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
	},

}; // twentytwenty.focusManagement

/*	-----------------------------------------------------------------------------------------------
	Intrinsic Ratio Embeds
--------------------------------------------------------------------------------------------------- */

twentytwenty.intrinsicRatioVideos = {

	init: function () {
		this.makeFit();

		window.addEventListener('fit-videos', function () {
			this.makeFit();
		}.bind(this));

		window.addEventListener('resize', function () {
			this.makeFit();
		}.bind(this));
	},

	makeFit: function () {
		document.querySelectorAll('iframe, object, video').forEach(function (video) {
			var container = video.parentNode;

			// Skip videos we want to ignore
			if (video.classList.contains('intrinsic-ignore') || video.parentNode.classList.contains('intrinsic-ignore')) {
				return true;
			}

			if (!video.dataset.origwidth) {
				// Get the video element proportions
				video.setAttribute('data-origwidth', video.width);
				video.setAttribute('data-origheight', video.height);
			}

			var iTargetWidth = container.offsetWidth;

			// Get ratio from proportions
			var ratio = iTargetWidth / video.dataset.origwidth;

			// Scale based on ratio, thus retaining proportions
			video.style.width = iTargetWidth + 'px';
			video.style.height = video.dataset.origheight * ratio + 'px';
		});
	},

}; // twentytwenty.instrinsicRatioVideos

/*	-----------------------------------------------------------------------------------------------
	Smooth Scroll
--------------------------------------------------------------------------------------------------- */

twentytwenty.smoothScroll = {

	init: function () {
		// Scroll to anchor
		this.scrollToAnchor();

		// Scroll to element
		this.scrollToElement();
	},

	// Scroll to anchor
	scrollToAnchor: function () {
		var anchorElements = document.querySelectorAll('a[href*="#"]');
		var anchorElementsList = Array.prototype.slice.call(anchorElements);
		anchorElementsList.filter(function (element) {
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
					target = target ? target : event.target.hash !== '' && document.querySelector(event.target.hash);

					// Does a scroll target exist?
					if (target) {
						// Only prevent default if animation is actually gonna happen
						event.preventDefault();

						// Get options
						var additionalOffset = event.target.dataset.additionalOffset;
						var scrollSpeed = event.target.dataset.scrollSpeed ? event.target.dataset.scrollSpeed : 500;

						// Determine offset

						var adminBar = document.querySelector('#wpadminbar');

						var originalOffset = target.getBoundingClientRect().top + window.pageYOffset;
						var scrollOffset = additionalOffset ? originalOffset + additionalOffset : originalOffset;
						if (adminBar && event.target.className === 'to-the-top') {
							scrollOffset = scrollOffset - adminBar.getBoundingClientRect().height;
						}

						twentytwentyScrollTo(scrollOffset, null, scrollSpeed);

						window.location.hash = event.target.hash.slice(1);
					}
				}
			});
		});
	},

	// Scroll to element
	scrollToElement: function () {
		var scrollToElement = document.querySelector('*[data-scroll-to]');

		if (scrollToElement) {
			scrollToElement.addEventListener('click', function (event) {
				// Figure out element to scroll to
				var target = event.target.dataset.twentytwentyScrollTo;

				// Make sure said element exists
				if (target) {
					event.preventDefault();

					// Get options
					var additionalOffset = event.target.dataset.additionalOffset,
						scrollSpeed = event.target.dataset.scrollSpeed ? event.target.dataset.scrollSpeed : 500;

					// Determine offset
					var originalOffset = target.getBoundingClientRect().top + window.pageYOffset,
						scrollOffset = additionalOffset ? originalOffset + additionalOffset : originalOffset;

					twentytwentyScrollTo(scrollOffset, null, scrollSpeed);
				}
			});
		}
	},

}; // twentytwenty.smoothScroll

/*	-----------------------------------------------------------------------------------------------
	Main Menu
--------------------------------------------------------------------------------------------------- */
twentytwenty.modalMenu = {

	init: function () {
		// If the current menu item is in a sub level, expand all the levels higher up on load
		this.expandLevel();
	},

	expandLevel: function () {
		var modalMenu = document.querySelector('.modal-menu');
		var activeMenuItem = modalMenu.querySelector('.current-menu-item');

		if (activeMenuItem) {
			twentytwentyFindParents(activeMenuItem, 'li').forEach(function (element) {
				var subMenuToggle = element.querySelector('.sub-menu-toggle');
				if (subMenuToggle) {
					subMenuToggle.click();
				}
			});
		}
	},
}; // twentytwenty.modalMenu

/*	-----------------------------------------------------------------------------------------------
	Scroll Lock
--------------------------------------------------------------------------------------------------- */

twentytwenty.scrollLock = {

	init: function () {
		// Init variables
		twentytwenty.scrollLocked = false;
		twentytwenty.prevScroll = {
			scrollX: window.scrollX,
			scrollY: window.scrollY,
		};
		twentytwenty.prevlockStyles = {};
		twentytwenty.lockStyles = {
			overflowY: 'scroll',
			position: 'fixed',
			width: '100%',
		};

		// Instantiate cache in case someone tries to unlock before locking
		this.saveStyles();
	},

	// Save context's inline styles in cache
	saveStyles: function () {

		var htmlStyles = document.querySelector('html').style

		var htmlStylesObject = {};

		for (var attribute in htmlStyles) {
			htmlStylesObject[attribute] = htmlStyles[attribute];
		}

		twentytwenty.prevlockStyles = htmlStylesObject;
	},

	// Lock the scroll (do not call this directly)
	lock: function () {
		var appliedLock = {};

		if (twentytwenty.scrollLocked) {
			return;
		}

		// Save scroll state and styles
		twentytwenty.prevScroll = {
			scrollX: window.scrollX,
			scrollY: window.scrollY,
		};

		this.saveStyles();

		// Compose our applied CSS, with scroll state as styles
		Object.assign(appliedLock, twentytwenty.lockStyles, {
			left: -window.scrollX + 'px',
			top: -window.scrollY + 'px',
		}
		);

		// Then lock styles and state
		var html = document.querySelector('html');

		Object.keys(appliedLock).forEach(function (style) {
			html.style[style] = appliedLock[style];
		});

		window.scrollX = 0;
		window.scrollY = 0;

		twentytwenty.scrollLocked = true;
	},

	// Unlock the scroll (do not call this directly)
	unlock: function () {
		if (!twentytwenty.scrollLocked) {
			return;
		}

		var html = document.querySelector('html');
		// Revert styles and state
		Object.keys(twentytwenty.prevlockStyles).forEach(function (style) {
			html.style[style] = twentytwenty.prevlockStyles[style];
		});

		window.screenX = twentytwenty.prevScroll.scrollX;
		window.scrollY = twentytwenty.prevScroll.scrollY;

		twentytwenty.scrollLocked = false;
	},

	// Call this to lock or unlock the scroll
	setTo: function (on) {
		// If an argument is passed, lock or unlock accordingly
		if (arguments.length) {
			if (on) {
				this.lock();
			} else {
				this.unlock();
			}
			// If not, toggle to the inverse state
		} else if (twentytwenty.scrollLocked) {
			this.unlock();
		} else {
			this.lock();
		}
	},

}; // twentytwenty.scrollLock

/*	-----------------------------------------------------------------------------------------------
	Toggles
--------------------------------------------------------------------------------------------------- */

twentytwenty.toggles = {

	init: function () {
		// Do the toggle
		this.toggle();

		// Check for toggle/untoggle on resize
		this.resizeCheck();

		// Check for untoggle on escape key press
		this.untoggleOnEscapeKeyPress();
	},

	// Do the toggle
	toggle: function () {
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
				}

				// Trigger events on the toggle targets before they are toggled
				if (target.classList.contains('active')) {
					target.dispatchEvent(new Event('toggle-target-before-active'));
				} else {
					target.dispatchEvent(new Event('toggle-target-before-inactive'));
				}

				// Get the class to toggle, if specified
				var classToToggle = toggle.dataset.classToToggle ? toggle.dataset.classToToggle : 'active';

				// For cover modals, set a short timeout duration so the class animations have time to play out
				var timeOutTime = 0;

				if (target.classList.contains('cover-modal')) {
					timeOutTime = 10;
				}

				setTimeout(function () {
					// Toggle the target of the clicked toggle
					if (toggle.dataset.toggleType === 'slidetoggle') {
						var duration = toggle.dataset.toggleDuration ? toggle.dataset.toggleDuration : 250;
						twentytwentySlideToggle(target, duration);
					} else {
						target.classList.toggle(classToToggle);
					}

					// If the toggle target is 'next', only give the clicked toggle the active class
					if (targetString === 'next') {
						toggle.classList.toggle('active');

						// If not, toggle all toggles with this toggle target
					} else {
						document.querySelector('*[data-toggle-target="' + targetString + '"]').classList.toggle('active');
					}

					// Toggle aria-expanded on the target
					twentytwentyToggleAttribute(target, 'aria-expanded', 'true', 'false');

					// Toggle aria-expanded on the toggle
					twentytwentyToggleAttribute(toggle, 'aria-expanded', 'true', 'false');

					// Toggle body class
					if (toggle.dataset.toggleBodyClass) {
						document.querySelector('body').classList.toggle(toggle.dataset.toggleBodyClass);
					}

					// Check whether to lock the screen
					if (toggle.dataset.lockScreen) {
						twentytwenty.scrollLock.setTo(true);
					} else if (toggle.dataset.unlockScreen) {
						twentytwenty.scrollLock.setTo(false);
					} else if (toggle.dataset.toggleScreenLock) {
						twentytwenty.scrollLock.setTo();
					}

					// Check whether to set focus
					if (toggle.dataset.setFocus) {
						var focusElement = document.querySelector(toggle.dataset.setFocus);
						if (focusElement.length) {
							if (toggle.classList.contains('.active')) {
								focusElement.focus();
							} else {
								focusElement.blur();
							}
						}
					}

					// Trigger the toggled event on the toggle target
					target.dispatchEvent(new Event('toggled'));

					// Trigger events on the toggle targets after they are toggled
					if (target.classList.contains('active')) {
						target.dispatchEvent(new Event('toggle-target-after-active'));
					} else {
						target.dispatchEvent(new Event('toggle-target-after-inactive'));
					}
				}, timeOutTime);

			});
		});
	},

	// Check for toggle/untoggle on screen resize
	resizeCheck: function () {
		if (document.querySelectorAll('*[data-untoggle-above], *[data-untoggle-below], *[data-toggle-above], *[data-toggle-below]').length) {
			window.addEventListener('resize', function () {
				var winWidth = window.innerWidth,
					toggles = document.querySelectorAll('.toggle');

				toggles.forEach(function (toggle) {
					var unToggleAbove = toggle.dataset.untoggleAbove,
						unToggleBelow = toggle.dataset.untoggleBelow,
						toggleAbove = toggle.dataset.toggleAbove,
						toggleBelow = toggle.dataset.toggleBelow;

					// If no width comparison is set, continue
					if (!unToggleAbove && !unToggleBelow && !toggleAbove && !toggleBelow) {
						return;
					}

					// If the toggle width comparison is true, toggle the toggle
					if (
						(((unToggleAbove && winWidth > unToggleAbove) ||
							(unToggleBelow && winWidth < unToggleBelow)) &&
							toggle.classList.contains('active')) ||
						(((toggleAbove && winWidth > toggleAbove) ||
							(toggleBelow && winWidth < toggleBelow)) &&
							!toggle.classList.contains('active'))
					) {
						toggle.click();
					}
				});
			});
		}
	},

	// Close toggle on escape key press
	untoggleOnEscapeKeyPress: function () {
		document.addEventListener('keyup', function (event) {
			if (event.key === 'Escape') {
				document.querySelectorAll('*[data-untoggle-on-escape].active').forEach(function (element) {
					if (element.classList.contains('active')) {
						element.click();
					}
				});
			}
		});
	},

}; // twentytwenty.toggles

window.wp.domReady(function () {
	twentytwenty.toggles.init();				// Handle toggles
	twentytwenty.coverModals.init();			// Handle cover modals
	twentytwenty.intrinsicRatioVideos.init();	// Retain aspect ratio of videos on window resize
	twentytwenty.smoothScroll.init();			// Smooth scroll to anchor link or a specific element
	twentytwenty.scrollLock.init();				// Scroll Lock
	twentytwenty.modalMenu.init();				// Modal Menu
	twentytwenty.focusManagement.init();		// Focus Management
});



/*	-----------------------------------------------------------------------------------------------
	Helper functions
--------------------------------------------------------------------------------------------------- */

/* Toggle an attribute ----------------------- */

function twentytwentyToggleAttribute(element, attribute, trueVal, falseVal) {
	if (trueVal === undefined) {
		trueVal = true;
	}
	if (falseVal === undefined) {
		falseVal = false;
	}
	if (element[attribute] !== trueVal) {
		element.setAttribute(attribute, trueVal);
	} else {
		element.setAttribute(attribute, falseVal);
	}
}

function twentytwentyGetQueryStringValue() {
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

/**
 * twentytwentySlideUp
 *
 * this implementation is coming from https://w3bits.com/javascript-slidetoggle/
 *
 * @param {HTMLElement} target
 * @param {number} duration
 */
function twentytwentySlideUp(target, duration) {
	target.style.transitionProperty = 'height, margin, padding'; /* [1.1] */
	target.style.transitionDuration = duration + 'ms'; /* [1.2] */
	target.style.boxSizing = 'border-box'; /* [2] */
	target.style.height = target.offsetHeight + 'px'; /* [3] */
	target.style.height = 0; /* [4] */
	target.style.paddingTop = 0; /* [5.1] */
	target.style.paddingBottom = 0; /* [5.2] */
	target.style.marginTop = 0; /* [6.1] */
	target.style.marginBottom = 0; /* [7.2] */
	target.style.overflow = 'hidden'; /* [7] */
	window.setTimeout(function () {
		target.style.display = 'none'; /* [8] */
		target.style.removeProperty('height'); /* [9] */
		target.style.removeProperty('padding-top'); /* [10.1] */
		target.style.removeProperty('padding-bottom'); /* [10.2] */
		target.style.removeProperty('margin-top'); /* [11.1] */
		target.style.removeProperty('margin-bottom'); /* [11.2] */
		target.style.removeProperty('overflow'); /* [12] */
		target.style.removeProperty('transition-duration'); /* [13.1] */
		target.style.removeProperty('transition-property'); /* [13.2] */
	}, duration);
};

/**
 * twentytwentySlideDown
 *
 * this implementation is coming from https://w3bits.com/javascript-slidetoggle/
 *
 * @param {HTMLElement} target
 * @param {number} duration
 */
function twentytwentySlideDown(target, duration) {
	target.style.removeProperty('display'); /* [1] */
	var display = window.getComputedStyle(target).display;
	if (display === 'none') { /* [2] */
		display = 'block';
	}
	target.style.display = display;

	var height = target.offsetHeight; /* [3] */
	target.style.height = 0; /* [4] */
	target.style.paddingTop = 0; /* [5.1] */
	target.style.paddingBottom = 0; /* [5.2] */
	target.style.marginTop = 0; /* [6.1] */
	target.style.marginBottom = 0; /* [6.2] */
	target.style.overflow = 'hidden'; /* [7] */

	target.style.boxSizing = 'border-box'; /* [8] */
	target.style.transitionProperty = 'height, margin, padding'; /* [9.1] */
	target.style.transitionDuration = duration + 'ms'; /* [9.2] */
	target.style.height = height + 'px'; /* [10] */
	target.style.removeProperty('padding-top'); /* [11.1] */
	target.style.removeProperty('padding-bottom'); /* [11.2] */
	target.style.removeProperty('margin-top'); /* [12.1] */
	target.style.removeProperty('margin-bottom'); /* [12.2] */

	window.setTimeout(function () {
		target.style.removeProperty('height'); /* [13] */
		target.style.removeProperty('overflow'); /* [14] */
		target.style.removeProperty('transition-duration'); /* [15.1] */
		target.style.removeProperty('transition-property'); /* [15.2] */
	}, duration);
};

/**
 * twentytwentySlideToggle
 *
 * this implementation is coming from https://w3bits.com/javascript-slidetoggle/
 *
 * @param {HTMLElement} target
 * @param {number} duration
 */
function twentytwentySlideToggle(target, duration) {

	if (duration === undefined) {
		duration = 500;
	}

	if (window.getComputedStyle(target).display === 'none') {
		return twentytwentySlideDown(target, duration);
	}
	return twentytwentySlideUp(target, duration);
};

/**
 * traverses the DOM up to find elements matching the query
 *
 * @param {HTMLElement} target
 * @param {string} query
 * @return {NodeList} parents matching query
 */
function twentytwentyFindParents(target, query) {
	var parents = [];

	// recursively go up the DOM adding matches to the parents array
	function traverse(item) {
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
};

// twentytwentyEasing functions http://goo.gl/5HLl8
var twentytwentyEasing = {

	easeInOutQuad: function (t, b, c, d) {
		t /= d / 2;
		if (t < 1) {
			return c / 2 * t * t + b;
		}
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	}
};

function twentytwentyScrollTo(to, callback, duration) {
	function move(amount) {
		document.documentElement.scrollTop = amount;
		document.body.parentNode.scrollTop = amount;
		document.body.scrollTop = amount;
	};



	var start = document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
	var change = to - start;
	var increment = 20;
	var currentTime = 0;

	duration = (typeof (duration) === 'undefined') ? 500 : duration;

	function animateScroll() {
		// increment the time
		currentTime += increment;
		// find the value with the quadratic in-out twentytwentyEasing function
		var val = twentytwentyEasing.easeInOutQuad(currentTime, start, change, duration);
		// move the document.body
		move(val);
		// do the animation unless its over
		if (currentTime < duration) {
			window.requestAnimationFrame(animateScroll);
		} else if (callback && typeof (callback) === 'function') {
			// the animation is done so lets callback
			callback();
		}
	};
	animateScroll();
};
