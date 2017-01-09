'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var TextField = function TextField(_ref) {
  var field = _ref.field,
      result = _ref.result,
      staticText = _ref.staticText,
      length = _ref.length,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === undefined ? '' : _ref$prefix,
      _ref$suffix = _ref.suffix,
      suffix = _ref$suffix === undefined ? '' : _ref$suffix,
      ellipsis = _ref.ellipsis;

  var fieldContent = result[field] || staticText;
  var highlighting = result.highlighting;

  if (!fieldContent) return null;

  /* Check for highlighting */
  if (highlighting && field in highlighting) {
    var highlightedContent = highlighting[field];
    if ((typeof highlightedContent === 'undefined' ? 'undefined' : require('../../../.babelhelper.js')['typeof'](highlightedContent)) === 'object') {
      var temp = [];
      for (var i = 0; i < highlightedContent.length; i++) {
        temp.push('<span class=\'ola-hi-token\'>' + highlightedContent[i] + '</span>');
      }
      fieldContent = temp;
    }
  } else if (fieldContent && fieldContent.length > length) {
    fieldContent = prefix + (0, _utilities.truncate)(fieldContent, length) + suffix;
  }
  var klass = 'ola-field ola-field-highlighted-field ola-field-' + field;
  return _react2['default'].createElement('div', { className: klass, dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(fieldContent) });
};

TextField.defaultProps = {
  length: 200,
  ellipsis: '...'
};

module.exports = TextField;