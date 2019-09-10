/*	-----------------------------------------------------------------------------------------------
	Namespace
--------------------------------------------------------------------------------------------------- */

var twentytwenty = twentytwenty || {},
    $ = jQuery;


/*	-----------------------------------------------------------------------------------------------
	Global variables
--------------------------------------------------------------------------------------------------- */

var $doc = $( document ),
    $win = $( window ),
    twentytwentyWinHeight = $win.height(),
    twentytwentyWinWidth = $win.width();


/*	-----------------------------------------------------------------------------------------------
	Helper functions
--------------------------------------------------------------------------------------------------- */

/* Toggle an attribute ----------------------- */

function twentytwentyToggleAttribute( $element, attribute, trueVal, falseVal ) {

	if ( typeof trueVal === 'undefined' ) { trueVal = true; }
	if ( typeof falseVal === 'undefined' ) { falseVal = false; }

	if ( $element.attr( attribute ) !== trueVal ) {
		$element.attr( attribute, trueVal );
	} else {
		$element.attr( attribute, falseVal );
	}
}


/*	-----------------------------------------------------------------------------------------------
	Interval Scroll
--------------------------------------------------------------------------------------------------- */

twentytwenty.intervalScroll = {

	init: function() {

		didScroll = false;

		// Check for the scroll event
		$win.on( 'scroll load', function() {
			didScroll = true;
		} );

		// Once every 250ms, check if we have scrolled, and if we have, do the intensive stuff
		setInterval( function() {
			if ( didScroll ) {
				didScroll = false;

				// When this triggers, we know that we have scrolled
				$win.triggerHandler( 'did-interval-scroll' );

			}

		}, 250 );

	},

} // twentytwenty.intervalScroll


/*	-----------------------------------------------------------------------------------------------
	Resize End Event
--------------------------------------------------------------------------------------------------- */

twentytwenty.resizeEnd = {

	init: function() {

		var resizeTimer;

		$win.on( 'resize', function(e) {

			clearTimeout( resizeTimer );
			
			resizeTimer = setTimeout( function() {

				// Trigger this at the end of screen resizing
				$win.triggerHandler( 'resize-end' );
						
			}, 250 );

		} );

	},

} // twentytwenty.resizeEnd


/*	-----------------------------------------------------------------------------------------------
	Toggles
--------------------------------------------------------------------------------------------------- */

