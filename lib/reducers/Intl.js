'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _Settings = require('./../constants/Settings');

var _storage = require('./../services/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DEFAULT_LOCALE = 'en';
var initialState = {
  locale: DEFAULT_LOCALE
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
        locale: _storage2['default'].cookies.get(_Settings.LOCALE_STORAGE_KEY) || DEFAULT_LOCALE
      });

    case _ActionTypes2['default'].SET_LOCALE:
      return (0, _extends3['default'])({}, state, {
        locale: action.locale
      });
  }
};