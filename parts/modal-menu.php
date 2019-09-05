<div class="menu-modal cover-modal" data-modal-target-string=".menu-modal" aria-expanded="false">

	<div class="menu-modal-inner modal-inner">

		<div class="menu-wrapper section-inner">

			<div class="menu-top">

				<ul class="main-menu reset-list-style">
					<?php
					if ( has_nav_menu( 'main-menu' ) ) {
						wp_nav_menu( array(
							'container' 		=> '',
							'items_wrap' 		=> '%3$s',
							'show_toggles'		=> true,
							'theme_location' 	=> 'main-menu',
						) );
					} else {
						wp_list_pages( array( 
							'match_menu_classes' 	=> true,
							'title_li' 				=> false, 
						) );
					}
					?>
				</ul>

			</div><!-- .menu-top -->

			<div class="menu-bottom">

				<?php if ( has_nav_menu( 'social-menu' ) ) : ?>

					<ul class="social-menu reset-list-style social-icons s-icons">

						<?php
						wp_nav_menu( array(
							'theme_location'	=> 'social-menu',
							'container'			=> '',
							'container_class'	=> '',
							'items_wrap'		=> '%3$s',
							'menu_id'			=> '',
							'menu_class'		=> '',
							'depth'				=> 1,
							'link_before'		=> '<span class="screen-reader-text">',
							'link_after'		=> '</span>',
							'fallback_cb'		=> '',
						) );
						?>

					</ul><!-- .social-menu -->

				<?php endif; ?>

			</div><!-- .menu-bottom -->

		</div><!-- .menu-wrapper -->

	</div><!-- .menu-modal-inner -->

</div><!-- .menu-modal -->