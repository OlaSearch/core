'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SearchTitle = function SearchTitle(props, context) {
  var totalResults = props.totalResults;
  var page = props.page;
  var perPage = props.perPage;


  var currentIdx = Math.min((page - 1) * perPage + 1, totalResults);
  var lastIdx = Math.min(totalResults, currentIdx + parseInt(perPage) - 1);

  if (context.config.infiniteScroll) currentIdx = 1;

  return _react2['default'].createElement(
    'h3',
    { className: 'ola-search-heading' },
    _react2['default'].createElement(
      'span',
      { className: 'ola-search-heading-title' },
      _react2['default'].createElement(_reactIntl.FormattedMessage, { id: 'title' })
    ),
    _react2['default'].createElement(
      'small',
      { className: 'ola-search-heading-number' },
      _react2['default'].createElement(_reactIntl.FormattedMessage, {
        id: 'showing',
        values: {
          current: currentIdx,
          next: lastIdx,
          total: totalResults
        }
      })
    )
  );
};

SearchTitle.contextTypes = {
  config: _react2['default'].PropTypes.object
};

module.exports = SearchTitle;