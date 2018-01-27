'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Displays fields that are arrays in a snippet
 */
function ArrayField(_ref) {
  var value = _ref.value,
      suffix = _ref.suffix,
      separator = _ref.separator;

  if (!value) return null;
  if (!Array.isArray(value)) return value;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-array' },
    suffix + ' ' + value.join(separator)
  );
}


ArrayField.defaultProps = {
  suffix: '',
  separator: ','
};

module.exports = ArrayField;