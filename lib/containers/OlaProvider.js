'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _OlaIntlProvider = require('./OlaIntlProvider');

var _OlaIntlProvider2 = _interopRequireDefault(_OlaIntlProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var OlaProvider = function (_React$Component) {
  _inherits(OlaProvider, _React$Component);

  function OlaProvider(props) {
    _classCallCheck(this, OlaProvider);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OlaProvider).call(this, props));

    var config = props.config;
    var store = props.store;

    if (!config || !store) {
      var namePart = _this.constructor.displayName ? ' of ' + _this.constructor.displayName : '';
      throw new Error('Could not find config or store on this.props ' + namePart);
    }
    return _this;
  }

  _createClass(OlaProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        config: this.props.config
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'ola-search' },
        _react2['default'].createElement(
          _reactRedux.Provider,
          { store: this.props.store },
          _react2['default'].createElement(
            _OlaIntlProvider2['default'],
            { translations: this.props.translations },
            _react.Children.only(this.props.children)
          )
        )
      );
    }
  }]);

  return OlaProvider;
}(_react2['default'].Component);

OlaProvider.childContextTypes = {
  config: _react2['default'].PropTypes.any.isRequired
};


module.exports = OlaProvider;