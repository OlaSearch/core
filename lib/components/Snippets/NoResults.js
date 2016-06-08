'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var NoResults = function NoResults(props) {
  var results = props.results;
  var isLoading = props.isLoading;
  var q = props.q;
  var isBookmark = props.isBookmark;

  if (results.length || isLoading) return null;
  var message = 'No results found matching ' + q + '. Please try again.';
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