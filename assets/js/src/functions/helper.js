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
