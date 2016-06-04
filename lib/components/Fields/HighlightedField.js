'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var HighlightedField = function HighlightedField(_ref) {
  var field = _ref.field;
  var result = _ref.result;
  var length = _ref.length;
  var highlighting = result.highlighting;


  if (!field) return _react2['default'].createElement('noscript', null);

  var fieldContent = result[field];

  /* Check for highlighting */

  if (highlighting && field in highlighting) {
    var highlightedContent = highlighting[field];

    if ((typeof highlightedContent === 'undefined' ? 'undefined' : _typeof(highlightedContent)) === 'object') {
      fieldContent = highlightedContent.join('<br />...');
    }
  } else if (fieldContent && fieldContent.length > length) {
    fieldContent = fieldContent.substr(0, length).split(' ').slice(0, -1).join(' ') + '...';
  }

  var klass = 'ola-field ola-field-highlighted-field ola-field-' + field;

  if (!fieldContent) return _react2['default'].createElement('noscript', null);

  return _react2['default'].createElement('div', { className: klass, dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(fieldContent) });
};

HighlightedField.defaultProps = {
  length: 200
};

HighlightedField.propTypes = {
  length: _react2['default'].PropTypes.number
};

module.exports = HighlightedField;