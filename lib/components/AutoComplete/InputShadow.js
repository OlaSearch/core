'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = InputShadow;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function InputShadow(_ref) {
  var value = _ref.value;

  return _react2['default'].createElement('input', {
    type: 'text',
    value: value,
    className: 'ola-text-input ola-text-input-round ola-text-inputshadow',
    autoComplete: 'off',
    autoCorrect: 'off',
    autoCapitalize: 'off',
    spellCheck: 'false',
    disabled: true
  });
}