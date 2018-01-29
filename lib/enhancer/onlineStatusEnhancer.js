'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function () {
  return function (createStore) {
    return function () {
      var store = createStore.apply(undefined, arguments);
      if (!(0, _Settings.isBrowser)()) return store;
      /**
       * Observe online and offline events
       */
      window.addEventListener('online', function (event) {
        store.dispatch({ type: _ActionTypes2['default'].UPDATE_CONNECTION, status: event.type });
      });
      window.addEventListener('offline', function (event) {
        store.dispatch({ type: _ActionTypes2['default'].UPDATE_CONNECTION, status: event.type });
      });
      return store;
    };
  };
};

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _Settings = require('./../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }