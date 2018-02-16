'use strict';

var _style = require('@olasearch/styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaThemeContext = require('./../containers/OlaThemeContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function SearchContent(_ref) {
  var children = _ref.children;

  return _react2['default'].createElement(
    _OlaThemeContext.ThemeConsumer,
    null,
    function (theme) {
      return _react2['default'].createElement(
        'div',
        {
          className: _style2['default'].dynamic([['828828384', [theme.primaryButtonBackground, theme.primaryButtonColor]]]) + ' ' + 'ola-results-container'
        },
        children,
        _react2['default'].createElement(_style2['default'], {
          styleId: '828828384',
          css: '.ola-results-container.__jsx-style-dynamic-selector .ola-link-load-more{background:' + theme.primaryButtonBackground + ';color:' + theme.primaryButtonColor + ';}',
          dynamic: [theme.primaryButtonBackground, theme.primaryButtonColor]
        })
      );
    }
  );
}

module.exports = SearchContent;