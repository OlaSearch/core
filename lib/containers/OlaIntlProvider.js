'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translations = require('./../translations');

var _translations2 = _interopRequireDefault(_translations);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var OlaIntlProvider = function OlaIntlProvider(_ref) {
  var _ref$lang = _ref.lang;
  var lang = _ref$lang === undefined ? 'en' : _ref$lang;
  var _ref$translations = _ref.translations;
  var translations = _ref$translations === undefined ? {} : _ref$translations;
  var children = _ref.children;

  var activeTranslation = lang && translations ? translations[lang] : {};

  var _defaultTranslations$ = _extends({}, _translations2['default'][lang], activeTranslation);

  var locales = _defaultTranslations$.locales;
  var messages = _defaultTranslations$.messages;
  var formats = _defaultTranslations$.formats;

  return _react2['default'].createElement(
    _reactIntl.IntlProvider,
    { locale: locales, messages: messages, formats: formats },
    children
  );
};

module.exports = OlaIntlProvider;