var Fluxible =  require('fluxible');

var app = new Fluxible({
	component: require('./routes.js')
});

app.registerStore(require('./stores/UserStore'));
app.registerStore(require('./stores/FollowersStore'));

module.exports = app;