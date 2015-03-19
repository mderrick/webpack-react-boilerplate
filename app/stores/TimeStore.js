var createStore = require('fluxible/addons/createStore');

var TimeStore = createStore({

    storeName: 'TimeStore',

    initialize: function () {
        this.time = new Date();
    },

    handleTimeChange: function (payload) {
        this.time = new Date();
        this.emitChange();
    },

    handlers: {
        'UPDATE_TIME': 'handleTimeChange',
        'CHANGE_ROUTE': 'handleTimeChange'
    },

    getState: function () {
        return {
            time: this.time.toString()
        };
    },

    dehydrate: function () {
        return {
            time: this.time.toString()
        };
    },

    rehydrate: function (state) {
        this.time = new Date(state.time);
    }
});

module.exports = TimeStore;