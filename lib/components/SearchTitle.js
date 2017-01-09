'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _OlaTranslate = require('./../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var SearchTitle = function SearchTitle(_ref, context) {
  var totalResults = _ref.totalResults,
      page = _ref.page,
      perPage = _ref.perPage,
      isPhone = _ref.isPhone,
      translate = _ref.translate;

  var currentIdx = Math.min((page - 1) * perPage + 1, totalResults);
  var lastIdx = Math.min(totalResults, currentIdx + parseInt(perPage) - 1);

  if (context.config.infiniteScroll || isPhone) currentIdx = 1;

  var values = {
    current: currentIdx,
    next: lastIdx,
    total: totalResults
  };
  var titleDesc = totalResults ? translate('showing', values) : translate('showing_no_results', values);
  var title = translate('title');
  return _react2['default'].createElement(
    'h3',
    { className: 'ola-search-heading' },
    title && _react2['default'].createElement(
      'span',
      { className: 'ola-search-heading-title' },
      title
    ),
    _react2['default'].createElement(
      'small',
      { className: 'ola-search-heading-number' },
      titleDesc
    )
  );
};

SearchTitle.contextTypes = {
  config: _react2['default'].PropTypes.object
};

module.exports = (0, _OlaTranslate2['default'])(SearchTitle);