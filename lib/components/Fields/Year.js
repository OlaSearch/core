'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Settings = require('./../../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Year = function Year(_ref) {
  var year = _ref.year;

  if (!year) return _Settings.NO_SCRIPT_TAG;

  return _react2['default'].createElement(
    'span',
    null,
    '(',
    year,
    ')'
  );
};

module.exports = Year;