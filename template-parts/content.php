<?php
/**
 * The default template for displaying content
 *
 * Used for both singular and index.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

?>

<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<?php

	get_template_part( 'template-parts/entry-header' );

	get_template_part( 'template-parts/featured-image' );

	?>

	<div class="post-inner section-inner thin" id="post-inner">

		<div class="entry-content">

			<?php
			if ( is_search() ) {
				the_excerpt();
			} else {
				the_content();
			}

			wp_link_pages(
				array(
					'before' => '<nav class="post-nav-links bg-light-background" aria-label="' . esc_attr__( 'Page', 'twentytwenty' ) . '"><span class="label">' . __( 'Pages:', 'twentytwenty' ) . '</span>',
					'after'  => '</nav>',
				)
			);

			edit_post_link();
			?>

		</div><!-- .entry-content -->

		<?php
		// Single bottom post meta.
		twentytwenty_the_post_meta( $post->ID, 'single-bottom' );
		?>

	</div><!-- .post-inner -->

	<?php

	if ( is_single() ) {

		get_template_part( 'template-parts/navigation' );

	}

	/**
	 *  Output comments wrapper if it's a post, or if comments are open,
	 * or if there's a comment number – and check for password.
	 * */
	if ( ( 'post' === $post->post_type || comments_open() || get_comments_number() ) && ! post_password_required() ) {
		?>

		<div class="comments-wrapper section-inner thin">

			<?php comments_template(); ?>

		</div><!-- .comments-wrapper -->

		<?php
	}
	?>

</article><!-- .post -->
