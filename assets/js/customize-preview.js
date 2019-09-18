/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

( function() {

    /**
     * Colors selective refresh
     */
    var style  = document.querySelector( '#twentytwenty-style-inline-css' );
    var colors = JSON.parse( style.dataset.twentytwentyColors );

    Object.keys( colors ).forEach( function( theme_mod ) {
        
        wp.customize( theme_mod, function( value ) {
            value.bind( function( to ) {
                var css = style.innerHTML;

                css = css.split( colors[ theme_mod ] ).join( to );
                
                colors[ theme_mod ] = to;
    
                style.innerHTML = css;
                
                style.dataset.twentytwentyColors = JSON.stringify( colors );
            } );
        } );

    } );
} )();