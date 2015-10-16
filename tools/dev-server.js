/*!
 * httpd
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity. All rights reserved.
 * MIT Licensed
 */

import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import task from './lib/task';
import fs from './lib/fs';
import { _client_conf, _server_conf, _browsersync_conf } from './conf';

global.WATCH = true;
const bundler = webpack(_client_conf);

export default task('startd', async () => {
 //  await fs.makeDir('build/public');
	// await require('./buildRender')();
	// await require('./buildClient')();

	browserSync({
  	proxy: {
    	target :_browsersync_conf.proxyTarget,
    	middleware: [
    	  webpackDevMiddleware(bundler, {
    	  	// IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: _client_conf.output.publicPath,

          // Pretty colored output
          stats: _client_conf.stats

          // For other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
    	  }),
    	  webpackHotMiddleware(bundler)
    	]
  	},

  	// no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
  	files: [
  	  'build/public/*.css',
  	  'build/public/*.html'
  	]
	});
});
