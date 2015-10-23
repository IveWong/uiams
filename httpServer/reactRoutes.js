/*!
 * router
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity
 * MIT Licensed
 */

var React = require('react');
var Router = require('react-routing/lib/Router');
var HtmlContext = require('./HtmlContext');
var HomePage = require('../src/layout/HomePage');

// var HomePage = React.createClass({
// 	render: function(){
// 		return React.createElement('h2', null, 'this is home page!')
// 	}
// });

module.exports = new Router(on => {
	// on('*', (state, next) => {
	// 	const component = next();
	// 	return component && React.createElement(HtmlContext, {context: state.context}, component);
	// 	// setTimeout(function(){console.log(next())},1000);
	// 	// next(true).then(function(result) {
	// 	// console.log(next);
	// 	// 	// return result && React.createElement(HtmlContext, {context: state.context}, result);
	// 	// })
	// 	// .catch((err) => console.log(err));
	// 	// console.log(component);
	// 	// var cmp = React.createClass({render:function(){return React.createElement('div',null,'Ok')}});
	// 	// var cmp2 = React.createElement('div',null,'Ok');
	// 	// return cmp2;	
	// });

	on('/', () => React.createElement('div', null, 'index'));
	on('/user', () => React.createElement('div', null, 'user'));

	on('/home', () => React.createElement(HomePage, null));

	on('error', (state, error) => state.statusCode === 404 ?
		React.createElement('div', null, 'Page is not found!') :
		React.createElement('div', null, 'Something error!')
	);
});
