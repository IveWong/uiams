var fs = require('fs');
var path = require('path');
var co = require('co');
var ndir = require('ndir');

var dirRoute;
module.exports = dirRoute;

fs.readdir('src/layout', function(err, file){
	if (err) {
		console.log(err);
	} else {
		for (var i = 0; i < file.length - 1; i++) {
			if (fs.statSync(path.join(__dirname, '../src/layout', file[i])).isDirectory()) {
				var cosdir = {};
				cosdir.entries = './' + file[i] + '/' + file[i] + '.jsx';
				cosdir.outputName = file[i] + '.js';
				bconf[i] = cosdir;
			};
		}
		console.log(bconf);
	}
});

var toDirTree = function(dir){
	var dirTree = {};
	ndir.walk(dir, function onDir(dirpath, files) {
	  for (var i = 0, l = files.length; i < l; i++) {
	    var info = files[i];
	    if (info[1].isFile()) {
	      console.log('   * %s', info[0]);
	    }
	  }
	}, function end() {
	  console.log('walk end.');
	}, function error(err, errPath) {
	  console.error('%s error: %s', errPath, err);
	});
};



// var bconf = [];
// var fn = co.wrap(function* () {
	
// 	return yield Promise.resolve();
// })
// console.log(bconf+'1');

// fn(true).then(function(){
// console.log(bconf+'2');
// });