var Fluxible =  require('fluxible');

var app = new Fluxible({
	component: require('./routes.js')
});

app.registerStore(require('./stores/UserStore'));

module.exports = app;