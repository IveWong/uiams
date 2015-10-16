/*!
 * httpd
 * Copyright(c) 2015 Ive Wang
 * Copyright(c) 2015 Jnfinity. All rights reserved.
 * MIT Licensed
 */

import webpack from 'webpack';
import task from './lib/task';
import del from 'del';
import conf from './conf';

export default task('buildRender', async () => {
  await del(['.tmp', 'build/render.js'], {dot: true});
	await async () => new Promise((resolve, reject) => {
		const bundler = webpack(conf);
    let bundlerRunCount = 0;

		function bundle(err, stats) {
    if (err) {
      return reject(err);
    }

    console.log(stats.toString(conf[0].stats));

    if (++bundlerRunCount === (global.WATCH ? conf.length : 1)) {
      return resolve();
    }
  }

  if (global.WATCH) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
	});
});
