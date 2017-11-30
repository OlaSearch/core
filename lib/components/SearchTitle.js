'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _OlaTranslate = require('./../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function SearchTitle(_ref, context) {
  var totalResults = _ref.totalResults,
      page = _ref.page,
      perPage = _ref.perPage,
      isPhone = _ref.isPhone,
      translate = _ref.translate;

  var title = translate('title');
  var showTitle = title || totalResults > 0;
  if (!showTitle) return null;
  var currentIdx = Math.min((page - 1) * perPage + 1, totalResults);
  var lastIdx = Math.min(totalResults, currentIdx + parseInt(perPage) - 1);

  if (context.config.infiniteScroll || isPhone) currentIdx = 1;

  var values = {
    current: currentIdx,
    next: lastIdx,
    total: totalResults
  };
  var titleDesc = totalResults ? translate('showing', values) : translate('showing_no_results', values);
  return _react2['default'].createElement(
    'h3',
    { className: 'ola-search-heading' },
    title && _react2['default'].createElement(
      'span',
      { className: 'ola-search-heading-title' },
      title
    ),
    totalResults ? _react2['default'].createElement(
      'small',
      { className: 'ola-search-heading-number' },
      titleDesc
    ) : null
  );
}

SearchTitle.contextTypes = {
  config: _propTypes2['default'].object
};

module.exports = (0, _OlaTranslate2['default'])(SearchTitle);