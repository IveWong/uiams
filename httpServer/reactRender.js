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
var HtmlContext = require('./HtmlContext');
var reactRoutes = require('./reactRoutes');

module.exports = function reactRender(){
	return function * (next) {
		var statusCode = 200;
		var resData = { bodyContent: '' };
		var context = { hello: 'world'};
		yield reactRoutes.dispatch({ path: this.request.url }, (state, component) => {
			// console.log(component);
			resData.bodyContent = ReactDOMServer.renderToString(component);
		});
		this.type = 'text/html';
		this.body = '<!doctype html>\n' + ReactDOMServer.renderToStaticMarkup(React.createElement(HtmlContext, resData));
	  yield * next
	};
};
