'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ThemeContext = require('./../containers/ThemeContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function withTheme(WrappedComponent) {
  return function (props) {
    return _react2['default'].createElement(
      _ThemeContext.ThemeConsumer,
      null,
      function (theme) {
        return _react2['default'].createElement(WrappedComponent, (0, _extends3['default'])({ theme: theme }, props));
      }
    );
  };
}

exports['default'] = withTheme;