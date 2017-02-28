'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocale = setLocale;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function setLocale(locale) {
  return {
    type: _ActionTypes2['default'].SET_LOCALE,
    locale: locale
  };
}