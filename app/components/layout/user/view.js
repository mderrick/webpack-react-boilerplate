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

    onChange: function () {
        // Fluxible Mixin triggers this default change event
        var state = this.getStore(UserStore).getState();
        this.setState(state);
    },

    render: function () {
        var view;
        if (this.state.error) {
            view = (
                <div className="error">
                    <h2 className="layout-subtitle">User Error</h2>
                    <p>Oops! There was an API problem.</p>
                    <p>{this.state.error}</p>
                </div>
            );
        } else {
            view = (
                <div className="-clearfix">
                    <h2 className="layout-subtitle">{this.state.user.login}</h2>
                    <div className="user-image">
                        <img className="user-image" src={this.state.user.avatar_url} />
                    </div>
                    <ul className="user-detail-set">
                        <li className="user-detail-item">
                            {this.state.user.name}
                        </li>
                        <li className="user-detail-item">
                            {this.state.user.location}
                        </li>
                        <li className="user-detail-item">
                            <a href={'http://' + this.state.user.blog}>
                                {this.state.user.blog}
                            </a>
                        </li>
                        <li className="user-detail-item">
                            <a href={'mailto:' + this.state.user.email}>
                                {this.state.user.email}
                            </a>
                        </li>
                        <li className="user-detail-item">
                            <a target="_blank" href={this.state.user.url}>
                                Visit GitHub Page
                            </a>
                        </li>
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