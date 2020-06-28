'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combiner = require('stream-combiner2').obj;

module.exports = options => {
	return () => {
		return combiner(gulp.src([options.src]), gulp.dest(options.dest)).on(
			'error',
			$.notify.onError(function(err) {
				return {
					title: options.taskName,
					message: err.message,
				};
			}),
		);
	};
};
