'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dateParser = require('./../../utilities/dateParser');

var _dateParser2 = _interopRequireDefault(_dateParser);

var _FieldLabel = require('./FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DateField = function DateField(_ref) {
  var date = _ref.date,
      format = _ref.format,
      fieldLabel = _ref.fieldLabel;

  if (!date) return null;
  var formattedDate = '';
  try {
    formattedDate = _dateParser2['default'].format(date, format);
  } catch (e) {
    return null;
  }
  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-date' },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    formattedDate
  );
};

module.exports = DateField;