<?php

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
*/
if ( post_password_required() ) {
	return;
}

if ( $comments ) : ?>

	<div class="comments section-inner thin max-percentage no-margin" id="comments">

		<?php

		$comments_number = absint( get_comments_number() );

		// Translators: %s = the number of comments
		$comments_title = sprintf( _nx( '%s Comment', '%s Comments', $comments_number, 'Translators: %s = the number of comments', 'twentytwenty' ), $comments_number );

		?>

		<div class="comments-header">

			<h3 class="comment-reply-title"><?php echo esc_html( $comments_title ); ?></h3>

		</div><!-- .comments-header -->

		<?php

		wp_list_comments(
			array(
				'walker'      => new TwentyTwenty_Walker_Comment(),
				'avatar_size' => 120,
				'style'       => 'div',
			)
		);

		$comment_pagination = paginate_comments_links(
			array(
				'echo'      => false,
				'end_size'  => 0,
				'mid_size'  => 0,
				'next_text' => __( 'Newer Comments', 'twentytwenty' ) . ' &rarr;',
				'prev_text' => '&larr; ' . __( 'Older Comments', 'twentytwenty' ),
			)
		);

		if ( $comment_pagination ) :

			// If we're only showing the "Next" link, add a class indicating so
			if ( strpos( $comment_pagination, 'prev page-numbers' ) === false ) {
				$pagination_classes = ' only-next';
			} else {
				$pagination_classes = '';
			}
			?>

			<nav class="comments-pagination pagination<?php echo esc_attr( $pagination_classes ); ?>">
				<?php echo wp_kses_post( $comment_pagination ); ?>
			</nav>

		<?php endif; ?>

	</div><!-- comments -->

	<?php
endif;

if ( comments_open() || pings_open() ) :

	comment_form(
		array(
			'class_form'           => 'section-inner thin max-percentage no-margin',
			'comment_notes_before' => '',
			'comment_notes_after'  => '',
		)
	);

elseif ( is_single() ) : ?>

	<div class="comment-respond" id="respond">

		<p class="comments-closed"><?php esc_html_e( 'Comments are closed.', 'twentytwenty' ); ?></p>

	</div><!-- #respond -->

<?php endif; ?>
