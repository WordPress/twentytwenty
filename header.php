<?php
/**
 * Header file for the Twenty Twenty WordPress default theme.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

?>
<!DOCTYPE html>

<html class="no-js" <?php language_attributes(); ?>>

	<head>

		<meta http-equiv="content-type" content="<?php bloginfo( 'html_type' ); ?>" charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" >

		<link rel="profile" href="https://gmpg.org/xfn/11">

		<?php wp_head(); ?>

	</head>

	<body <?php body_class(); ?>>

		<?php
		wp_body_open();
		?>

		<header id="site-header">

			<div class="header-inner section-inner">

				<div class="header-titles-wrapper">

					<button class="toggle search-toggle mobile-search-toggle" data-toggle-target=".search-modal" data-toggle-screen-lock="true" data-toggle-body-class="showing-search-modal" data-set-focus=".search-modal .search-field" aria-expanded="false">
						<span class="screen-reader-text"><?php esc_html_e( 'Toggle search', 'twentytwenty' ); ?></span>
						<?php twentytwenty_the_theme_svg( 'search' ); ?>
					</button><!-- .search-toggle -->

					<div class="header-titles">

						<?php

						$logo             = twentytwenty_get_custom_logo();
						$site_title       = get_bloginfo( 'name' );
						$site_description = get_bloginfo( 'description' );

						if ( $logo ) {
							$home_link_contents = $logo . '<span class="screen-reader-text">' . esc_html( $site_title ) . '</span>';
							$site_title_class   = 'site-logo';
						} else {
							$site_title_class   = 'site-title';
							$home_link_contents = '<a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html( $site_title ) . '</a>';
						}

						if ( is_front_page() || is_home() ) {
							?>
							<h1 class="<?php echo esc_attr( $site_title_class ); ?>"><?php echo $home_link_contents; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped during generation. ?></h1>
						<?php } else { ?>
							<div class="<?php echo esc_attr( $site_title_class ); ?> faux-heading"><?php echo $home_link_contents; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped prior to this point. ?></div>
						<?php } ?>

						<?php if ( $site_description ) { ?>

							<div class="site-description"><?php echo esc_html( $site_description ); ?></div><!-- .site-description -->

						<?php } ?>

					</div><!-- .header-titles -->

					<button class="toggle nav-toggle mobile-nav-toggle" data-toggle-target=".menu-modal" data-toggle-screen-lock="true" data-toggle-body-class="showing-menu-modal" aria-expanded="false" data-set-focus=".menu-modal">
						<span class="screen-reader-text"><?php esc_html_e( 'Toggle menu', 'twentytwenty' ); ?></span>
						<?php twentytwenty_the_theme_svg( 'ellipsis' ); ?>
					</button><!-- .nav-toggle -->

				</div><!-- .header-titles-wrapper -->

				<div class="header-navigation-wrapper">

						<div class="primary-menu-wrapper">

							<nav aria-label="<?php esc_attr_e( 'Primary', 'twentytwenty' ); ?>">

								<ul class="primary-menu color-accent reset-list-style">

								<?php
								if ( has_nav_menu( 'primary' ) ) {

									wp_nav_menu(
										array(
											'container'      => '',
											'items_wrap'     => '%3$s',
											'theme_location' => 'primary',
										)
									);

								} else {

									wp_list_pages(
										array(
											'match_menu_classes' => true,
											'title_li'           => false,
										)
									);

								}
								?>

								</ul>

							</nav><!-- .primary-menu -->

						</div><!-- .primary-menu-wrapper -->

					<div class="header-toggles hide-no-js">

						<div class="toggle-wrapper nav-toggle-wrapper">

							<button class="toggle nav-toggle" data-toggle-target=".menu-modal" data-toggle-screen-lock="true" data-toggle-body-class="showing-menu-modal" aria-expanded="false" data-set-focus=".menu-modal">
								<span class="screen-reader-text"><?php esc_html_e( 'Toggle menu', 'twentytwenty' ); ?></span>
								<?php twentytwenty_the_theme_svg( 'ellipsis' ); ?>
							</button><!-- .nav-toggle -->

						</div><!-- .nav-toggle-wrapper -->

						<?php

						// Check whether the header search is deactivated in the customizer.
						$disable_header_search = get_theme_mod( 'twentytwenty_disable_header_search', false );

						if ( ! $disable_header_search ) {
							?>

							<div class="toggle-wrapper search-toggle-wrapper">

								<button class="toggle search-toggle" data-toggle-target=".search-modal" data-toggle-screen-lock="true" data-toggle-body-class="showing-search-modal" data-set-focus=".search-modal .search-field" aria-expanded="false">
									<span class="screen-reader-text"><?php esc_html_e( 'Toggle search', 'twentytwenty' ); ?></span>
									<?php twentytwenty_the_theme_svg( 'search' ); ?>
								</button><!-- .search-toggle -->

							</div>

							<?php
						}
						?>

					</div><!-- .header-toggles -->

				</div><!-- .header-navigation-wrapper -->

			</div><!-- .header-inner -->

			<?php
			// Output the search modal (if it isn't deactivated in the customizer).
			if ( ! $disable_header_search ) {
				get_template_part( 'template-parts/modal-search' );
			}
			?>

		</header><!-- #site-header -->

		<?php
		// Output the menu modal.
		get_template_part( 'template-parts/modal-menu' );

