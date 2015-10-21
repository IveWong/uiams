/*!
 * router
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity
 * MIT Licensed
 */

var React = require('react');
var Router = require('react-routing/lib/Router');
var HtmlContext = require('./HtmlContext');

var HomePage = require('../build/pages/HomePage');

module.exports = new Router(on => {
	on('*', (state, next) => {
		const component = next();
		// return component && React.createElement(HtmlContext, {context: state.context}, component);
		return component;
	});

	on('/home', () => React.createElement(HtmlContext, null, HomePage));

	on('error', (state, error) => state.statusCode === 404 ?
		React.createElement(HtmlContext, null, HomePage) :
		React.createElement(HtmlContext, null, null)
	);
});
