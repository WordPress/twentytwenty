/* global backgroundColors */
/**
 * Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 *
 * @since 1.0.0
 */

( function() {

	// Add listener for the accent color.
	wp.customize( 'accent_hue', function( value ) {
		value.bind( function( to ) {

			// Generate the styles.
			// Add a small delay to be sure the accessible colors were generated.
			setTimeout( function() {
				Object.keys( backgroundColors ).forEach( function( context ) {
					twentyTwentyGenerateColorA11yPreviewStyles( context );
				} );
			}, 50 );
		} );
	} );

	// Add listeners for background-color settings.
	Object.keys( backgroundColors ).forEach( function( context ) {
		wp.customize( backgroundColors[ context ].setting, function( value ) {
			value.bind( function() {

				// Generate the styles.
				// Add a small delay to be sure the accessible colors were generated.
				setTimeout( function() {
					twentyTwentyGenerateColorA11yPreviewStyles( context );
				}, 50 );
			} );
		} );
	} );

	/**
	 * Add styles to elements in the preview pane.
	 *
	 * @since 1.0.0
	 *
	 * @param {string} context The area for which we want to generate styles. Can be for example "content", "header" etc.
	 *
	 * @return {void}
	 */
	function twentyTwentyGenerateColorA11yPreviewStyles( context ) {
		// Get the accessible colors option.
		var a11yColors = window.parent.wp.customize( 'accent_accessible_colors' ).get();
		if ( ! _.isUndefined( a11yColors[ context ] ) ) {
			jQuery( backgroundColors[ context ].elements.text ).css( 'color', a11yColors[ context ].text );
			jQuery( backgroundColors[ context ].elements.accent ).css( 'color', a11yColors[ context ].accent );
		}
	}
} )();
