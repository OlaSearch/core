'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _Settings = require('./../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var initialState = {
  locale: _Settings.DEFAULT_LOCALE
};

exports['default'] = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case undefined:
    default:
      return state;

    case _ActionTypes2['default'].OLA_REHYDRATE:
      return (0, _extends3['default'])({}, state, {
        locale: action.locale
      });

    case _ActionTypes2['default'].SET_LOCALE:
      return (0, _extends3['default'])({}, state, {
        locale: action.locale
      });
  }
};