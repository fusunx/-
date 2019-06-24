const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// 引入模块
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩js
const TerserPlugin = require('terser-webpack-plugin');
const base = require('./webpack.base');

module.exports = merge({
	mode: 'production',
	output: {
		filename: 'js/[name]_[contenthash].js', // 入口和内容hash组成的文件名，也可以是hash
		chunkFilename: 'js/[name]_[contenthash].chunk.js'
	},
	module: {
		rules: [
			{
				test: /\.(css|scss)$/,
				use: [ // loader解析顺序是从右到左从下到上
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							filename: '[name].css',
							chunkFilename: '[name].css',
							publicPath: '../' // 最后打包替换引入文件路径
						}
					},
					// 'style-loader', 使用MiniCssExtractPlugin.loader时就不能使用style-loader
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2 // 该方式可以让@import引入的css文件再次执行一遍css打包
						}
					},
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({ // 将css提取为独立文件，只能用在webpack4中
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: 'css/[name]_[hash].css',
			chunkFilename: 'css/[name]_[hash].chunk.css',
		}),
		new CleanWebpackPlugin()
	],
	optimization: { // 提取公共代码配置
		minimizer: [
			new TerserPlugin({ // 压缩js代码
				cache: true, // 启用文件缓存
				parallel: true, // 使用多进程并行执行提高构建效率
				sourceMap: true, // 将错误消息映射到模块
				terserOptions: {
					drop_console: true, // 打包时剔除所有的console.log
					drop_debugger: true // 打包时剔除所有的debugger
				}
			}),
			new OptimizeCSSAssetsPlugin({}) // 压缩css代码
		]
	}
}, base);