var React = require('react'),
	Router = require('react-router'),
	css = require('app.css'),
	app = require('./app'),
	routes = app.getComponent();

var renderApp = function(context, Handler) {
	React.render(<Handler context={context.getComponentContext()}/>, document.body);
};

app.rehydrate(window.App, function (err, context) {
	var firstRender = true;
	Router.run(routes, Router.HistoryLocation, function (Handler, state) {
		// TODO: Do we need to do it this way? Can't we do it on 'componentwillMount'
		// and just use a flag for when the client is rendering?
		if (firstRender) {
			// The server will have already called the actions at this point
			// so we don't do the request again.
			renderApp(context, Handler);
			firstRender = false;
		} else {
			require('routeActions')(state, context, function() {
		    	renderApp(context, Handler);
		    });
		}
	});
});
