import domReady from '@wordpress/dom-ready';

import intervalScroll from './functions/interval-scroll';
import resizeEnd from './functions/resize-end';
import toggles from './functions/toggles';
import coverModals from './functions/cover-modals';
import instrinsicRatioVideos from './functions/instrinsic-ratio-videos';
import smoothScroll from './functions/smooth-scroll';
import scrollLock from './functions/scroll-lock';
import mainMenu from './functions/main-menu';
import focusManagement from './functions/focus-management';
import dynamicScreenHeight from './functions/dynamic-screen-height';

domReady( () => {
	// intervalScroll.init();
	// resizeEnd.init();
	toggles.init();
	coverModals.init();
	// instrinsicRatioVideos.init();
	// smoothScroll.init();
	// scrollLock.init();
	mainMenu.init();
	// focusManagement.init();
	// dynamicScreenHeight.init();
} );
