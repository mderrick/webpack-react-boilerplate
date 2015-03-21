var request = require('superagent'),
    url = 'https://api.github.com/users/{username}';

module.exports = function (actionContext, payload, done) {
    var username = 'mderrick';
    request
        .get(url.replace('{username}', username))
        .end(function(err, res) {
            actionContext.dispatch('UPDATE_USER', res.text);
            done();
        });
};