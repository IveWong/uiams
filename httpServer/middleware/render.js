
var router = require('koa-router')();

module.exports = render;

function render(opt){
	if (!(this instanceof render)) {
		return new render(opt);
	};

	this.opt = opt || {};


	// return function *(next){
	// 	return router
	// 		.get('/', function *(state, next){
	// 			this.body = 'Hello,World!';
	// 		})
	// }
};


render.prototype.config = function(){
	router.get('/', function *(state, next){
			this.body = 'Hello,World!';
		})
};

render.prototype.work = function *(next){
	return router.routes;
};
