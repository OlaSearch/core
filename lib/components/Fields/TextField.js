'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utilities = require('./../../utilities');

var _FieldLabel = require('./FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TextField = function TextField(_ref) {
  var field = _ref.field,
      fallbackFields = _ref.fallbackFields,
      result = _ref.result,
      staticText = _ref.staticText,
      length = _ref.length,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === undefined ? '' : _ref$prefix,
      _ref$suffix = _ref.suffix,
      suffix = _ref$suffix === undefined ? '' : _ref$suffix,
      ellipsis = _ref.ellipsis,
      dynamicClass = _ref.dynamicClass,
      fieldLabel = _ref.fieldLabel,
      showIfEmpty = _ref.showIfEmpty,
      placeholderText = _ref.placeholderText;

  var fieldContent = result[field] || staticText;
  if (!fieldContent && fallbackFields.length) {
    for (var i = 0; i < fallbackFields.length; i++) {
      var fieldName = fallbackFields[i];
      if (fieldName in result && result[fieldName]) {
        fieldContent = result[fieldName];
        break;
      }
    }
  }
  var highlighting = result.highlighting;

  if (showIfEmpty && !fieldContent) fieldContent = '<em>' + field + '</em>';
  if (!fieldContent) {
    return null;
  }

  /* Check for highlighting */
  if (highlighting && field in highlighting) {
    var highlightedContent = highlighting[field];
    if ((typeof highlightedContent === 'undefined' ? 'undefined' : _typeof(highlightedContent)) === 'object') {
      var temp = [];
      for (var _i = 0; _i < highlightedContent.length; _i++) {
        temp.push('<span class=\'ola-hi-token\'>' + highlightedContent[_i] + '</span>');
      }
      fieldContent = temp;
    }
  } else if (fieldContent && fieldContent.length > length) {
    fieldContent = prefix + (0, _utilities.truncate)(fieldContent, length) + suffix;
  }
  var userClass = dynamicClass && fieldContent ? ' ' + field + '-' + fieldContent.toLowerCase() : '';
  var klass = 'ola-field ola-field-text ola-field-' + field + userClass;
  return _react2['default'].createElement(
    'div',
    { className: klass },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    _react2['default'].createElement('div', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(fieldContent) })
  );
};

TextField.defaultProps = {
  length: 200,
  ellipsis: '...',
  dynamicClass: false,
  fallbackFields: [],
  showIfEmpty: false,
  placeholderText: null
};

module.exports = TextField;