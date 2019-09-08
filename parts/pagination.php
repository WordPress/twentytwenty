<?php
/**
 * Pagination for archives
 *
 * This is the template that displays the pagination.
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

$posts_pagination = get_the_posts_pagination(
	array(
		'mid_size'  => 2,
		'prev_text' => sprintf(
			'%s <span class="nav-prev-text">%s</span>',
			'&larr;',
			__( 'Newer Posts', 'twentytwenty' )
		),
		'next_text' => sprintf(
			'<span class="nav-next-text">%s</span> %s',
			__( 'Older Posts', 'twentytwenty' ),
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

if ( $posts_pagination ) {
	?>

	<div class="pagination-wrapper section-inner<?php echo esc_attr( $pagination_classes ); ?>">

		<?php echo $posts_pagination; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

	</div><!-- .pagination-wrapper -->

	<?php
}
