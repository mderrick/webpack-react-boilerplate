var createStore = require('fluxible/addons/createStore');

var FollowersStore = createStore({

    storeName: 'FollowersStore',

    initialize: function () {
        this.followers = [];
        this.error = false;
    },

    updateFollowers: function (payload) {
        this.error = false;
        this.followers = JSON.parse(payload);
        this.emitChange();
    },

    updateError: function(payload) {
        this.error = payload;
        this.emitChange();
    },

    handlers: {
        'UPDATE_FOLLOWERS_SUCCESS': 'updateFollowers',
        'UPDATE_FOLLOWERS_ERROR': 'updateError'
    },

    getState: function () {
        return {
            error: this.error,
            followers: this.followers
        };
    },

    dehydrate: function () {
        return {
            error: this.error,
            followers: this.followers
        };
    },

    rehydrate: function (state) {
        this.error = state.error;
        this.followers = state.followers;
    }
});

module.exports = FollowersStore;