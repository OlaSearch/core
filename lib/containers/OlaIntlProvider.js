'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _translations = require('./../translations');

var _translations2 = _interopRequireDefault(_translations);

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var OlaIntlProvider = function (_React$Component) {
  _inherits(OlaIntlProvider, _React$Component);

  function OlaIntlProvider(props) {
    _classCallCheck(this, OlaIntlProvider);

    var _this = _possibleConstructorReturn(this, (OlaIntlProvider.__proto__ || Object.getPrototypeOf(OlaIntlProvider)).call(this, props));

    _this.translate = function (key, placeholders, isHTML) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var result = (0, _utilities.translateKey)(key, _this.messages);
      var tagName = options.tagName || 'div';
      if (typeof placeholders === 'undefined') {
        return result;
      }
      var finalResult = (0, _utilities.supplant)(result, placeholders);
      return isHTML ? _react2['default'].createElement(tagName, { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(finalResult) }, null) : finalResult;
    };

    var locale = props.locale,
        _props$translations = props.translations,
        t = _props$translations === undefined ? {} : _props$translations;

    _this.messages = _extends({}, _translations2['default'][locale] ? _translations2['default'][locale]['messages'] : {}, t[locale] ? t[locale]['messages'] : {});
    return _this;
  }

  _createClass(OlaIntlProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        translate: this.translate
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react.Children.only(this.props.children);
    }
  }]);

  return OlaIntlProvider;
}(_react2['default'].Component);

OlaIntlProvider.childContextTypes = {
  translate: _propTypes2['default'].func
};


function mapPropsToState(state) {
  var Intl = state.Intl;

  return _extends({}, Intl, {
    key: Intl.locale
  });
}

module.exports = (0, _reactRedux.connect)(mapPropsToState)(OlaIntlProvider);