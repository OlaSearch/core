'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var LoadMore = function LoadMore(_ref) {
  var totalResults = _ref.totalResults;
  var currentPage = _ref.currentPage;
  var perPage = _ref.perPage;
  var actions = _ref.actions;

  if (currentPage * perPage >= totalResults) return null;

  return _react2['default'].createElement(
    'button',
    {
      type: 'button',
      className: 'ola-link-load-more',
      onClick: actions.loadMore
    },
    'Load more'
  );
};

module.exports = LoadMore;