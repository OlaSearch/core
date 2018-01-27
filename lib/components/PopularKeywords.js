'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withTranslate = require('./../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function PopularKeywords(_ref, context) {
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
      ':',
      ' '
    ),
    popularKeywords.map(function (keyword, idx) {
      return _react2['default'].createElement(PopularKeywordItem, { keyword: keyword, onClick: onClick, key: idx });
    })
  );
}

PopularKeywords.contextTypes = {
  config: _propTypes2['default'].object

  /**
   * Item
   */
};function PopularKeywordItem(_ref2) {
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
}

module.exports = (0, _withTranslate2['default'])(PopularKeywords);