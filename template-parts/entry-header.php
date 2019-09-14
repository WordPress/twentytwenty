<?php
/**
 * Displays the post header
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since 1.0.0
 */

?>

<header class="entry-header has-text-align-center">

	<div class="entry-header-inner section-inner medium">

		<?php

		if ( is_singular() ) {
			the_title( '<h1 class="entry-title">', '</h1>' );
		} else {
			the_title( '<h2 class="entry-title heading-size-1"><a href="' . esc_url( get_permalink() ) . '">', '</a></h2>' );
		}

		if ( has_excerpt() ) {
			?>

			<div class="intro-text section-inner thin max-percentage">
				<?php the_excerpt(); ?>
			</div>

			<?php
		}

		// Default to displaying the post meta.
		if ( ! is_search() ) {
			twentytwenty_the_post_meta( get_the_ID(), 'single-top' );
		}

		?>

	</div><!-- .entry-header-inner -->

</header><!-- .entry-header -->
