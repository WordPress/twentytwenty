export default {

	init() {
		// If the visitor tabs out of the main menu, return focus to the navigation toggle
		// Also, if the visitor tabs into a hidden element, move the focus to the element after the hidden element
		this.focusLoop();
	},

	focusLoop() {
		document.addEventListener( 'focusin', ( event ) => {
			const element = event.target;
			const menuModal = document.querySelector( '.menu-modal' );
			const headerToggles = document.querySelector( 'header-toggles' );
			const searchModal = document.querySelector( '.search-modal' );
			if ( menuModal.classList.contains( '.active' ) ) {
				if ( ! menuModal.contains( element ) && ! headerToggles.contains( element ) ) {
					document.querySelector( '.nav-toggle' ).focus();
				}
			} else if ( searchModal.classList.contains( '.active' ) ) {
				if ( ! searchModal.contains( element ) ) {
					searchModal.querySelector( '.search-field' ).focus();
				}
			}
		} );
	},

};
