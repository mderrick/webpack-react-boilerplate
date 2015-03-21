var createStore = require('fluxible/addons/createStore');

var TimeStore = createStore({

    storeName: 'UserStore',

    error: false,

    user: {},

    initialize: function () {
        this.user = {};
        this.error = false;
    },

    updateUser: function (payload) {
        this.error = false;
        this.user = JSON.parse(payload);
        this.emitChange();
    },

    updateError: function(payload) {
        console.log(payload);
        this.error = payload;
        this.emitChange();
    },

    handlers: {
        'UPDATE_USER_SUCCESS': 'updateUser',
        'UPDATE_USER_ERROR': 'updateError'
    },

    getState: function () {
        return {
            error: this.error,
            user: this.user
        };
    },

    dehydrate: function () {
        return {
            error: this.error,
            user: this.user
        };
    },

    rehydrate: function (state) {
        this.error = state.error;
        this.user = state.user;
    }
});

module.exports = TimeStore;