'use strict';

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

var _OlaIntlProvider = require('./OlaIntlProvider');

var _OlaIntlProvider2 = _interopRequireDefault(_OlaIntlProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var OlaProvider = function (_React$Component) {
  (0, _inherits3['default'])(OlaProvider, _React$Component);

  function OlaProvider(props) {
    (0, _classCallCheck3['default'])(this, OlaProvider);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (OlaProvider.__proto__ || (0, _getPrototypeOf2['default'])(OlaProvider)).call(this, props));

    var config = props.config,
        store = props.store;

    if (!config || !store) {
      var namePart = _this.constructor.displayName ? ' of ' + _this.constructor.displayName : '';
      throw new Error('Could not find config or store on this.props ' + namePart);
    }
    return _this;
  }

  (0, _createClass3['default'])(OlaProvider, [{
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
            this.props.children
          )
        )
      );
    }
  }]);
  return OlaProvider;
}(_react2['default'].Component);

OlaProvider.childContextTypes = {
  config: _propTypes2['default'].any.isRequired
};


module.exports = OlaProvider;