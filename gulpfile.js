var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var args = require('yargs')
    .default('env', 'dev')
    .default('watch', false)
    .default('release', false).argv;

require('./gulp/build')(gulp, plugins, args);
require('./gulp/clean')(gulp, plugins, args);
require('./gulp/serve')(gulp, plugins, args);
