'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = _interopRequireDefault(_olaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var NoResults = function NoResults(_ref) {
  var results = _ref.results;
  var isLoading = _ref.isLoading;
  var q = _ref.q;
  var isBookmark = _ref.isBookmark;
  var translate = _ref.translate;

  if (results.length || isLoading) return null;
  var message = translate('no_results_found', { q: q });
  if (isBookmark) {
    message = translate('bookmarks_empty_label');
  }

  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet ola-snippet-noresults' },
    message
  );
};

module.exports = (0, _olaTranslate2['default'])(NoResults);