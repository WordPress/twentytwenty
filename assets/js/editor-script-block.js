/** 
 * Remove squared button style
 * 
 * @since 1.0.0
*/
wp.domReady( () => {
	wp.blocks.unregisterBlockStyle( 'core/button', 'squared' );
} );
