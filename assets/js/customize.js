/* global wp, jQuery */

( function( $, api ) {
	$( document ).ready( function() {
		var accentHueControl = api.control( 'accent_hue' );

		api.control( 'accent_hue_active' ).setting.bind( function( active ) {
			if ( active ) {
				accentHueControl.activate( {
					completeCallback: function() {
						accentHueControl.focus();
					}
				} );
			} else {
				accentHueControl.deactivate( {
					completeCallback: function() {
						accentHueControl.setting.set( accentHueControl.params.defaultValue );
					}
				} );
			}
		} );
	} );
}( jQuery, wp.customize ) );
