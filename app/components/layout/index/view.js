var React = require('react'),
    css = require('./style.css'),
    Router = require('react-router'),
    getUser = require('./../../../actions/getUser'),
    UserStore = require('./../../../stores/UserStore'),
    FluxibleMixin = require('fluxible').FluxibleMixin;

var View = React.createClass({

    classes: React.addons.classSet({
        'about': true
    }),

    render: function () {
        return (
            <div className={this.classes}>
                <h2>Index</h2>
                <p>GitHub Users:</p>
                <ul>
                    <li>
                        <Router.Link to="user" params={{username: "mderrick"}}>
                            mderrick
                        </Router.Link>
                    </li>
                    <li>
                        <Router.Link to="user" params={{username: "octocat"}}>
                            octocat
                        </Router.Link>
                    </li>
                    <li>
                        <Router.Link to="user" params={{username: "oopsyanunknownuser"}}>
                            An unknown user
                        </Router.Link>
                    </li>
                </ul>
            </div>
        );
    }

});

module.exports = View;