/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer-stylus');

const isProd = process.env.NODE_ENV === 'production';

module.exports = () => {
	return {
		name: 'client',

		// Application entry point
		entry: {
			app: [`./src/bootstrap/index.tsx`],
		},

		// Output file options
		output: {
			path: resolve(__dirname, './build'),
			filename: '[name].bundle.js',
			chunkFilename: '[name].bundle.js',
			pathinfo: !isProd,
			publicPath: '/',
		},

		// Webpack Development Server
		devServer: {
			compress: true,
			hot: true,
			hotOnly: true,
			historyApiFallback: true,
			publicPath: '/',
			inline: true,
			contentBase: './public',
			disableHostCheck: true,
		},

		// Choose compile mode
		mode: isProd ? 'production' : 'development',

		// Choose devtool
		devtool: isProd ? 'source-map' : 'eval-cheap-source-map',

		// Asset Resolvers
		resolve: {
			alias: {
				'react-dom': '@hot-loader/react-dom',
				root: './src',
				src: './src',
			},
			modules: ['node_modules'],
			extensions: ['*', '.mjs', '.js', '.jsx', '.json', '.tsx', '.ts'],
		},

		module: {
			rules: [
				// Transpile scripts
				{
					test: /\.(js|ts)x?$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								compact: true,
								configFile: resolve(__dirname, 'babel.config.js'),
							},
						},
					],
				},
				// Transpile Stylus files
				{
					test: /\.styl$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								modules: {
									localIdentName: isProd ? '[hash:base64:8]' : '[local]__[hash:base64:4]',
								},
							},
						},
						{
							loader: 'stylus-loader',
							options: {
								stylusOptions: {
									import: [resolve(__dirname, './src/theme/index.styl')],
									use: [autoprefixer()],
								},
							},
						},
					],
				},

				// Handle CSS files
				{
					test: /\.css$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: !isProd,
							},
						},
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
							},
						},
					],
				},

				// Load images in corresponding folders
				{
					test: /\.(svg|png|jpe?g|gif)$/,
					loader: 'file-loader',
					options: {
						name: 'assets/images/[hash].[ext]',
					},
				},

				// Load fonts in corresponding folders
				{
					test: /\.(eot|ttf|woff|woff2)$/,
					loader: 'file-loader',
					options: {
						name: 'assets/fonts/[hash].[ext]',
					},
				},
			],
		},

		plugins: [
			// Create html files
			new HtmlWebpackPlugin({
				template: `./src/bootstrap/index.html`,
				minify: true,
				publicPath: '/',
				chunks: isProd ? [] : 'all',
			}),

			// Bundle css assets
			new MiniCssExtractPlugin({
				filename: '[name].bundle.css',
				chunkFilename: '[id].bundle.css',
			}),

			new CleanWebpackPlugin(),

			// Copy public folder to dist/public
			new CopyPlugin({
				patterns: [
					{
						from: 'public',
						to: './',
					},
				],
			}),
		],
	};
};
