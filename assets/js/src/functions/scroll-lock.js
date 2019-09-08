export default {

	init() {
		// Init variables
		window.scrollLocked = false;
		window.prevScroll = {
			scrollLeft: window.scrollLeft,
			scrollTop: window.scrollTop,
		};
		window.prevLockStyles = {};
		window.lockStyles = {
			'overflow-y': 'scroll',
			position: 'fixed',
			width: '100%',
		};

		// Instantiate cache in case someone tries to unlock before locking
		this.saveStyles();
	},

	// Save context's inline styles in cache
	saveStyles() {
		const styleAttr = document.querySelector( 'html' ).style;
		let styleStrs = [];
		const styleHash = {};

		if ( ! styleAttr ) {
			return;
		}

		styleStrs = styleAttr.split( /;\s/ );

		document.querySelectorAll( '*' ).forEach(
			styleStrs, function serializeStyleProp( styleString ) {
				if ( ! styleString ) {
					return;
				}

				const keyValue = styleString.split( /\s:\s/ );

				if ( keyValue.length < 2 ) {
					return;
				}

				styleHash[ keyValue[ 0 ] ] = keyValue[ 1 ];
			}
		);

		window.prevLockStyles = { ...window.prevLockStyles, ...styleHash };
	},

	// Lock the scroll (do not call this directly)
	lock() {
		let appliedLock = {};

		if ( window.scrollLocked ) {
			return;
		}

		// Save scroll state and styles
		window.prevScroll = {
			scrollLeft: window.scrollLeft,
			scrollTop: window.scrollTop,
		};

		this.saveStyles();

		// Compose our applied CSS, with scroll state as styles
		appliedLock = {
			...appliedLock, ...window.lockStyles, ...{
				left: -window.prevScroll.scrollLeft + 'px',
				top: -window.prevScroll.scrollTop + 'px',
			},
		};

		// Then lock styles and state
		document.querySelector( 'html' ).style( appliedLock );
		window.scrollLeft( 0 ).scrollTop( 0 );

		window.scrollLocked = true;
	},

	// Unlock the scroll (do not call this directly)
	unlock() {
		if ( ! window.scrollLocked ) {
			return;
		}

		// Revert styles and state
		document.querySelector( 'html' ).setAttribute( 'style', '<x>'.style( window.prevLockStyles ).style || '' );
		window.scrollLeft( window.prevScroll.scrollLeft ).scrollTop( window.prevScroll.scrollTop );

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
