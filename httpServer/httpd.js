/*!
 * httpd
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity. All rights reserved.
 * MIT Licensed
 */

var koa = require('koa');
var render = require('./render');
var SERVERCONF = require('./conf');

var httpd = module.exports = koa();

httpd.use(render());

if (!module.parent) httpd.listen(SERVERCONF.port);
