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

		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0" >

		<link rel="profile" href="https://gmpg.org/xfn/11">

		<?php wp_head(); ?>

	</head>

	<body <?php body_class(); ?>>

		<?php
		wp_body_open();
		?>

		<header id="site-header" class="header-footer-group">

			<div class="header-inner section-inner">

				<div class="header-titles-wrapper">

					<?php

					// Check whether the header search is activated in the customizer.
					$enable_header_search = get_theme_mod( 'enable_header_search', true );

					if ( true === $enable_header_search ) {

						?>

						<button class="toggle search-toggle mobile-search-toggle" data-toggle-target=".search-modal" data-toggle-screen-lock="true" data-toggle-body-class="showing-search-modal" data-set-focus=".search-modal .search-field" aria-expanded="false">
							<div class="toggle-inner">
								<div class="toggle-icon">
									<?php twentytwenty_the_theme_svg( 'search' ); ?>
								</div>
								<span class="toggle-text"><?php _e( 'Search', 'twentytwenty' ); // phpcs:ignore WordPress.Security.EscapeOutput.UnsafePrintingFunction -- core trusts translations ?></span>
							</div>
						</button><!-- .search-toggle -->

					<?php } ?>

					<div class="header-titles">

						<?php
							// Site title or logo.
							twentytwenty_site_logo();

							// Site description.
							twentytwenty_site_description();
						?>

					</div><!-- .header-titles -->

					<button class="toggle nav-toggle mobile-nav-toggle" data-toggle-target=".menu-modal" data-toggle-screen-lock="true" data-toggle-body-class="showing-menu-modal" aria-expanded="false" data-set-focus=".close-nav-toggle">
						<div class="toggle-inner">
							<div class="toggle-icon">
								<?php twentytwenty_the_theme_svg( 'ellipsis' ); ?>
							</div>
							<span class="toggle-text"><?php _e( 'Menu', 'twentytwenty' ); // phpcs:ignore WordPress.Security.EscapeOutput.UnsafePrintingFunction -- core trusts translations ?></span>
						</div>
					</button><!-- .nav-toggle -->

				</div><!-- .header-titles-wrapper -->

				<div class="header-navigation-wrapper">

					<?php
					if ( has_nav_menu( 'primary' ) || ! has_nav_menu( 'expanded' ) ) {
						?>

							<nav class="primary-menu-wrapper" aria-label="<?php esc_attr_e( 'Horizontal', 'twentytwenty' ); ?>" role="navigation">

								<ul class="primary-menu reset-list-style">

								<?php
								if ( has_nav_menu( 'primary' ) ) {

									wp_nav_menu(
										array(
											'container'  => '',
											'items_wrap' => '%3$s',
											'theme_location' => 'primary',
										)
									);

								} elseif ( ! has_nav_menu( 'expanded' ) ) {

									wp_list_pages(
										array(
											'match_menu_classes' => true,
											'show_sub_menu_icons' => true,
											'title_li' => false,
											'walker'   => new TwentyTwenty_Walker_Page(),
										)
									);

								}
								?>

								</ul>

							</nav><!-- .primary-menu-wrapper -->

						<?php
					}

					$header_toggles_classes = '';

					if ( ! has_nav_menu( 'expanded' ) && false === $enable_header_search ) {
						$header_toggles_classes .= ' hide-on-desktop';
					}
					?>

					<div class="header-toggles hide-no-js<?php echo esc_attr( $header_toggles_classes ); ?>">

						<?php
						$nav_toggle_wrapper_classes = '';

						// Add a class indicating whether the navigation toggle wrapper can be hidden on desktop.
						if ( has_nav_menu( 'expanded' ) ) {
							$nav_toggle_wrapper_classes .= ' has-expanded-menu';
						}
						?>

						<div class="toggle-wrapper nav-toggle-wrapper<?php echo esc_attr( $nav_toggle_wrapper_classes ); ?>">

							<button class="toggle nav-toggle" data-toggle-target=".menu-modal" data-toggle-screen-lock="true" data-toggle-body-class="showing-menu-modal" aria-expanded="false" data-set-focus=".close-nav-toggle">
								<div class="toggle-inner">
									<span class="toggle-text"><?php _e( 'Menu', 'twentytwenty' ); // phpcs:ignore WordPress.Security.EscapeOutput.UnsafePrintingFunction -- core trusts translations ?></span>
									<div class="toggle-icon">
										<?php twentytwenty_the_theme_svg( 'ellipsis' ); ?>
									</div>
								</div>
							</button><!-- .nav-toggle -->

						</div><!-- .nav-toggle-wrapper -->

						<?php
						if ( true === $enable_header_search ) {
							?>

							<div class="toggle-wrapper search-toggle-wrapper">

								<button class="toggle search-toggle" data-toggle-target=".search-modal" data-toggle-screen-lock="true" data-toggle-body-class="showing-search-modal" data-set-focus=".search-modal .search-field" aria-expanded="false">
									<div class="toggle-inner">
										<?php twentytwenty_the_theme_svg( 'search' ); ?>
										<span class="toggle-text"><?php _e( 'Search', 'twentytwenty' ); // phpcs:ignore WordPress.Security.EscapeOutput.UnsafePrintingFunction -- core trusts translations ?></span>
									</div>
								</button><!-- .search-toggle -->

							</div>

							<?php
						}
						?>

					</div><!-- .header-toggles -->

				</div><!-- .header-navigation-wrapper -->

			</div><!-- .header-inner -->

			<?php
			// Output the search modal (if it is activated in the customizer).
			if ( true === $enable_header_search ) {
				get_template_part( 'template-parts/modal-search' );
			}
			?>

		</header><!-- #site-header -->

		<?php
		// Output the menu modal.
		get_template_part( 'template-parts/modal-menu' );
