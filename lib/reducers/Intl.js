'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var _Settings = require('./../constants/Settings');

var _storage = require('./../services/storage');

var _storage2 = require('../../.babelhelper.js').interopRequireDefault(_storage);

var initialState = {
  locale: _storage2['default'].cookies.get(_Settings.LOCALE_STORAGE_KEY) || 'en'
};

exports['default'] = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case undefined:
    default:
      return state;

    case _ActionTypes2['default'].SET_LOCALE:
      return require('../../.babelhelper.js')['extends']({}, state, {
        locale: action.locale
      });
  }
};