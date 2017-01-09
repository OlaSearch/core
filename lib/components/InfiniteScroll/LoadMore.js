'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var LoadMore = function LoadMore(_ref) {
  var totalResults = _ref.totalResults,
      currentPage = _ref.currentPage,
      perPage = _ref.perPage,
      actions = _ref.actions,
      isLoading = _ref.isLoading;

  if (currentPage * perPage >= totalResults) return null;
  var klass = (0, _classnames2['default'])('ola-link-load-more', {
    'ola-link-load-more-active': isLoading
  });
  return _react2['default'].createElement(
    'button',
    {
      type: 'button',
      className: klass,
      disabled: isLoading,
      onClick: actions.loadMore
    },
    'Load more'
  );
};

LoadMore.defaultProps = {
  isLoading: false
};

module.exports = LoadMore;