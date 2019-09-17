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
        // Arabic
        case 'ar': 
        case 'ary': 
        case 'azb': 
        case 'ckb': 
        case 'fa-IR': 
        case 'haz': 
        case 'ps':
          $font_face = "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf') format('truetype'); }";
          $font_title = 'Noto Sans';
          $font_body  = 'Noto Sans';
          break;
        // Chinese
        case 'zh-HK':
        case 'zh-TW':
        case 'zh-CN':
          $font_face = "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf') format('truetype'); }";
          $font_title = 'Noto Sans';
          $font_body  = 'Noto Sans';
            break;
        // Cyrillic
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
          $font_face = "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf') format('truetype'); }";
          $font_title = 'Noto Sans';
          $font_body  = 'Noto Sans';
          break;
        // Devanagari
        case 'bn-BD':
        case 'hi-IN':
        case 'mr':
        case 'ne-NP': 
          $font_face  = "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf') format('truetype'); } ";
          $font_face .= "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf') format('truetype'); } ";
          $font_title = 'Noto Sans';
          $font_body  = 'Noto Sans';
          break;
        // Greek
        case 'el':
          $font_face  = "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf') format('truetype'); } ";
          $font_face .= "@font-face { font-family: 'Noto Sans HK'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans_HK/NotoSansHK-Regular.otf') format('opentype'); } ";
          $font_title = 'Noto Sans';
          $font_body  = 'Noto Sans HK';
          break;
        // Gujarati
        case 'gu':
          $font_face = "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf') format('truetype'); }";
          $font_title = 'Noto Sans';
          $font_body  = 'Noto Sans';
          break;
        // Hebrew
        case 'he-IL':
          $font_face = "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf') format('truetype'); }";
          $font_title = 'Noto Sans';
          $font_body  = 'Noto Sans';
          break;
        // Japanese
        case 'ja':
          $font_face = "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf') format('truetype'); }";
          $font_title = 'Noto Sans';
          $font_body  = 'Noto Sans';
          break;
        // Korean
        case 'ko-KR':
          $font_face = "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf') format('truetype'); }";
          $font_title = 'Noto Sans';
          $font_body  = 'Noto Sans';
          break;
        // Thai
        case 'th':
          $font_face = "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf') format('truetype'); }";
          $font_title = 'Noto Sans';
          $font_body  = 'Noto Sans';
          break;
        // Vietnamese
        case 'vi':
          $font_face = "@font-face { font-family: 'Noto Sans'; font-style:  normal; font-weight: 400; src: url(" . get_stylesheet_directory_uri() . "/assets/fonts/Noto_Sans/NotoSans-Regular.ttf') format('truetype'); }";
          $font_title = 'Noto Sans';
          $font_body  = 'Noto Sans';
          break;
        default:
          return;
      }

      $custom_css = "* { font-family: '" . $font_body . "' !important; }";

      wp_add_inline_style( 'twentytwenty-style', $font_face );
      wp_add_inline_style( 'twentytwenty-style', $custom_css );

    }
  }
}
