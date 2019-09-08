import { findParents } from './helper';

export default {

	init() {
		// If the current menu item is in a sub level, expand all the levels higher up on load
		this.expandLevel();
	},

	expandLevel() {
		const mainMenu = document.querySelector( '.main-menu' );
		const activeMenuItem = mainMenu.querySelector( '.current-menu-item' );

		if ( activeMenuItem ) {
			findParents( activeMenuItem, 'li' ).forEach( ( element ) => {
				const subMenuToggle = element.querySelector( '.sub-menu-toggle' );
				if ( subMenuToggle ) {
					subMenuToggle.click();
				}
			} );
		}
	},
};
