'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _OlaTranslate = require('./../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PopularKeywords = function PopularKeywords(_ref, context) {
  var onClick = _ref.onClick,
      translate = _ref.translate;
  var popularKeywords = context.config.popularKeywords;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-popular-keywords' },
    _react2['default'].createElement(
      'span',
      { className: 'ola-popular-label' },
      translate('popular_keywords'),
      ': '
    ),
    popularKeywords.map(function (keyword, idx) {
      return _react2['default'].createElement(PopularKeywordItem, {
        keyword: keyword,
        onClick: onClick,
        key: idx
      });
    })
  );
};

PopularKeywords.contextTypes = {
  config: _propTypes2['default'].object

  /**
   * Item
   */
};var PopularKeywordItem = function PopularKeywordItem(_ref2) {
  var keyword = _ref2.keyword,
      onClick = _ref2.onClick;

  function handleClick() {
    onClick(keyword);
  }
  return _react2['default'].createElement(
    'div',
    { className: 'ola-popular-keyword' },
    _react2['default'].createElement(
      'a',
      { onClick: handleClick },
      keyword
    )
  );
};

module.exports = (0, _OlaTranslate2['default'])(PopularKeywords);