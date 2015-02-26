var React = require('react'),
    Router = require('react-router'),
    routes = require('./routes'),
    Html = require('./components/html');

module.exports = function (req, res, next, assets) {
    Router.run(routes, req.url, function (Handler, state) {
    	var chunk = '';
    	try {
    		chunk = state.routes[1].name;
    	} catch(err) {}
        var markup = React.renderToString(<Handler />);
        var html = React.renderToStaticMarkup(
        	<Html jsmain={assets.main} jschunk={assets[chunk]} markup={markup} />
        );
        res.send('<!DOCTYPE html>' + html);
    });
};
