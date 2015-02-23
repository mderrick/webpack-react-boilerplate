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
			</div>
		);
	}

});

module.exports = View;