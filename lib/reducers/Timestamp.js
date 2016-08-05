'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var initialState = exports.initialState = {
  timestamp: null
};

exports['default'] = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case undefined:
    default:
      return state;

    case _ActionTypes2['default'].REQUEST_SEARCH:
    case _ActionTypes2['default'].REQUEST_GUIDE:
    case _ActionTypes2['default'].REQUEST_AUTOSUGGEST:
      return require('../../.babelhelper.js')['extends']({}, state, {
        timestamp: new Date().getTime()
      });

    case _ActionTypes2['default'].CLOSE_AUTOSUGGEST:
      return require('../../.babelhelper.js')['extends']({}, state, {
        timestamp: null
      });
  }
};