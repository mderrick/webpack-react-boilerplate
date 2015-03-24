var createStore = require('fluxible/addons/createStore');

var UserStore = createStore({

    storeName: 'UserStore',

    initialize: function () {
        this.user = {};
        this.error = false;
        this.loading = false;
    },

    updateUser: function (payload) {
        this.initialize();
        this.user = JSON.parse(payload);
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
        'UPDATE_USER_START': 'showLoader',
        'UPDATE_USER_SUCCESS': 'updateUser',
        'UPDATE_USER_ERROR': 'updateError'
    },

    getState: function () {
        return {
            loading: this.loading,
            error: this.error,
            user: this.user
        };
    },

    dehydrate: function () {
        return {
            loading: this.loading,
            error: this.error,
            user: this.user
        };
    },

    rehydrate: function (state) {
        this.loading = state.loading;
        this.error = state.error;
        this.user = state.user;
    }
});

module.exports = UserStore;