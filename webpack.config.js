var path = require('path');
//context: __dirname + '/app',

module.exports = {

	entry: {
		home: './src/client/js/index.js',
		md5: './src/client/js/md5.js'
	},
	output: {
		path: __dirname + '/app/client',
		filename: "[name].js",
		sourceMapFilename: "[name].map",
		library: '[name]'
	},
	devtool: '#source-map',
	module: {
		loaders: [{
			test: /\.html$/,
			loader: "html"
		}, {
			loader: 'babel',
			test: /\.js?$/,
			exclude: /(node_modules)/,
			query: {
				presets: ['es2015', 'stage-2']
			}
		}]
	},
	resolve: {
		root: path.resolve('./app'),
		extenstions: ['', '.js']
	}
}