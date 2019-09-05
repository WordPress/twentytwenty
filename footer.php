		<footer id="site-footer" role="contentinfo">

			<?php if ( is_active_sidebar( 'footer-one' ) || is_active_sidebar( 'footer-two' ) ) : ?>

				<div class="footer-widgets-outer-wrapper section-inner">
				
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

			<?php endif; 

			$has_footer_menu = has_nav_menu( 'footer-menu' );

			$footer_inner_classes = '';

			if ( $has_footer_menu ) {
				$footer_inner_classes .= ' has-footer-menu';
			}
			
			?>

			<div class="footer-inner section-inner<?php echo esc_attr( $footer_inner_classes ); ?>">

				<?php if ( $has_footer_menu ) : ?>

					<ul class="footer-menu reset-list-style">
						<?php
						wp_nav_menu( array(
							'container' 		=> '',
							'depth'				=> 1,
							'items_wrap' 		=> '%3$s',
							'theme_location' 	=> 'footer-menu',
						) );
						?>
					</ul><!-- .site-nav -->

				<?php endif; ?>

				<div class="footer-credits">

					<p class="footer-copyright">&copy; <?php echo esc_html( date_i18n( __( 'Y', 'twentytwenty' ) ) ); ?> <a href="<?php echo esc_url( home_url() ); ?>"><?php echo bloginfo( 'name' ); ?></a></p>

					<p class="theme-credits color-secondary">
						<?php
						/* Translators: $s = WordPress */
						printf( esc_html_x( 'Powered by %s', 'Translators: $s = name of the theme developer', 'twentytwenty' ), '<a href="https://www.wordpress.org">' . esc_html__( 'WordPress', 'twentytwenty' ) . '</a>' ); ?>
					</p><!-- .theme-credits -->

				</div><!-- .footer-credits -->

			</div><!-- .footer-bottom -->

		</footer><!-- #site-footer -->

		<?php wp_footer(); ?>

    </body>
</html>