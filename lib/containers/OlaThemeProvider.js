'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeConsumer = exports.ThemeProvider = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactContext = require('create-react-context');

var _createReactContext2 = _interopRequireDefault(_createReactContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ThemeContext = (0, _createReactContext2['default'])({});

var ThemeProvider = ThemeContext.Provider;
var ThemeConsumer = ThemeContext.Consumer;

exports.ThemeProvider = ThemeProvider;
exports.ThemeConsumer = ThemeConsumer;
// export ThemeConsumer as ThemeContext.Consumer