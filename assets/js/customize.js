/* global wp, twentyTwentyPostWithCover */

( function( api ) {
	// Make the section always active.
	api.sectionConstructor.cover_tmpl_options = api.Section.extend( {
		isContextuallyActive: function() {
			return true;
		}
	} );

	api.bind( 'ready', function() {
		api.previewer.bind( 'get-cover-post', function( coverPost ) {
			var coverSection, coverData, description, descElement, notice, info, button, postUrl, urlCheck;

			coverSection = api.section( 'cover_template_options' );
			coverData = twentyTwentyPostWithCover;
			postUrl = coverData.post_url;
			urlCheck = postUrl === 'none';
			notice = urlCheck ? coverData.none_found : coverData.load_one;
			descElement = coverSection.contentContainer.find( '.customize-section-description' );

			description = coverSection.params.description;
			info = description + '<br /><br />' + notice + '<br /><br />';

			// Add the preview button & description.
			function addButton() {
				var buttonText;

				buttonText = urlCheck ? coverData.create_button : coverData.load_button;

				button = document.createElement( 'button' );
				button.type = 'button';
				button.textContent = buttonText;
				button.setAttribute( 'aria-label', buttonText );
				button.classList.add( 'button' );

				button.addEventListener( 'click', function( e ) {
					e.preventDefault();

					if ( urlCheck ) {
						window.location.href = coverData.new_post;
						button.disabled = true;
					} else {
						api.previewer.previewUrl.set( postUrl );
						descElement.html( description );
					}
				} );

				descElement.html( info );
				descElement.append( button );
			}

			// Remove the preview button & description.
			function removeButton() {
				descElement.html( description );
			}

			// Show or hide the controls.
			// Also, make sure the controls don't reapear for a slight second.
			function controlsHideShow( show ) {
				var activeOrigin;

				activeOrigin = api.Control.prototype.onChangeActive;

				coverSection.controls().forEach( function( control ) {
					control.onChangeActive = activeOrigin;

					if ( show ) {
						control.container.slideDown();
					} else {
						control.deactivate( {
							completeCallback: function() {
								control.onChangeActive = function() {};
							}
						} );
					}
				} );
			}

			// Check if the current post has a cover template.
			if ( coverPost && coverPost.has_cover ) {
				// Show controls and hide action button
				removeButton();
				controlsHideShow( true );
			} else {
				// Hide controls and show action button
				addButton();
				controlsHideShow( false );
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
