/* global wp, twentyTwentyPostWithCover */

( function( api ) {
	// Make the section always active.
	api.sectionConstructor.cover_tmpl_options = api.Section.extend( {
		isContextuallyActive: function() {
			return true;
		}
	} );

	api.bind( 'ready', function() {
		var coverBtn, coverData, postUrl, urlCheck, notice;

		coverData = twentyTwentyPostWithCover;
		postUrl = coverData.post_url;
		urlCheck = postUrl === 'none';
		notice = urlCheck ? coverData.none_found : coverData.load_one;

		// Create a dummy button.
		coverBtn = new api.Control( 'cover_btn', {
			section: 'cover_template_options',
			description: notice,
			setting: new api.Value(), // Not using it now
			type: 'button',
			priority: 0
		} );

		api.control.add( coverBtn );

		// Get the values from the preview window.
		api.previewer.bind( 'get-cover-post', function( coverPost ) {
			var coverSection, coverBtnWrap, coverBtnEl, coverBtnElDescription;

			coverBtnWrap = coverBtn.container;
			coverBtnElDescription = coverBtnWrap.find( '.customize-control-description' );
			coverBtnEl = coverBtnWrap.find( '.button' );
			coverSection = api.section( 'cover_template_options' );

			function changeDetails() {
				coverBtnEl.text( urlCheck ? coverData.create_button : coverData.load_button );
				coverBtnElDescription.text( notice );

				coverBtnEl.on( 'click', function( e ) {
					e.preventDefault();

					if ( urlCheck ) {
						window.location.href = coverData.new_post;
						coverBtnEl.attr( 'disabled', true );
					} else {
						api.previewer.previewUrl.set( postUrl );
						coverBtnEl.text( coverData.loading );
						coverBtnEl.attr( 'disabled', true );
					}
				} );
			}

			// Show or hide the controls.
			// Also, make sure the controls don't reappear for a slight second.
			function controlsHideShow( show ) {
				var activeOrigin, controls;

				controls = coverSection.controls();
				activeOrigin = api.Control.prototype.onChangeActive;

				if ( ! controls.length ) {
					return false;
				}

				controls.forEach( function( control, i ) {
					var focusCondition;

					focusCondition = i === ( controls.length - 1 ) && coverSection.expanded();
					control.onChangeActive = activeOrigin;

					if ( control.id === 'cover_btn' ) {
						return false;
					}

					if ( show ) {
						control.container.slideDown( 200, function() {
							coverBtn.deactivate( {
								completeCallback: function() {
									if ( focusCondition ) {
										api.control( 'cover_template_fixed_background' ).focus();
									}
								}
							} );
						} );
					} else {
						control.deactivate( {
							completeCallback: function() {
								control.onChangeActive = function() {};
								changeDetails();
								coverBtnEl.attr( 'disabled', false );
								coverBtn.activate( {
									completeCallback: function() {
										if ( focusCondition ) {
											coverBtn.focus();
										}
									}
								} );
							}
						} );
					}
				} );
			}

			// Check if the current post has a cover template.
			if ( coverPost && coverPost.has_cover ) {
				// Show controls and hide action button
				controlsHideShow( true );
			} else {
				// Hide controls and show action button
				changeDetails();
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
