/*!
 * render
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity
 * MIT Licensed
 */

require('babel-core/polyfill');
var ReactDOMServer = require('react-dom/server');
var Index = require('../src/layout/Index');
// var Router = require('react-routing/src/Router');

var render = module.exports = ReactDOMServer.renderToString(<Index />);
