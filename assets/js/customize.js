/* global wp, twentyTwentyPostWithCover */

( function( api ) {
	// Make the section always active.
	api.sectionConstructor.cover_tmpl_options = api.Section.extend( {
		isContextuallyActive: function() {
			return true;
		}
	} );

	// When ready, do some magic.
	api.bind( 'ready', function() {
		api.previewer.bind( 'get-cover-post', function( queriedPost ) {
			var coverSection, coverData, description, descElement, info, button;

			coverSection = api.section( 'cover_template_options' );
			coverData = twentyTwentyPostWithCover;
			descElement = coverSection.contentContainer.find( '.customize-section-description' );

			description = coverSection.params.description;
			info = description + '<br /><br />' + coverData.load_one + '<br /><br />';

			function addButton() {
				button = document.createElement( 'button' );
				button.type = 'button';
				button.textContent = coverData.load_button;
				button.classList.add( 'button' );

				button.addEventListener( 'click', function( e ) {
					e.preventDefault();
					api.previewer.previewUrl.set( coverData.post_url );
					descElement.html( description );
				} );

				descElement.html( info );
				descElement.append( button );
			}

			function removeButton() {
				descElement.html( description );
			}

			if ( queriedPost && queriedPost.has_cover ) {
				removeButton();
			} else {
				addButton();

				coverSection.controls().forEach( function( control ) {
					control.deactivate( { duration: 0 } );
				} );
			}
		} );

		// Make it possible to reset the color based on a radio input's value.
		// `active` can be either `custom` or `default`.
		api.control( 'accent_hue_active' ).setting.bind( function( active ) {
			var control = api.control( 'accent_hue' ); // Get the accent hue control.

			if ( 'custom' === active ) {
				// Activate the hue color picker control and focus it.
				control.activate( {
					completeCallback: function() {
						control.focus();
					}
				} );
			} else {
				// If the `custom` option isn't selected, deactivate the hue color picker and set a default.
				control.deactivate( {
					completeCallback: function() {
						control.setting.set( control.params.defaultValue );
					}
				} );
			}
		} );
	} );
}( wp.customize ) );
