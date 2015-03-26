var path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	webpack = require('webpack');

module.exports = function(env, release) {
    var config = release ? require('./webpack.release.config')(env) : require('./webpack.dev.config')(env);
    config.entry = 'server.js';
    config.target = 'node';
    config.output.filename = 'entry.js';
    config.output.path = path.join(__dirname, './server/dist');
    config.module.loaders[0].loader = ExtractTextPlugin.extract('css-loader!postcss-loader');
    config.output.libraryTarget = 'commonjs2';
    config.plugins.splice(3, 1, new webpack.DefinePlugin({ 'ENV.browser': false }));
    config.plugins.splice(0, 1);
    delete config.devtool;
    return config;
};