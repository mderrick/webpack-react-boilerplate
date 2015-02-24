var express = require('express'),
    app = express(),
    path = require('path'),
    colors = require('colors'),
    entry = require('./../server/dist/entry.js'),
    stats = {};

try {
    stats = require('./../dist/stats.json');
} catch (err){
    console.log('The file `dist/stats.json` does not exist. Run `gulp build`.'.red);
    return;
}

var args = require('yargs')
    .default('env', 'dev')
    .default('watch', false)
    .default('release', false).argv;

app.set('port', process.env.PORT || 9001);

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, './views'));

if (args.watch) {
    app.use(require('connect-livereload')());
}
app.use(express.static(path.join(__dirname, '../dist')));

app.use(function(req, res, next) {
    'use strict';
    var assets = stats.assetsByChunkName,
        js = [assets.main],
        route = req.url.replace(/\//g, '') || '/';

    // TODO: Get chunk and pass this down to HTML
    entry(req, res, next, assets.main);
});

app.listen(app.get('port'), function() {
    'use strict';
    console.log('Server started: '.cyan +
        'http://localhost:' + app.get('port'));
    console.log('Press \'ctrl + c\' to terminate server'.grey);
});

module.exports = app;

process.on('SIGINT', function() {
    console.log('Server Shutdown'.red);
    process.exit(0);
});