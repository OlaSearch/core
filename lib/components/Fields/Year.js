'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Year = function Year(_ref) {
  var year = _ref.year;

  if (!year) return _react2['default'].createElement('noscript', null);

  return _react2['default'].createElement(
    'span',
    null,
    '(',
    year,
    ')'
  );
};

module.exports = Year;