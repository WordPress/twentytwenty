(function() {

	wp.customize.bind( 'ready', function() {

		// An object containing the areas of the theme and their corresponding options for background-colors.
		var backgroundColors = {
			content: 'background_color'
		};

		// Add a listener for accent-color changes.
		wp.customize( 'accent_hue', function( value ) {
			value.bind( function( to ) {

				// Update the value for our accessible colors for all areas.
				Object.keys( backgroundColors ).forEach( function( context ) {
					twentyTwentySetAccessibleColorsValue( context, wp.customize( backgroundColors[ context ] ).get(), to );
				});
			});
		});

		// Add a listener for background-color changes.

		Object.keys( backgroundColors ).forEach( function( context ) {
			wp.customize( backgroundColors[ context ], function( value ) {
				value.bind( function( to ) {

					// Update the value for our accessible colors for this area.
					twentyTwentySetAccessibleColorsValue( context, to, wp.customize( 'accent_hue' ).get(), to );
				});
			});
		});
	});

})( jQuery );

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
