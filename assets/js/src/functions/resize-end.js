export default {

	init() {
		let resizeTimer;

		window.addEventListener( 'resize', () => {
			clearTimeout( resizeTimer );

			resizeTimer = setTimeout( () => {
				// Trigger this at the end of screen resizing
				window.dispatchEvent( new Event( 'resize-end' ) );
			}, 250 );
		} );
	},

};
