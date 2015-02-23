module.exports = function(gulp, plugins, args) {

	/**
	 * Starts the server
	 */
	gulp.task('serve', ['build'], function() {
		require('./../server/server.js');
	});
};
