<?php
/**
 * A template partial to output pagination for the Twenty Twenty default theme.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

the_posts_pagination(
	array(
		'mid_size'           => 2,
		/**
		 * Translators:
		 * This text contains HTML to allow the text to be shorter on small screens.
		 * The text inside the span with the class nav-short will be hidden on small screens.
		 */
		'prev_text'          => sprintf( '<span class="arrow" aria-hidden="true">%1$s</span><span class="nav-text">%2$s</span>', '&larr; ', __( 'Newer <span class="nav-short">Posts</span>', 'twentytwenty' ) ),
		'next_text'          => sprintf( '<span class="nav-text">%1$s</span><span class="arrow" aria-hidden="true">%2$s</span>', __( 'Older <span class="nav-short">Posts</span>', 'twentytwenty' ), ' &rarr;' ),
		'before_page_number' => sprintf( '<span class="meta-nav screen-reader-text">%s</span>', __( 'Page', 'twentytwenty' ) ),
	)
);
