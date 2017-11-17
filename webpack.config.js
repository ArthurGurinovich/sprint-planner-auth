const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
// const uglifyJS = require('./webpack/js.uglify');
// const babelJS = require('./webpack/babel');

const PATHS = {
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build')
};

const common = {
    entry: './server.js',
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'bundle.js'
    },
    resolve: {
     extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
		      test: /\.js$/,
		      exclude: /(node_modules|bower_components)/,
		      use: {
		        loader: 'babel-loader',
		        options: {
		          presets: ["es2015", "stage-1", "stage-0", "stage-2", "stage-3"]
		        }
		      }
		    }
            ]
    },
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		})
	]	
};

module.exports = function(env){
	if(env === 'prod'){
		return merge([
			common
		]);
	}
	if(env === 'dev'){
		return merge([
			common,
			devserver()
		]);
	}
};