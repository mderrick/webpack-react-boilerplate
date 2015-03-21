var React = require('react'),
	css = require('./style.css');

var View = React.createClass({

	classes: React.addons.classSet({
		'about': true
	}),

	render: function () {
		return (
			<div className={this.classes}>
				<h2>About</h2>
				<p>Just an example isomorphic using React, Fluxible 
				and webpack code splitting!</p>

				<p>Checkout the network panel to see code splits in action on all
				routes.</p>
			</div>
		);
	}

});

module.exports = View;