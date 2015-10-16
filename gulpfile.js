/*!
 * httpd
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity. All rights reserved.
 * MIT Licensed
 */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var cp = require('child_process');

var _render = {
	srcPath: 'httpServer/render.js',
	outPath: 'build'
};

gulp.task('default',['buildRender'], function(){
	cp.fork('httpServer/httpd.js', {
		silent: false
	});
});

gulp.task('buildRender', function(){
  return gulp.src(_render.srcPath)
    .pipe(babel())
    .pipe(gulp.dest(_render.outPath));
});
