var React = require('react'),
	Router = require('react-router'),
	Layout = require('./components/layout/view'),
	LoadingMixin = require('./mixins/loading'),
	Index = require('react-proxy?name=index!./components/layout/index/view'),
	About = require('react-proxy?name=about!./components/layout/about/view');

/**
 * Proxied React views to mixin the
 * loading state whilst waiting for code splits.
 */
var AboutProxy = React.createClass({
    mixins: [About.Mixin, LoadingMixin]
});
var IndexProxy = React.createClass({
	statics: {
		// TODO: This is duplicated from 'components/index/view.js'
		// until we modify the ProxyView plugin to proxy 'statics'
		// to this IndexProxy. This is so the server can see what
		// action is required to load data for this view.
		loadAction: require('./actions/getUser')
	},
    mixins: [Index.Mixin, LoadingMixin]
});

var routes = (
	<Router.Route name="layout" handler={Layout} path='/'>
		<Router.Route name="about" handler={AboutProxy} path='about' />
        <Router.DefaultRoute name="index" handler={IndexProxy} />
	</Router.Route>
);

module.exports = routes;
