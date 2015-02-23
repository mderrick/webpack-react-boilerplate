var React = require('react'),
	Router = require('react-router'),
	Layout = require('./components/layout/view'),
	LoadingMixin = require('./mixins/loading'),
	Index = require('react-proxy!./components/index/view'),
	About = require('react-proxy!./components/about/view');

require('app.css');

/**
 * Proxied React views to mixin the
 * loading state whilst waiting for code splits.
 */
var AboutProxy = React.createClass({
    mixins: [About.Mixin, LoadingMixin]
});
var IndexProxy = React.createClass({
    mixins: [Index.Mixin, LoadingMixin]
});

Router.run((
	<Router.Route name="layout" handler={Layout} path='/'>
		<Router.Route name="about" handler={AboutProxy} path='about' />
        <Router.DefaultRoute name="index" handler={IndexProxy} />
	</Router.Route>
), Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById('main'));
});