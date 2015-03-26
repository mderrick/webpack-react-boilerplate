var webpack = require('webpack');

module.exports = function(gulp, plugins, args) {

    var getDefaultConfig = function() {
        return require('./../webpack.default.config')(args.env);
    };

    /**
     * The development build config
     */
    var getDevelopmentConfig = function() {
        return require('./../webpack.dev.config')(args.env);
    };

    /**
     * The release build config
     */
    var getReleaseConfig = function() {
        return require('./../webpack.release.config')(args.env);
    };

    /**
     * The server config overides release or dev config
     */
    var getServerConfig = function() {
        return require('./../webpack.server.config')(args.env, args.release);
    };

    /**
     * Run webpack ready for dev or distribution
     */
    gulp.task('build', ['clean:dist'], function(cb) {
        var config = args.release ? getReleaseConfig() : getDevelopmentConfig(),
            compiler = webpack([getServerConfig(), config]),
            callbackCount = 0,
            webpackCallback = function(err, stats) {
                // For some reason callback is called twice when we are watching.
                // Fixing when we call the gulp callback by counting. Gross.
                // https://github.com/webpack/webpack/issues/762
                var cbCount = (args.watch) ? 1 : 0;

                if (err) throw new plugins.util.PluginError('webpack', err);

                // Both server and client builds have completed.
                var initialBuildComplete = callbackCount > cbCount,
                    callGulpCallback = callbackCount === cbCount;

                // Log stats info
                // TODO: Make this more useful, logs out way too much crap
                // http://webpack.github.io/docs/node.js-api.html#stats-tojson
                // plugins.util.log(stats.toString({
                //     colors: true
                // }));

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
