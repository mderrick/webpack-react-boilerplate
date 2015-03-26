var webpack = require('webpack');

module.exports = function(env) {
    var config = require('./webpack.default.config')(env);
    delete config.devtool;
    delete config.debug;
    config.output.filename = '[chunkhash].js';
    config.output.chunkFilename = '[chunkhash].js';
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true
    }));
    return config;
};