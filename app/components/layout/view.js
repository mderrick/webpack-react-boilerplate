var React = require('react'),
	Router = require('react-router'),
	css = require('./style.css'),
	FluxibleMixin = require('fluxible').FluxibleMixin;

var View = React.createClass({
	
	mixins: [FluxibleMixin],

	classes: React.addons.classSet({
		'layout': true
	}),

	render: function () {
		return (
			<div className={this.classes}>
				<h1 className="layout-title">Webpack React Boilerplate</h1>
				<ul className="layout-link-set">
					<li className="layout-link-item">
						<Router.Link to="/">
							Home
						</Router.Link>
					</li>
					<li className="layout-link-item">
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