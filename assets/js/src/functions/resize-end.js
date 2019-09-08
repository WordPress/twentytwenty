export default {

	init() {
		let resizeTimer;

		window.addEventListener( 'resize', ( event ) => {
			clearTimeout( resizeTimer );

			resizeTimer = setTimeout( () => {
				// Trigger this at the end of screen resizing
				window.dispatchEvent( 'resize-end' );
			}, 250 );
		} );
	},

};
