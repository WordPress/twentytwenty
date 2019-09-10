<?php
/**
 * Twenty Twenty functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

if ( ! function_exists( 'twentytwenty_theme_support' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function twentytwenty_theme_support() {

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// Custom background color.
		add_theme_support(
			'custom-background',
			array(
				'default-color' => 'F5EFE0',
			)
		);

		// Set content-width.
		global $content_width;
		if ( ! isset( $content_width ) ) {
			$content_width = 580;
		}

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// Set post thumbnail size.
		set_post_thumbnail_size( 1200, 9999 );

		// Add custom image sizes
		add_image_size( 'twentytwenty_fullscreen', 1980, 9999 );

		// Custom logo.
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 240,
				'width'       => 320,
				'flex-height' => true,
				'flex-width'  => true,
				'header-text' => array( 'site-title', 'site-description' ),
			)
		);

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);

		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Twenty Nineteen, use a find and replace
		 * to change 'twentynineteen' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'twentytwenty', get_template_directory() . '/languages' );

		// Add support for full and wide align images.
		add_theme_support( 'align-wide' );

	}

	add_action( 'after_setup_theme', 'twentytwenty_theme_support' );

endif;


/**
 * REQUIRED FILES
 * Include required files
 */

// Handle SVG icons.
require get_template_directory() . '/parts/classes/class-svg-icons.php';

// Handle Customizer settings.
require get_template_directory() . '/parts/classes/class-theme-customizer.php';

// Custom comment walker.
require get_template_directory() . '/parts/classes/class-comment-walker.php';

if ( ! function_exists( 'twentytwenty_register_styles' ) ) :
	/**
	 * Register and Enqueue Styles
	 */
	function twentytwenty_register_styles() {

		$theme_version    = wp_get_theme()->get( 'Version' );
		$css_dependencies = array();

		// By default, only load the Font Awesome fonts if the social menu is in use.
		$load_font_awesome = apply_filters( 'twentytwenty_load_font_awesome', has_nav_menu( 'social-menu' ) );

		if ( $load_font_awesome ) {
			wp_register_style( 'twentytwenty-font-awesome', get_template_directory_uri() . '/assets/css/font-awesome.css', false, 1.0, 'all' );
			$css_dependencies[] = 'twentytwenty-font-awesome';
		}

		wp_enqueue_style( 'twentytwenty-style', get_template_directory_uri() . '/style.css', $css_dependencies, $theme_version );

		// Add output of Customizer settings as inline style.
		wp_add_inline_style( 'twentytwenty-style', twentytwenty_get_customizer_css( 'front-end' ) );

	}
	add_action( 'wp_enqueue_scripts', 'twentytwenty_register_styles' );
endif;

