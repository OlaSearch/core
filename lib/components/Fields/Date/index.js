'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dateParser = require('./../../../utilities/dateParser');

var _FieldLabel = require('./../FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

var _calendar = require('@olasearch/icons/lib/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TIME_REGEX = /h{1,2}\:.*/;
/**
 * Displays a formatted Date field
 */
function DateField(_ref) {
  var date = _ref.date,
      endDate = _ref.endDate,
      allDayEvent = _ref.allDayEvent,
      format = _ref.format,
      fieldLabel = _ref.fieldLabel,
      inlineLabel = _ref.inlineLabel,
      displayIcon = _ref.displayIcon,
      iconSize = _ref.iconSize,
      dependentField = _ref.dependentField,
      result = _ref.result,
      showIfEmpty = _ref.showIfEmpty;

  if (!date) return null;
  var formattedDate = '';
  var formattedEndDate = null;
  var fallOnSameDay = false;
  var timeFormat = null;
  try {
    formattedDate = (0, _dateParser.format)(date, format);
  } catch (e) {
    console.warn(e);
    return null;
  }
  if (endDate) {
    try {
      formattedEndDate = (0, _dateParser.format)(endDate, format);
    } catch (e) {
      console.warn(e);
    }
  }
  /**
   * 1. check if start and end is the same day
   * @type {[type]}
   */
  if (endDate) {
    fallOnSameDay = (0, _dateParser.isSameDay)(date, endDate);
    if (fallOnSameDay) {
      var timeFormatMatches = TIME_REGEX.exec(format);
      timeFormat = timeFormatMatches ? timeFormatMatches[0] : null;
      format = format.replace(TIME_REGEX, '').trim();
    }
  }
  var classes = (0, _classnames2['default'])('ola-field ola-field-date', {
    'ola-field-daterange': formattedEndDate,
    'ola-field-label-inline': inlineLabel
  });
  return _react2['default'].createElement(
    'div',
    { className: classes },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    _react2['default'].createElement(
      'div',
      { className: 'ola-flex' },
      displayIcon && _react2['default'].createElement(
        'span',
        { className: 'ola-flex-icon' },
        _react2['default'].createElement(_calendar2['default'], { size: iconSize })
      ),
      _react2['default'].createElement(
        'span',
        { className: 'ola-flex-content' },
        formattedEndDate ? formattedEndDate === formattedDate ? formattedDate : fallOnSameDay ? (0, _dateParser.format)(date, format) + ', ' + (0, _dateParser.format)(date, timeFormat) + ' - ' + (0, _dateParser.format)(endDate, timeFormat) : formattedDate + ' - ' + formattedEndDate : formattedDate
      )
    )
  );
}

DateField.defaultProps = {
  endDate: null,
  allDayEvent: false,
  showIfEmpty: false,
  displayIcon: false,
  iconSize: 20,
  type: 'daterange'
};

module.exports = DateField;