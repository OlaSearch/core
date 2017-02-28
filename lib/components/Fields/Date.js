'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = _interopRequireDefault(_dateParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DateField = function DateField(_ref) {
  var date = _ref.date,
      format = _ref.format;

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