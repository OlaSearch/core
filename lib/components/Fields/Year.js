'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Settings = require('./../../constants/Settings');

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