twentytwenty.toggles = {

	init: function() {

		// Do the toggle
		twentytwenty.toggles.toggle();

		// Check for toggle/untoggle on resize
		twentytwenty.toggles.resizeCheck();

		// Check for untoggle on escape key press
		twentytwenty.toggles.untoggleOnEscapeKeyPress();

	},

	// Do the toggle
	toggle: function() {

		$( '*[data-toggle-target]' ).live( 'click', function( e ) {

			// Get our targets
			var $toggle = $( this ),
				targetString = $( this ).data( 'toggle-target' );

			if ( targetString == 'next' ) {
				var $target = $toggle.next();
			} else {
				var $target = $( targetString );
			}

			// Trigger events on the toggle targets before they are toggled
			if ( $target.is( '.active' ) ) {
				$target.trigger( 'toggle-target-before-active' );
			} else {
				$target.trigger( 'toggle-target-before-inactive' );
			}

			// Get the class to toggle, if specified
			var classToToggle = $toggle.data( 'class-to-toggle' ) ? $toggle.data( 'class-to-toggle' ) : 'active';

			// For cover modals, set a short timeout duration so the class animations have time to play out
			var timeOutTime = 0;

			if ( $target.hasClass( 'cover-modal' ) ) {
				var timeOutTime = 10;
			}

			setTimeout( function() {

				// Toggle the target of the clicked toggle
				if ( $toggle.data( 'toggle-type' ) == 'slidetoggle' ) {
					var duration = $toggle.data( 'toggle-duration' ) ? $toggle.data( 'toggle-duration' ) : 250;
					$target.slideToggle( duration );
				} else {
					$target.toggleClass( classToToggle );
				}

				// If the toggle target is 'next', only give the clicked toggle the active class
				if ( targetString == 'next' ) {
					$toggle.toggleClass( 'active' )

				// If not, toggle all toggles with this toggle target
				} else {
					$( '*[data-toggle-target="' + targetString + '"]' ).toggleClass( 'active' );
				}

				// Toggle aria-expanded on the toggle
				twentytwentyToggleAttribute( $toggle, 'aria-expanded', 'true', 'false' );

				// Toggle body class
				if ( $toggle.data( 'toggle-body-class' ) ) {
					$( 'body' ).toggleClass( $toggle.data( 'toggle-body-class' ) );
				}

				// Check whether to lock the screen
				if ( $toggle.data( 'lock-screen' ) ) {
					twentytwenty.scrollLock.setTo( true );
				} else if ( $toggle.data( 'unlock-screen' ) ) {
					twentytwenty.scrollLock.setTo( false );
				} else if ( $toggle.data( 'toggle-screen-lock' ) ) {
					twentytwenty.scrollLock.setTo();
				}

				// Check whether to set focus
				if ( $toggle.data( 'set-focus' ) ) {
					var $focusElement = $( $toggle.data( 'set-focus' ) );
					if ( $focusElement.length ) {
						if ( $toggle.is( '.active' ) ) {
							$focusElement.focus();
						} else {
							$focusElement.blur();
						}
					}
				}

				// Trigger the toggled event on the toggle target
				$target.triggerHandler( 'toggled' );

				// Trigger events on the toggle targets after they are toggled
				if ( $target.is( '.active' ) ) {
					$target.trigger( 'toggle-target-after-active' );
				} else {
					$target.trigger( 'toggle-target-after-inactive' );
				}

			}, timeOutTime );

		} );
	},

	// Check for toggle/untoggle on screen resize
	resizeCheck: function() {

		if ( $( '*[data-untoggle-above], *[data-untoggle-below], *[data-toggle-above], *[data-toggle-below]' ).length ) {

			$win.on( 'resize', function() {

				var winWidth = $win.width(),
					$toggles = $( '.toggle' );

				$toggles.each( function() {

					$toggle = $( this );

					var unToggleAbove = $toggle.data( 'untoggle-above' ),
						unToggleBelow = $toggle.data( 'untoggle-below' ),
						toggleAbove = $toggle.data( 'toggle-above' ),
						toggleBelow = $toggle.data( 'toggle-below' );

					// If no width comparison is set, continue
					if ( ! unToggleAbove && ! unToggleBelow && ! toggleAbove && ! toggleBelow ) {
						return;
					}

					// If the toggle width comparison is true, toggle the toggle
					if ( 
						( ( ( unToggleAbove && winWidth > unToggleAbove ) ||
						( unToggleBelow && winWidth < unToggleBelow ) ) &&
						$toggle.hasClass( 'active' ) )
						||
						( ( ( toggleAbove && winWidth > toggleAbove ) ||
						( toggleBelow && winWidth < toggleBelow ) ) &&
						! $toggle.hasClass( 'active' ) )
					) {
						$toggle.trigger( 'click' );
					}

				} );

			} );

		}

	},

	// Close toggle on escape key press
	untoggleOnEscapeKeyPress: function() {

		$doc.keyup( function( e ) {
			if ( e.key === "Escape" ) {

				$( '*[data-untoggle-on-escape].active' ).each( function() {
					if ( $( this ).hasClass( 'active' ) ) {
						$( this ).trigger( 'click' );
					}
				} );
					
			}
		} );

	},

} // twentytwenty.toggles


/*	-----------------------------------------------------------------------------------------------
	Cover Modals
--------------------------------------------------------------------------------------------------- */

