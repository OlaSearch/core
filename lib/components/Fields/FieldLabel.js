'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function FieldLabel(_ref) {
  var label = _ref.label;

  if (!label) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-field-component-label' },
    label
  );
}

module.exports = FieldLabel;