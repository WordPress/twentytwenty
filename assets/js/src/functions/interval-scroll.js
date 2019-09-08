export default {

	init() {
		let didScroll = false;

		// Check for the scroll event
		window.addEventListener( 'scroll', () => {
			didScroll = true;
		} );

		// Once every 250ms, check if we have scrolled, and if we have, do the intensive stuff
		setInterval( () => {
			if ( didScroll ) {
				didScroll = false;

				// When this triggers, we know that we have scrolled
				window.dispatchEvent( new Event( 'did-interval-scroll' ) );
			}
		}, 250 );
	},

};
