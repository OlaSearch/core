'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = require('../../../../.babelhelper.js').interopRequireDefault(_react);

var FilterInput = function FilterInput(_ref) {
  var _ref$placeholder = _ref.placeholder;
  var placeholder = _ref$placeholder === undefined ? '' : _ref$placeholder;
  var value = _ref.value;
  var onChange = _ref.onChange;

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