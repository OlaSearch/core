'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var HighlightedField = function HighlightedField(_ref) {
  var field = _ref.field;
  var result = _ref.result;
  var length = _ref.length;

  if (!field) return null;

  var highlighting = result.highlighting;

  var fieldContent = result[field];

  /* Check for highlighting */

  if (highlighting && field in highlighting) {
    var highlightedContent = highlighting[field];
    if ((typeof highlightedContent === 'undefined' ? 'undefined' : require('../../../.babelhelper.js')['typeof'](highlightedContent)) === 'object') {
      fieldContent = highlightedContent.join('<br />...');
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