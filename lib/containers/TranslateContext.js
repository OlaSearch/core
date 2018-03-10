'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TranslateConsumer = exports.TranslateProvider = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactContext = require('create-react-context');

var _createReactContext2 = _interopRequireDefault(_createReactContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TranslateContext = (0, _createReactContext2['default'])({});
var TranslateProvider = TranslateContext.Provider;
var TranslateConsumer = TranslateContext.Consumer;

exports.TranslateProvider = TranslateProvider;
exports.TranslateConsumer = TranslateConsumer;
exports['default'] = TranslateContext;