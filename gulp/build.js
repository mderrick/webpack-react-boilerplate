var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
var path = require('path');
var autoprefixer = require('autoprefixer-core');
var csswring = require('csswring');
var mqpacker = require('css-mqpacker');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(gulp, plugins, args) {

    var getDefaultConfig = function() {
        return {
            debug: true,
            devtool: 'inline-source-map',
            entry: 'client.js',
            target: 'web',
            output: {
                publicPath: '/',
                path: path.join(__dirname, '../dist'),
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
                    path.join(__dirname, '../bower_components'),
                    path.join(__dirname, '../app'),
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
                new StatsPlugin(path.join(__dirname, '../dist', 'stats.json'), {
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
                    ENV: require(path.join(__dirname, '../env/', args.env))
                }),
                new webpack.optimize.DedupePlugin(),
                new ExtractTextPlugin('[name].css', {
                    allChunks: true
                })
            ]
        };
    };

    /**
     * The development build config
     */
    var getDevelopmentConfig = function() {
        var config = getDefaultConfig();
        return config;
    };

    /**
     * The release build config
     */
    var getReleaseConfig = function() {
        var config = getDefaultConfig();
        delete config.devtool;
        delete config.debug;
        config.output.filename = '[chunkhash].js';
        config.output.chunkFilename = '[chunkhash].js';
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }));
        return config;
    };

    /**
     * The server config overides release or dev config
     */
    var getServerConfig = function() {
        var config = args.release ? getReleaseConfig() : getDevelopmentConfig();
        config.entry = 'server.js';
        config.target = 'node';
        config.output.filename = 'entry.js';
        config.output.path = path.join(__dirname, '../server/dist');
        config.module.loaders[0].loader = ExtractTextPlugin.extract('css-loader!postcss-loader');
        config.output.libraryTarget = 'commonjs2';
        config.plugins.splice(3, 1, new webpack.DefinePlugin({ 'ENV.browser': false }));
        config.plugins.splice(0, 1);
        delete config.devtool;
        return config;
    };

    /**
     * Run webpack ready for dev or distribution
     */
    gulp.task('build', ['clean:dist'], function(cb) {
        var config = args.release ? getReleaseConfig() : getDevelopmentConfig(),
            compiler = webpack([getServerConfig(), config]),
            callbackCount = 0,
            webpackCallback = function(err, stats) {
                if (err) throw new plugins.util.PluginError('webpack', err);

                // Both server and client builds have completed.
                var initialBuildComplete = callbackCount > 1,
                    callGulpCallback = callbackCount === 1;

                // Log stats info
                // TODO: Make this more useful, logs out way too much crap
                // http://webpack.github.io/docs/node.js-api.html#stats-tojson
                plugins.util.log(stats.toString({
                    colors: true
                }));

                if (initialBuildComplete && args.watch) {
                    // TODO: Filename changed
                    plugins.livereload.changed('app');
                }

                // Both server and client builds have completed.
                if (callGulpCallback) {
                    cb();
                    if (args.watch) {
                        plugins.util.log('Watching for changes');
                    }
                }

                callbackCount++;
            };

        if (args.watch) {
            plugins.livereload.listen();
            compiler.watch(0, webpackCallback);
        } else {
            compiler.run(webpackCallback);
        }

        process.on('SIGINT', function() {
            if (plugins.livereload.server) {
                plugins.livereload.server.close();
            }
            if (args.watch) {
                plugins.util.log(plugins.util.colors.red('Stopped watching'));
            }
            process.exit(0);
        });
    });
};
