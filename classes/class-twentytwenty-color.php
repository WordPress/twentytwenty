<?php
/**
 * Color calculations.
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

if ( ! class_exists( 'TwentyTwenty_Color' ) ) {
	/**
	 * Color Calculations.
	 */
	class TwentyTwenty_Color {

		/**
		 * The HEX color.
		 *
		 * @access protected
		 * @since 1.0.0
		 * @var string
		 */
		protected $hex = '';

		/**
		 * Sets the $hex property of this object.
		 *
		 * @access public
		 * @since 1.0.0
		 * @param string $hex The HEX color.
		 * @return void
		 */
		public function set_hex( $hex ) {
			$this->hex = $this->sanitize_hex( $hex );
		}

		/**
		 * Sanitizes a HEX color.
		 *
		 * @access public
		 * @since 1.0.0
		 * @param string $color The color to sanitize.
		 * @return string
		 */
		public function sanitize_hex( $color ) {

			$color = sanitize_hex_color( maybe_hash_hex_color( $color ) );
			$hex   = ltrim( $color, '#' );

			// Make sure we have 6 digits, we'll need them for the rest of the calculations.
			if ( 3 === strlen( $hex ) ) {
				$hex = substr( $hex, 0, 1 ) . substr( $hex, 0, 1 ) . substr( $hex, 1, 1 ) . substr( $hex, 1, 1 ) . substr( $hex, 2, 1 ) . substr( $hex, 2, 1 );
			}

			return $hex;
		}

		/**
		 * Get RGB as an array from $this->hex.
		 *
		 * @access public
		 * @since 1.0.0
		 * @return array
		 */
		public function get_rgb() {

			return [
				'r' => hexdec( substr( $this->hex, 0, 2 ) ),
				'g' => hexdec( substr( $this->hex, 2, 2 ) ),
				'b' => hexdec( substr( $this->hex, 4, 2 ) ),
			];
		}

		/**
		 * Get sRGB.
		 *
		 * The sRGB space is used to properly calculate relative luminances.
		 *
		 * @access public
		 * @since 1.0.0
		 * @return array
		 */
		public function get_srgb() {
			$rgb = $this->get_rgb();
			return [
				'r' => $rgb['r'] / 255,
				'g' => $rgb['g'] / 255,
				'b' => $rgb['b'] / 255,
			];
		}

		/**
		 * Gets the relative luminance of a color.
		 *
		 * @see https://www.w3.org/WAI/GL/wiki/Relative_luminance
		 * @return number
		 */
		public function get_luminance() {
			$srgb = $this->get_srgb();
			return ( 0.2126 * $srgb['r'] ) + ( 0.7152 * $srgb['g'] ) + ( 0.0722 * $srgb['b'] );
		}
	}
}
