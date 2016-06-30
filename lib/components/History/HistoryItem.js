'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var HistoryItem = function HistoryItem(_ref) {
  var history = _ref.history;
  var searchPageUrl = _ref.searchPageUrl;

  var url = searchPageUrl + history.url;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-module-item' },
    _react2['default'].createElement(
      'a',
      { href: url },
      history.q
    ),
    history.facets.map(function (facet, idx) {
      return _react2['default'].createElement(
        'span',
        { key: idx, className: 'ola-search-facet-count' },
        facet
      );
    })
  );
};

module.exports = HistoryItem;