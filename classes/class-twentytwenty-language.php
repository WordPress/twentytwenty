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
			$font_face  = [];
			$font_title = [];
			$font_body  = [];
			$custom_css = [];

			switch ( get_bloginfo( 'language' ) ) {
				// Arabic.
				case 'ar':
				case 'ary':
				case 'azb':
				case 'ckb':
				case 'fa-IR':
				case 'haz':
				case 'ps':
					array_push( $font_face, "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf) format('truetype'); }" );
					array_push( $font_title, '"Noto Sans"' );
					array_push( $font_body, '"Noto Sans"' );
					break;
				// Chinese (Hong Kong) - Noto Sans HK.
				case 'zh-HK':
					array_push( $font_face, "@font-face { font-family: 'Noto Sans HK'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans_HK/NotoSansHK-Regular.otf) format('opentype'); }" );
					array_push( $font_title, '"Noto Sans HK"' );
					array_push( $font_title, '"PingFang HK"' );
					array_push( $font_title, '"Helvetica Neue"' );
					array_push( $font_title, '"Microsoft YaHei New"' );
					array_push( $font_title, '"STHeiti Light"' );
					array_push( $font_body, '"Noto Sans HK"' );
					array_push( $font_body, '"PingFang HK"' );
					array_push( $font_body, '"Helvetica Neue"' );
					array_push( $font_body, '"Microsoft YaHei New"' );
					array_push( $font_body, '"STHeiti Light"' );
					break;
				// Chinese Traditional (Taiwan) - Noto Sans TC.
				case 'zh-TW':
					array_push( $font_face, "@font-face { font-family: 'Noto Sans TC'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans_TC/NotoSansTC-Regular.otf) format('opentype'); }" );
					array_push( $font_title, '"Noto Sans TC"' );
					array_push( $font_title, '"PingFang TC"' );
					array_push( $font_title, '"Helvetica Neue"' );
					array_push( $font_title, '"Microsoft YaHei New"' );
					array_push( $font_title, '"STHeiti Light"' );
					array_push( $font_body, '"Noto Sans TC"' );
					array_push( $font_body, '"PingFang TC"' );
					array_push( $font_body, '"Helvetica Neue"' );
					array_push( $font_body, '"Microsoft YaHei New"' );
					array_push( $font_body, '"STHeiti Light"' );
					break;
				// Chinese Simplified (China) - Noto Sans SC.
				case 'zh-CN':
					array_push( $font_face, "@font-face { font-family: 'Noto Sans SC'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans_SC/NotoSansSC-Regular.otf) format('opentype'); }" );
					array_push( $font_title, '"Noto Sans SC"' );
					array_push( $font_title, '"PingFang SC"' );
					array_push( $font_title, '"Helvetica Neue"' );
					array_push( $font_title, '"Microsoft YaHei New"' );
					array_push( $font_title, '"STHeiti Light"' );
					array_push( $font_body, '"Noto Sans SC"' );
					array_push( $font_body, '"PingFang SC"' );
					array_push( $font_body, '"Helvetica Neue"' );
					array_push( $font_body, '"Microsoft YaHei New"' );
					array_push( $font_body, '"STHeiti Light"' );
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
					array_push( $font_face, "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf) format('truetype'); }" );
					array_push( $font_title, '"Noto Sans"' );
					array_push( $font_body, '"Helvetica Neue"' );
					array_push( $font_body, 'Helvetica' );
					array_push( $font_body, '"Segoe UI"' );
					array_push( $font_body, 'Arial' );
					break;
				// Devanagari.
				case 'bn-BD':
				case 'hi-IN':
				case 'mr':
				case 'ne-NP':
					array_push( $font_face, "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf) format('truetype'); } " );
					array_push( $font_title, '"Noto Sans"' );
					array_push( $font_body, '"Noto Sans"' );
					break;
				// Greek.
				case 'el':
					array_push( $font_face, "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf) format('truetype'); } " );
					array_push( $font_face, "@font-face { font-family: 'Noto Sans HK'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans_HK/NotoSansHK-Regular.otf) format('opentype'); } " );
					array_push( $font_title, '"Noto Sans"' );
					array_push( $font_body, 'Noto Sans HK' );
					break;
				// Gujarati.
				case 'gu':
					array_push( $font_face, "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf) format('truetype'); }" );
					array_push( $font_title, '"Noto Sans"' );
					array_push( $font_body, '"Noto Sans"' );
					break;
				// Hebrew.
				case 'he-IL':
					array_push( $font_face, "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf) format('truetype'); }" );
					array_push( $font_title, '"Noto Sans"' );
					array_push( $font_body, '"Noto Sans"' );
					break;
				// Japanese.
				case 'ja':
					array_push( $font_face, "@font-face { font-family: 'Noto Sans JP'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf) format('truetype'); }" );
					array_push( $font_title, 'Noto Sans JP' );
					array_push( $font_body, '"Hiragino Kaku Gothic ProN"' );
					array_push( $font_body, 'Meiryo' );
					break;
				// Korean.
				case 'ko-KR':
					array_push( $font_face, "@font-face { font-family: 'Noto Sans KR'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans_KR/NotoSansKR-Regular.otf) format('opentype'); }" );
					array_push( $font_title, 'Noto Sans KR' );
					array_push( $font_body, 'Noto Sans KR' );
					break;
				// Thai.
				case 'th':
					array_push( $font_face, "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf) format('truetype'); }" );
					array_push( $font_title, '"Noto Sans"' );
					array_push( $font_body, '"Noto Sans"' );
					break;
				// Vietnamese.
				case 'vi':
					array_push( $font_face, "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf) format('truetype'); }" );
					array_push( $font_title, '"Noto Sans"' );
					array_push( $font_body, '"Noto Sans"' );
					break;
				default:
					return;
			}

			// Load font face.
			wp_add_inline_style( 'twentytwenty-style', implode( ' ', $font_face ) );

			// Prepare CSS for all element except of titles.
			array_push( $custom_css, '* { font-family: ' . implode( ', ', $font_body ) . ' sans-serif  !important; }' );

			// Prepare CSS for all titles.
			array_push( $custom_css, 'h1, h2, h3, h4, h5, h6 { font-family: ' . implode( ', ', $font_title ) . ' sans-serif !important; }' );

			// Add inline CSS.
			wp_add_inline_style( 'twentytwenty-style', implode( ' ', $custom_css ) );

		}
	}
}
