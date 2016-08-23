'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var NoResults = function NoResults(_ref) {
  var results = _ref.results;
  var isLoading = _ref.isLoading;
  var q = _ref.q;
  var isBookmark = _ref.isBookmark;
  var translate = _ref.translate;

  if (results.length || isLoading || !q) return null;
  var message = translate('no_results_found', { q: q }, true);
  if (isBookmark) {
    message = translate('bookmarks_empty_label');
  }

  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet ola-snippet-noresults' },
    message
  );
};

module.exports = (0, _OlaTranslate2['default'])(NoResults);