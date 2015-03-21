var React = require('react'),
    css = require('./style.css'),
    getUser = require('./../../../actions/getUser'),
    UserStore = require('./../../../stores/UserStore'),
    FluxibleMixin = require('fluxible').FluxibleMixin;

var View = React.createClass({

    mixins: [FluxibleMixin],

    statics: {
        storeListeners: [UserStore],
        // LoadAction is the action that the server needs to run to make
        // this component isomorphic.
        loadAction: getUser
    },
    
    classes: React.addons.classSet({
        'index': true
    }),

    getInitialState: function () {
        return this.getStore(UserStore).getState();
    },

    onClick: function (e) {
        e.preventDefault();
        this.executeAction(getUser, 'octocat');
    },

    onChange: function () {
        // Fluxible Mixin triggers this default change event
        var state = this.getStore(UserStore).getState();
        this.setState(state);
    },

    render: function () {
        return (
            <div className={this.classes}>
                <h2>Index</h2>
                <ul>
                    <li>{this.state.user.login}</li>
                    <li><img src={this.state.user.avatar_url} /></li>
                </ul>
                <a href={'#'} onClick={this.onClick}>Fetch Another User</a>
            </div>
        );
    }

});

module.exports = View;