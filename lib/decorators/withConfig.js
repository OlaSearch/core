'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ConfigContext = require('./../containers/ConfigContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function withConfig(WrappedComponent) {
  return function (props) {
    return _react2['default'].createElement(
      _ConfigContext.ConfigConsumer,
      null,
      function (config) {
        return _react2['default'].createElement(WrappedComponent, (0, _extends3['default'])({ config: config }, props));
      }
    );
  };
}

exports['default'] = withConfig;