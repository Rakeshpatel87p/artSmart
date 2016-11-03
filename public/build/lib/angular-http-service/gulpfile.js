'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps');
var path = require('path')
var rename = require('gulp-rename')
var ngAnnotate = require('gulp-ng-annotate');

var del = require('del');

var src = './src';
var dest = './';

gulp.task('default', ['build'])

gulp.task('build', function() {
	return gulp.src(path.join(src, 'angular-http-service.js'))
		.pipe(ngAnnotate())
		.pipe(gulp.dest(dest))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify({mangle: false})) // mangling causes Angular to break
		.pipe(rename({extname: '.min.js'}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(dest));
});

gulp.task('clean', function() {
	return del([
		// clean out the build folder
		dest + '/**/*'
	]);
});
