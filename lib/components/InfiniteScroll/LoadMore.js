'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var LoadMore = function LoadMore(_ref) {
  var totalResults = _ref.totalResults,
      currentPage = _ref.currentPage,
      perPage = _ref.perPage,
      actions = _ref.actions,
      onLoadMore = _ref.onLoadMore,
      isLoading = _ref.isLoading,
      beforeChangePage = _ref.beforeChangePage,
      translate = _ref.translate;

  if (currentPage * perPage >= totalResults) return null;
  var klass = (0, _classnames2['default'])('ola-link-load-more', {
    'ola-link-load-more-active': isLoading
  });
  function handleClick() {
    if (beforeChangePage) beforeChangePage();
    onLoadMore ? onLoadMore() : actions.loadMore();
  }
  var text = isLoading ? translate('load_more_button_loading') : translate('load_more_button');
  return _react2['default'].createElement(
    'button',
    {
      type: 'button',
      className: klass,
      disabled: isLoading,
      onClick: handleClick
    },
    text
  );
};

LoadMore.defaultProps = {
  isLoading: false
};

module.exports = (0, _OlaTranslate2['default'])(LoadMore);