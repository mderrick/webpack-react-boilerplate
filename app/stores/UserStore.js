var createStore = require('fluxible/addons/createStore');

var TimeStore = createStore({

    storeName: 'UserStore',

    initialize: function () {
        this.user = {};
    },

    updateUser: function (payload) {
        this.user = JSON.parse(payload);
        this.emitChange();
    },

    handlers: {
        'UPDATE_USER': 'updateUser'
    },

    getState: function () {
        return {
            user: this.user
        };
    },

    dehydrate: function () {
        return {
            user: this.user
        };
    },

    rehydrate: function (state) {
        this.user = state.user;
    }
});

module.exports = TimeStore;