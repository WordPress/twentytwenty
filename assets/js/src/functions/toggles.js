import scrollLock from './scroll-lock';
import { twentytwentyToggleAttribute, slideToggle } from './helper';

export default {

	init() {
		// Do the toggle
		this.toggle();

		// Check for toggle/untoggle on resize
		this.resizeCheck();

		// Check for untoggle on escape key press
		this.untoggleOnEscapeKeyPress();
	},

	// Do the toggle
	toggle() {
		document.querySelectorAll( '*[data-toggle-target]' ).forEach( ( element ) => {
			element.addEventListener( 'click', () => {
				// Get our targets
				const toggle = element;
				const targetString = toggle.dataset.toggleTarget;
				let target;

				if ( targetString === 'next' ) {
					target = toggle.nextSibling;
				} else {
					target = document.querySelector( targetString );
				}

				// Trigger events on the toggle targets before they are toggled
				if ( target.classList.contains( 'active' ) ) {
					target.dispatchEvent( new Event( 'toggle-target-before-active' ) );
				} else {
					target.dispatchEvent( new Event( 'toggle-target-before-inactive' ) );
				}

				// Get the class to toggle, if specified
				const classToToggle = toggle.dataset.classToToggle ? toggle.dataset.classToToggle : 'active';

				// For cover modals, set a short timeout duration so the class animations have time to play out
				let timeOutTime = 0;

				if ( target.classList.contains( 'cover-modal' ) ) {
					timeOutTime = 10;
				}

				setTimeout( () => {
					// Toggle the target of the clicked toggle
					if ( toggle.dataset.toggleType === 'slidetoggle' ) {
						const duration = toggle.dataset.toggleDuration ? toggle.dataset.toggleDuration : 250;
						slideToggle( target, duration );
					} else {
						target.classList.toggle( classToToggle );
					}

					// If the toggle target is 'next', only give the clicked toggle the active class
					if ( targetString === 'next' ) {
						toggle.classList.toggle( 'active' );

						// If not, toggle all toggles with this toggle target
					} else {
						document.querySelector( `*[data-toggle-target="${ targetString }"]` ).classList.toggle( 'active' );
					}

					// Toggle aria-expanded on the target
					twentytwentyToggleAttribute( target, 'aria-expanded', 'true', 'false' );

					// Toggle aria-pressed on the toggle
					twentytwentyToggleAttribute( toggle, 'aria-pressed', 'true', 'false' );

					// Toggle body class
					if ( toggle.dataset.toggleBodyClass ) {
						document.querySelector( 'body' ).classList.toggle( toggle.dataset.toggleBodyClass );
					}

					// Check whether to lock the screen
					if ( toggle.dataset.lockScreen ) {
						scrollLock.setTo( true );
					} else if ( toggle.dataset.unlockScreen ) {
						scrollLock.setTo( false );
					} else if ( toggle.dataset.toggleScreenLock ) {
						scrollLock.setTo();
					}

					// Check whether to set focus
					if ( toggle.dataset.setFocus ) {
						const focusElement = document.querySelector( toggle.dataset.setFocus );
						if ( focusElement.length ) {
							if ( toggle.classList.contains( '.active' ) ) {
								focusElement.focus();
							} else {
								focusElement.blur();
							}
						}
					}

					// Trigger the toggled event on the toggle target
					target.dispatchEvent( new Event( 'toggled' ) );

					// Trigger events on the toggle targets after they are toggled
					if ( target.classList.contains( 'active' ) ) {
						target.dispatchEvent( new Event( 'toggle-target-after-active' ) );
					} else {
						target.dispatchEvent( new Event( 'toggle-target-after-inactive' ) );
					}
				}, timeOutTime );

				return false;
			} );
		} );
	},

	// Check for toggle/untoggle on screen resize
	resizeCheck() {
		if ( document.querySelectorAll( '*[data-untoggle-above], *[data-untoggle-below], *[data-toggle-above], *[data-toggle-below]' ).length ) {
			window.addEventListener( 'resize', () => {
				const winWidth = window.innerWidth,
					toggles = document.querySelectorAll( '.toggle' );

				toggles.forEach( ( toggle ) => {
					const unToggleAbove = toggle.dataset.untoggleAbove,
						unToggleBelow = toggle.dataset.untoggleBelow,
						toggleAbove = toggle.dataset.toggleAbove,
						toggleBelow = toggle.dataset.toggleBelow;

					// If no width comparison is set, continue
					if ( ! unToggleAbove && ! unToggleBelow && ! toggleAbove && ! toggleBelow ) {
						return;
					}

					// If the toggle width comparison is true, toggle the toggle
					if (
						( ( ( unToggleAbove && winWidth > unToggleAbove ) ||
                            ( unToggleBelow && winWidth < unToggleBelow ) ) &&
                            toggle.classList.contains( 'active' ) ) ||
                        ( ( ( toggleAbove && winWidth > toggleAbove ) ||
                            ( toggleBelow && winWidth < toggleBelow ) ) &&
                            ! toggle.classList.contains( 'active' ) )
					) {
						toggle.click();
					}
				} );
			} );
		}
	},

	// Close toggle on escape key press
	untoggleOnEscapeKeyPress() {
		document.addEventListener( 'keyup', function( event ) {
			if ( event.key === 'Escape' ) {
				document.querySelectorAll( '*[data-untoggle-on-escape].active' ).forEach( ( element ) => {
					if ( element.classList.contains( 'active' ) ) {
						element.click();
					}
				} );
			}
		} );
	},

};
