/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { readdirSync } = require('fs');

const projectFiles = readdirSync(resolve(__dirname, './src')).reduce((obj, file) => {
	// eslint-disable-next-line no-param-reassign
	obj[file] = `./src/${file}`;
	return obj;
}, {});

module.exports = (api) => {
	api.cache(true);

	const presets = [
		[
			'@babel/preset-env',
			{
				modules: false,
			},
		],
		'@babel/preset-typescript',
		[
			'@babel/preset-react',
			{
				runtime: 'automatic',
			},
		],
	];

	const plugins = [
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: false }],
		'@babel/plugin-proposal-export-default-from',
		[
			'module-resolver',
			{
				root: ['./'],
				alias: {
					src: './src',
					...projectFiles,
				},
			},
		],
		['@babel/transform-runtime'],
	];

	return {
		presets,
		plugins,
		compact: true,
	};
};
