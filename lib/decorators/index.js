'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withConfig = exports.withTheme = exports.withLogger = exports.withTranslate = exports.withToggle = exports.withRoute = undefined;

var _withRoute2 = require('./withRoute');

var _withRoute3 = _interopRequireDefault(_withRoute2);

var _withToggle2 = require('./withToggle');

var _withToggle3 = _interopRequireDefault(_withToggle2);

var _withTranslate2 = require('./withTranslate');

var _withTranslate3 = _interopRequireDefault(_withTranslate2);

var _withLogger2 = require('./withLogger');

var _withLogger3 = _interopRequireDefault(_withLogger2);

var _withTheme2 = require('./withTheme');

var _withTheme3 = _interopRequireDefault(_withTheme2);

var _withConfig2 = require('./withConfig');

var _withConfig3 = _interopRequireDefault(_withConfig2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports.withRoute = _withRoute3['default'];
exports.withToggle = _withToggle3['default'];
exports.withTranslate = _withTranslate3['default'];
exports.withLogger = _withLogger3['default'];
exports.withTheme = _withTheme3['default'];
exports.withConfig = _withConfig3['default'];