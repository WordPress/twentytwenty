<?php get_header(); ?>

<main id="site-content" role="main">

	<div class="section-inner thin">

		<h1 class="archive-title"><?php esc_html_e( 'Page Not Found', 'twentytwenty' ); ?></h1>
			
		<div class="intro-text archive-subtitle"><p><?php esc_html_e( 'The page you were looking for could not be found. It might have been removed, renamed, or did not exist in the first place.', 'twentytwenty' ); ?></p></div>

		<?php get_search_form(); ?>

	</div><!-- .section-inner -->

</main><!-- #site-content -->

<?php get_footer(); ?>
