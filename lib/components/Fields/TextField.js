'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TextField = function TextField(_ref) {
  var field = _ref.field,
      result = _ref.result,
      staticText = _ref.staticText,
      length = _ref.length,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === undefined ? '' : _ref$prefix,
      _ref$suffix = _ref.suffix,
      suffix = _ref$suffix === undefined ? '' : _ref$suffix,
      ellipsis = _ref.ellipsis,
      dynamicClass = _ref.dynamicClass;

  var fieldContent = result[field] || staticText;
  var highlighting = result.highlighting;

  if (!fieldContent) return null;

  /* Check for highlighting */
  if (highlighting && field in highlighting) {
    var highlightedContent = highlighting[field];
    if ((typeof highlightedContent === 'undefined' ? 'undefined' : _typeof(highlightedContent)) === 'object') {
      var temp = [];
      for (var i = 0; i < highlightedContent.length; i++) {
        temp.push('<span class=\'ola-hi-token\'>' + highlightedContent[i] + '</span>');
      }
      fieldContent = temp;
    }
  } else if (fieldContent && fieldContent.length > length) {
    fieldContent = prefix + (0, _utilities.truncate)(fieldContent, length) + suffix;
  }
  var userClass = dynamicClass && fieldContent ? ' ' + field + '-' + fieldContent.toLowerCase() : '';
  var klass = 'ola-field ola-field-highlighted-field ola-field-' + field + userClass;
  return _react2['default'].createElement('div', { className: klass, dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(fieldContent) });
};

TextField.defaultProps = {
  length: 200,
  ellipsis: '...',
  dynamicClass: false
};

module.exports = TextField;