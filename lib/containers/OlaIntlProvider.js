'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translations = require('./../translations');

var _translations2 = _interopRequireDefault(_translations);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var OlaIntlProvider = function (_React$Component) {
  _inherits(OlaIntlProvider, _React$Component);

  function OlaIntlProvider() {
    _classCallCheck(this, OlaIntlProvider);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(OlaIntlProvider).apply(this, arguments));
  }

  _createClass(OlaIntlProvider, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var translations = _props.translations;
      var lang = _props.lang;
      var children = _props.children;

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
    }
  }]);

  return OlaIntlProvider;
}(_react2['default'].Component);

OlaIntlProvider.defaultProps = {
  lang: 'en',
  translations: {}
};


module.exports = OlaIntlProvider;