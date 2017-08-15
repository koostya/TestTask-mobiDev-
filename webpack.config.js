var webpack = require("webpack");
module.exports = {
	//define entry point
	context: __dirname + "/src",
	entry: './js.js',

	//define output point
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.scss?$/,
				loader: 'style-loader!css-loader?url=false!sass-loader'
			}
		]
	}
};