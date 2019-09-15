<?php
/**
 * Displays the menu icon and modal
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

?>

<div class="menu-modal cover-modal" data-modal-target-string=".menu-modal" aria-expanded="false">

	<div class="menu-modal-inner modal-inner">

		<div class="menu-wrapper section-inner">

			<div class="menu-top">

				<nav aria-label="<?php esc_attr_e( 'Expanded', 'twentytwenty' ); ?>">

					<ul class="main-menu reset-list-style">
						<?php
						if ( has_nav_menu( 'expanded' ) ) {
							wp_nav_menu(
								array(
									'container'      => '',
									'items_wrap'     => '%3$s',
									'show_toggles'   => true,
									'theme_location' => 'expanded',
								)
							);
						}
						?>
					</ul>

				</nav>

			</div><!-- .menu-top -->

			<div class="menu-bottom">

				<?php if ( has_nav_menu( 'social' ) ) { ?>

					<nav aria-label="<?php esc_attr_e( 'Expanded Social links', 'twentytwenty' ); ?>">
						<ul class="social-menu reset-list-style social-icons s-icons">

							<?php
							wp_nav_menu(
								array(
									'theme_location'  => 'social',
									'container'       => '',
									'container_class' => '',
									'items_wrap'      => '%3$s',
									'menu_id'         => '',
									'menu_class'      => '',
									'depth'           => 1,
									'link_before'     => '<span class="screen-reader-text">',
									'link_after'      => '</span>',
									'fallback_cb'     => '',
								)
							);
							?>

						</ul>
					</nav><!-- .social-menu -->

				<?php } ?>

			</div><!-- .menu-bottom -->

		</div><!-- .menu-wrapper -->

	</div><!-- .menu-modal-inner -->

</div><!-- .menu-modal -->
