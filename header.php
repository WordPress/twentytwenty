<!DOCTYPE html>

<html class="no-js" <?php language_attributes(); ?>>

	<head>

		<meta http-equiv="content-type" content="<?php bloginfo( 'html_type' ); ?>" charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" >

		<link rel="profile" href="http://gmpg.org/xfn/11">

		<?php wp_head(); ?>

	</head>

	<body <?php body_class(); ?>>

		<a class="skip-link screen-reader-text faux-button" href="#site-content"><?php _e( 'Skip to the content', 'twentytwenty' ); ?></a>

		<?php 
		if ( function_exists( 'wp_body_open' ) ) {
			wp_body_open(); 
		}
		?>

		<header id="site-header">

			<div class="header-inner">

				<div class="section-inner">

					<div class="header-titles">

						<?php

						$logo = twentytwenty_get_custom_logo();
						$site_title = get_bloginfo( 'name' );
						$site_description = get_bloginfo( 'description' );

						if ( $logo ) {
							$home_link_contents = $logo . '<span class="screen-reader-text">' . esc_html( $site_title ) . '</span>';
							$site_title_class = 'site-logo';
						} else {
							$site_title_class = 'site-title';
							$home_link_contents = '<a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html( $site_title ) . '</a>';
						}

						if ( is_front_page() ) : ?>
							<h1 class="<?php echo esc_attr( $site_title_class ); ?>"><?php echo $home_link_contents; ?></h1>
						<?php else : ?>
							<div class="<?php echo esc_attr( $site_title_class ); ?> faux-heading"><?php echo $home_link_contents; ?></div>
						<?php endif; ?>

						<?php if ( $site_description ) : ?>

							<div class="site-description"><?php echo esc_html( $site_description ); ?></div><!-- .site-description -->

						<?php endif; ?>

					</div><!-- .header-titles -->

					<div class="header-navigation-wrapper">

						<div class="main-menu-alt-container hide-js">

							<ul class="main-menu-alt reset-list-style">
								<?php
								if ( has_nav_menu( 'main-menu' ) ) {
									wp_nav_menu( array(
										'container' 		=> '',
										'items_wrap' 		=> '%3$s',
										'theme_location' 	=> 'main-menu',
									) );
								} else {
									wp_list_pages( array( 
										'match_menu_classes' 	=> true,
										'title_li' 				=> false, 
									) );
								}
								?>
							</ul><!-- .main-menu-alt -->

						</div><!-- .main-menu-alt-container -->

						<div class="header-toggles hide-no-js">

							<?php 
							
							// Check whether the header search is deactivated in the customizer
							$disable_header_search = get_theme_mod( 'twentytwenty_disable_header_search', false ); 
							
							if ( ! $disable_header_search ) : ?>
							
								<a href="#" class="toggle search-toggle" data-toggle-target=".search-modal" data-toggle-screen-lock="true" data-toggle-body-class="showing-search-modal" data-set-focus=".search-modal .search-field" aria-pressed="false">
									<div class="toggle-text">
										<?php esc_html_e( 'Search', 'twentytwenty' ); ?>
									</div>
									<?php twentytwenty_the_theme_svg( 'search' ); ?>
								</a><!-- .search-toggle -->

							<?php endif; ?>

							<a href="#" class="toggle nav-toggle" data-toggle-target=".menu-modal" data-toggle-screen-lock="true" data-toggle-body-class="showing-menu-modal" aria-pressed="false" data-set-focus=".menu-modal">
								<div class="toggle-text">
									<span class="show"><?php esc_html_e( 'Menu', 'twentytwenty' ); ?></span>
									<span class="hide"><?php esc_html_e( 'Close', 'twentytwenty' ); ?></span>
								</div>
								<div class="bars">
									<div class="bar"></div>
									<div class="bar"></div>
									<div class="bar"></div>
								</div><!-- .bars -->
							</a><!-- .nav-toggle -->

						</div><!-- .header-toggles -->

					</div><!-- .header-navigation-wrapper -->

				</div><!-- .section-inner -->

			</div><!-- .header-inner -->

			<?php 
			// Output the search modal (if it isn't deactivated in the customizer)
			if ( ! $disable_header_search ) {
				get_template_part( 'parts/modal-search' );
			}
			?>

		</header><!-- #site-header -->

		<?php 
		// Output the menu modal
		get_template_part( 'parts/modal-menu' ); 
		?>