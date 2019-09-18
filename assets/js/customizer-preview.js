
( function() {
	var backgroundColors = { // TODO: Define in PHP then add as vars to the script.
		content: {
			setting: 'background_color',
			elements: {
				text: 'body',
				accent: 'a, .wp-block-button.is-style-outline, .has-drop-cap:not(:focus):first-letter, a.previous-post, a.next-post'
			}
		}
	};

	Object.keys( backgroundColors ).forEach( function( context ) {

		wp.customize( backgroundColors[ context ].setting, function( value ) {
			value.bind( function( to ) {

				// Generate the styles.
				// Add a small delay to be sure the accessible colors were generated.
				setTimeout( function() {
					styles = '';

					// Get the accessible colors option.
					var a11yColors = window.parent.wp.customize( 'accent_accessible_colors' ).get();
					if ( ! _.isUndefined( a11yColors[ context ] ) ) {
						jQuery( backgroundColors[ context ].elements.text ).css( 'color', a11yColors[ context ].text );
						jQuery( backgroundColors[ context ].elements.accent ).css( 'color', a11yColors[ context ].accent );
						console.log( a11yColors[ context ] );
					}
				}, 50 );
			} );
		} );
	} );

} )();
