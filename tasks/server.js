const browserSync = require('browser-sync').create();

module.exports = options => {
	return () => {
		browserSync.init({
			server: {
				baseDir: options.baseDir,
			},
		});
		browserSync.watch(options.watchDir).on('change', browserSync.reload);
	};
};
