var React = require('react'),
	Router = require('react-router'),
	routes = require('./routes'),
	css = require('app.css');

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById('main'));
});