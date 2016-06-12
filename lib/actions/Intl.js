'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLocale = setLocale;
exports.setTranslations = setTranslations;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function setLocale(locale) {
  return {
    type: _ActionTypes2['default'].SET_LOCALE,
    locale: locale
  };
}

function setTranslations(translations) {
  return {
    type: _ActionTypes2['default'].SET_TRANSLATIONS,
    translations: translations
  };
}