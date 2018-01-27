'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var initialState = exports.initialState = {
  timestamp: {}
};

exports['default'] = function () {
  var _extends2;

  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case undefined:
    default:
      return state;

    case _ActionTypes2['default'].REQUEST_SEARCH:
    case _ActionTypes2['default'].REQUEST_GUIDE:
    case _ActionTypes2['default'].REQUEST_AUTOSUGGEST:
    case _ActionTypes2['default'].REQUEST_FACET:
      if (!action.api) return state;
      return (0, _extends4['default'])({}, state, {
        timestamp: (0, _extends4['default'])({}, state.timestamp, (_extends2 = {}, _extends2['' + action.api] = new Date().getTime(), _extends2))
      });

    case _ActionTypes2['default'].CLOSE_AUTOSUGGEST:
      return (0, _extends4['default'])({}, state, {
        timestamp: {}
      });
  }
};