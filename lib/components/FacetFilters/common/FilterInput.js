'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FilterInput = function FilterInput(_ref) {
  var _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? '' : _ref$placeholder,
      value = _ref.value,
      onChange = _ref.onChange;

  return _react2['default'].createElement('input', {
    type: 'text',
    className: 'ola-text-input ola-facet-filter-input',
    value: value,
    placeholder: placeholder,
    'aria-label': 'Input',
    onChange: onChange
  });
};

exports['default'] = FilterInput;