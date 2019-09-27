/**
 * Remove squared button style
 *
 * @since 1.0.0
 */
/* eslint-disable no-undef */
wp.domReady( function() {
	wp.blocks.unregisterBlockStyle( 'core/button', 'squared' );
} );
