/*!
 * httpd
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity. All rights reserved.
 * MIT Licensed
 */

var koa = require('koa');
var reactRender = require('./reactRender');
var sevconf = require('./conf').server;

var httpd = module.exports = koa();

httpd.use(reactRender());

if (!module.parent) httpd.listen(sevconf.port);
console.log('[Success] HTTP Server is runing at http://localhost:' + sevconf.port);
