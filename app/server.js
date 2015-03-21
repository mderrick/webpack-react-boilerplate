var React = require('react'),
    Router = require('react-router'),
    app = require('./app'),
    routes = app.getComponent(),
    serialize = require('serialize-javascript'),
    Html = require('./components/html');

module.exports = function (req, res, next, assets) {

    var js = [assets.main[0]],
            css = [assets.main[1]],
            context = app.createContext();

    Router.run(routes, req.url, function (Handler, state) {
        require('routeActions')(state, context, function() {
            // Render app with context and specify JS and CSS files
            // from webpack stats.json
            try {
                js.push(assets[state.routes[1].name]);
            } catch(err) {}

            var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';',
                componentContext = context.getComponentContext();

            var markup = React.renderToString(<Handler context={componentContext} />),
                html = React.renderToStaticMarkup(
                    <Html js={js} css={css} markup={markup} state={exposed} context={componentContext} />
                );
            res.send('<!DOCTYPE html>' + html);
        });
    });
};
