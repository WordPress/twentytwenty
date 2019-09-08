export default {

	init() {
		// Init variables
		window.scrollLocked = false;
		window.prevScroll = {
			scrollX: window.scrollX,
			scrollY: window.scrollY,
		};
		window.prevLockStyles = {};
		window.lockStyles = {
			overflowY: 'scroll',
			position: 'fixed',
			width: '100%',
		};

		// Instantiate cache in case someone tries to unlock before locking
		this.saveStyles();
	},

	// Save context's inline styles in cache
	saveStyles() {
		window.prevLockStyles = document.querySelector( 'html' ).style;
	},

	// Lock the scroll (do not call this directly)
	lock() {
		let appliedLock = {};

		if ( window.scrollLocked ) {
			return;
		}

		// Save scroll state and styles
		window.prevScroll = {
			scrollX: window.scrollX,
			scrollY: window.scrollY,
		};

		this.saveStyles();

		// Compose our applied CSS, with scroll state as styles
		appliedLock = {
			...window.lockStyles, ...{
				left: -window.scrollX + 'px',
				top: -window.scrollY + 'px',
			},
		};

		// Then lock styles and state
		const html = document.querySelector( 'html' );

		Object.keys( appliedLock ).forEach( ( style ) => {
			html.style[ style ] = appliedLock[ style ];
		} );

		window.scrollX = 0;
		window.scrollY = 0;

		window.scrollLocked = true;
	},

	// Unlock the scroll (do not call this directly)
	unlock() {
		if ( ! window.scrollLocked ) {
			return;
		}

		const html = document.querySelector( 'html' );
		// Revert styles and state
		Object.keys( window.prevLockStyles ).forEach( ( style ) => {
			html.style[ style ] = window.prevLockStyles[ style ];
		} );

		window.screenX = window.prevScroll.scrollX;
		window.scrollY = window.prevScroll.scrollY;

		window.scrollLocked = false;
	},

	// Call this to lock or unlock the scroll
	setTo( on ) {
		// If an argument is passed, lock or unlock accordingly
		if ( arguments.length ) {
			if ( on ) {
				this.lock();
			} else {
				this.unlock();
			}
			// If not, toggle to the inverse state
		} else if ( window.scrollLocked ) {
			this.unlock();
		} else {
			this.lock();
		}
	},

};
