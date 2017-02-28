'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _Logger = require('./../actions/Logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

module.exports = function (WrappedComponent) {
  var WithLogger = function WithLogger(props, _ref) {
    var store = _ref.store;

    function logFn(params) {
      store.dispatch((0, _Logger.log)(params));
    }
    return _react2['default'].createElement(WrappedComponent, _extends({}, props, { log: logFn }));
  };
  WithLogger.contextTypes = {
    store: _react2['default'].PropTypes.object
  };
  return (0, _hoistNonReactStatics2['default'])(WithLogger, WrappedComponent);
};