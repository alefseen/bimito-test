/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const { readdirSync } = require('fs');

const projectFiles = readdirSync(resolve(__dirname, './src')).map((file) => [
	file,
	`./src/${file}`,
]);

module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
		'prettier/prettier': ['error'],
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
			alias: {
				map: [['src', './src'], ...projectFiles],
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg', '.styl', '.scss', '.css'],
			},
		},
	},
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'prettier'],
	rules: {
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/prop-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts', '.js', '.jsx'] }],
		'import/extensions': 'off',
	},
};
