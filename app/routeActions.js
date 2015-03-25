var async = require('async');

/**
 * This helper runs actions of all the Handlers that the react-router
 * has said are active. This pre-populates the context with all the data
 * needed to render components.
 */
module.exports = function(state, context, done) {
    async.filterSeries(
        state.routes.filter(function(route) {
            // TODO: handler.loadAction is not present using ProxyView
            return route.handler.loadAction?true:false;
        }),
        function(route, done) {
            // Run `loadAction` on all components that are active to fill all
            // stores with data
            context.getActionContext().executeAction(route.handler.loadAction, {
                params: state.params,
                query: state.query
            }, done);
        },
        function() {
            done();
        }
    );
};