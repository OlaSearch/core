'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../utilities');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = require('../../.babelhelper.js').interopRequireDefault(_hoistNonReactStatics);

var _Logger = require('./../actions/Logger');

module.exports = function (WrappedComponent) {
  var WithLogger = function WithLogger(props, _ref) {
    var store = _ref.store;

    function logFn(params) {
      store.dispatch((0, _Logger.log)(params));
    }
    return _react2['default'].createElement(WrappedComponent, require('../../.babelhelper.js')['extends']({}, props, { log: logFn }));
  };
  WithLogger.contextTypes = {
    store: _react2['default'].PropTypes.object
  };
  return (0, _hoistNonReactStatics2['default'])(WithLogger, WrappedComponent);
};