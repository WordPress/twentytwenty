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
		'prev_text' => sprintf(
			'%s <span class="nav-prev-text">%s</span>',
			'&larr;',
			esc_html( _x( 'Newer Posts', 'previous set of posts' ), 'twentytwenty' )
		),
		'next_text' => sprintf(
			'<span class="nav-next-text">%s</span> %s',
			esc_html( _x( 'Older Posts', 'next set of posts' ), 'twentytwenty' ),
			'&rarr;'
		),
	)
);

if ( $posts_pagination ) : ?>

	<div class="pagination-wrapper section-inner">

		<?php echo $posts_pagination; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- already escaped during generation. ?>

	</div><!-- .pagination-wrapper -->

<?php endif; ?>
