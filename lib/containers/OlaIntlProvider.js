'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _translations = require('./../translations');

var _translations2 = _interopRequireDefault(_translations);

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var OlaIntlProvider = function (_React$Component) {
  (0, _inherits3['default'])(OlaIntlProvider, _React$Component);

  function OlaIntlProvider(props) {
    (0, _classCallCheck3['default'])(this, OlaIntlProvider);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (OlaIntlProvider.__proto__ || (0, _getPrototypeOf2['default'])(OlaIntlProvider)).call(this, props));

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

    _this.messages = (0, _extends3['default'])({}, _translations2['default'][locale] ? _translations2['default'][locale]['messages'] : {}, t[locale] ? t[locale]['messages'] : {});
    return _this;
  }

  (0, _createClass3['default'])(OlaIntlProvider, [{
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

  return (0, _extends3['default'])({}, Intl, {
    key: Intl.locale
  });
}

module.exports = (0, _reactRedux.connect)(mapPropsToState)(OlaIntlProvider);