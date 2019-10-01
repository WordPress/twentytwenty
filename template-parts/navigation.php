<?php
/**
 * Displays the next and previous post navigation in single posts.
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

echo '<hr class="styled-separator nav-separator is-style-wide" aria-hidden="true" />';
the_post_navigation(
	array(
		'prev_text' => '<span class="arrow" aria-hidden="true">&larr;</span><span class="screen-reader-text">' . __( 'Previous post:', 'twentytwenty' ) . '</span><span class="post-title">%title</span>',
		'next_text' => '<span class="arrow" aria-hidden="true">&rarr;</span><span class="screen-reader-text">' . __( 'Next post:', 'twentytwenty' ) . '</span><span class="post-title">%title</span>',
	)
);
echo '<hr class="styled-separator nav-separator is-style-wide" aria-hidden="true" />';
