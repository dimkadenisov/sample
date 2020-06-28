'use strict';

const gulp = require('gulp');

//--------------
//--------------
//--------------
//--------------

function lazyRequireTask(taskName, path, options = {}) {
	options.taskName = taskName;
	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);
		return task(callback);
	});
}

//--------------
//--------------
//--------------
//--------------

lazyRequireTask('pug', './tasks/pug', {
	src: 'src/pug/pages/*.pug',
	dest: 'dist',
});

lazyRequireTask('styles', './tasks/styles', {
	src: 'src/styles/sсss/main.scss',
	dest: 'dist/styles',
});

lazyRequireTask('styles:libs', './tasks/styles:libs', {
	src: 'src/styles/libraries/*.*',
	dest: 'dist/styles/libraries',
});

lazyRequireTask('scripts', './tasks/scripts', {
	src: 'src/scripts/components/*.js',
	base: 'src',
	dest: 'dist/scripts',
});

lazyRequireTask('scripts:libs', './tasks/copy', {
	src: 'src/scripts/libraries/*.js',
	dest: 'dist/scripts/libraries',
});

lazyRequireTask('svg:min', './tasks/svg:min', {
	src: 'src/assets/icons/*.svg',
	dest: 'dist/assets/icons',
	plugins: [
		{ cleanupAttrs: true },
		{ inlineStyles: true },
		{ removeDoctype: true },
		{ removeXMLProcInst: true },
		{ removeComments: true },
		{ removeMetadata: true },
		{ removeTitle: true },
		{ removeDesc: true },
		{ removeUselessDefs: true },
		{ removeXMLNS: false },
		{ removeEditorsNSData: true },
		{ removeEmptyAttrs: true },
		{ removeHiddenElems: true },
		{ removeEmptyText: true },
		{ emoveEmptyContainers: true },
		{ removeViewBox: false },
		{ cleanupEnableBackground: true },
		{ minifyStyles: false },
		{ convertStyleToAttrs: true },
		{ convertColors: true },
		{ convertPathData: true },
		{ convertTransform: true },
		{ removeUnknownsAndDefaults: true },
		{ removeNonInheritableGroupAttrs: true },
		{ removeUselessStrokeAndFill: true },
		{ removeUnusedNS: true },
		{ cleanupIDs: true },
		{ cleanupNumericValues: true },
		{ cleanupListOfValues: true },
		{ moveElemsAttrsToGroup: true },
		{ moveGroupAttrsToElems: true },
		{ collapseGroups: true },
		{ removeRasterImages: true },
		{ mergePaths: true },
		{ convertShapeToPath: true },
		{ sortAttrs: true },
		{ removeDimensions: true },
		{ removeAttrs: true },
		{ removeElementsByAttr: false },
		{ addClassesToSVGElement: false },
		{ addAttributesToSVGElement: false },
		{ removeStyleElement: false },
		{ removeScriptElement: false },
		{ prefixIds: false },
	],
});

lazyRequireTask('svg:sprite', './tasks/svg:sprite', {
	src: 'src/assets/icons/sprite/*.svg',
	dest: 'src/assets/icons/sprite/',
	config: {
		shape: {
			dimension: {
				maxWidth: 40,
				maxHeight: 40,
			},
			spacing: {
				padding: 10,
			},
			transform: [
				{
					svgo: {
						plugins: [
							{ cleanupAttrs: true },
							{ inlineStyles: true },
							{ removeDoctype: true },
							{ removeXMLProcInst: true },
							{ removeComments: true },
							{ removeMetadata: true },
							{ removeTitle: true },
							{ removeDesc: true },
							{ removeUselessDefs: true },
							{ removeXMLNS: false },
							{ removeEditorsNSData: true },
							{ removeEmptyAttrs: true },
							{ removeHiddenElems: true },
							{ removeEmptyText: true },
							{ emoveEmptyContainers: true },
							{ removeViewBox: false },
							{ cleanupEnableBackground: true },
							{ minifyStyles: false },
							{ convertStyleToAttrs: true },
							{ convertColors: true },
							{ convertPathData: true },
							{ convertTransform: true },
							{ removeUnknownsAndDefaults: true },
							{ removeNonInheritableGroupAttrs: true },
							{ removeUselessStrokeAndFill: true },
							{ removeUnusedNS: true },
							{ cleanupIDs: true },
							{ cleanupNumericValues: true },
							{ cleanupListOfValues: true },
							{ moveElemsAttrsToGroup: true },
							{ moveGroupAttrsToElems: true },
							{ collapseGroups: true },
							{ removeRasterImages: true },
							{ mergePaths: true },
							{ convertShapeToPath: true },
							{ sortAttrs: true },
							{ removeDimensions: true },
							{ removeAttrs: true },
							{ removeElementsByAttr: false },
							{ addClassesToSVGElement: false },
							{ addAttributesToSVGElement: false },
							{ removeStyleElement: false },
							{ removeScriptElement: false },
							{ prefixIds: false },
						],
					},
				},
			],
		},
		mode: {
			symbol: true,
			inline: true,
		},
		svg: {
			namespaceIDs: false,
			namespaceClassnames: false,
		},
	},
});

lazyRequireTask('images', './tasks/images', {
	src: 'src/assets/img/*.*',
	dest: 'dist/assets/img',
});

lazyRequireTask('fonts', './tasks/copy', {
	src: 'src/assets/fonts/*.*',
	dest: 'dist/assets/fonts',
});

lazyRequireTask('clean', './tasks/clean', {
	src: ['dist', 'src/assets/img/icons-minificated'],
});

lazyRequireTask('server', './tasks/server', {
	baseDir: 'dist',
	watchDir: 'dist/**/*.*',
});

//--------------
//--------------
//--------------
//--------------

gulp.task(
	'assets',
	gulp.series('svg:min', 'svg:sprite', gulp.parallel('images', 'fonts')),
);

gulp.task(
	'build',
	gulp.series(
		'assets',
		gulp.parallel('scripts:libs', 'scripts', 'pug', 'styles', 'styles:libs'),
	),
);

gulp.task('watch', function() {
	gulp.watch('src/scripts/components/*.js', gulp.series('scripts'));
	gulp.watch('src/scripts/libraries/*.js', gulp.series('scripts:libs'));
	gulp.watch('src/styles/sсss/**/*.scss', gulp.series('styles'));
	gulp.watch('src/styles/libraries/**/*.scss', gulp.series('styles:libs'));
	gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
	gulp.watch(
		['src/assets/**/*.*', '!src/assets/icons/sprite/symbol/**/*.*'],
		gulp.series('assets', 'pug'),
	);
});

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'server')));
