'use strict';

const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;
const svgSprite = require('gulp-svg-sprite');
const $ = require('gulp-load-plugins')();

module.exports = options => {
	return () => {
		return combiner(
			gulp.src(options.src),
			$.plumber(),
			svgSprite(options.config),
			gulp.dest(options.dest),
		);
	};
};
