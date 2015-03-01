var React = require('react'),
    Router = require('react-router'),
    routes = require('./routes'),
    Html = require('./components/html');

module.exports = function (req, res, next, assets) {

    var js = [assets.main[0]],
            css = [assets.main[1]];

    Router.run(routes, req.url, function (Handler, state) {
    	try {
    		js.push(assets[state.routes[1].name]);
    	} catch(err) {}

        var markup = React.renderToString(<Handler />),
            html = React.renderToStaticMarkup(
            	<Html js={js} css={css} markup={markup} />
            );
        res.send('<!DOCTYPE html>' + html);
    });
};
