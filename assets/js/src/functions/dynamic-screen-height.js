export default {

	init() {
		this.setScreenHeight();

		setTimeout( () => {
			this.setScreenHeight();
		}, 500 );

		window.addEventListener( 'resize', () => {
			this.setScreenHeight();
		} );
	},

	setScreenHeight() {
		const screenHeight = document.querySelector( '.screen-height' );
		if ( screenHeight ) {
			screenHeight.style.minHeight = window.innerHeight();
		}
	},

};
