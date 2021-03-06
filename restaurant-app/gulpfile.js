var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

gulp.task('css', function() {
	return gulp.src('css/*.css')
		.pipe(sourcemaps.init())
		.pipe(concatCss('app.min.css'))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/css'));
});

gulp.task('js', function() {
	return gulp.src([
		'js/indexController.js',
		'js/idb.js',
		'js/IDbOperationsHelper.js',
		'js/dbhelper.js'
		]).pipe(sourcemaps.init())
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failOnError last.
		// .pipe(eslint.failOnError())
		.pipe(concat('app.js'))
		.pipe(minify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/js'));
});



gulp.task('browsersync', function() {
    return browserSync.init({
    	server: {
			baseDir   : './',
	      	index     : 'index.html'
	    },
	    port        : 8080,
	    files       : './**',
	    open        : true
	    });
});

gulp.task('default', gulp.parallel('css', 'js', 'browsersync', function() {
	gulp.watch('css/*.css', gulp.parallel('css'));
	gulp.watch('js/*.js', gulp.parallel('js'));
}));
