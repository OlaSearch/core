'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoComplete = require('./AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _FilterButton = require('./FilterButton');

var _FilterButton2 = _interopRequireDefault(_FilterButton);

var _LayoutButton = require('./LayoutButton');

var _LayoutButton2 = _interopRequireDefault(_LayoutButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref = _react2['default'].createElement(_FilterButton2['default'], null);

var _ref2 = _react2['default'].createElement(_LayoutButton2['default'], null);

function SearchBar(props) {
  return _react2['default'].createElement(
    'div',
    { className: 'ola-search-bar-wrapper' },
    _react2['default'].createElement(
      'div',
      { className: 'ola-search-bar' },
      _react2['default'].createElement(_AutoComplete2['default'], props),
      _ref,
      _ref2
    )
  );
}

module.exports = SearchBar;