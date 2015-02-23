var React = require('react'),
	Router = require('react-router'),
	css = require('./style.css');

var View = React.createClass({

	classes: React.addons.classSet({
		'layout': true
	}),

	render: function () {
		return (
			<div className={this.classes}>
				<h1>Webpack React Boilerplate</h1>
				<div className="layout-logo"></div>
				<ul>
					<li>
						<Router.Link to="/">
							Home
						</Router.Link>
					</li>
					<li>
						<Router.Link to="/about">
							About
						</Router.Link>
					</li>
				</ul>
				<Router.RouteHandler/>
			</div>
		);
	}

});

module.exports = View;