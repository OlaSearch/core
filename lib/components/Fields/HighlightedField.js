'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var HighlightedField = function HighlightedField(_ref) {
  var field = _ref.field,
      result = _ref.result,
      length = _ref.length;

  if (!field) return null;

  var highlighting = result.highlighting;

  var fieldContent = result[field];

  /* Check for highlighting */

  if (highlighting && field in highlighting) {
    var highlightedContent = highlighting[field];
    if ((typeof highlightedContent === 'undefined' ? 'undefined' : _typeof(highlightedContent)) === 'object') {
      var temp = [];
      for (var i = 0, len = highlightedContent.length; i < len; i++) {
        temp.push('<span class=\'ola-hi-token\'>' + highlightedContent[i] + '</span>');
      }
      fieldContent = temp;
    }
  } else if (fieldContent && fieldContent.length > length) {
    fieldContent = fieldContent.substr(0, length).split(' ').slice(0, -1).join(' ') + '...';
  }
  var klass = 'ola-field ola-field-highlighted-field ola-field-' + field;

  if (!fieldContent) return null;

  return _react2['default'].createElement('div', { className: klass, dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(fieldContent) });
};

HighlightedField.defaultProps = {
  length: 200
};

module.exports = HighlightedField;