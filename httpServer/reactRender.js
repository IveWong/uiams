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
		var resData = { _child: '' };
		var context = { hello: 'world'};
		yield reactRoutes.dispatch({ path: this.request, context }, (state, component) => {
			resData._child = ReactDOMServer.renderToString(component);
			this.type = 'text/html';
			this.body = '<!DOCTYPE Html>\n' + ReactDOMServer.renderToStaticMarkup(React.createElement(HtmlContext, resData));

			// this.body = '<!DOCTYPE Html>\n';
		});
	  yield * next
	};
};
