<?php
/**
 * Language handling.
 *
 * Handle non-latin languegs fallbacks.
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since 1.0.0
 */

if ( ! class_exists( 'TwentyTwenty_Language' ) ) {
	/**
	 * Language handling.
	 */
	class TwentyTwenty_Language {

		/**
		 * Get custom CSS.
		 *
		 * Return CSS for non-latin languagee, if available, or null
		 *
		 * @return string|null
		 */
		public static function load_fallback_languages() {

			switch ( get_bloginfo( 'language' ) ) {
				// Arabic.
				case 'ar':
				case 'ary':
				case 'azb':
				case 'ckb':
				case 'fa-IR':
				case 'haz':
				case 'ps':
					$font_title = 'Tahoma, Arial, sans_serif';
					$font_body  = 'Tahoma, Arial, sans_serif';
					break;
				// Chinese Simplified (China) - Noto Sans SC.
				case 'zh-CN':
					$font_title = '"PingFang SC", "Helvetica Neue", "Microsoft YaHei New", "STHeiti Light", sans-serif';
					$font_body  = '"PingFang SC", "Helvetica Neue", "Microsoft YaHei New", "STHeiti Light", sans-serif';
					break;
				// Chinese Traditional (Taiwan) - Noto Sans TC.
				case 'zh-TW':
					$font_title = '"PingFang TC", "Helvetica Neue", "Microsoft YaHei New", "STHeiti Light", sans-serif';
					$font_body  = '"PingFang TC", "Helvetica Neue", "Microsoft YaHei New", "STHeiti Light", sans-serif';
					break;
				// Chinese (Hong Kong) - Noto Sans HK.
				case 'zh-HK':
					$font_title = '"PingFang HK", "Helvetica Neue", "Microsoft YaHei New", "STHeiti Light", sans-serif';
					$font_body  = '"PingFang HK", "Helvetica Neue", "Microsoft YaHei New", "STHeiti Light", sans-serif';
					break;
				// Cyrillic.
				case 'bel':
				case 'bg-BG':
				case 'kk':
				case 'mk-MK':
				case 'mn':
				case 'ru-RU':
				case 'sah':
				case 'sr-RS':
				case 'tt-RU':
				case 'uk':
					$font_title = '"Helvetica Neue", Helvetica, "Segoe UI", Arial, sans_serif;';
					$font_body  = '"Helvetica Neue", Helvetica, "Segoe UI", Arial, sans_serif;';
					break;
				// Devanagari.
				case 'bn-BD':
				case 'hi-IN':
				case 'mr':
				case 'ne-NP':
					$font_title = 'Arial, sans_serif;';
					$font_body  = 'Arial, sans_serif;';
					break;
				// Greek.
				case 'el':
					$font_title = '"Helvetica Neue", Helvetica, Arial, sans_serif;';
					$font_body  = '"Helvetica Neue", Helvetica, Arial, sans_serif;';
					break;
				// Gujarati.
				case 'gu':
					$font_title = 'Arial, sans_serif;';
					$font_body  = 'Arial, sans_serif;';
					break;
				// Hebrew.
				case 'he-IL':
					$font_title = '"Arial Hebrew", Arial, sans_serif;	';
					$font_body  = '"Arial Hebrew", Arial, sans_serif;	';
					break;
				// Japanese.
				case 'ja':
					$font_title = '"Hiragino Kaku Gothic ProN", "Meiryo", sans-serif;';
					$font_body  = '"Hiragino Kaku Gothic ProN", "Meiryo", sans-serif;';
					break;
				// Korean.
				case 'ko-KR':
					$font_title = '"Apple SD Gothic Neo", "Malgun Gothic", "Nanum Gothic", Dotum, sans-serif;';
					$font_body  = '"Apple SD Gothic Neo", "Malgun Gothic", "Nanum Gothic", Dotum, sans-serif;';
					break;
				// Thai.
				case 'th':
					$font_title = '"Sukhumvit Set", "Helvetica Neue", Helvetica, Arial, sans-serif;';
					$font_body  = '"Sukhumvit Set", "Helvetica Neue", Helvetica, Arial, sans-serif;';
					break;
				// Vietnamese.
				case 'vi':
					$font_title = '"Libre Franklin", sans-serif;';
					$font_body  = '"Libre Franklin", sans-serif;';

					break;
				default:
					return;
			}

			// Prepare CSS for all element except of titles.
			$custom_css = sprintf( '* { font-family: %s !important; } ', $font_body );

			// Prepare CSS for all titles.
			$custom_css .= sprintf( 'h1, h2, h3, h4, h5, h6 { font-family: %s !important; } ', $font_title );

			// Add inline CSS.
			wp_add_inline_style( 'twentytwenty-style', $custom_css );

		}
	}
}
