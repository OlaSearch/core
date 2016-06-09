'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var NoResults = function NoResults(_ref) {
  var results = _ref.results;
  var isLoading = _ref.isLoading;
  var q = _ref.q;
  var isBookmark = _ref.isBookmark;

  if (results.length || isLoading) return null;
  var message = _react2['default'].createElement(
    'span',
    null,
    'No results found matching ',
    _react2['default'].createElement(
      'strong',
      null,
      q
    ),
    '. Please try again.'
  );
  if (isBookmark) {
    message = 'You do not have any bookmarks. Click on the heart icon to add one.';
  }

  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet ola-snippet-noresults' },
    message
  );
};

module.exports = NoResults;