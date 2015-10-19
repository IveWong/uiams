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

var _render = {
	srcPath: ['httpServer/render.js', 'httpServer/router.js'],
	outPath: 'build'
};

var _client = {
	srcPath: 'src/layout/Index.js',
	outPath: 'build'
};

fs.readdir('src/layout', function(err, file){
	if (err) {
		console.log(err);
	} else {
		for (var i = 0; i < file.length - 1; i++) {
			if (file[i] !== 'common' && fs.statSync(path.join(__dirname, '/src/layout', file[i])).isDirectory()) true;
		}
	}
})

var _browserify = {
	debug: true,
	bundleConfig: [{
		entries: 'src/layout/HomePage/HomePage.jsx',
		dest: 'build/page',
		outputName: 'build/homePage.js'
	}]
};


gulp.task('default',['buildServer', 'buildClient'], function(){
	cp.fork('httpServer/httpd.js', {
		silent: false
	});
});

gulp.task('buildServer', function(){
  return gulp.src(_render.srcPath)
    .pipe(babel())
    .pipe(gulp.dest(_render.outPath));
});

gulp.task('buildClient', function(callback){
	var bundleQueue = _browserify.bundleConfig.length;
	var browserifyThis = function(bundleConfig){
		var bundler = browserify({
			cache: {}, packageCache: {}, fullPath: false,
			entries: bundleConfig.entries,
			extensions: _browserify.extensions,
			debug: _browserify.debug
		});

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
				.pipe(source(bundleConfig.outputName))
				.pipe(gulp.dest(bundleConfig.dest))
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

	_browserify.bundleConfig.forEach(browserifyThis);
})