twentytwenty.coverModals = {

	init: function () {

		if ( $( '.cover-modal' ).length ) {

			// Handle cover modals when they're toggled
			twentytwenty.coverModals.onToggle();

			// When toggled, untoggle if visitor clicks on the wrapping element of the modal
			twentytwenty.coverModals.outsideUntoggle();

			// Close on escape key press
			twentytwenty.coverModals.closeOnEscape();

			// Show a cover modal on load, if the query string says so
			twentytwenty.coverModals.showOnLoadandClick();

			// Hide and show modals before and after their animations have played out
			twentytwenty.coverModals.hideAndShowModals();

		}

	},

	// Handle cover modals when they're toggled
	onToggle: function() {

		$( '.cover-modal' ).on( 'toggled', function() {

			var $modal = $( this ),
				$body = $( 'body' );

			if ( $modal.hasClass( 'active' ) ) {
				$body.addClass( 'showing-modal' );
			} else {
				$body.removeClass( 'showing-modal' ).addClass( 'hiding-modal' );

				// Remove the hiding class after a delay, when animations have been run
				setTimeout ( function() {
					$body.removeClass( 'hiding-modal' );
				}, 500 );
			}
		} );

	},

	// Close modal on outside click
	outsideUntoggle: function() {

		$doc.live( 'click', function( e ) {

			var $target = $( e.target ),
				modal = '.cover-modal.active';

			if ( $target.is( modal ) ) {

				twentytwenty.coverModals.untoggleModal( $target );

			}

		} );

	},

	// Close modal on escape key press
	closeOnEscape: function() {

		$doc.keyup( function( e ) {
			if ( e.key === "Escape" ) {
				$( '.cover-modal.active' ).each( function() {
					twentytwenty.coverModals.untoggleModal( $( this ) );
				} );
			}
		} );

	},

	// Show modals on load
	showOnLoadandClick: function() {

		var key = 'modal';

		// Load based on query string
		if ( window.location.search.indexOf( key ) !== -1 ) {
				
			var modalTargetString = getQueryStringValue( key ),
				$modalTarget = $( '#' + modalTargetString + '-modal' );

			if ( modalTargetString && $modalTarget.length ) {
				setTimeout( function() {
					$modalTarget.addClass( 'active' ).triggerHandler( 'toggled' );
					twentytwenty.scrollLock.setTo( true );
				}, 250 );
			}
		}

		// Check for modal matching querystring when clicking a link
		// Format: www.url.com?modal=modal-id
		$( 'a' ).live( 'click', function() {

			// Load based on query string
			if ( $( this ).attr( 'href' ).indexOf( key ) !== -1 ) {
					
				var modalTargetString = getQueryStringValue( key, $( this ).attr( 'href' ) ),
					$modalTarget = $( '#' + modalTargetString );

				if ( modalTargetString && $modalTarget.length ) {
					
					$modalTarget.addClass( 'active' ).triggerHandler( 'toggled' );
					twentytwenty.scrollLock.setTo( true );

					return false;

				}
			}

		} );

	},

	// Hide and show modals before and after their animations have played out
	hideAndShowModals: function() {

		var $modals = $( '.cover-modal' );

		// Show the modal
		$modals.on( 'toggle-target-before-inactive', function( e ) {
			if ( e.target != this ) return;
			
			$( this ).addClass( 'show-modal' );
		} );

		// Hide the modal after a delay, so animations have time to play out
		$modals.on( 'toggle-target-after-inactive', function( e ) {
			if ( e.target != this ) return;

			var $modal = $( this );
			setTimeout( function() {
				$modal.removeClass( 'show-modal' );
			}, 500 );
		} );

	},

	// Untoggle a modal
	untoggleModal: function( $modal ) {

		$modalToggle = false;

		// If the modal has specified the string (ID or class) used by toggles to target it, untoggle the toggles with that target string
		// The modal-target-string must match the string toggles use to target the modal
		if ( $modal.data( 'modal-target-string' ) ) {
			var modalTargetClass = $modal.data( 'modal-target-string' ),
				$modalToggle = $( '*[data-toggle-target="' + modalTargetClass + '"]' ).first();
		}

		// If a modal toggle exists, trigger it so all of the toggle options are included
		if ( $modalToggle && $modalToggle.length ) {
			$modalToggle.trigger( 'click' );

		// If one doesn't exist, just hide the modal
		} else {
			$modal.removeClass( 'active' );
		}

	}

} // twentytwenty.coverModals


/*	-----------------------------------------------------------------------------------------------
	Smooth Scroll
--------------------------------------------------------------------------------------------------- */

twentytwenty.smoothScroll = {

	init: function() {

		// Scroll to anchor
		twentytwenty.smoothScroll.scrollToAnchor();

		// Scroll to element
		twentytwenty.smoothScroll.scrollToElement();

	},

	// Scroll to anchor
	scrollToAnchor: function() {
		
		$( 'a[href*="#"]' )
		// Remove links that don't actually link to anything
		.not( '[href="#"]' )
		.not( '[href="#0"]' )
		.not( '.do-not-scroll' )
		.not( '.skip-link' )
		.on( 'click', function( event ) {
			// On-page links
			if ( location.pathname.replace(/^\//, '' ) == this.pathname.replace(/^\//, '' ) && location.hostname == this.hostname ) {
				// Figure out element to scroll to
				var $target = $( this.hash );
				$target = $target.length ? $target : $( '[name=' + this.hash.slice(1) + ']' );
				// Does a scroll target exist?
				if ( $target.length ) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();

					// Get options
					var additionalOffset = $( this ).data( 'additional-offset' ),
						scrollSpeed      = $( this ).data( 'scroll-speed' ) ? $( this ).data( 'scroll-speed' ) : 500;

					// Determine offset
					var originalOffset = $target.offset().top,
						scrollOffset   = additionalOffset ? originalOffset + additionalOffset : originalOffset;

					$( 'html, body' ).animate({
						scrollTop: scrollOffset,
					}, scrollSpeed );
				}
			}
		} );

	},

	// Scroll to element
	scrollToElement: function() {
		
		$( '*[data-scroll-to]' ).on( 'click', function( event ) {

			// Figure out element to scroll to
			var $target = $( $( this ).data( 'scroll-to' ) );

			// Make sure said element exists
			if ( $target.length ) {

				event.preventDefault();

				// Get options
				var additionalOffset 	= $( this ).data( 'additional-offset' ),
					scrollSpeed 		= $( this ).data( 'scroll-speed' ) ? $( this ).data( 'scroll-speed' ) : 500;

				// Determine offset
				var originalOffset = $target.offset().top,
					scrollOffset = additionalOffset ? originalOffset + additionalOffset : originalOffset;

				$( 'html, body' ).animate( {
					scrollTop: scrollOffset,
				}, scrollSpeed );

			}
			
		} );

	}

} // twentytwenty.smoothScroll


