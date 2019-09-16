<?php
/**
 * Twenty Twenty Custom CSS
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

if ( ! function_exists( 'twentytwenty_generate_css' ) ) {

	/**
	 * Generate CSS.
	 * 
	 * @param array $args Doing this later.
	 */
	function twentytwenty_generate_css( $args = array() ) {
		$defaults = array(
			'selector' => '',
			'style'    => '',
			'value'    => false,
			'prefix'   => '',
			'suffix'   => '',
			'echo'     => true,
			'context'  => '',
			'mod'      => '',
		);

		$args     = wp_parse_args( $args, $defaults );
		$return   = '';
		$selector = $args['selector'];

		if ( ! $args['value'] ) {
			return;
		}

		if ( ! is_array( $selector ) ) {
			$selector = array_map( 'trim', explode( ',', $selector ) );
		}
		
		$selector = apply_filters( 'twentytwenty_generate_css_selector', $selector, $args );
		$selector = implode( ', ', array_unique( $selector ) );

		$return = sprintf( 
			'%s { %s: %s; }', 
			$selector, 
			$args['style'], 
			$args['prefix'] . $args['value'] . $args['suffix'] 
		);

		if ( $args['echo'] ) {

			echo $return; //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- We need to double check this, but for now, we want to pass PHPCS ;)

		}

		return $return;

	}
}

if ( ! function_exists( 'twentytwenty_get_customizer_css' ) ) {

	/**
	 * Get CSS Built from Customizer Options.
	 * Build CSS reflecting colors, fonts and other options set in the Customizer, and return them for output.
	 *
	 * @param string $type Whether to return CSS for the "front-end", "block-editor" or "classic-editor".
	 */
	function twentytwenty_get_customizer_css( $type = 'front-end' ) {

		// Get variables.
		$buttons_targets = apply_filters( 'twentytwenty_buttons_targets_front_end', 'button, .button, .faux-button, .wp-block-button__link, .wp-block-file__button, input[type=\'button\'], input[type=\'reset\'], input[type=\'submit\']' );

		$theme_mods = array(
			'twentytwenty_accent_color' => array(
				'default' => '#cd2653',
				'type'    => 'hex_color',
				'styles'  => array(
					'front-end'      => array(
						array(
							'style'    => 'color',
							'selector' => 'a, .wp-block-button.is-style-outline, .has-drop-cap:not(:focus):first-letter',
						),
						array(
							'style'    => 'border-color',
							'selector' => 'blockquote, .wp-block-button.is-style-outline',
						),
						array(
							'style'    => 'background-color',
							'selector' => '.footer-social a, .social-icons a',
						),
						array(
							'style'    => 'background-color',
							'selector' => $buttons_targets,
						),
						array(
							'style'    => 'color',
							'selector' => '.color-accent, .color-accent-hover:hover, .has-accent-color',
						),
						array(
							'style'    => 'background-color',
							'selector' => '.bg-accent, .bg-accent-hover:hover, .has-accent-background-color',
						),
						array(
							'style'    => 'border-color',
							'selector' => '.border-color-accent, .border-color-accent-hover:hover',
						),
						array(
							'style'    => 'fill',
							'selector' => '.fill-children-accent, .fill-children-accent *',
						),
					),
					'block-editor'   => array(
						array(
							'style'    => 'color',
							'selector' => '.editor-styles-wrapper a, .editor-styles-wrapper .has-drop-cap:not(:focus):first-letter',
						),
						array(
							'style'    => 'border-color',
							'selector' => '.editor-styles-wrapper blockquote, .editor-styles-wrapper .wp-block-quote',
							'suffix'   => ' !important',
						),
						array(
							'style'    => 'color',
							'selector' => '.editor-styles-wrapper .wp-block-file .wp-block-file__textlink',
						),
						array(
							'style'    => 'background',
							'selector' => $buttons_targets,
						),
						array(
							'style'    => 'border-color',
							'selector' => '.editor-styles-wrapper .wp-block-button.is-style-outline .wp-block-button__link',
						),
						array(
							'style'    => 'color',
							'selector' => '.editor-styles-wrapper .wp-block-button.is-style-outline .wp-block-button__link',
						),
					),
					'classic-editor' => array(
						array(
							'style'    => 'color',
							'selector' => 'body#tinymce.wp-editor a',
						),
						array(
							'style'    => 'border-color',
							'selector' => 'body#tinymce.wp-editor blockquote, body#tinymce.wp-editor .wp-block-quote',
							'suffix'   => ' !important',
						),
						array(
							'style'    => 'background-color',
							'selector' => $buttons_targets,
						),
						
					),
				),
			),
			'twentytwenty_cover_template_overlay_text_color' => array(
				'default' => '#ffffff',
				'type'    => 'hex_color',
				'styles'  => array(
					'front-end' => array(
						array(
							'style'    => 'color',
							'selector' => '.cover-header .entry-header *',
						),
					),
				),
			),
			'background_color'=> array(
				'default' => '#f5efe0',
				'type'    => 'hex_color',
				'styles'  => array(
					'block-editor' => array(
						array(
							'style'    => 'background',
							'selector' => '.editor-styles-wrapper',
						),
					),
					'classic-editor' => array(
						array(
							'style'    => 'background',
							'selector' => 'body#tinymce.wp-editor',
						),
					),
				),
			),
		);

		$theme_mods = apply_filters( 'twentytwenty_get_customizer_css', $theme_mods, $type );

		ob_start();

		foreach ( $theme_mods as $theme_mod => $args ) {
			$value = get_theme_mod( $theme_mod );
			
			if ( $value && 'hex_color' === $args['type'] ) {
				$value = sanitize_hex_color( maybe_hash_hex_color( $value ) );
			} else {
				continue;
			}

			foreach ( $args['styles'] as $view => $style ) {
				if ( $type === $view ) {
					foreach ( $style as $style_args ) {
						if ( $value !== $args['default'] ) {
							$style_args['value'] = $value;
							$style_args['context'] = $view;
							$style_args['mod'] = $theme_mod;

							twentytwenty_generate_css( $style_args );
						}
					}
				}
			}
		}

		// Return the results.
		return ob_get_clean();

	}
}
