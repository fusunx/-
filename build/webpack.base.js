const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = path.resolve(__dirname, '../index.html');

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/, // 表示x有0个或1个
				exclude: /node_modules/, // 不编译某个目录下的文件
				include: /src/, // 编译指定目录下的文件
				use: [
					"babel-loader"
				]
			},
			// 加载解析资源文件
			{
				test: /\.(jpg|png|gif)$/,
				use: {
					loader: 'url-loader', //和file-loader功能相同，但更智能
					options: {
						// 配置打包后的文件名
						name: '[name].[ext]?[hash]',
						outputPath: 'images/',
						limit: 4096 // 当图片大小大于4k时以文件形式输出，否则以base64输出
					}
				}
			},
			// 引入字体，svg等文件
			{
				test: /\.(eot|tth|svg)$/,
				use: {
					loader: 'file-loader'
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template,
			filename: 'index.html'
		})
	],
	optimization: {
		splitChunks: { // 将css提取到一个css中
			chunks: 'all',
			// chunks: 'async' 表示只对一部代码进行分割
			minSize: 30000, // 当超过指定大小是做代码分割
			// maxSize: 50000, 当大于最大尺寸时对代码进行二次分割
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '_',
			name: true,
			cacheGroups: { //缓存组：如果满足vendor的条件，就按vendor打包，否则按default打包
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10, // 权重越大打包优先级越大
					// filename: 'js/vendor.js 将代码打包为名为vendor.js的文件
					name: 'vendor'
				},
				default: {
					minChunks: 2,
					priority: -20,
					// filename: 'js/common.js 将代码打包为名为vendor.js的文件
					name: 'common',
					reuseExistingChunk: true // 是否复用已经打包过的代码
				}
			}
		},
		usedExports: true
	}
}