<?php get_header(); ?>

<main id="site-content">

	<?php

	if ( have_posts() ) :

		while ( have_posts() ) :
			the_post();

			get_template_part( 'content', get_post_type() );

		endwhile;

	endif;

	?>

</main><!-- #site-content -->

<?php get_footer(); ?>
