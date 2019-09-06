<header class="entry-header has-text-align-center">

	<div class="entry-header-inner section-inner thin max-percentage">

		<?php 

		if ( is_front_page() ) {
			the_title( '<div class="entry-title faux-heading heading-size-1"><a href="' . esc_url( get_permalink() ) . '">', '</a></div>' );
		} else {
			the_title( '<h1 class="entry-title"><a href="' . esc_url( get_permalink() ) . '">', '</a></h1>' );
		}

		if ( has_excerpt() ) : ?>

			<div class="intro-text section-inner thin max-percentage">
				<?php the_excerpt(); ?>
			</div>

			<?php 
		endif;

		// On pages with the cover template, display a "To the content" link
		if ( is_page() && is_page_template( array( 'template-cover.php' ) ) ) {
			?>

			<div class="to-the-content-wrapper">

				<a href="#post-inner" class="to-the-content fill-children-current-color">
					<?php twentytwenty_the_theme_svg( 'arrow-down-circled' ); ?>
					<div class="screen-reader-text"><?php esc_html_e( 'Scroll Down', 'twentytwenty' ); ?></div>
				</a><!-- .to-the-content -->

			</div><!-- .to-the-content-wrapper -->

			<?php

		} else {

			// Default to displaying the post meta
			twentytwenty_the_post_meta( $post->ID, 'single-top' );

		}

		?>

	</div><!-- .entry-header-inner -->

</header><!-- .entry-header -->