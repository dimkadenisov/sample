'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = options => {
	return () => {
		return gulp
			.src(options.src, { since: gulp.lastRun(options.taskName) })
			.pipe(
				$.imagemin([
					$.imagemin.svgo({
						plugins: options.plugins,
					}),
				]),
			)
			.pipe(gulp.dest(options.dest));
	};
};
