'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var Summary = function Summary(_ref) {
  var result = _ref.result;
  var length = _ref.length;
  var ellipsis = _ref.ellipsis;
  var summary = result.summary;
  var highlighting = result.highlighting;


  if (!summary) return null;

  /* Check for highlighting */

  if (highlighting) {
    var highlightedSummary = highlighting.summary;

    if ((typeof highlightedSummary === 'undefined' ? 'undefined' : require('../../../.babelhelper.js')['typeof'](highlightedSummary)) === 'object') {
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