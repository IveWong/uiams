
var router = require('koa-router')();

router.get('*', function *(){ this.body = 'yeah!'; });
