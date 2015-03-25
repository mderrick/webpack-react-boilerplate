var React = require('react'),
    css = require('./loading.css');

var LoadingComponent = React.createClass({

    propTypes: {
        text: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            text: 'Loading...'
        };
    },

    classes: React.addons.classSet({
        'loading': true
    }),

    render: function () {
        return (
            <span className={this.classes}>
                {this.props.text}
            </span>
        );
    }

});

module.exports = LoadingComponent;