<?php
/**
 * Custom template tags for this theme.
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

/**
 * Table of Contents:
 * Comments
 * Post Meta
 * Menus
 * Classes
 */

/**
 * Comments
 */
if ( ! function_exists( 'twentytwenty_is_comment_by_post_author' ) ) {
	/**
	 * Check if the specified comment is written by the author of the post commented on.
	 *
	 * @param object $comment Comment data.
	 */
	function twentytwenty_is_comment_by_post_author( $comment = null ) {

		if ( is_object( $comment ) && $comment->user_id > 0 ) {

			$user = get_userdata( $comment->user_id );
			$post = get_post( $comment->comment_post_ID );

			if ( ! empty( $user ) && ! empty( $post ) ) {

				return $comment->user_id === $post->post_author;

			}
		}
		return false;

	}
}

if ( ! function_exists( 'twentytwenty_filter_comment_reply_link' ) ) {

	/**
	 * Filter comment reply link to not JS scroll.
	 * Filter the comment reply link to add a class indicating it should not use JS slow-scroll, as it
	 * makes it scroll to the wrong position on the page.
	 *
	 * @param string $link Link to the top of the page.
	 */
	function twentytwenty_filter_comment_reply_link( $link ) {

		$link = str_replace( 'class=\'', 'class=\'do-not-scroll ', $link );
		return $link;

	}

	add_filter( 'comment_reply_link', 'twentytwenty_filter_comment_reply_link' );

}

/**
 * Post Meta
 */
if ( ! function_exists( 'twentytwenty_the_post_meta' ) ) {
	/**
	 * Get and Output Post Meta.
	 * If it's a single post, output the post meta values specified in the Customizer settings.
	 *
	 * @param int    $post_id The ID of the post for which the post meta should be output.
	 * @param string $location Which post meta location to output – single or preview.
	 */
	function twentytwenty_the_post_meta( $post_id = null, $location = 'single-top' ) {

		echo twentytwenty_get_post_meta( $post_id, $location ); //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in twentytwenty_get_post_meta().

	}
}

