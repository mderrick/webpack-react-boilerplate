var request = require('superagent'),
    url = 'https://api.github.com/users/{username}';

module.exports = function (actionContext, payload, done) {

    // The server should only call done when it has received data whereas on the
    // client we call done right away as we want to dispatch an event to show
    // a loader and dispatch the success event when it's done.
    // https://github.com/yahoo/fluxible/issues/18
    if (ENV.browser) {
        done();
    }

    actionContext.dispatch('UPDATE_USER_START', true);

    var username = payload.params.username || 'mderrick';
    request
        .get(url.replace('{username}', username))
        .end(function(err, res) {
        	if (err) {
        		actionContext.dispatch('UPDATE_USER_ERROR', res.error.message);
        	} else if (res.error) {
        		actionContext.dispatch('UPDATE_USER_ERROR', res.error.message);
        	} else {
        		actionContext.dispatch('UPDATE_USER_SUCCESS', res.text);
        	}
            done();
        });
};