<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<?php 
	
	// On the cover page template, output the cover header
	if ( is_page_template( array( 'template-cover.php' ) ) ) : 

		$cover_header_style = '';
		$cover_header_classes = '';

		$color_overlay_style = '';
		$color_overlay_classes = '';

		$image_url = ! post_password_required() ? get_the_post_thumbnail_url( get_the_ID(), 'twentytwenty_fullscreen' ) : '';

		if ( $image_url ) {
			$cover_header_style     = ' style="background-image: url( ' . esc_url( $image_url ) . ' );"';
			$cover_header_classes   = ' bg-image';
		}

		// Get the color used for the color overlay
		$color_overlay_color = get_theme_mod( 'twentytwenty_cover_template_overlay_background_color' );
		if ( $color_overlay_color ) {
			$color_overlay_style = ' style="color: ' . esc_attr( $color_overlay_color ) . ';"';
		} else {
			$color_overlay_style = '';
		}

		// Get the fixed background attachment option
		if ( get_theme_mod( 'twentytwenty_cover_template_fixed_background', true ) ) {
			$cover_header_classes .= ' bg-attachment-fixed';
		}

		// Get the opacity of the color overlay
		$color_overlay_opacity = get_theme_mod( 'twentytwenty_cover_template_overlay_opacity' );
		$color_overlay_opacity = ( $color_overlay_opacity === false ) ? 80 : $color_overlay_opacity;
		$color_overlay_classes .= ' opacity-' . $color_overlay_opacity;

		// Get the blend mode of the color overlay (default = multiply)
		$color_overlay_opacity = get_theme_mod( 'twentytwenty_cover_template_overlay_blend_mode', 'multiply' );
		$color_overlay_classes .= ' blend-mode-' . $color_overlay_opacity;
	
		?>

		<div class="cover-header screen-height screen-width<?php echo esc_attr( $cover_header_classes ); ?>"<?php echo $cover_header_style; ?>>
			<div class="cover-header-inner-wrapper">
				<div class="cover-header-inner">
					<div class="cover-color-overlay color-accent<?php echo esc_attr( $color_overlay_classes ); ?>"<?php echo $color_overlay_style; ?>></div>
					<?php get_template_part( 'parts/page-header' ); ?>
				</div><!-- .cover-header-inner -->
			</div><!-- .cover-header-inner-wrapper -->
		</div><!-- .cover-header -->

		<?php 
	
	// On all other pages, output the regular page header
	else : 
	
		get_template_part( 'parts/page-header' );
		
		if ( has_post_thumbnail() && ! post_password_required() ) : 

			$featured_media_inner_classes = '';

			// Make the featured media thinner on archive pages
			if ( ! is_singular() ) {
				$featured_media_inner_classes .= ' medium';
			}
		
			?>

			<figure class="featured-media">

				<div class="featured-media-inner section-inner<?php echo esc_attr( $featured_media_inner_classes ); ?>">

					<?php 
					
					the_post_thumbnail();

					$caption = get_the_post_thumbnail_caption();
					
					if ( $caption ) : ?>

						<figcaption class="wp-caption-text"><?php echo esc_html( $caption ); ?></figcaption>

					<?php endif; ?>

				</div><!-- .featured-media-inner -->

			</figure><!-- .featured-media -->

		<?php endif; ?>

	<?php endif; ?>

	<div class="post-inner section-inner thin" id="post-inner">

		<div class="entry-content">

			<?php 
			if ( is_search() ) {
				the_excerpt();
			} else {
				the_content();
			}
			wp_link_pages( array(
				'before' => '<nav class="post-nav-links bg-light-background"><span class="label">' . __( 'Pages:', 'twentytwenty' ) . '</span>',
				'after'  => '</nav>',
			) );
			edit_post_link();
			?>

		</div><!-- .entry-content -->

		<?php 
		// Single bottom post meta
		twentytwenty_the_post_meta( get_the_ID(), 'single-bottom' );
		?>

	</div><!-- .post-inner -->

	<?php

	if ( is_single() ) : 

		// Single pagination
		$next_post = get_next_post();
		$prev_post = get_previous_post();

		if ( $next_post || $prev_post ) :

			$pagination_classes = '';

			if ( ! $next_post ) {
				$pagination_classes = ' only-one only-prev';
			} elseif ( ! $prev_post ) {
				$pagination_classes = ' only-one only-next';
			}

			?>

			<nav class="pagination-single section-inner<?php echo esc_attr( $pagination_classes ); ?>">

				<?php if ( $prev_post ) : ?>

					<a class="previous-post" href="<?php echo esc_url( get_permalink( $prev_post->ID ) ); ?>">
						<span class="arrow">&larr;</span>
						<span class="title"><span class="title-inner"><?php echo wp_kses_post( get_the_title( $prev_post->ID ) ); ?></span></span>
					</a>

				<?php endif; ?>

				<?php if ( $next_post ) : ?>

					<a class="next-post" href="<?php echo esc_url( get_permalink( $next_post->ID ) ); ?>">
						<span class="arrow">&rarr;</span>
						<span class="title"><span class="title-inner"><?php echo wp_kses_post( get_the_title( $next_post->ID ) ); ?></span></span>
					</a>

				<?php endif; ?>

			</nav><!-- .single-pagination -->

			<?php

		endif;

	endif;

	// Output comments wrapper if it's a post, or if comments are open, or if there's a comment number – and check for password
	if ( ( $post->post_type == 'post' || comments_open() || get_comments_number() ) && ! post_password_required() ) : ?>

		<div class="comments-wrapper section-inner thin">

			<?php comments_template(); ?>

		</div><!-- .comments-wrapper -->

	<?php endif; ?>

</article><!-- .post -->
