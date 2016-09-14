'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var InputShadow = function InputShadow(_ref) {
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
};

module.exports = InputShadow;