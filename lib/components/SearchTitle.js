'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaTranslate = require('./../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SearchTitle = function SearchTitle(_ref, context) {
  var totalResults = _ref.totalResults;
  var page = _ref.page;
  var perPage = _ref.perPage;
  var isPhone = _ref.isPhone;
  var translate = _ref.translate;

  var currentIdx = Math.min((page - 1) * perPage + 1, totalResults);
  var lastIdx = Math.min(totalResults, currentIdx + parseInt(perPage) - 1);

  if (context.config.infiniteScroll || isPhone) currentIdx = 1;

  var values = {
    current: currentIdx.toString(),
    next: lastIdx.toString(),
    total: totalResults.toString()
  };

  return _react2['default'].createElement(
    'h3',
    { className: 'ola-search-heading' },
    _react2['default'].createElement(
      'span',
      { className: 'ola-search-heading-title' },
      translate('title')
    ),
    _react2['default'].createElement(
      'small',
      { className: 'ola-search-heading-number' },
      translate('showing', values)
    )
  );
};

SearchTitle.contextTypes = {
  config: _react2['default'].PropTypes.object
};

module.exports = (0, _OlaTranslate2['default'])(SearchTitle);