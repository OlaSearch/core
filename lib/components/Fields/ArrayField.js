'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var ArrayField = function ArrayField(_ref) {
  var field = _ref.field;
  var _ref$suffix = _ref.suffix;
  var suffix = _ref$suffix === undefined ? '' : _ref$suffix;
  var _ref$separator = _ref.separator;
  var separator = _ref$separator === undefined ? ', ' : _ref$separator;

  if (!field) return null;
  if (!Array.isArray(field)) return field;
  return _react2['default'].createElement(
    'span',
    null,
    suffix + field.join(separator)
  );
};

module.exports = ArrayField;