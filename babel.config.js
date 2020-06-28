module.exports = function(api) {
	api.cache(true);

	const presets = [
		[
			'@babel/env',
			{
				targets: {
					ie: '11',
				},
			},
		],
	];
	const plugins = ['babel-plugin-transform-es2017-object-entries'];

	return {
		presets,
		plugins,
	};
};
