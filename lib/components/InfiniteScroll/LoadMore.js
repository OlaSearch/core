'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var LoadMore = function LoadMore(_ref) {
  var totalResults = _ref.totalResults;
  var currentPage = _ref.currentPage;
  var perPage = _ref.perPage;
  var actions = _ref.actions;

  if (currentPage * perPage >= totalResults) return _react2['default'].createElement('noscript', null);

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

LoadMore.propTypes = {
  actions: _react2['default'].PropTypes.shape({
    loadMore: _react2['default'].PropTypes.func.isRequired
  }),
  totalResults: _react2['default'].PropTypes.any.isRequired,
  currentPage: _react2['default'].PropTypes.any.isRequired,
  perPage: _react2['default'].PropTypes.any.isRequired
};

module.exports = LoadMore;