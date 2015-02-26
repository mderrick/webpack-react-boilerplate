var del = require('del');
module.exports = function(gulp, plugins, args) {

    /**
     * Clean the dist directory
     */
    gulp.task('clean:dist', function (cb) {
        del([
            'dist/**',
            'server/dist/**'
        ], cb);
    });
};
