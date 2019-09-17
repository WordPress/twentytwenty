/**
 * Color Calculations.
 *
 * This isjust the constructor, we'll be augmenting the prototype
 * separately to add all the methods we need.
 *
 * @since 1.0.0
 * @param {string} backgroundColor - The background color.
 * @param {Number} accentHue - The hue for our accent color.
 * @return {Object} - this
 */
function _twentyTwentyColor( backgroundColor, accentHue ) {

	// Set the object properties.
	this.isHex           = isNaN( backgroundColor );
	this.isHue           = ! this.isHex;
	this.backgroundColor = backgroundColor;
	this.accentHue       = accentHue;

	// Return the object.
	return this;
}

_twentyTwentyColor.prototype.setBackgroundColorProperties = function() {
	var hex, rgb, hsl, lum, colorProperies = {};

	// Get HEX.
	hex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test( this.backgroundColor ) ? this.backgroundColor : '#ffffff';

	// Get RGB.
	rgb = this.hexToRgb( hex );

	// Get luminance.
	lum = this.getRelativeLuminance( rgb );

	// Set the color properties.
	this.backgroundColorProps = {
		hex: hex,
		red: rgb[0],
		green: rgb[1],
		blue: rgb[2],
		luminance: lum
	};
};

/**
 * Check if the background-color is dark.
 *
 * @since 1.0.0
 * @return {Boolean}
 */
_twentyTwentyColor.prototype.isBackgroundDark = function() {
	var whiteLum = 1,
		blackLum = 0,
		contrastWhite = this.getContrast( whiteLum, this.backgroundColorProps.luminance ),
		contrastBlack = this.getContrast( blackLum, this.backgroundColorProps.luminance );

	return ( contrastBlack < contrastWhite );
};

/**
 * Check if the background-color is light.
 *
 * @since 1.0.0
 * @return {Boolean}
 */
_twentyTwentyColor.prototype.isBackgroundLight = function() {
	return ! this.isBackgroundDark();
};

/**
 * Convert hex color to RGB.
 *
 * @since 1.0.0
 * @param {string} hex - The hex color.
 * @returns {Array} - [r,g,b]
 */
_twentyTwentyColor.prototype.hexToRgb = function( hex ) {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
		result;

	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF").
	hex = hex.replace( shorthandRegex, function( m, r, g, b ) {
		return r + r + g + g + b + b;
	});

	result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
	return result ? [
		parseInt( result[1], 16 ),
		parseInt( result[2], 16 ),
		parseInt( result[3], 16 )
	] : null;
};

/**
 * Gets the relative luminance from RGB.
 * Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 *
 * @since 1.0
 * @param {Array} color - an RGB color [r,g,b].
 * @returns {float}
 */
_twentyTwentyColor.prototype.getRelativeLuminance = function( color ) {
	var lum = 0.2126 * this.getLumPart( color[0] ) + 0.7152 * this.getLumPart( color[1] ) + 0.0722 * this.getLumPart( color[2] );
	// Return relative luminance rounded to 2 decimals.
	return Math.round( lum * 100 ) / 100;
};

/**
 * Get luminocity for a part.
 *
 * @since 1.0
 * @param {int|float} val - The value.
 * @returns {float}
 */
_twentyTwentyColor.prototype.getLumPart = function( val ) {
	val = val / 255;
	if ( 0.03928 >= val ) {
		return val / 12.92;
	}
	return Math.pow( ( ( val + 0.055 ) / 1.055 ), 2.4 );
};

/**
 * Get contrast between 2 luminances.
 *
 * @since 1.0
 * @param {float} lum1 - 1st luminance.
 * @param {float} lum2 - 2nd luminance.
 * @returns {float}
 */
_twentyTwentyColor.prototype.getContrast = function( lum1, lum2 ) {
	var contrast = Math.max( ( lum1 + 0.05 ) / ( lum2 + 0.05 ), ( lum2 + 0.05 ) / ( lum1 + 0.05 ) );
	// Return contrast rounded to 2 decimals.
	return Math.round( contrast * 100 ) / 100;
};

/**
 * Return a new instance of the _twentyTwentyColor object.
 *
 * @since 1.0.0
 * @param {string} backgroundColor - The background color.
 * @param {Number} accentHue - The hue for our accent color.
 * @return {Object} - this
 */
function twentyTwentyColor( backgroundColor, accentHue ) {
	var color = new _twentyTwentyColor( backgroundColor );
	color.setBackgroundColorProperties();

	return color;
}
