/* global require, process */
module.exports = function ( grunt ) {
	grunt.loadNpmTasks( 'grunt-postcss' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.registerTask( 'build:js', ['uglify'] );
	grunt.registerTask( 'build:css', ['postcss'] );
	grunt.registerTask( 'build', ['build:js', 'build:css'] );
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		postcss: {
			options: {
				map: {
					inline: false, // save all sourcemaps as separate files...
				},
				processors: [
					require( 'postcss-url' )({
						url: "rebase"
					}),
					require( 'autoprefixer' )(), // add vendor prefixes
					require( 'cssnano' )() // minify the result
				]
			},
			dist:
				{
					files: [
						{
							src: 'style.css',
							dest: 'assets/dist/css/style.min.css'
						},
						{
							src: 'assets/css/font-awesome.css',
							dest: 'assets/dist/css/font-awesome.min.css'
						}
					]
				}
		},
		uglify: {
			construct: {
				options: {
					sourceMap: true,
					sourceMapName: 'assets/dist/js/construct.min.map'
				},
				files: {
					'assets/dist/js/construct.min.js': ['assets/js/construct.js']
				}
			}
		},
		watch: {
			scripts: {
				files: ['assets/js/*.js'],
				tasks: ['build:js']
			},
			styles: {
				files: ['assets/css/*.css', 'style.css'],
				tasks: ['build:css']
			}
		},
	} );
};