var React = require('react'),
	Router = require('react-router'),
	css = require('app.css'),
	routes = require('./routes');

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
});
