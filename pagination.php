<?php

$posts_pagination = get_the_posts_pagination( array(
	'mid_size'  => 2,
	'prev_text' => sprintf(
		'%s <span class="nav-prev-text">%s</span>',
		'&larr;',
		__( 'Newer Posts', 'twentytwenty' )
	),
	'next_text' => sprintf(
		'<span class="nav-next-text">%s</span> %s',
		__( 'Older Posts', 'twentytwenty' ),
		'&rarr;'
	),
) );

if ( $posts_pagination ) : ?>

	<div class="pagination-wrapper section-inner">

		<?php echo $posts_pagination; ?>

	</div><!-- .pagination-wrapper -->

<?php endif; ?>