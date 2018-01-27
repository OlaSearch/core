'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _OlaIntlProvider = require('./OlaIntlProvider');

var _OlaIntlProvider2 = _interopRequireDefault(_OlaIntlProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var OlaProvider = function (_React$Component) {
  (0, _inherits3['default'])(OlaProvider, _React$Component);

  function OlaProvider(props) {
    (0, _classCallCheck3['default'])(this, OlaProvider);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    var config = props.config,
        store = props.store;

    if (!config || !store) {
      throw new Error('Could not find config or store on this.props ' + (_this.constructor.displayName || ''));
    }
    return _this;
  }

  OlaProvider.prototype.getChildContext = function getChildContext() {
    return {
      config: this.props.config
    };
  };

  OlaProvider.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'ola-search' },
      _react2['default'].createElement(
        _reactRedux.Provider,
        { store: this.props.store },
        _react2['default'].createElement(
          _OlaIntlProvider2['default'],
          { translations: this.props.translations },
          this.props.children
        )
      )
    );
  };

  return OlaProvider;
}(_react2['default'].Component);

OlaProvider.childContextTypes = {
  config: _propTypes2['default'].any.isRequired
};


module.exports = OlaProvider;