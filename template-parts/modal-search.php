<?php
/**
 * Displays the search icon and modal
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

?>
<div class="search-modal cover-modal" data-modal-target-string=".search-modal" aria-expanded="false">

	<div class="search-modal-inner modal-inner">

		<div class="section-inner">

			<?php $unique_id = esc_attr( uniqid( 'search-form-' ) ); ?>

			<form role="search" method="get" class="modal-search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
				<label class="screen-reader-text" for="<?php echo esc_attr( $unique_id ); ?>">
					<?php echo esc_html_x( 'Search for:', 'Label', 'twentytwenty' ); ?>
				</label>
				<input type="search" id="<?php echo esc_attr( $unique_id ); ?>" class="search-field" placeholder="<?php echo esc_attr_x( 'Search for&hellip;', 'Placeholder', 'twentytwenty' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
				<button type="submit" class="search-submit"><?php echo esc_html_x( 'Search', 'Submit button', 'twentytwenty' ); ?></button>
			</form><!-- .search-form -->

			<button class="toggle search-untoggle fill-children-primary" data-toggle-target=".search-modal" data-toggle-screen-lock="true" data-toggle-body-class="showing-search-modal" data-set-focus=".search-modal .search-field">
				<span class="screen-reader-text"><?php esc_html_e( 'Close search', 'twentytwenty' ); ?></span>
				<?php twentytwenty_the_theme_svg( 'cross' ); ?>
			</button><!-- .search-toggle -->

		</div><!-- .section-inner -->

	</div><!-- .search-modal-inner -->

</div><!-- .menu-modal -->
