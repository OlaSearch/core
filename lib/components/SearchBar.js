'use strict';

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AutoComplete = require('./AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _InstantSearchForm = require('./InstantSearchForm');

var _InstantSearchForm2 = _interopRequireDefault(_InstantSearchForm);

var _FilterButton = require('./FilterButton');

var _FilterButton2 = _interopRequireDefault(_FilterButton);

var _LayoutButton = require('./LayoutButton');

var _LayoutButton2 = _interopRequireDefault(_LayoutButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(_InstantSearchForm2['default'], null);

var _ref3 = _react2['default'].createElement(_FilterButton2['default'], null);

var _ref4 = _react2['default'].createElement(_LayoutButton2['default'], null);

function SearchBar(_ref) {
  var instant = _ref.instant,
      props = (0, _objectWithoutProperties3['default'])(_ref, ['instant']);

  return _react2['default'].createElement(
    'div',
    { className: 'ola-search-bar-wrapper' },
    _react2['default'].createElement(
      'div',
      { className: 'ola-search-bar' },
      instant ? _ref2 : _react2['default'].createElement(_AutoComplete2['default'], props),
      _ref3,
      _ref4
    )
  );
}

module.exports = SearchBar;