if ( ! function_exists( 'twentytwenty_register_scripts' ) ) :
	/**
	 * Register and Enqueue Scripts
	 */
	function twentytwenty_register_scripts() {

		$theme_version = wp_get_theme()->get( 'Version' );

		if ( ( ! is_admin() ) && is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

		$js_dependencies = array( 'jquery' );

		wp_enqueue_script( 'twentytwenty-construct', get_template_directory_uri() . '/assets/js/construct.js', $js_dependencies, $theme_version );

	}
	add_action( 'wp_enqueue_scripts', 'twentytwenty_register_scripts' );
endif;

if ( ! function_exists( 'twentytwenty_menus' ) ) :
	/**
	 * Register navigation menus uses wp_nav_menu in three places
	 */
	function twentytwenty_menus() {

		// Register menus.
		$locations = array(
			'footer-menu'    => __( 'Footer Menu', 'twentytwenty' ),
			'main-menu'      => __( 'Main Menu', 'twentytwenty' ),
			'shortcuts-menu' => __( 'Shortcuts Menu', 'twentytwenty' ),
			'social-menu'    => __( 'Social Menu', 'twentytwenty' ),
		);

		register_nav_menus( $locations );
	}
	add_action( 'init', 'twentytwenty_menus' );
endif;

if ( ! function_exists( 'twentytwenty_body_classes' ) ) :
	/**
	 * Add conditional body classes
	 *
	 * @param  array $classes Body classes.
	 * @return array          An array of body class names
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

		// Check for post thumbnail
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
		if ( $post && ( ( 'post' == $post_type || comments_open() || get_comments_number() ) && ! post_password_required() ) ) {
			$classes[] = 'showing-comments';
		} else {
			$classes[] = 'not-showing-comments';
		}

		// Slim page template class names (class = name - file suffix).
		if ( is_page_template() ) {
			$classes[] = basename( get_page_template_slug(), '.php' );
		}

		return $classes;

	}
	add_filter( 'body_class', 'twentytwenty_body_classes' );
endif;


if ( ! function_exists( 'twentytwenty_no_js_class' ) ) :
	/**
	 * Add No-JS Class
	 * If we're missing JavaScript support, the HTML element will have a no-js class
	 */
	function twentytwenty_no_js_class() {

		?>
		<script>document.documentElement.className = document.documentElement.className.replace( 'no-js', 'js' );</script>
		<?php

	}
	add_action( 'wp_head', 'twentytwenty_no_js_class' );
endif;

if ( ! function_exists( 'twentytwenty_the_custom_logo' ) ) :
	/**
	 * Add and Output Custom Logo
	 *
	 * @param  string $logo_theme_mod Custom Logo.
	 * @return void                 Output Custom Logo
	 */
	function twentytwenty_the_custom_logo( $logo_theme_mod = 'custom_logo' ) {

		echo esc_html( twentytwenty_get_custom_logo( $logo_theme_mod ) );

	}
endif;

if ( ! function_exists( 'twentytwenty_get_custom_logo' ) ) :
	/**
	 * Get Custom logo
	 *
	 * @param  string $logo_theme_mod Get custom logo.
	 * @return string                 Custom Logo
	 */
	function twentytwenty_get_custom_logo( $logo_theme_mod = 'custom_logo' ) {

		// Get the attachment for the specified logo.
		$logo_id = get_theme_mod( $logo_theme_mod );

		if ( ! $logo_id ) {
			return;
		}

		$logo = wp_get_attachment_image_src( $logo_id, 'full' );

		if ( ! $logo ) {
			return;
		}

		// For clarity.
		$logo_url    = esc_url( $logo[0] );
		$logo_width  = esc_attr( $logo[1] );
		$logo_height = esc_attr( $logo[2] );

		// If the retina logo setting is active, reduce the width/height by half.
		if ( get_theme_mod( 'twentytwenty_retina_logo', false ) ) {
			$logo_width  = floor( $logo_width / 2 );
			$logo_height = floor( $logo_height / 2 );
		}

		// CSS friendly class.
		$logo_theme_mod_class = str_replace( '_', '-', $logo_theme_mod );

		// Record our output.
		ob_start();

		?>

		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="custom-logo-link <?php echo esc_attr( $logo_theme_mod_class ); ?>">
			<img src="<?php echo esc_url( $logo_url ); ?>" width="<?php echo esc_attr( $logo_width ); ?>" height="<?php echo esc_attr( $logo_height ); ?>" alt="<?php bloginfo( 'name' ); ?>" />
		</a>

		<?php

		// Return our output.
		return ob_get_clean();

	}
endif;

if ( ! function_exists( 'wp_body_open' ) ) {
	/**
	 * Shim for wp_body_open, ensuring backwards compatibility with versions of WordPress older than 5.2.
	 */
	function wp_body_open() {
		do_action( 'wp_body_open' );
	}
}

if ( ! function_exists( 'twentytwenty_skip_link' ) ) :
	/**
	 * Include a skip to content link at the top of the page so that users can bypass the menu.
	 */
	function twentytwenty_skip_link() {
		echo '<a class="skip-link faux-button" href="#site-content">' . esc_html__( 'Skip to the content', 'twentytwenty' ) . '</a>';
	}
	add_action( 'wp_body_open', 'twentytwenty_skip_link', 5 );
endif;

if ( ! function_exists( 'twentytwenty_sidebar_registration' ) ) :
	/**
	 * Register widget areas.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
	 */
	function twentytwenty_sidebar_registration() {

		// Arguments used in all register_sidebar() calls.
		$shared_args = array(
			'before_title'  => '<h2 class="widget-title subheading heading-size-3">',
			'after_title'   => '</h2>',
			'before_widget' => '<div class="widget %2$s"><div class="widget-content">',
			'after_widget'  => '</div></div>',
		);

		// Footer #1.
		register_sidebar(
			array_merge(
				$shared_args,
				array(
					'name'        => __( 'Footer #1', 'twentytwenty' ),
					'id'          => 'footer-one',
					'description' => __( 'Widgets in this area will be displayed in the first column in the footer.', 'twentytwenty' ),
				)
			)
		);

		// Footer #2.
		register_sidebar(
			array_merge(
				$shared_args,
				array(
					'name'        => __( 'Footer #2', 'twentytwenty' ),
					'id'          => 'footer-two',
					'description' => __( 'Widgets in this area will be displayed in the second column in the footer.', 'twentytwenty' ),
				)
			)
		);

	}
	add_action( 'widgets_init', 'twentytwenty_sidebar_registration' );
endif;

/**
 * Output and Get Theme SVG
 * Output and get the SVG markup for a icon in the TwentyTwenty_SVG_Icons class
 */
if ( ! function_exists( 'twentytwenty_the_theme_svg' ) ) :
	/**
	 * Output and Get Theme SVG
	 * Output and get the SVG markup for a icon in the TwentyTwenty_SVG_Icons class
	 *
	 * @param  string $svg_name SVG Icon name.
	 * @param  string $color    Color code.
	 */
	function twentytwenty_the_theme_svg( $svg_name, $color = '' ) {

		// Escaped in twentytwenty_get_theme_svg();.
		echo twentytwenty_get_theme_svg( $svg_name, $color );

	}
endif;

if ( ! function_exists( 'twentytwenty_get_theme_svg' ) ) :
	/**
	 * Get the SVG icon from TwentyTwenty_SVG_Icons.
	 *
	 * @param  string $svg_name SVG Icon name.
	 * @param  string $color    Color code.
	 */
	function twentytwenty_get_theme_svg( $svg_name, $color = '' ) {

		// Make sure that only our allowed tags and attributes are included.
		$svg = wp_kses(
			TwentyTwenty_SVG_Icons::get_svg( $svg_name, $color ),
			array(
				'svg'     => array(
					'class'       => true,
					'xmlns'       => true,
					'width'       => true,
					'height'      => true,
					'viewbox'     => true,
					'aria-hidden' => true,
					'role'        => true,
					'focusable'   => true,
				),
				'path'    => array(
					'fill'      => true,
					'fill-rule' => true,
					'd'         => true,
					'transform' => true,
				),
				'polygon' => array(
					'fill'      => true,
					'fill-rule' => true,
					'points'    => true,
					'transform' => true,
					'focusable' => true,
				),
			)
		);

		if ( ! $svg ) {
			return false;
		}

		return $svg;

	}
endif;

if ( ! function_exists( 'twentytwenty_is_comment_by_post_author' ) ) :
	/**
	 * Check if the specified comment is written by the author of the post commented on.
	 *
	 * @param  array $comment Comments object.
	 * @return int            Post Author ID
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
endif;

if ( ! function_exists( 'twentytwenty_filter_comment_reply_link' ) ) :
	/**
	 * Filter comment reply link to not JS scroll
	 * Filter the comment reply link to add a class indicating it should not use JS slow-scroll, as it
	 * makes it scroll to the wrong position on the page
	 *
	 * @param  string $link Link.
	 * @return string       Modified link
	 */
	function twentytwenty_filter_comment_reply_link( $link ) {

		$link = str_replace( 'class=\'', 'class=\'do-not-scroll ', $link );
		return $link;

	}
	add_filter( 'comment_reply_link', 'twentytwenty_filter_comment_reply_link' );
endif;

if ( ! function_exists( 'twentytwenty_filter_wp_list_pages_item_classes' ) ) :
	/**
	 * Filter Classes of wp_list_pages items to match menu items
	 * Filter the class applied to wp_list_pages() items with children to match the menu class,
	 * to simplify styling of sub levels in the fallback. Only applied if the match_menu_classes argument is set.
	 *
	 * @param  string[] $css_class An array of CSS classes to be applied to each list item.
	 * @param  WP_Post  $item        Page data object.
	 * @param  int      $depth        Depth of page, used for padding.
	 * @param  array    $args         An array of arguments.
	 * @param  int      $current_page ID of the current page.
	 *
	 * @return array    Filters the list of CSS classes to include with each page item in the list
	 */
	function twentytwenty_filter_wp_list_pages_item_classes( $css_class, $item, $depth, $args, $current_page ) {

		// Only apply to wp_list_pages() calls with match_menu_classes set to true.
		$match_menu_classes = isset( $args['match_menu_classes'] );

		if ( ! $match_menu_classes ) {
			return $css_class;
		}

		// Add current menu item class.
		if ( in_array( 'current_page_item', $css_class ) ) {
			$css_class[] = 'current-menu-item';
		}

		// Add menu item has children class.
		if ( in_array( 'page_item_has_children', $css_class ) ) {
			$css_class[] = 'menu-item-has-children';
		}

		return $css_class;

	}
	add_filter( 'page_css_class', 'twentytwenty_filter_wp_list_pages_item_classes', 10, 5 );
endif;

if ( ! function_exists( 'twentytwenty_the_post_meta' ) ) :
	/**
	 * Get and Output Post Meta
	 * If it's a single post, output the post meta values specified in the Customizer settings.
	 *
	 * @param int    $post_id  The ID of the post for which the post meta should be output.
	 * @param string $location Which post meta location to output – single or preview.
	 */
	function twentytwenty_the_post_meta( $post_id = null, $location = 'single-top' ) {

		// Escaped in twentytwenty_get_post_meta().
		echo twentytwenty_get_post_meta( $post_id, $location );

	}
endif;

if ( ! function_exists( 'twentytwenty_get_post_meta' ) ) :
	/**
	 * Get Post meta
	 * If it's a single post, output the post meta values specified in the Customizer settings.
	 *
	 * @param  int    $post_id  The ID of the post for which the post meta should be output.
	 * @param  string $location Which post meta location to output – single or preview.
	 */
	function twentytwenty_get_post_meta( $post_id = null, $location = 'single-top' ) {

		// Require post ID.
		if ( ! $post_id ) {
			return;
		}

		$page_template = get_page_template_slug( $post_id );

		// Check whether the post type is allowed to output post meta.
		$disallowed_post_types = apply_filters( 'twentytwenty_disallowed_post_types_for_meta_output', array( 'page' ) );
		if ( in_array( get_post_type( $post_id ), $disallowed_post_types ) ) {
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
		if ( $post_meta && ! in_array( 'empty', $post_meta ) ) :

			// Make sure we don't output an empty container.
			$has_meta = false;

			global $post;
			$get_post = get_post( $post_id );
			setup_postdata( $get_post );

			ob_start();

			?>

			<div class="post-meta-wrapper<?php echo esc_attr( $post_meta_wrapper_classes ); ?>">

				<ul class="post-meta<?php echo esc_attr( $post_meta_classes ); ?>">

					<?php

					// Allow output of additional meta items to be added by child themes and plugins.
					do_action( 'twentytwenty_start_of_post_meta_list', $post_meta, $post_id );

					// Author.
					if ( in_array( 'author', $post_meta ) ) :
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
					endif;

					// Post date.
					if ( in_array( 'post-date', $post_meta ) ) :
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
					endif;

					// Categories.
					if ( in_array( 'categories', $post_meta ) && has_category() ) :
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
					endif;

					// Tags.
					if ( in_array( 'tags', $post_meta ) && has_tag() ) :
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
					endif;

					// Comments link.
					if ( in_array( 'comments', $post_meta ) && ! post_password_required() && ( comments_open() || get_comments_number() ) ) :
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
					endif;

					// Sticky.
					if ( in_array( 'sticky', $post_meta ) && is_sticky() ) :
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
					endif;

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

		endif;

		// If we've reached this point, there's nothing to return, so we return nothing.
		return;

	}
endif;

if ( ! function_exists( 'twentytwenty_add_sub_toggles_to_main_menu' ) ) :
	/**
	 * Add a Sub Nav Toggle to the Main Menu
	 *
	 * @param  stdClass $args  An object of wp_nav_menu() arguments.
	 * @param  WP_Post  $item  The current menu item.
	 * @param  int      $depth   Depth of menu item. Used for padding.
	 */
	function twentytwenty_add_sub_toggles_to_main_menu( $args, $item, $depth ) {

		// Add sub menu toggles to the main menu with toggles.
		if ( 'main-menu' == $args->theme_location && isset( $args->show_toggles ) ) {

			// Wrap the menu item link contents in a div, used for positioning.
			$args->before = '<div class="ancestor-wrapper">';
			$args->after  = '';

			// Add a toggle to items with children.
			if ( in_array( 'menu-item-has-children', $item->classes ) ) {

				$toggle_target_string = '.menu-modal .menu-item-' . $item->ID . ' > .sub-menu';

				// Add the sub menu toggle.
				$args->after .= '<button class="toggle sub-menu-toggle fill-children-current-color" data-toggle-target="' . $toggle_target_string . '" data-toggle-type="slidetoggle" data-toggle-duration="250"><span class="screen-reader-text">' . __( 'Show sub menu', 'twentytwenty' ) . '</span>' . twentytwenty_get_theme_svg( 'chevron-down' ) . '</button>';

			}

			// Close the wrapper.
			$args->after .= '</div><!-- .ancestor-wrapper -->';

			// Add sub menu icons to the main menu without toggles (the shortcuts menu).
		} elseif ( 'shortcuts-menu' == $args->theme_location ) {
			if ( in_array( 'menu-item-has-children', $item->classes ) ) {
				$args->after = twentytwenty_get_theme_svg( 'chevron-down' );
			} else {
				$args->after = '';
			}
		}

		return $args;

	}
	add_filter( 'nav_menu_item_args', 'twentytwenty_add_sub_toggles_to_main_menu', 10, 3 );
endif;

if ( ! function_exists( 'twentytwenty_block_editor_styles' ) ) :
	/**
	 * Enqueue supplemental block editor styles.
	 */
	function twentytwenty_block_editor_styles() {

		$css_dependencies = array();

		// Enqueue the editor styles.
		wp_enqueue_style( 'twentytwenty_block_editor_styles', get_theme_file_uri( '/twentytwenty-editor-style-block-editor.css' ), $css_dependencies, wp_get_theme()->get( 'Version' ), 'all' );

		// Add inline style from the Customizer.
		wp_add_inline_style( 'twentytwenty_block_editor_styles', twentytwenty_get_customizer_css( 'block-editor' ) );

	}
	add_action( 'enqueue_block_editor_assets', 'twentytwenty_block_editor_styles', 1, 1 );
endif;

if ( ! function_exists( 'twentytwenty_classic_editor_styles' ) ) :
	/**
	 * Enqueue classic editor styles.
	 */
	function twentytwenty_classic_editor_styles() {

		$classic_editor_styles = array(
			'twentytwenty-editor-style-classic-editor.css',
		);

		add_editor_style( $classic_editor_styles );

	}
	add_action( 'init', 'twentytwenty_classic_editor_styles' );
endif;

if ( ! function_exists( 'twentytwenty_add_classic_editor_customizer_styles' ) ) :
	/**
	 * Output Customizer Settings in the Classic Editor
	 * Adds styles to the head of the TinyMCE iframe. Kudos to @Otto42 for the original solution.
	 *
	 * @param  array $mce_init An array with TinyMCE config.
	 */
	function twentytwenty_add_classic_editor_customizer_styles( $mce_init ) {

		$styles = twentytwenty_get_customizer_css( 'classic-editor' );

		if ( ! isset( $mce_init['content_style'] ) ) {
			$mce_init['content_style'] = $styles . ' ';
		} else {
			$mce_init['content_style'] .= ' ' . $styles . ' ';
		}

		return $mce_init;

	}
	add_filter( 'tiny_mce_before_init', 'twentytwenty_add_classic_editor_customizer_styles' );
endif;

if ( ! function_exists( 'twentytwenty_block_editor_settings' ) ) :
	/**
	 * Block Editor Settings
	 * Add custom colors and font sizes to the block editor
	 */
	function twentytwenty_block_editor_settings() {

		// Block Editor Palette.
		$editor_color_palette = array();

		// Get the color options.
		$twentytwenty_accent_color_options = TwentyTwenty_Customize::twentytwenty_get_color_options();

		// Loop over them and construct an array for the editor-color-palette.
		if ( $twentytwenty_accent_color_options ) {
			foreach ( $twentytwenty_accent_color_options as $color_option_name => $color_option ) {
				$editor_color_palette[] = array(
					'name'  => $color_option['label'],
					'slug'  => $color_option['slug'],
					'color' => get_theme_mod( $color_option_name, $color_option['default'] ),
				);
			}
		}

		// Add the background option.
		$background_color = get_theme_mod( 'background_color' );
		if ( ! $background_color ) {
			$background_color_arr = get_theme_support( 'custom-background' );
			$background_color     = $background_color_arr[0]['default-color'];
		}
		$editor_color_palette[] = array(
			'name'  => __( 'Background Color', 'twentytwenty' ),
			'slug'  => 'background',
			'color' => '#' . $background_color,
		);

		// If we have accent colors, add them to the block editor palette.
		if ( $editor_color_palette ) {
			add_theme_support( 'editor-color-palette', $editor_color_palette );
		}

		// Gutenberg Font Sizes.
		add_theme_support(
			'editor-font-sizes',
			array(
				array(
					'name'      => _x( 'Small', 'Name of the small font size in Gutenberg', 'twentytwenty' ),
					'shortName' => _x( 'S', 'Short name of the small font size in the Gutenberg editor.', 'twentytwenty' ),
					'size'      => 16,
					'slug'      => 'small',
				),
				array(
					'name'      => _x( 'Regular', 'Name of the regular font size in Gutenberg', 'twentytwenty' ),
					'shortName' => _x( 'M', 'Short name of the regular font size in the Gutenberg editor.', 'twentytwenty' ),
					'size'      => 18,
					'slug'      => 'regular',
				),
				array(
					'name'      => _x( 'Large', 'Name of the large font size in Gutenberg', 'twentytwenty' ),
					'shortName' => _x( 'L', 'Short name of the large font size in the Gutenberg editor.', 'twentytwenty' ),
					'size'      => 24,
					'slug'      => 'large',
				),
				array(
					'name'      => _x( 'Larger', 'Name of the larger font size in Gutenberg', 'twentytwenty' ),
					'shortName' => _x( 'XL', 'Short name of the larger font size in the Gutenberg editor.', 'twentytwenty' ),
					'size'      => 32,
					'slug'      => 'larger',
				),
			)
		);

	}
	add_action( 'after_setup_theme', 'twentytwenty_block_editor_settings' );
endif;

if ( ! function_exists( 'twentytwenty_generate_css' ) ) :
	/**
	 * Generate CSS
	 *
	 * @param  string  $selector [description].
	 * @param  string  $style    [description].
	 * @param  string  $value    [description].
	 * @param  string  $prefix   [description].
	 * @param  string  $suffix   [description].
	 * @param  boolean $echo     [description].
	 *
	 * @return string            Generated CSS output
	 */
	function twentytwenty_generate_css( $selector, $style, $value, $prefix = '', $suffix = '', $echo = true ) {
		$return = '';
		if ( ! $value ) {
			return;
		}
		$return = sprintf( '%s { %s: %s; }', $selector, $style, $prefix . $value . $suffix );
		if ( $echo ) {
			echo $return;
		}
		return $return;
	}
endif;

if ( ! function_exists( 'twentytwenty_get_customizer_css' ) ) :
	/**
	 * Get CSS Built from Customizer Options
	 * Build CSS reflecting colors, fonts and other options set in the Customizer, and return them for output
	 *
	 * @param string $type Whether to return CSS for the "front-end", "block-editor" or "classic-editor".
	 */
	function twentytwenty_get_customizer_css( $type = 'front-end' ) {

		// Get variables
		$accent         = sanitize_hex_color( get_theme_mod( 'twentytwenty_accent_color' ) );
		$accent_default = '#CD2653';

		ob_start();

		/*
		  Note – Styles are applied in this order:
				1. Element specific
				2. Helper classes

			This enables all helper classes to overwrite base element styles,
			meaning that any color classes applied in the block editor will
			have a higher priority than the base element styles
		*/

		// Front-End Styles.
		if ( 'front-end' == $type ) {

			// Helper Variables.
			$buttons_targets = apply_filters( 'twentytwenty_buttons_targets_front_end', 'button, .button, .faux-button, .wp-block-button__link, .wp-block-file__button, input[type=\'button\'], input[type=\'reset\'], input[type=\'submit\']' );

			// Colors.
			// Element Specific.
			if ( $accent && $accent !== $accent_default ) :
				twentytwenty_generate_css( 'a, .wp-block-button.is-style-outline', 'color', $accent );
				twentytwenty_generate_css( 'blockquote, .wp-block-button.is-style-outline', 'border-color', $accent );
				twentytwenty_generate_css( $buttons_targets, 'background-color', $accent );
			endif;

			// Helper Classes.
			if ( $accent && $accent !== $accent_default ) :
				twentytwenty_generate_css( '.color-accent, .color-accent-hover:hover, .has-accent-color', 'color', $accent );
				twentytwenty_generate_css( '.bg-accent, .bg-accent-hover:hover, .has-accent-background-color', 'background-color', $accent );
				twentytwenty_generate_css( '.border-color-accent, .border-color-accent-hover:hover', 'border-color', $accent );
				twentytwenty_generate_css( '.fill-children-accent, .fill-children-accent *', 'fill', $accent );
			endif;

			// Block Editor Styles.
		} elseif ( 'block-editor' == $type ) {

			// Colors.
			// Accent color.
			if ( $accent && $accent !== $accent_default ) :
				twentytwenty_generate_css( '.editor-styles-wrapper a', 'color', $accent );
				twentytwenty_generate_css( '.editor-styles-wrapper blockquote, .editor-styles-wrapper .wp-block-quote', 'border-color', $accent, '', ' !important' );
				twentytwenty_generate_css( '.editor-styles-wrapper .wp-block-file .wp-block-file__textlink', 'color', $accent );
				twentytwenty_generate_css( $buttons_targets, 'background', $accent );
				twentytwenty_generate_css( '.editor-styles-wrapper .wp-block-button.is-style-outline .wp-block-button__link', 'border-color', $accent );
				twentytwenty_generate_css( '.editor-styles-wrapper .wp-block-button.is-style-outline .wp-block-button__link', 'color', $accent );
			endif;

		} elseif ( 'classic-editor' == $type ) {

			// Colors.
			// Accent color.
			if ( $accent && $accent !== $accent_default ) :
				twentytwenty_generate_css( 'body#tinymce.wp-editor a', 'color', $accent );
				twentytwenty_generate_css( 'body#tinymce.wp-editor blockquote, body#tinymce.wp-editor .wp-block-quote', 'border-color', $accent, '', ' !important' );
				twentytwenty_generate_css( $buttons_targets, 'background-color', $accent );
			endif;

		}

		// Return the results.
		return ob_get_clean();

	}
endif;

?>
