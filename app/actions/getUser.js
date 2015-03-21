var request = require('superagent'),
    url = 'https://api.github.com/users/{username}';

module.exports = function (actionContext, payload, done) {
    var username = payload.params.username || 'mderrick';
    request
        .get(url.replace('{username}', username))
        .end(function(err, res) {
        	if (err) {
        		actionContext.dispatch('UPDATE_USER_ERROR', res.statusText);
        	} else if (res.error) {
        		actionContext.dispatch('UPDATE_USER_ERROR', res.statusText);
        	} else {
        		actionContext.dispatch('UPDATE_USER_SUCCESS', res.text);
        	}
            done();
        });
};