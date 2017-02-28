'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var initialState = exports.initialState = {
  timestamp: null
};

exports['default'] = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case undefined:
    default:
      return state;

    case _ActionTypes2['default'].REQUEST_SEARCH:
    case _ActionTypes2['default'].REQUEST_GUIDE:
    case _ActionTypes2['default'].REQUEST_AUTOSUGGEST:
      return _extends({}, state, {
        timestamp: new Date().getTime()
      });

    case _ActionTypes2['default'].CLOSE_AUTOSUGGEST:
      return _extends({}, state, {
        timestamp: null
      });
  }
};