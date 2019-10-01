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

	<div class="section-inner thin error404-content">

		<h1 class="entry-title"><?php _e( 'Page Not Found', 'twentytwenty' ); // phpcs:ignore WordPress.Security.EscapeOutput.UnsafePrintingFunction -- core trusts translations ?></h1>

		<div class="intro-text"><p><?php _e( 'The page you were looking for could not be found. It might have been removed, renamed, or did not exist in the first place.', 'twentytwenty' ); // phpcs:ignore WordPress.Security.EscapeOutput.UnsafePrintingFunction -- core trusts translations ?></p></div>

		<?php
		get_search_form(
			array(
				'label' => _x( '404 not found', 'Label', 'twentytwenty' ),
			)
		);
		?>

	</div><!-- .section-inner -->

	<?php get_template_part( 'template-parts/footer-menus-widgets' ); ?>

</main><!-- #site-content -->

<?php
get_footer();
