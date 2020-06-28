'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const combiner = require('stream-combiner2').obj;
const prettify = require('gulp-jsbeautifier');

module.exports = options => {
	return () => {
		return combiner(
			gulp.src(options.src),
			$.pug(),
			prettify(),
			gulp.dest(options.dest),
		).on(
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
