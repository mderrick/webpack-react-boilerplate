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
        'user': true
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
        var view;
        if (this.state.error) {
            view = (
                <div>
                    <h2>User Error</h2>
                    <div>{this.state.error}</div>
                </div>
            );
        } else {
            view = (
                <div>
                    <h2>{this.state.user.login}</h2>
                    <ul>
                        <li><img src={this.state.user.avatar_url} /></li>
                    </ul>
                </div>
            );
        }
        return (
            <div className={this.classes}>
                {view}
            </div>
        );
    }

});

module.exports = View;