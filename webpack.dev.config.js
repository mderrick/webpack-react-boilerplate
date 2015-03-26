module.exports = function(env) {
    var config = require('./webpack.default.config')(env);
    // Default config is dev first so we simply return it here.
    return config;
};