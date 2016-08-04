'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = require('../../../.babelhelper.js').interopRequireDefault(_dateParser);

var DateField = function DateField(_ref) {
  var date = _ref.date;
  var format = _ref.format;

  var formattedDate = '';
  try {
    formattedDate = _dateParser2['default'].format(date, format);
  } catch (e) {
    return null;
  }
  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-date' },
    formattedDate
  );
};

module.exports = DateField;