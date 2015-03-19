module.exports = function (actionContext, payload, done) {
    actionContext.dispatch('UPDATE_TIME', payload);
    done();
};