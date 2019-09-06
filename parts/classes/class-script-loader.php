<?php

/* ---------------------------------------------------------------------------------------------
   JAVASCRIPT LOADER CLASS
   Allow `async` and `defer` while enqueueing JavaScript. Based on a solution in WP Rig. 
   --------------------------------------------------------------------------------------------- */

class TwentyTwenty_Script_Loader {

	/**
	 * Adds async/defer attributes to enqueued / registered scripts.
	 *
	 * If #12009 lands in WordPress, this function can no-op since it would be handled in core.
	 *
	 * @link https://core.trac.wordpress.org/ticket/12009
	 *
	 * @param string $tag    The script tag.
	 * @param string $handle The script handle.
	 * @return string Script HTML string.
	 */
	public function filter_script_loader_tag( string $tag, string $handle ) : string {
		foreach ( [ 'async', 'defer' ] as $attr ) {
			if ( ! wp_scripts()->get_data( $handle, $attr ) ) {
				continue;
			}
			// Prevent adding attribute when already added in #12009.
			if ( ! preg_match( ":\s$attr(=|>|\s):", $tag ) ) {
				$tag = preg_replace( ':(?=></script>):', " $attr", $tag, 1 );
			}
			// Only allow async or defer, not both.
			break;
		}
		return $tag;
	}
	
}

$loader = new TwentyTwenty_Script_Loader;
add_filter( 'script_loader_tag', [ $loader, 'filter_script_loader_tag' ], 10, 2 );