/*	-----------------------------------------------------------------------------------------------
	Intrinsic Ratio Embeds
--------------------------------------------------------------------------------------------------- */

twentytwenty.instrinsicRatioVideos = {

	init: function() {

		twentytwenty.instrinsicRatioVideos.makeFit();

		$win.on( 'resize fit-videos', function() {

			twentytwenty.instrinsicRatioVideos.makeFit();

		} );

	},

	makeFit: function() {

		var vidSelector = "iframe, object, video";

		$( vidSelector ).each( function() {

			var $video = $( this ),
				$container = $video.parent(),
				iTargetWidth = $container.width();

			// Skip videos we want to ignore
			if ( $video.hasClass( 'intrinsic-ignore' ) || $video.parent().hasClass( 'intrinsic-ignore' ) ) {
				return true;
			}

			if ( ! $video.attr( 'data-origwidth' ) ) {

				// Get the video element proportions
				$video.attr( 'data-origwidth', $video.attr( 'width' ) );
				$video.attr( 'data-origheight', $video.attr( 'height' ) );

			}

			// Get ratio from proportions
			var ratio = iTargetWidth / $video.attr( 'data-origwidth' );

			// Scale based on ratio, thus retaining proportions
			$video.css( 'width', iTargetWidth + 'px' );
			$video.css( 'height', ( $video.attr( 'data-origheight' ) * ratio ) + 'px' );

		} );

	}

} // twentytwenty.instrinsicRatioVideos


/*	-----------------------------------------------------------------------------------------------
	Scroll Lock
--------------------------------------------------------------------------------------------------- */

twentytwenty.scrollLock = {

	init: function() {

		// Init variables
		window.scrollLocked = false,
		window.prevScroll = {
			scrollLeft : $win.scrollLeft(),
			scrollTop  : $win.scrollTop()
		},
		window.prevLockStyles = {},
		window.lockStyles = {
			'overflow-y' : 'scroll',
			'position'   : 'fixed',
			'width'      : '100%'
		};

		// Instantiate cache in case someone tries to unlock before locking
		twentytwenty.scrollLock.saveStyles();

	},

	// Save context's inline styles in cache
	saveStyles: function() {

		var styleAttr = $( 'html' ).attr( 'style' ),
			styleStrs = [],
			styleHash = {};

		if ( ! styleAttr ) {
			return;
		}

		styleStrs = styleAttr.split( /;\s/ );

		$.each( styleStrs, function serializeStyleProp( styleString ) {
			if ( ! styleString ) {
				return;
			}

			var keyValue = styleString.split( /\s:\s/ );

			if ( keyValue.length < 2 ) {
				return;
			}

			styleHash[ keyValue[ 0 ] ] = keyValue[ 1 ];
		} );

		$.extend( prevLockStyles, styleHash );
	},

	// Lock the scroll (do not call this directly)
	lock: function() {

		var appliedLock = {};

		if ( scrollLocked ) {
			return;
		}

		// Save scroll state and styles
		prevScroll = {
			scrollLeft : $win.scrollLeft(),
			scrollTop  : $win.scrollTop()
		};

		twentytwenty.scrollLock.saveStyles();

		// Compose our applied CSS, with scroll state as styles
		$.extend( appliedLock, lockStyles, {
			'left' : - prevScroll.scrollLeft + 'px',
			'top'  : - prevScroll.scrollTop + 'px'
		} );

		// Then lock styles and state
		$( 'html' ).css( appliedLock );
		$win.scrollLeft( 0 ).scrollTop( 0 );

		window.scrollLocked = true;
	},

	// Unlock the scroll (do not call this directly)
	unlock: function() {

		if ( ! window.scrollLocked ) {
			return;
		}

		// Revert styles and state
		$( 'html' ).attr( 'style', $( '<x>' ).css( prevLockStyles ).attr( 'style' ) || '' );
		$win.scrollLeft( prevScroll.scrollLeft ).scrollTop( prevScroll.scrollTop );

		window.scrollLocked = false;
	},

	// Call this to lock or unlock the scroll
	setTo: function( on ) {

		// If an argument is passed, lock or unlock accordingly
		if ( arguments.length ) {
			if ( on ) {
				twentytwenty.scrollLock.lock();
			} else {
				twentytwenty.scrollLock.unlock();
			}
			// If not, toggle to the inverse state
		} else {
			if ( window.scrollLocked ) {
				twentytwenty.scrollLock.unlock();
			} else {
				twentytwenty.scrollLock.lock();
			}
		}

	},

} // twentytwenty.scrollLock


