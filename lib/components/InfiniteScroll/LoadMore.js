'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var LoadMore = function LoadMore(_ref) {
  var totalResults = _ref.totalResults,
      currentPage = _ref.currentPage,
      perPage = _ref.perPage,
      actions = _ref.actions,
      isLoading = _ref.isLoading,
      beforeChangePage = _ref.beforeChangePage;

  if (currentPage * perPage >= totalResults) return null;
  var klass = (0, _classnames2['default'])('ola-link-load-more', {
    'ola-link-load-more-active': isLoading
  });
  function onLoadMore() {
    if (beforeChangePage) beforeChangePage();
    actions.loadMore();
  }
  return _react2['default'].createElement(
    'button',
    {
      type: 'button',
      className: klass,
      disabled: isLoading,
      onClick: onLoadMore
    },
    'Load more'
  );
};

LoadMore.defaultProps = {
  isLoading: false
};

module.exports = LoadMore;