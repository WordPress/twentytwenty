import { getQueryStringValue } from './helper';

export default {

	init() {
		if ( document.querySelector( '.cover-modal' ) ) {
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
	onToggle() {
		document.querySelector( '.cover-modal' ).addEventListener( 'toggled', ( event ) => {
			const modal = event.target,
				body = document.querySelector( 'body' );

			if ( modal.classList.contains( 'active' ) ) {
				body.classList.add( 'showing-modal' );
			} else {
				body.classList.remove( 'showing-modal' );
				body.classList.add( 'hiding-modal' );

				// Remove the hiding class after a delay, when animations have been run
				setTimeout( () => {
					body.classList.remove( 'hiding-modal' );
				}, 500 );
			}
		} );
	},

	// Close modal on outside click
	outsideUntoggle() {
		document.addEventListener( 'click', ( event ) => {
			const target = event.target;
			const modal = document.querySelector( '.cover-modal.active' );

			if ( target === modal ) {
				this.untoggleModal( target );
			}
		} );
	},

	// Close modal on escape key press
	closeOnEscape() {
		document.addEventListener( 'keydown', ( event ) => {
			if ( event.keyCode === 27 ) {
				event.preventDefault();
				document.querySelectorAll( '.cover-modal.active' ).forEach( ( element ) => {
					this.untoggleModal( element );
				} );
			}
		} );
	},

	// Show modals on load
	showOnLoadandClick() {
		const key = 'modal';

		// Load based on query string
		if ( window.location.search.indexOf( key ) !== -1 ) {
			const modalTargetString = getQueryStringValue( key ),
				modalTarget = document.querySelector( `#${ modalTargetString }-modal` );

			if ( modalTargetString && modalTarget.length ) {
				setTimeout( () => {
					modalTarget.classList.add( 'active' ).triggerHandler( 'toggled' );
					this.scrollLock = true;
				}, 250 );
			}
		}

		// Check for modal matching querystring when clicking a link
		// Format: www.url.com?modal=modal-id
		document.querySelectorAll( 'a' ).forEach( ( link ) => {
			link.addEventListener( 'click', ( event ) => {
				// Load based on query string
				if ( event.target.href && event.target.href.indexOf( key ) !== -1 ) {
					const modalTargetString = getQueryStringValue( key, event.target.attr( 'href' ) ),
						modalTarget = document.querySelector( `#${ modalTargetString }` );

					if ( modalTargetString && modalTarget.length ) {
						modalTarget.classList.add( 'active' ).triggerHandler( 'toggled' );
						this.scrollLock = true;

						return false;
					}
				}
			} );
		} );
	},

	// Hide and show modals before and after their animations have played out
	hideAndShowModals() {
		const modals = document.querySelectorAll( '.cover-modal' );

		// Show the modal
		modals.forEach( ( modal ) => {
			modal.addEventListener( 'toggle-target-before-inactive', ( event ) => {
				if ( event.target !== modal ) {
					return;
				}

				modal.classList.add( 'show-modal' );
			} );

			// Hide the modal after a delay, so animations have time to play out
			modal.addEventListener( 'toggle-target-after-inactive', ( event ) => {
				if ( event.target !== modal ) {
					return;
				}

				setTimeout( () => {
					modal.classList.remove( 'show-modal' );
				}, 500 );
			} );
		} );
	},

	// Untoggle a modal
	untoggleModal( modal ) {
		let modalToggle = false;

		// If the modal has specified the string (ID or class) used by toggles to target it, untoggle the toggles with that target string
		// The modal-target-string must match the string toggles use to target the modal
		if ( modal.dataset.modalTargetString ) {
			const modalTargetClass = modal.dataset.modalTargetString;
			modalToggle = document.querySelector( `*[data-toggle-target="${ modalTargetClass }"]` );
		}

		// If a modal toggle exists, trigger it so all of the toggle options are included
		if ( modalToggle ) {
			modalToggle.click();

			// If one doesn't exist, just hide the modal
		} else {
			modal.classList.remove( 'active' );
		}
	},

}
;
