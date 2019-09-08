export function twentytwentyToggleAttribute( element, attribute, trueVal = true, falseVal = false ) {
	if ( element[ attribute ] !== trueVal ) {
		element.setAttribute( attribute, trueVal );
	} else {
		element.setAttribute( attribute, falseVal );
	}
}

export const getQueryStringValue = () => {
	const vars = [];
	let hash;
	const hashes = window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ).split( '&' );
	for ( let i = 0; i < hashes.length; i++ ) {
		hash = hashes[ i ].split( '=' );
		vars.push( hash[ 0 ] );
		vars[ hash[ 0 ] ] = hash[ 1 ];
	}
	return vars;
};

const slideUp = ( target, duration ) => {
	target.style.transitionProperty = 'height, margin, padding'; /* [1.1] */
	target.style.transitionDuration = duration + 'ms'; /* [1.2] */
	target.style.boxSizing = 'border-box'; /* [2] */
	target.style.height = target.offsetHeight + 'px'; /* [3] */
	target.style.height = 0; /* [4] */
	target.style.paddingTop = 0; /* [5.1] */
	target.style.paddingBottom = 0; /* [5.2] */
	target.style.marginTop = 0; /* [6.1] */
	target.style.marginBottom = 0; /* [7.2] */
	target.style.overflow = 'hidden'; /* [7] */
	window.setTimeout( () => {
		target.style.display = 'none'; /* [8] */
		target.style.removeProperty( 'height' ); /* [9] */
		target.style.removeProperty( 'padding-top' ); /* [10.1] */
		target.style.removeProperty( 'padding-bottom' ); /* [10.2] */
		target.style.removeProperty( 'margin-top' ); /* [11.1] */
		target.style.removeProperty( 'margin-bottom' ); /* [11.2] */
		target.style.removeProperty( 'overflow' ); /* [12] */
		target.style.removeProperty( 'transition-duration' ); /* [13.1] */
		target.style.removeProperty( 'transition-property' ); /* [13.2] */
	}, duration );
};

const slideDown = ( target, duration ) => {
	target.style.removeProperty( 'display' ); /* [1] */
	let display = window.getComputedStyle( target ).display;
	if ( display === 'none' ) { /* [2] */
		display = 'block';
	}
	target.style.display = display;

	const height = target.offsetHeight; /* [3] */
	target.style.height = 0; /* [4] */
	target.style.paddingTop = 0; /* [5.1] */
	target.style.paddingBottom = 0; /* [5.2] */
	target.style.marginTop = 0; /* [6.1] */
	target.style.marginBottom = 0; /* [6.2] */
	target.style.overflow = 'hidden'; /* [7] */

	target.style.boxSizing = 'border-box'; /* [8] */
	target.style.transitionProperty = 'height, margin, padding'; /* [9.1] */
	target.style.transitionDuration = duration + 'ms'; /* [9.2] */
	target.style.height = height + 'px'; /* [10] */
	target.style.removeProperty( 'padding-top' ); /* [11.1] */
	target.style.removeProperty( 'padding-bottom' ); /* [11.2] */
	target.style.removeProperty( 'margin-top' ); /* [12.1] */
	target.style.removeProperty( 'margin-bottom' ); /* [12.2] */

	window.setTimeout( () => {
		target.style.removeProperty( 'height' ); /* [13] */
		target.style.removeProperty( 'overflow' ); /* [14] */
		target.style.removeProperty( 'transition-duration' ); /* [15.1] */
		target.style.removeProperty( 'transition-property' ); /* [15.2] */
	}, duration );
};

export const slideToggle = ( target, duration = 500 ) => {
	if ( window.getComputedStyle( target ).display === 'none' ) {
		return slideDown( target, duration );
	}
	return slideUp( target, duration );
};
/**
 * traverses the DOM up to find elements matching the query
 *
 * @param {HTMLElement} target
 * @param {string} query
 * @return {NodeList} parents matching query
 */
export const findParents = ( target, query ) => {
	const parents = [];

	// recursively go up the DOM adding matches to the parents array
	const traverse = ( item ) => {
		const parent = item.parentNode;
		if ( parent instanceof HTMLElement ) {
			if ( parent.matches( query ) ) {
				parents.push( parent );
			}
			traverse( parent );
		}
	};

	traverse( target );

	return parents;
};

Math.easeInOutQuad = function( t, b, c, d ) {
	t /= d / 2;
	if ( t < 1 ) {
		return c / 2 * t * t + b;
	}
	t--;
	return -c / 2 * ( t * ( t - 2 ) - 1 ) + b;
};

Math.easeInCubic = function( t, b, c, d ) {
	const tc = ( t /= d ) * t * t;
	return b + c * ( tc );
};

Math.inOutQuintic = function( t, b, c, d ) {
	const ts = ( t /= d ) * t,
		tc = ts * t;
	return b + c * ( 6 * tc * ts + -15 * ts * ts + 10 * tc );
};

export const scrollTo = ( to, callback, duration ) => {
	// because it's so fucking difficult to detect the scrolling element, just move them all
	function move( amount ) {
		document.documentElement.scrollTop = amount;
		document.body.parentNode.scrollTop = amount;
		document.body.scrollTop = amount;
	}

	function position() {
		return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
	}
	const start = position(),
		change = to - start,
		increment = 20;
	let currentTime = 0;
	duration = ( typeof ( duration ) === 'undefined' ) ? 500 : duration;
	const animateScroll = function() {
		// increment the time
		currentTime += increment;
		// find the value with the quadratic in-out easing function
		const val = Math.easeInOutQuad( currentTime, start, change, duration );
		// move the document.body
		move( val );
		// do the animation unless its over
		if ( currentTime < duration ) {
			window.requestAnimationFrame( animateScroll );
		} else if ( callback && typeof ( callback ) === 'function' ) {
			// the animation is done so lets callback
			callback();
		}
	};
	animateScroll();
};
