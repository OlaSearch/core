'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (_ref) {
  var namespace = _ref.namespace,
      _ref$types = _ref.types,
      types = _ref$types === undefined ? _persistState.STATE_TYPE_KEYS : _ref$types,
      _ref$callback = _ref.callback,
      callback = _ref$callback === undefined ? _persistState.debouncePersistState : _ref$callback;

  return function (_ref2) {
    var dispatch = _ref2.dispatch,
        getState = _ref2.getState;
    return function (next) {
      return function (action) {
        /* Persist store state */
        if (types.indexOf(action.type) !== -1) {
          callback(action, getState, namespace);
        }
        return next(action);
      };
    };
  };
};

var _persistState = require('./../store/persistState');

var _Settings = require('./../constants/Settings');