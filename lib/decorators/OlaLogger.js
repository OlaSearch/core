'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
    return _react2['default'].createElement(WrappedComponent, (0, _extends3['default'])({}, props, { log: logFn }));
  };
  WithLogger.contextTypes = {
    store: _propTypes2['default'].object
  };
  return (0, _hoistNonReactStatics2['default'])(WithLogger, WrappedComponent);
};