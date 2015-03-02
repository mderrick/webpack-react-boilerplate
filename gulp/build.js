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
                }]
            },
             resolve: {
                root: [
                    path.join(__dirname, '../bower_components'),
                    path.join(__dirname, '../app'),
                ],
                alias: {
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
                new webpack.DefinePlugin(require(path.join(__dirname, '../env/', args.env))),
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
            firstBuild = true,
            webpackCallback = function(err, stats) {
                if (err) throw new plugins.util.PluginError('webpack', err);
                if (!firstBuild && args.watch) {
                    // TODO: Filename
                    // TODO: why  is this being called on first build?!
                    plugins.livereload.changed('app');
                }
                if (firstBuild) {
                    firstBuild = false;
                    plugins.util.log(stats.toString({
                        colors: true
                    }));
                    cb();
                    return;
                }
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
