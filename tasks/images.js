'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = options => {
	return () => {
		return gulp
			.src(options.src, { since: gulp.lastRun(options.taskName) })
			.pipe($.newer(options.dest))
			.pipe(gulp.dest(options.dest));
	};
};
