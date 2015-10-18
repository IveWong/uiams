/*!
 * render
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity
 * MIT Licensed
 */

require('babel-core/polyfill');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Index = require('../build/Index');
// var Index = require('../src/layout/Index');
// var Router = require('react-routing/src/Router');

module.exports = function render(){
	return function * (next) {
    this.body = ReactDOMServer.renderToString(<Index />);
    yield * next
  }
};
