var config = {
	global: {
		isWatching: true,
		isMinifyCSS: false
	},
	browserSync: {
		server: {
			baseDir: ['./build', './app']
		},
		files: ['./build/**']
	},
	app: {
		src: './app/**',
		build: './build'
	},
	markup: {
		web: './app/web/**',
		style: './app/style/**/*.less'
	}
};
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var cp = require('child_process');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var babel = require('gulp-babel');
var babelify = require('babelify');
var notify = require('gulp-notify');
var less = require('gulp-less');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var buildconf = require('./httpServer/conf').build;
var file = require('./gulp/lib/file');

gulp.task('browserifyCode', function(callback){

	var layoutPath = './src/layout';
	fs.readdir(layoutPath, function(err, file){
		if (err) {
			console.log(err);
		} else {
			var layoutMap = [];
			for (var i = 0; i < file.length; i++) {
				if (fs.statSync(path.join(__dirname, './src/layout', file[i])).isDirectory()) {
					var cosdir = {};
					cosdir.entries = './' + file[i] + '/' + file[i] + '.jsx';
					cosdir.outputName = file[i] + '.js';
					layoutMap.push(cosdir);
				};
			}

			var bundleQueue = layoutMap.length;
			var browserifyThis = function(layoutMap){
				var bundler = browserify({
					cache: {}, packageCache: {}, fullPath: false,
					basedir: buildconf._browserify.basedir,
					entries: layoutMap.entries,
					extensions: buildconf._browserify.extensions,
					debug: buildconf._browserify.debug
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
						.pipe(source(layoutMap.outputName))
						.pipe(gulp.dest(buildconf._browserify.outDir))
						.on('end', reportFinished);
				};

				bundler.transform(babelify.configure());

				if (config.global.isWatching) {
					bundler = watchify(bundler);
					bundler.on('update', bundle);
				};

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

gulp.task('buildPage', ['browserifyCode']);

gulp.task('buildReactHandle', function(){
	browserify(buildconf._reacthandle.entries)
		.transform(babelify)
		.bundle()
		.on('error', function(){
			var args = Array.prototype.slice.call(arguments);

			notify.onError({
				title: "Compile Error",
				message: "<%= error.message %>"
			}).apply(this, args);

			this.emit('end');
		})
		.pipe(source(buildconf._reacthandle.outputName))
		.pipe(gulp.dest(buildconf._reacthandle.outDir));
})

// gulp.task('runBrowserSync', ['buildPage'], function(){
// 	browserSync(config.browserSync);
// })

// gulp.task('lessToCSS', function(){
// 	if (config.global.isMinifyCSS) {
// 		return gulp.src(config.markup.style)
// 			.pipe(less())
// 			.on('error', function(){
// 						var args = Array.prototype.slice.call(arguments);

// 						notify.onError({
// 							title: "Compile Error",
// 							message: "<%= error.message %>"
// 						}).apply(this, args);

// 						this.emit('end');
// 					})
// 			.pipe(minifyCSS())
// 			.pipe(gulp.dest(config.app.build));
// 	} else {
// 		return gulp.src(config.markup.style)
// 			.pipe(less())
// 			.on('error', function(){
// 						var args = Array.prototype.slice.call(arguments);

// 						notify.onError({
// 							title: "Compile Error",
// 							message: "<%= error.message %>"
// 						}).apply(this, args);

// 						this.emit('end');
// 					})
// 			.pipe(gulp.dest(config.app.build));
// 	}
// })

// gulp.task('watchFiles', ['runBrowserSync'], function(){
// 	gulp.watch(config.app.src);
// })

gulp.task('default', ['buildPage', 'buildReactHandle'], function(){
	cp.fork('httpServer/httpd.js', {
		silent: false
	});
});