'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withLogger = exports.injectTranslate = exports.withToggle = exports.OlaRoute = undefined;

var _OlaRoute = require('./OlaRoute');

var _OlaRoute2 = _interopRequireDefault(_OlaRoute);

var _OlaToggle = require('./OlaToggle');

var _OlaToggle2 = _interopRequireDefault(_OlaToggle);

var _OlaTranslate = require('./OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _OlaLogger = require('./OlaLogger');

var _OlaLogger2 = _interopRequireDefault(_OlaLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports.OlaRoute = _OlaRoute2['default'];
exports.withToggle = _OlaToggle2['default'];
exports.injectTranslate = _OlaTranslate2['default'];
exports.withLogger = _OlaLogger2['default'];