'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports['default'] = function (WrappedComponent) {
  var WithLogger = function (_React$PureComponent) {
    (0, _inherits3['default'])(WithLogger, _React$PureComponent);

    function WithLogger() {
      var _temp, _this, _ret;

      (0, _classCallCheck3['default'])(this, WithLogger);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.logFn = function (params) {
        _this.context.store.dispatch((0, _Logger.log)(params));
      }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
    }

    WithLogger.prototype.render = function render() {
      return _react2['default'].createElement(WrappedComponent, (0, _extends3['default'])({}, this.props, { log: this.logFn }));
    };

    return WithLogger;
  }(_react2['default'].PureComponent);

  WithLogger.contextTypes = {
    store: _propTypes2['default'].object
  };
  return (0, _hoistNonReactStatics2['default'])(WithLogger, WrappedComponent);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _Logger = require('./../actions/Logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }