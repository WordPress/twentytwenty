<header class="entry-header section-inner thin max-percentage has-text-align-center">

	<?php 

	if ( is_front_page() ) {
		the_title( '<div class="entry-title faux-heading heading-size-1">', '</div>' );
	} else {
		the_title( '<h1 class="entry-title">', '</h1>' );
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

			<a href="#post-inner" class="to-the-content">
				<div class="icon fill-children-current-color"><?php twentytwenty_the_theme_svg( 'arrow-down-circled' ); ?></div>
				<div class="text"><?php esc_html_e( 'Scroll Down', 'twentytwenty' ); ?></div>
			</a><!-- .to-the-content -->

		</div><!-- .to-the-content-wrapper -->

		<?php

	} else {

		// Default to displaying the post meta
		twentytwenty_the_post_meta( $post->ID, 'single-top' );

	}

	?>

</header><!-- .entry-header -->