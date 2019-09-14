<?php
/**
 * The template for displaying the 404 template in the Twenty Twenty theme.
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

get_header();
?>

<main id="site-content" role="main">

	<div class="section-inner thin">

		<h1 class="entry-title"><?php esc_html_e( 'Page Not Found', 'twentytwenty' ); ?></h1>

		<div class="intro-text"><p><?php esc_html_e( 'The page you were looking for could not be found. It might have been removed, renamed, or did not exist in the first place.', 'twentytwenty' ); ?></p></div>

		<?php get_search_form(); ?>

	</div><!-- .section-inner -->

</main><!-- #site-content -->

<?php
get_footer();
