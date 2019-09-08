export default {

	init() {
		// Scroll to anchor
		this.scrollToAnchor();

		// Scroll to element
		this.scrollToElement();
	},

	// Scroll to anchor
	scrollToAnchor() {
		[ ...document.querySelectorAll( 'a[href*="#"]' ) ].filter( ( element ) => {
			if ( ( element.href === ( '#' || '#0' ) ) || element.classList.contains( '.do-not-scroll' ) || ! element.classList.contains( 'skip-link' ) ) {
				return false;
			}
			return true;
		} ).forEach( ( element ) => {
			element.addEventListener( 'click', ( event ) => {
				// On-page links
				if ( window.location.pathname.replace( /^\//, '' ) === event.target.pathname.replace( /^\//, '' ) && window.location.hostname === event.target.hostname ) {
					// Figure out element to scroll to
					let target = document.querySelector( window.location.hash );
					target = target.length ? target : document.querySelector( '[name=' + event.target.hash.slice( 1 ) + ']' );
					// Does a scroll target exist?
					if ( target.length ) {
						// Only prevent default if animation is actually gonna happen
						event.preventDefault();

						// Get options
						const additionalOffset = document.querySelector( event.target ).data( 'additional-offset' ),
							scrollSpeed = document.querySelector( event.target ).data( 'scroll-speed' ) ? document.querySelector( event.target ).data( 'scroll-speed' ) : 500;

						// Determine offset
						const originalOffset = target.offset().top,
							scrollOffset = additionalOffset ? originalOffset + additionalOffset : originalOffset;

						document.querySelectorAll( 'html, body' ).animate( {
							scrollTop: scrollOffset,
						}, scrollSpeed );
					}
				}
			} );
		} );
	},

	// Scroll to element
	scrollToElement() {
		const scrollTo = document.querySelector( '*[data-scroll-to]' );

		if ( scrollTo ) {
			scrollTo.addEventListener( 'click', ( event ) => {
				// Figure out element to scroll to
				const target = event.target.data( 'scroll-to' );

				// Make sure said element exists
				if ( target.length ) {
					event.preventDefault();

					// Get options
					const additionalOffset = event.target.data( 'additional-offset' ),
						scrollSpeed = event.target.data( 'scroll-speed' ) ? event.target.data( 'scroll-speed' ) : 500;

					// Determine offset
					const originalOffset = target.offset().top,
						scrollOffset = additionalOffset ? originalOffset + additionalOffset : originalOffset;

					document.querySelectorAll( 'html, body' ).animate( {
						scrollTop: scrollOffset,
					}, scrollSpeed );
				}
			} );
		}
	},

};
