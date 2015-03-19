var React = require('react'),
    css = require('./style.css'),
    updateTime = require('./../../../actions/updateTime'),
    TimeStore = require('./../../../stores/TimeStore'),
    FluxibleMixin = require('fluxible').FluxibleMixin;

var View = React.createClass({

    mixins: [FluxibleMixin],

    statics: {
        storeListeners: [TimeStore]
    },
    
    classes: React.addons.classSet({
        'index': true
    }),

    getInitialState: function () {
        return this.getStore(TimeStore).getState();
    },

    onReset: function (e) {
        e.preventDefault();
        this.executeAction(updateTime);
    },

    /**
     * Fluxible Mixin triggers this default change event
     */
    onChange: function () {
        var state = this.getStore(TimeStore).getState();
        this.setState(state);
    },

    render: function () {
        return (
            <div className={this.classes}>
                <h2>Index</h2>
                <p>{this.state.time}</p>
                <a href={'#'} onClick={this.onReset}>Reset Time</a>
            </div>
        );
    }

});

module.exports = View;