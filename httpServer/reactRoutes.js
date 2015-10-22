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
		setTimeout(function(){console.log(component)},1000);
		next(true).then(function(result) {
		// console.log(result);
			// return result && React.createElement(HtmlContext, {context: state.context}, result);
		})
		.catch((err) => console.log(err));
		// console.log(component);
		// var cmp = React.createClass({render:function(){return React.createElement('div',null,'Ok')}});
		var cmp2 = React.createElement('div',null,'Ok');
		return cmp2;	
	});

	on('/', page => React.createElement(HtmlContext, null, 'index'));
	on('/user', page => React.createElement(HtmlContext, null, 'user'));

	on('/home', page => React.createElement(HtmlContext, null, HomePage));

	on('error', (state, error) => state.statusCode === 404 ?
		React.createElement(HtmlContext, null, HomePage) :
		React.createElement(HtmlContext, null, null)
	);
});
