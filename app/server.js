var React = require('react'),
    Router = require('react-router'),
    routes = require('./routes'),
    Html = require('./components/html');

module.exports = function (req, res, next, js) {
    Router.run(routes, req.url, function (Handler, state) {
        var markup = React.renderToString(<Handler />);
        var html = React.renderToStaticMarkup(<Html js={js} markup={markup} />);
        res.send('<!DOCTYPE html>' + html);
    });
};
