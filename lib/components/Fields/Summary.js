'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _Settings = require('./../../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Summary = function Summary(_ref) {
  var result = _ref.result;
  var length = _ref.length;
  var ellipsis = _ref.ellipsis;
  var summary = result.summary;
  var highlighting = result.highlighting;


  if (!summary) return _Settings.NO_SCRIPT_TAG;

  /* Check for highlighting */

  if (highlighting) {
    var highlightedSummary = highlighting.summary;

    if ((typeof highlightedSummary === 'undefined' ? 'undefined' : _typeof(highlightedSummary)) === 'object') {
      summary = highlightedSummary.join('<br />' + ellipsis);
    }
  } else if (summary.length > length) {
    summary = summary.substr(0, length).split(' ').slice(0, -1).join(' ') + ellipsis;
  }

  return _react2['default'].createElement('div', { className: 'ola-field ola-field-summary', dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(summary) });
};

Summary.defaultProps = {
  length: 200,
  ellipsis: '...'
};

module.exports = Summary;