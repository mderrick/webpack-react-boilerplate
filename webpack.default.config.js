var webpack = require('webpack'),
    StatsPlugin = require('stats-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    csswring = require('csswring'),
    mqpacker = require('css-mqpacker'),
    autoprefixer = require('autoprefixer-core'),
    path = require('path');

module.exports = function(env) {
    return {
        debug: true,
        devtool: 'inline-source-map',
        entry: 'client.js',
        target: 'web',
        output: {
            publicPath: '/',
            path: path.join(__dirname, './dist'),
            filename: 'entry.js',
            chunkFilename: '[id].js'
        },
        module: {
            loaders: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url?limit=8192'
            }, {
                test: /\.js$/,
                loader: 'jsx-loader?insertPragma=React.DOM'
            }, {
                test: /react-with-addons\.js$/,
                loader: 'expose?React'
            }, {
                test: /superagent/,
                loader: 'expose?request'
            }, {
                test: /\.json$/,
                loader: 'json'
            }]
        },
        // Superagent requires this with webpack:
        // https://github.com/visionmedia/superagent/wiki/Superagent-for-Webpack
        node: {
            __dirname: true
        },
        resolve: {
            root: [
                path.join(__dirname, './bower_components'),
                path.join(__dirname, './app'),
            ],
            alias: {
                // 'react/addons' is for 'node_modules/fluxible'
                'react/addons': 'react/react-with-addons.js',
                'react': 'react/react-with-addons.js'
            }
        },
        postcss: [autoprefixer({
            // https://github.com/ai/browserslist
            browsers: ['last 5 version']
        }), mqpacker, csswring],
        plugins: [
            // Output the stats to use with the server
            new StatsPlugin(path.join(__dirname, './dist', 'stats.json'), {
                chunkModules: true
            }),
            new webpack.ResolverPlugin(
                new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
            ),
            // Superagent requires this with webpack:
            // https://github.com/visionmedia/superagent/wiki/Superagent-for-Webpack
            new webpack.DefinePlugin({ 'global.GENTLY': false }),
            new webpack.DefinePlugin({ 'ENV.browser': true }),
            new webpack.DefinePlugin({
                ENV: require(path.join(__dirname, './env/', env))
            }),
            new webpack.optimize.DedupePlugin(),
            new ExtractTextPlugin('[name].css', {
                allChunks: true
            })
        ]
    };
};