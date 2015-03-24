var createStore = require('fluxible/addons/createStore');

var FollowersStore = createStore({

    storeName: 'FollowersStore',

    initialize: function () {
        this.followers = [];
        this.error = false;
        this.loading = false;
    },

    updateFollowers: function (payload) {
        this.initialize();
        this.followers = JSON.parse(payload);
        this.emitChange();
    },

    updateError: function(payload) {
        this.initialize();
        this.error = payload;
        this.emitChange();
    },

    showLoader: function() {
        this.initialize();
        this.loading = true;
        this.emitChange();
    },

    handlers: {
        'UPDATE_FOLLOWERS_START': 'showLoader',
        'UPDATE_FOLLOWERS_SUCCESS': 'updateFollowers',
        'UPDATE_FOLLOWERS_ERROR': 'updateError'
    },

    getState: function () {
        return {
            loading: this.loading,
            error: this.error,
            followers: this.followers
        };
    },

    dehydrate: function () {
        return {
            loading: this.loading,
            error: this.error,
            followers: this.followers
        };
    },

    rehydrate: function (state) {
        this.loading = state.loading;
        this.error = state.error;
        this.followers = state.followers;
    }
});

module.exports = FollowersStore;