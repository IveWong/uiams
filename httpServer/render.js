/*!
 * render
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity
 * MIT Licensed
 */

require('babel-core/polyfill');
var fs = require('fs');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Index = require('../build/Index');
// var Index = require('../src/layout/Index');
// var Router = require('react-routing/src/Router');

module.exports = function render(){
	return function * (next) {
		var _file;
		fs.readdir('src/layout', function(err, file){
			// console.log(file);
			if (!err) _file = file;
		})
    this.body = ReactDOMServer.renderToString(<Index />);
    // this.body = _file;
    yield * next
  }
};