if ( ! function_exists( 'twentytwenty_get_post_meta' ) ) {

	/**
	 * Get the post meta.
	 *
	 * @param int    $post_id The iD of the post.
	 * @param string $location The location where the meta is shown.
	 */
	function twentytwenty_get_post_meta( $post_id = null, $location = 'single-top' ) {

		// Require post ID.
		if ( ! $post_id ) {
			return;
		}

		$page_template = get_page_template_slug( $post_id );

		// Check whether the post type is allowed to output post meta.
		$disallowed_post_types = apply_filters( 'twentytwenty_disallowed_post_types_for_meta_output', array( 'page' ) );
		if ( in_array( get_post_type( $post_id ), $disallowed_post_types, true ) ) {
			return;
		}

		$post_meta_wrapper_classes = '';
		$post_meta_classes         = '';

		// Get the post meta settings for the location specified.
		if ( 'single-top' === $location ) {

			$post_meta                 = apply_filters(
				'twentytwenty_post_meta_location_single_top',
				array(
					'author',
					'post-date',
					'comments',
				)
			);
			$post_meta_wrapper_classes = ' post-meta-single post-meta-single-top';

		} elseif ( 'single-bottom' === $location ) {

			$post_meta                 = apply_filters(
				'twentytwenty_post_meta_location_single_bottom',
				array(
					'tags',
				)
			);
			$post_meta_wrapper_classes = ' post-meta-single post-meta-single-bottom';

		}

		// If the post meta setting has the value 'empty', it's explicitly empty and the default post meta shouldn't be output.
		if ( $post_meta && ! in_array( 'empty', $post_meta, true ) ) {

			// Make sure we don't output an empty container.
			$has_meta = false;

			global $post;
			$the_post = get_post( $post_id );
			setup_postdata( $the_post );

			ob_start();

			?>

			<div class="post-meta-wrapper<?php echo esc_attr( $post_meta_wrapper_classes ); ?>">

				<ul class="post-meta<?php echo esc_attr( $post_meta_classes ); ?>">

					<?php

					// Allow output of additional meta items to be added by child themes and plugins.
					do_action( 'twentytwenty_start_of_post_meta_list', $post_meta, $post_id );

					// Author.
					if ( in_array( 'author', $post_meta, true ) ) {

						$has_meta = true;
						?>
						<li class="post-author meta-wrapper">
							<span class="meta-icon">
								<span class="screen-reader-text"><?php esc_html_e( 'Post author', 'twentytwenty' ); ?></span>
								<?php twentytwenty_the_theme_svg( 'user' ); ?>
							</span>
							<span class="meta-text">
								<?php
								// Translators: %s = the author name.
								printf( esc_html_x( 'By %s', '%s = author name', 'twentytwenty' ), '<a href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author_meta( 'nickname' ) ) . '</a>' );
								?>
							</span>
						</li>
						<?php

					}

					// Post date.
					if ( in_array( 'post-date', $post_meta, true ) ) {

						$has_meta = true;
						?>
						<li class="post-date">
							<a class="meta-wrapper" href="<?php the_permalink(); ?>">
								<span class="meta-icon">
									<span class="screen-reader-text"><?php esc_html_e( 'Post date', 'twentytwenty' ); ?></span>
									<?php twentytwenty_the_theme_svg( 'calendar' ); ?>
								</span>
								<span class="meta-text">
									<?php the_time( get_option( 'date_format' ) ); ?>
								</span>
							</a>
						</li>
						<?php

					}

					// Categories.
					if ( in_array( 'categories', $post_meta, true ) && has_category() ) {

						$has_meta = true;
						?>
						<li class="post-categories meta-wrapper">
							<span class="meta-icon">
								<span class="screen-reader-text"><?php esc_html_e( 'Post categories', 'twentytwenty' ); ?></span>
								<?php twentytwenty_the_theme_svg( 'folder' ); ?>
							</span>
							<span class="meta-text">
								<?php esc_html_e( 'In', 'twentytwenty' ); ?> <?php the_category( ', ' ); ?>
							</span>
						</li>
						<?php

					}

					// Tags.
					if ( in_array( 'tags', $post_meta, true ) && has_tag() ) {

						$has_meta = true;
						?>
						<li class="post-tags meta-wrapper">
							<span class="meta-icon">
								<span class="screen-reader-text"><?php esc_html_e( 'Tags', 'twentytwenty' ); ?></span>
								<?php twentytwenty_the_theme_svg( 'tag' ); ?>
							</span>
							<span class="meta-text">
								<?php the_tags( '', ', ', '' ); ?>
							</span>
						</li>
						<?php

					}

					// Comments link.
					if ( in_array( 'comments', $post_meta, true ) && ! post_password_required() && ( comments_open() || get_comments_number() ) ) {

						$has_meta = true;
						?>
						<li class="post-comment-link meta-wrapper">
							<span class="meta-icon">
								<?php twentytwenty_the_theme_svg( 'comment' ); ?>
							</span>
							<span class="meta-text">
								<?php comments_popup_link(); ?>
							</span>
						</li>
						<?php

					}

					// Sticky.
					if ( in_array( 'sticky', $post_meta, true ) && is_sticky() ) {

						$has_meta = true;
						?>
						<li class="post-sticky meta-wrapper">
							<span class="meta-icon">
								<?php twentytwenty_the_theme_svg( 'bookmark' ); ?>
							</span>
							<span class="meta-text">
								<?php esc_html_e( 'Sticky post', 'twentytwenty' ); ?>
							</span>
						</li>
						<?php

					}

					// Allow output of additional post meta types to be added by child themes and plugins.
					do_action( 'twentytwenty_end_of_post_meta_list', $post_meta, $post_id );

					?>

				</ul><!-- .post-meta -->

			</div><!-- .post-meta-wrapper -->

			<?php

			wp_reset_postdata();

			$meta_output = ob_get_clean();

			// If there is meta to output, return it.
			if ( $has_meta && $meta_output ) {

				return $meta_output;

			}
		}

	}
}

/**
 * Menus
 */
if ( ! function_exists( 'twentytwenty_filter_wp_list_pages_item_classes' ) ) {
	/**
	 * Filter Classes of wp_list_pages items to match menu items.
	 * Filter the class applied to wp_list_pages() items with children to match the menu class, to simplify.
	 * styling of sub levels in the fallback. Only applied if the match_menu_classes argument is set.
	 *
	 * @param string $css_class CSS Class names.
	 * @param string $item Comment.
	 * @param int    $depth Depth of the current comment.
	 * @param array  $args An array of arguments.
	 * @param string $current_page Wether or not the item is the current item.
	 */
	function twentytwenty_filter_wp_list_pages_item_classes( $css_class, $item, $depth, $args, $current_page ) {

		// Only apply to wp_list_pages() calls with match_menu_classes set to true.
		$match_menu_classes = isset( $args['match_menu_classes'] );

		if ( ! $match_menu_classes ) {
			return $css_class;
		}

		// Add current menu item class.
		if ( in_array( 'current_page_item', $css_class, true ) ) {
			$css_class[] = 'current-menu-item';
		}

		// Add menu item has children class.
		if ( in_array( 'page_item_has_children', $css_class, true ) ) {
			$css_class[] = 'menu-item-has-children';
		}

		return $css_class;

	}

	add_filter( 'page_css_class', 'twentytwenty_filter_wp_list_pages_item_classes', 10, 5 );

}

if ( ! function_exists( 'twentytwenty_add_sub_toggles_to_main_menu' ) ) {
	/**
	 * Add a Sub Nav Toggle to the Main Menu.
	 *
	 * @param array  $args An array of arguments.
	 * @param string $item Menu item.
	 * @param int    $depth Depth of the current menu item.
	 */
	function twentytwenty_add_sub_toggles_to_main_menu( $args, $item, $depth ) {

		// Add sub menu toggles to the main menu with toggles.
		if ( 'main-menu' === $args->theme_location && isset( $args->show_toggles ) ) {

			// Wrap the menu item link contents in a div, used for positioning.
			$args->before = '<div class="ancestor-wrapper">';
			$args->after  = '';

			// Add a toggle to items with children.
			if ( in_array( 'menu-item-has-children', $item->classes, true ) ) {

				$toggle_target_string = '.menu-modal .menu-item-' . $item->ID . ' > .sub-menu';

				// Add the sub menu toggle.
				$args->after .= '<button class="toggle sub-menu-toggle fill-children-current-color" data-toggle-target="' . $toggle_target_string . '" data-toggle-type="slidetoggle" data-toggle-duration="250"><span class="screen-reader-text">' . __( 'Show sub menu', 'twentytwenty' ) . '</span>' . twentytwenty_get_theme_svg( 'chevron-down' ) . '</button>';

			}

			// Close the wrapper.
			$args->after .= '</div><!-- .ancestor-wrapper -->';

			// Add sub menu icons to the main menu without toggles (the shortcuts menu).
		} elseif ( 'shortcuts-menu' === $args->theme_location ) {
			if ( in_array( 'menu-item-has-children', $item->classes, true ) ) {
				$args->after = twentytwenty_get_theme_svg( 'chevron-down' );
			} else {
				$args->after = '';
			}
		}

		return $args;

	}

	add_filter( 'nav_menu_item_args', 'twentytwenty_add_sub_toggles_to_main_menu', 10, 3 );

}

/**
 * Classes
 */

if ( ! function_exists( 'twentytwenty_no_js_class' ) ) {
	/**
	 * Add No-JS Class.
	 * If we're missing JavaScript support, the HTML element will have a no-js class.
	 */
	function twentytwenty_no_js_class() {

		?>
		<script>document.documentElement.className = document.documentElement.className.replace( 'no-js', 'js' );</script>
		<?php

	}

	add_action( 'wp_head', 'twentytwenty_no_js_class' );

}

if ( ! function_exists( 'twentytwenty_body_classes' ) ) {
	/**
	 * Add conditional body classes.
	 *
	 * @param string $classes Classes added to the body tag.
	 */
	function twentytwenty_body_classes( $classes ) {

		global $post;
		$post_type = isset( $post ) ? $post->post_type : false;

		// Check whether we're singular.
		if ( is_singular() ) {
			$classes[] = 'singular';
		}

		// Check whether the current page should have an overlay header.
		if ( is_page_template( array( 'template-cover.php' ) ) ) {
			$classes[] = 'overlay-header';
		}

		// Check whether the current page has full-width content.
		if ( is_page_template( array( 'template-full-width.php' ) ) ) {
			$classes[] = 'has-full-width-content';
		}

		// Check for disabled search.
		if ( get_theme_mod( 'twentytwenty_disable_header_search', false ) ) {
			$classes[] = 'disable-search-modal';
		}

		// Check for post thumbnail.
		if ( is_singular() && has_post_thumbnail() ) {
			$classes[] = 'has-post-thumbnail';
		} elseif ( is_singular() ) {
			$classes[] = 'missing-post-thumbnail';
		}

		// Check whether we're in the customizer preview.
		if ( is_customize_preview() ) {
			$classes[] = 'customizer-preview';
		}

		// Check if posts have single pagination.
		if ( is_single() && ( get_next_post() || get_previous_post() ) ) {
			$classes[] = 'has-single-pagination';
		} else {
			$classes[] = 'has-no-pagination';
		}

		// Check if we're showing comments.
		if ( $post && ( ( 'post' === $post_type || comments_open() || get_comments_number() ) && ! post_password_required() ) ) {
			$classes[] = 'showing-comments';
		} else {
			$classes[] = 'not-showing-comments';
		}

		// Check if avatars are visible.
		$classes[] = get_option( 'show_avatars' ) ? 'show-avatars' : 'hide-avatars';

		// Slim page template class names (class = name - file suffix).
		if ( is_page_template() ) {
			$classes[] = basename( get_page_template_slug(), '.php' );
		}

		return $classes;

	}

	add_filter( 'body_class', 'twentytwenty_body_classes' );

}
