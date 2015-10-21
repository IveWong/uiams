/*!
 * conf(Server)
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity
 * MIT Licensed
 */

module.exports = {
	server: {
		port: 5000
	},
	router: {
		rootPath: 'src/layout'
	},
	build: {
		_reacthandle: {
			entries: './httpServer/reactRender.js',
			outDir: 'build',
			outputName: 'reactRender.js'
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
