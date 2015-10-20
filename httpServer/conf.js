/*!
 * conf(Server)
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity
 * MIT Licensed
 */


// var dirRoute = require('../tools/dirRoute');

module.exports = {
	server: {
		port: 5000
	},
	router: {
		rootPath: 'src/layout'
	},
	build: {
		_render: {
			srcDir: ['httpServer/render.js', 'httpServer/router.js'],
			outDir: 'build'
		},
		_client: {
			srcPath: 'src/layout/Index.js',
			outPath: 'build'
		},
		_browserify: {
			debug: true,
			basedir: './src/layout',
			outDir: 'build/pages'
		}
	}
};
