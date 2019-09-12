<?php
/**
 * A template partial to output pagination for the Twenty Twenty default theme.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

$posts_pagination = get_the_posts_pagination(
	array(
		'mid_size'  => 2,
		/**
		 * Translators:
		* This text contains HTML to allow the text to be shorter on small screens.
		* The text inside the span with the class nav-short will be hidden on small screens.
		*/
		'prev_text' => sprintf(
			'%s <span class="nav-prev-text">%s</span>',
			'&larr;',
			__( 'Newer <span class="nav-short">Posts</span>', 'twentytwenty' )
		),
		'next_text' => sprintf(
			'<span class="nav-next-text">%s</span> %s',
			__( 'Older <span class="nav-short">Posts</span>', 'twentytwenty' ),
			'&rarr;'
		),
	)
);

// If we're only showing one of the next or previous links, add a class indicating so.
if ( strpos( $posts_pagination, 'prev page-numbers' ) === false ) {
	$pagination_classes = ' only-next';
} elseif ( strpos( $posts_pagination, 'next page-numbers' ) === false ) {
	$pagination_classes = ' only-prev';
} else {
	$pagination_classes = '';
}

if ( $posts_pagination ) { ?>

	<div class="pagination-wrapper section-inner">

		<?php echo $posts_pagination; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- already escaped during generation. ?>

	</div><!-- .pagination-wrapper -->

	<?php
}
