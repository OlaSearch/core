'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var FilterInput = function FilterInput(_ref) {
  var _ref$placeholder = _ref.placeholder;
  var placeholder = _ref$placeholder === undefined ? '' : _ref$placeholder;
  var filterText = _ref.filterText;
  var onChange = _ref.onChange;

  return _react2['default'].createElement('input', {
    type: 'text',
    className: 'ola-text-input ola-facet-filter-input',
    value: filterText,
    placeholder: placeholder,
    'arial-label': 'Input',
    onChange: onChange
  });
};

module.exports = FilterInput;