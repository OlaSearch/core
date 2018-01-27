'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utilities = require('./../../../utilities');

var _FieldLabel = require('./../FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function TextField(_ref) {
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
      className = _ref.className,
      showIfEmpty = _ref.showIfEmpty,
      placeholderText = _ref.placeholderText;

  var fieldContent = staticText || result[field];
  if (!fieldContent && fallbackFields.length) {
    for (var i = 0; i < fallbackFields.length; i++) {
      var fieldName = fallbackFields[i];
      if (fieldName in result && result[fieldName]) {
        fieldContent = result[fieldName];
        break;
      }
    }
  }
  /* Convert array to string */
  if (Array.isArray(fieldContent)) {
    fieldContent = fieldContent.join(', ');
  }
  var highlighting = result.highlighting;

  if (showIfEmpty && !fieldContent) fieldContent = '<em>' + field + '</em>';
  if (!fieldContent) {
    return null;
  }

  /* Check for highlighting */
  if (highlighting && field in highlighting) {
    var highlightedContent = highlighting[field];
    if ((typeof highlightedContent === 'undefined' ? 'undefined' : (0, _typeof3['default'])(highlightedContent)) === 'object') {
      var temp = [];
      for (var _i = 0; _i < highlightedContent.length; _i++) {
        temp.push('<span class=\'ola-hi-token\'>' + highlightedContent[_i] + '</span>');
      }
      fieldContent = temp;
    }
  } else if (fieldContent && fieldContent.length > length) {
    fieldContent = (0, _utilities.truncate)(fieldContent, length);
  }
  if (prefix) fieldContent = prefix + fieldContent;
  if (suffix) fieldContent = fieldContent + suffix;
  var userClass = dynamicClass && fieldContent ? ' ' + field + '-' + fieldContent.toLowerCase() : '';
  var klass = 'ola-field ola-field-text ' + (field ? 'ola-field-' + field + userClass : 'ola-field-static') + ' ' + className;
  return _react2['default'].createElement(
    'div',
    { className: klass },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    _react2['default'].createElement('div', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(fieldContent) })
  );
}

TextField.defaultProps = {
  length: 200,
  ellipsis: '...',
  className: '',
  dynamicClass: false,
  fallbackFields: [],
  showIfEmpty: false,
  placeholderText: null
};

module.exports = TextField;