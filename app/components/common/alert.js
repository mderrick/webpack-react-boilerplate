var React = require('react'),
    css = require('./alert.css');

var AlertComponent = React.createClass({

    propTypes: {
        type: function(props, propName, componentName) {
            if (!/^warn$|^error$/.test(props[propName])) {
                return new Error('Type must be `warn` or `error`.');
            }
        },
        title: React.PropTypes.string,
        message: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            type: 'error',
            title: 'Error!',
            message: 'There was a problem.'
        };
    },

    classes: function() {
        var classes = {
            'alert': true
        };
        classes['alert-' + this.props.type] = true;
        return React.addons.classSet(classes);
    },

    render: function () {
        return (
            <p className={this.classes()}>
                <span className='alert-title'>{this.props.title}</span>
                {this.props.message}
            </p>
        );
    }

});

module.exports = AlertComponent;