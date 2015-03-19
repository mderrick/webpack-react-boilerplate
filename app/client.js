var React = require('react'),
	Router = require('react-router'),
	css = require('app.css'),
	app = require('./app'),
	routes = app.getComponent();

app.rehydrate(window.App, function (err, context) {
	Router.run(routes, Router.HistoryLocation, function (Handler) {
	    React.render(<Handler context={context.getComponentContext()}/>, document.body);
	});
});
