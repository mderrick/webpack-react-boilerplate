var React = require('react'),
	css = require('./style.css');

var AboutComponent = React.createClass({

	classes: React.addons.classSet({
		'layout-content': true,
		'about': true
	}),

	render: function () {
		return (
			<div className={this.classes}>
				<h2 className='layout-subtitle'>About</h2>
				<p>Just an example isomorphic application using React, Fluxible 
				and webpack code splitting!</p>

				<p>Checkout the network panel to see code splits in action on all
				routes.</p>
			</div>
		);
	}

});

module.exports = AboutComponent;