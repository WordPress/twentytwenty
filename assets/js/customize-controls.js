/* global backgroundColors */
/**
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains extra logic for our Customizer controls & settings.
 *
 * @since 1.0.0
 */

( function() {

	// Wait until the customizer has finished loading.
	wp.customize.bind( 'ready', function() {

		// Add a listener for accent-color changes.
		wp.customize( 'accent_hue', function( value ) {
			value.bind( function( to ) {

				// Update the value for our accessible colors for all areas.
				Object.keys( backgroundColors ).forEach( function( context ) {
					twentyTwentySetAccessibleColorsValue( context, wp.customize( backgroundColors[ context ].setting ).get(), to );
				});
			});
		});

		// Add a listener for background-color changes.
		Object.keys( backgroundColors ).forEach( function( context ) {
			wp.customize( backgroundColors[ context ].setting, function( value ) {
				value.bind( function( to ) {

					// Update the value for our accessible colors for this area.
					twentyTwentySetAccessibleColorsValue( context, to, wp.customize( 'accent_hue' ).get(), to );
				});
			});
		});
	});

	/**
	 * Updates the value of the "accent_accessible_colors" setting.
	 *
	 * @since 1.0.0
	 *
	 * @param {string} context The area for which we want to get colors. Can be for example "content", "header" etc.
	 * @param {string} backgroundColor The background color (HEX value).
	 * @param {Number} accentHue Numeric representation of the selected hue (0 - 359).
	 *
	 * @return {void}
	 */
	function twentyTwentySetAccessibleColorsValue( context, backgroundColor, accentHue ) {
		var value, colors;

		// Get the current value for our accessible colors, and make sure it's an object.
		value = wp.customize( 'accent_accessible_colors' ).get();
		value = ( _.isObject( value ) && ! _.isArray( value ) ) ? value : {};

		// Get accessible colors for the defined background-color and hue.
		colors = twentyTwentyColor( backgroundColor, accentHue );

		// Update the value for this context.
		value[ context ] = {
			text: colors.getTextColor(),
			accent: colors.getAccentColor().toCSS()
		};

		// Change the value.
		wp.customize( 'accent_accessible_colors' ).set( value );

		// Small hack to save the option.
		wp.customize( 'accent_accessible_colors' )._dirty = true;
	}

})( jQuery );
