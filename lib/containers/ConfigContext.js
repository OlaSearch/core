'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigConsumer = exports.ConfigProvider = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactContext = require('create-react-context');

var _createReactContext2 = _interopRequireDefault(_createReactContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ConfigContext = (0, _createReactContext2['default'])({});
var ConfigProvider = ConfigContext.Provider;
var ConfigConsumer = ConfigContext.Consumer;

exports.ConfigProvider = ConfigProvider;
exports.ConfigConsumer = ConfigConsumer;
exports['default'] = ConfigContext;