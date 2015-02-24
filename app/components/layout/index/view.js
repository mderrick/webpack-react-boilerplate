var React = require('react'),
	css = require('./style.css');

var View = React.createClass({

	classes: React.addons.classSet({
		'index': true
	}),

	render: function () {
		return (
			<div className={this.classes}>
				<h2>Index</h2>
			</div>
		);
	}

});

module.exports = View;