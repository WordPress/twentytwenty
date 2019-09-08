import { scrollTo } from './helper';

export default {

	init() {
		// Scroll to anchor
		this.scrollToAnchor();

		// Scroll to element
		this.scrollToElement();
	},

	// Scroll to anchor
	scrollToAnchor() {
		const anchorElements = document.querySelectorAll( 'a[href*="#"]' );
		[ ...anchorElements ].filter( ( element ) => {
			if ( element.href === '#' || element.href === '#0' || element.classList.contains( '.do-not-scroll' ) || element.classList.contains( 'skip-link' ) ) {
				return false;
			}
			return true;
		} ).forEach( ( element ) => {
			element.addEventListener( 'click', ( event ) => {
				// On-page links
				if ( window.location.hostname === event.target.hostname ) {
					// Figure out element to scroll to
					let target = window.location.hash !== '' && document.querySelector( window.location.hash );
					target = target ? target : document.querySelector( event.target.hash );
					// Does a scroll target exist?
					if ( target ) {
						// Only prevent default if animation is actually gonna happen
						event.preventDefault();

						// Get options
						const additionalOffset = event.target.dataset.additionalOffset;
						const scrollSpeed = event.target.dataset.scrollSpeed ? event.target.dataset.scrollSpeed : 500;

						// Determine offset
						const originalOffset = target.getBoundingClientRect().top + window.pageYOffset;
						const scrollOffset = additionalOffset ? originalOffset + additionalOffset : originalOffset;

						scrollTo( scrollOffset, null, scrollSpeed );

						window.location.hash = event.target.hash.slice( 1 );
					}
				}
			} );
		} );
	},

	// Scroll to element
	scrollToElement() {
		const scrollToElement = document.querySelector( '*[data-scroll-to]' );

		if ( scrollToElement ) {
			scrollToElement.addEventListener( 'click', ( event ) => {
				// Figure out element to scroll to
				const target = event.target.dataset.scrollTo;

				// Make sure said element exists
				if ( target ) {
					event.preventDefault();

					// Get options
					const additionalOffset = event.target.dataset.additionalOffset,
						scrollSpeed = event.target.dataset.scrollSpeed ? event.target.dataset.scrollSpeed : 500;

					// Determine offset
					const originalOffset = target.getBoundingClientRect().top + window.pageYOffset,
						scrollOffset = additionalOffset ? originalOffset + additionalOffset : originalOffset;

					scrollTo( scrollOffset, null, scrollSpeed );
				}
			} );
		}
	},

};