/*	-----------------------------------------------------------------------------------------------
	Dynamic Screen Height
--------------------------------------------------------------------------------------------------- */

twentytwenty.dynamicScreenHeight = {

	init: function() {

		var $screenHeight = $( '.screen-height' );

		$screenHeight.css( 'min-height', $win.innerHeight() );

		setTimeout( function() {
			$screenHeight.css( 'min-height', $win.innerHeight() );
		}, 500 );

		$win.on( 'resize', function() {
			$screenHeight.css( 'min-height', $win.innerHeight() );
		} );

	},

} // twentytwenty.dynamicScreenHeight


/*	-----------------------------------------------------------------------------------------------
	Focus Management
--------------------------------------------------------------------------------------------------- */

twentytwenty.focusManagement = {

	init: function() {

		// If the visitor tabs out of the main menu, return focus to the navigation toggle
		// Also, if the visitor tabs into a hidden element, move the focus to the element after the hidden element
		twentytwenty.focusManagement.focusLoop();

	},

	focusLoop: function() {
		$( '.cover-modal *:not(.svg):not(.path)' ).on( 'focus', function() {
			if ( $( '.menu-modal' ).is( '.active' ) ) {
				if ( ! $( this ).parents( '.menu-modal' ).length && ! $( this ).parents( '.header-toggles' ).length ) {
					$( '.nav-toggle' ).focus();
				}
			} else if ( $( '.search-modal' ).is( '.active' ) ) {
				if ( ! $( this ).parents( '.search-modal' ).length ) {
					$( '.search-modal .search-field' ).focus();
				}
			}
		} );
	}

} // twentytwenty.focusManagement


/*	-----------------------------------------------------------------------------------------------
	Main Menu
--------------------------------------------------------------------------------------------------- */

twentytwenty.mainMenu = {

	init: function() {

		// If the current menu item is in a sub level, expand all the levels higher up on load
		twentytwenty.mainMenu.expandLevel();

	},

	expandLevel: function() {
		var $activeMenuItem = $( '.main-menu .current-menu-item' );

		if ( $activeMenuItem.length !== false ) {
			$activeMenuItem.parents( 'li' ).each( function() {
				$subMenuToggle = $( this ).find( '.sub-menu-toggle' ).first();
				if ( $subMenuToggle.length ) {
					$subMenuToggle.trigger( 'click' );
				}
			} )
		}
	}

} // twentytwenty.mainMenu


/*	-----------------------------------------------------------------------------------------------
	Function Calls
--------------------------------------------------------------------------------------------------- */

$doc.ready( function() {

	twentytwenty.intervalScroll.init();         // Check for scroll on an interval
	twentytwenty.resizeEnd.init();              // Trigger event at end of resize
	twentytwenty.toggles.init();                // Handle toggles
	twentytwenty.coverModals.init();            // Handle cover modals
	twentytwenty.instrinsicRatioVideos.init();  // Retain aspect ratio of videos on window resize
	twentytwenty.smoothScroll.init();           // Smooth scroll to anchor link or a specific element
	twentytwenty.scrollLock.init();             // Scroll Lock
	twentytwenty.mainMenu.init();               // Main Menu
	twentytwenty.focusManagement.init();        // Focus Management
	twentytwenty.dynamicScreenHeight.init();    // Dynamic Screen Height

} );