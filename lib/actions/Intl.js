'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocale = setLocale;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

function setLocale(locale) {
  return {
    type: _ActionTypes2['default'].SET_LOCALE,
    locale: locale
  };
}