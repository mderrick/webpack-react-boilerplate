var React = require('react'),
    css = require('./style.css'),
    Router = require('react-router'),
    getFollowers = require('./../../../actions/getFollowers'),
    FollowersStore = require('./../../../stores/FollowersStore'),
    FluxibleMixin = require('fluxible').FluxibleMixin,
    LoadingMixin = require('./../../../mixins/loading');

var View = React.createClass({

    mixins: [FluxibleMixin, LoadingMixin],

    statics: {
        storeListeners: [FollowersStore],
        // LoadAction is the action that the server needs to run to make
        // this component isomorphic.
        loadAction: getFollowers
    },

    classes: React.addons.classSet({
        'index': true
    }),

    getInitialState: function () {
        return this.getStore(FollowersStore).getState();
    },

    onChange: function () {
        // Fluxible Mixin triggers this default change event
        var state = this.getStore(FollowersStore).getState();
        this.setState(state);
    },

    render: function () {

        var rows = [],
            view;

        for (var i = 0; i < this.state.followers.length; i++) {
            var user = this.state.followers[i];

            rows.push(
                <li className="user-item">
                    <Router.Link to="user" params={{username: user.login}}>
                        <div className="user-item-image" >
                            <img src={user.avatar_url} />
                        </div>
                        {user.login}
                    </Router.Link>
                </li>
            );
        }

        if (this.state.loading) {
            view = this.getLoadingView();
        } else if (this.state.error) {
            view = (
                <div className="error">
                    <p>Oops! There was an API problem.</p>
                    <p>{this.state.error}</p>
                </div>
            );
        } else {
            view = (
                <div>
                    <p>
                        <Router.Link to="user" params={{username: "mderrick"}}>
                            mderrick's
                        </Router.Link>
                        &nbsp;GitHub Followers:
                    </p>
                    <ul className="user-set">
                        {rows}
                    </ul>
                </div>
            );
        }

        return (
            <div className={this.classes}>
                <h2 className="layout-subtitle">
                    Home
                </h2>
                {view}
            </div>
        );
    }

});

module.exports = View;