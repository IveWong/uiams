/*!
 * router
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity
 * MIT Licensed
 */

require('babel-core/polyfill');
var fs = require('fs');
var path = require('path');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Router = require('react-routing/lib/Router');
var Index = require('../build/Index');
// var Index = require('../src/layout/Index');

module.exports = function router(){
	return function * (next) {

		var _Pagefile = [];
		
		fs.readdir('src/layout', function(err, file){
			if (err) {
				console.log(err);
			} else {
				for (var i = 0; i < file.length - 1; i++) {
					if (file[i] !== 'common' && fs.statSync(path.join(__dirname, '/../src/layout', file[i])).isDirectory()) _Pagefile.push(file[i]);
				}
			}
		})
		

		const router = new Router(on => {
			on('*', async (state, next) => {
				const component = await next();
				return component && <Index>{component}</Index>;
			});
		});
    this.body = ReactDOMServer.renderToString(<Index />);
    // this.body = _file;
    yield * next
  }
};
