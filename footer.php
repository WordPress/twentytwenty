		<footer id="site-footer" role="contentinfo">

			<div class="footer-inner section-inner">

				<?php

				$has_footer_menu = has_nav_menu( 'footer-menu' );
				$has_social_menu = has_nav_menu( 'social-menu' );

				$footer_top_classes = '';

				$footer_top_classes .= $has_footer_menu ? ' has-footer-menu' : '';
				$footer_top_classes .= $has_social_menu ? ' has-social-menu' : '';

				if ( $has_footer_menu ) : ?>

					<div class="footer-top<?php echo esc_attr( $footer_top_classes ); ?>">

						<ul class="footer-menu reset-list-style">
							<?php
							wp_nav_menu(
								array(
									'container'      => '',
									'depth'          => 1,
									'items_wrap'     => '%3$s',
									'theme_location' => 'footer-menu',
								)
							);
							?>
						</ul><!-- .site-nav -->

						<?php if ( $has_social_menu ) : ?>

							<div class="footer-social-wrapper">

								<ul class="social-menu footer-social reset-list-style social-icons s-icons">

									<?php
									wp_nav_menu(
										array(
											'theme_location' => 'social-menu',
											'container'   => '',
											'container_class' => '',
											'items_wrap'  => '%3$s',
											'menu_id'     => '',
											'menu_class'  => '',
											'depth'       => 1,
											'link_before' => '<span class="screen-reader-text">',
											'link_after'  => '</span>',
											'fallback_cb' => '',
										)
									);
									?>

								</ul><!-- .social-menu -->

							</div><!-- .footer-social-wrapper -->

						<?php endif; ?>

					</div><!-- .footer-top -->

				<?php endif; ?>

				<?php if ( is_active_sidebar( 'footer-one' ) || is_active_sidebar( 'footer-two' ) ) : ?>

					<div class="footer-widgets-outer-wrapper">
					
						<div class="footer-widgets-wrapper">

							<?php if ( is_active_sidebar( 'footer-one' ) ) : ?>
								<div class="footer-widgets column-one grid-item">
									<?php dynamic_sidebar( 'footer-one' ); ?>
								</div>
							<?php endif; ?>

							<?php if ( is_active_sidebar( 'footer-two' ) ) : ?>
								<div class="footer-widgets column-two grid-item">
									<?php dynamic_sidebar( 'footer-two' ); ?>
								</div>
							<?php endif; ?>

						</div><!-- .footer-widgets-wrapper -->
						
					</div><!-- .footer-widgets-outer-wrapper -->

				<?php endif; ?>

				<div class="footer-bottom">

					<div class="footer-credits">

						<p class="footer-copyright">&copy; <?php echo esc_html( date_i18n( __( 'Y', 'twentytwenty' ) ) ); ?> <a href="<?php echo esc_url( home_url() ); ?>"><?php bloginfo( 'name' ); ?></a></p>

						<p class="powered-by-wordpress">
							<?php
							/* Translators: %s = Link to WordPress.org */
							printf( esc_html_x( 'Powered by %s', 'Translators: %s = Link to WordPress.org', 'twentytwenty' ), '<a href="https://www.wordpress.org">' . esc_html__( 'WordPress', 'twentytwenty' ) . '</a>' );
							?>
						</p><!-- .theme-credits -->

					</div><!-- .footer-credits -->

					<a class="to-the-top" href="#site-header">
						<span class="to-the-top-long">
							<?php
							// Translators: %s = HTML character for an arrow.
							printf( _x( 'To the top %s', '%s = HTML character for an arrow', 'twentytwenty' ), '<span class="arrow">&uarr;</span>' );
							?>
						</span>
						<span class="to-the-top-short">
							<?php
							// Translators: %s = HTML character for an arrow.
							printf( _x( 'Up %s', '%s = HTML character for an arrow', 'twentytwenty' ), '<span class="arrow">&uarr;</span>' );
							?>
						</span>
					</a>

				</div><!-- .footer-bottom -->

			</div><!-- .footer-inner -->

		</footer><!-- #site-footer -->

		<?php wp_footer(); ?>

	</body>
</html>
