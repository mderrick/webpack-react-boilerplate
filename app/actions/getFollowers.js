var request = require('superagent'),
    url = 'https://api.github.com/users/{username}/followers';

module.exports = function (actionContext, payload, done) {
    var username = payload.params.username || 'mderrick';
    request
        .get(url.replace('{username}', username))
        .end(function(err, res) {
        	if (err) {
        		actionContext.dispatch('UPDATE_FOLLOWERS_ERROR', res.error.message);
        	} else if (res.error) {
        		actionContext.dispatch('UPDATE_FOLLOWERS_ERROR', res.error.message);
        	} else {
        		actionContext.dispatch('UPDATE_FOLLOWERS_SUCCESS', res.text);
        	}
            done();
        });
};