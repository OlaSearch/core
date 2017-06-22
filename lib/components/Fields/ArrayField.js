'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ArrayField = function ArrayField(_ref) {
  var field = _ref.field,
      _ref$suffix = _ref.suffix,
      suffix = _ref$suffix === undefined ? '' : _ref$suffix,
      _ref$separator = _ref.separator,
      separator = _ref$separator === undefined ? ', ' : _ref$separator;

  if (!field) return null;
  if (!Array.isArray(field)) return field;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-array' },
    suffix + field.join(separator)
  );
};

module.exports = ArrayField;