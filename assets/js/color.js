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

	this.isDark  = this.isBackgroundDark();
	this.isLight = this.isBackgroundLight();
};

/**
 * Get an array of HSL colors based on the accent hue.
 * HSL colors are formatted [h,s,l] and saved in this.accentColorHues
 * For improved performance we only build half the array
 * depending on dark/light background-color.
 *
 * @since 1.0.0
 * @return {Object} - this
 */
_twentyTwentyColor.prototype.setAccentHSLs = function() {
	var minSaturation    = 0.5,
		maxSaturation    = 1,
		minLightness     = this.isDark ? 0.5 : 0.1,
		maxLighness      = this.isDark ? 0.9 : 0.5,
		stepSaturation   = 0.05,
		stepLightness    = 0.05,
		s, l;

	this.accentColorHues = [];

	// We're using `for` loops here because they perform better than any other kind of loop.
	// The `Math.round( ( s + stepSaturation ) * 100 ) / 100` part of the code fixes a minor browser issue
	// where 0 + x in a loop adds an extra decimal throwing off all other calculations.
	for ( s = minSaturation; s <= maxSaturation; s = Math.round( ( s + stepSaturation ) * 100 ) / 100 ) {
		for ( l = minLightness; l <= maxLighness; l = Math.round( ( l + stepLightness ) * 100 ) / 100 ) {
			this.accentColorHues.push( [ this.accentHue, s, l ] );
		}
	}
	return this;
};

/**
 * Get the most accessible color for the defined accent-hue and background-color.
 *
 * @since 1.0.0
 * @return {Array} - [h,s,l]
 */
_twentyTwentyColor.prototype.getAccentHSL = function() {
	var textLum = this.isDark ? 1 : 0,
		colors, checkedColors, saturation, lightless;

	// Get an array of all our colors.
	colors = this.queryHSLs( this.backgroundColorProps.luminance );
	checkedColors = colors;

	// Get colors that have a 7:1 contrast with the background.
	colors = this.queryHSLs( this.backgroundColorProps.luminance, 7 );
	if ( ! colors.length ) { // Too few? Lower the bar.
		colors = this.queryHSLs( this.backgroundColorProps.luminance, 4.5 );
	}
	if ( ! colors.length ) { // Still nothing? Lower the bar some more.
		colors = this.queryHSLs( this.backgroundColorProps.luminance, 3 );
	}
	if ( colors.length ) {

		// All good, colors founc.
		checkedColors = colors;
	}

	console.log(colors);
	// Get colors that have a 4.5:1 contrast with surrounding text.
	colors = this.queryHSLs( textLum, 4.5, checkedColors );
	if ( 10 <= colors.length ) { // Too few? Lower the bar.
		colors = this.queryHSLs( textLum, 3, checkedColors );
	}
	if ( 10 <= colors.length ) { // Too few? Lower the bar some more.
		colors = this.queryHSLs( textLum, 2, checkedColors );
	}
	if ( colors[0] ) {
		checkedColors = colors[0];
	}

	// Sort colors by saruration.
	checkedColors.sort( function( a, b ) {
		return b[1] - a[1];
	});

	saturation = ( checkedColors[0] ) ? parseInt( 100 * checkedColors[0][1], 10 ) : 70;
	lightless  = this.isDark ? 70 : 30;
	lightness  = ( checkedColors[0] ) ? parseInt( 100 * checkedColors[0][2], 10 ) : lightless;

	return 'hsl(' + this.accentHue + ',' + saturation + '%,' + lightness + '%)';
};

/**
 * Sorts the array of accent-color HSLs based on their contrast with another color.
 *
 * @since 1.0.0
 * @param {Number} compareWithLum - The relative luminance of the color we're comparing with.
 * @param {Number} threshold - If we want to remove from the array items that don't fulfil a minimum contrast we can define it here.
 * @param {Array} colors - If we want to force a custom array instead of using this.accentColorHues.
 * @return {Array} - An array of colors from this.accentColorHues ordered by contrast, excluding items that don't pass the threshold.
 */
_twentyTwentyColor.prototype.queryHSLs = function( compareWithLum, threshold, colors ) {
	var self = this,
		newArray = [],
		contrast, i;

	colors = colors || this.accentColorHues;

	// Set the contrast as a 4th item in the array. This will help us calc things faster when reordering.
	for ( i = 0; i < colors.length; i++ ) {

		// Set the contrast it we don't already have it.
		if ( 'undefined' === typeof colors[ i ][3] ) {
			contrast = self.getContrast(
				self.getRelativeLuminance( self.hslToRgb( colors[ i ] ) ),
				compareWithLum
			);
		}

		// Make sure the contrast is above our threshold.
		if ( ! threshold || threshold < contrast ) {
			newArray.push( [
				colors[ i ][0],
				colors[ i ][1],
				colors[ i ][2],
				contrast
			] );
		}
	}

	newArray.sort( function( a, b ) {
		return b[3] - a[3];
	});
	return newArray;
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
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param {Array} hsl - [h,s,l]
 * @return {Array} - [r,g,b]
 */
_twentyTwentyColor.prototype.hslToRgb = function( hsl ) {
	var c, h_, x, r1, g1, b1, m,
		h = hsl[0],
		s = hsl[1],
		l = hsl[1];

	// Calculate chroma.
	c = ( 1 - Math.abs( ( 2 * l ) - 1 ) ) * s;

	// Find a point (r1, g1, b1) along the bottom three faces of the RGB cube,
	// with the same hue and chroma as our color
	// using the intermediate value X for the second largest component of this color.
	h_ = h / 60;
	x  = c * ( 1 - Math.abs( ( h_ % 2 ) - 1 ) );
	r1, g1, b1;

	if ( 'undefined' === typeof h || isNaN( h ) || null === h ) {
		r1 = g1 = b1 = 0;
	} else {
		if ( 0 <= h_ && 1 > h_ ) {
			r1 = c;
			g1 = x;
			b1 = 0;
		} else if ( 1 <= h_ && 2 > h_ ) {
			r1 = x;
			g1 = c;
			b1 = 0;
		} else if ( 2 <= h_ && 3 > h_ ) {
			r1 = 0;
			g1 = c;
			b1 = x;
		} else if ( 3 <= h_ && 4 > h_ ) {
			r1 = 0;
			g1 = x;
			b1 = c;
		} else if ( 4 <= h_ && 5 > h_ ) {
			r1 = x;
			g1 = 0;
			b1 = c;
		} else if ( 5 <= h_ && 6 > h_ ) {
			r1 = c;
			g1 = 0;
			b1 = x;
		}
	}

	// Find r, g, and b by adding the same amount to each component to match lightness.
	m = l - ( c / 2 );

	// Normalise to range [0,255] by multiplying with 255.
	return [
		Math.round( ( r1 + m ) * 255 ),
		Math.round( ( g1 + m ) * 255 ),
		Math.round( ( b1 + m ) * 255 )
	];
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
	var color = new _twentyTwentyColor( backgroundColor, accentHue );

	// Set the background-color properties.
	color.setBackgroundColorProperties();

	// Set the text-color depending on light/dark background.
	color.textColor = ( color.isDark ) ? '#fff' : '#000';

	color.setAccentHSLs();

	return color;
}
