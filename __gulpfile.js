/*!
 * httpd
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity. All rights reserved.
 * MIT Licensed
 */

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var babelify = require('babelify');
var notify = require('gulp-notify');
var babel = require('gulp-babel');
var cp = require('child_process');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
// var dirRoute = require('./tools/dirRoute');
var bidconf = require('./httpServer/conf').build;
var file = require('./tools/file');

gulp.task('default',['buildServer', 'buildClient'], function(){
	cp.fork('httpServer/httpd.js', {
		silent: false
	});
});

gulp.task('buildServer', function(){
  return gulp.src(bidconf._render.srcDir)
    .pipe(babel())
    .pipe(gulp.dest(bidconf._render.outDir));
});

gulp.task('buildClient', function(callback){
	/*
	 *	map layout-path for browserify's enteris
 	 */
	var layoutPath = './src/layout';
	fs.readdir(layoutPath, function(err, file){
		if (err) {
			console.log(err);
		} else {
			var layoutMap = [];
			for (var i = 0; i < file.length - 1; i++) {
				if (fs.statSync(path.join(__dirname, './src/layout', file[i])).isDirectory()) {
					var cosdir = {};
					cosdir.entries = './' + file[i] + '/' + file[i] + '.jsx';
					cosdir.outputName = file[i] + '.js';
					layoutMap[i] = cosdir;
				};
			}
			console.log(layoutMap);
			var bundleQueue = layoutMap.length;
			var browserifyThis = function(layoutMap){
				// var bundler = browserify({
				// 	basedir: bidconf._browserify.basedir,
				// 	entries: layoutMap.entries,
				// 	extensions: bidconf._browserify.extensions,
				// 	debug: bidconf._browserify.debug,
				// 	cache: {}, packageCache: {}, fullPath: false,
				// });

var bundler = browserify();

				var bundle = function(){
					return bundler
						.bundle()
						.on('error', function(){
							var args = Array.prototype.slice.call(arguments);

							notify.onError({
								title: "Compile Error",
								message: "<%= error.message %>"
							}).apply(this, args);

							this.emit('end');
						})
						.pipe(source(layoutMap.outputName))
						.pipe(gulp.dest(bidconf._browserify.outDir))
						.on('end', reportFinished);
				};

				bundler.transform(babelify());

				// if (config.global.isWatching) {
				// 	bundler = watchify(bundler);
				// 	bundler.on('update', bundle);
				// };
				
				bundler = watchify(bundler);
				bundler.on('update', bundle);

				var reportFinished = function(){
					if (bundleQueue) {
						bundleQueue--;
						if (bundleQueue == 0) {
							callback();
						};
					};
				}

				return bundle();
			};

			layoutMap.forEach(browserifyThis);
		}
	});

})
