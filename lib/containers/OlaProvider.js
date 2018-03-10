'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports['default'] = OlaProvider;

var _style = require('@olasearch/styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _OlaIntlProvider = require('./OlaIntlProvider');

var _OlaIntlProvider2 = _interopRequireDefault(_OlaIntlProvider);

var _ThemeContext = require('./ThemeContext');

var _ConfigContext = require('./ConfigContext');

var _Settings = require('./../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function OlaProvider(_ref) {
  var config = _ref.config,
      store = _ref.store,
      translations = _ref.translations,
      children = _ref.children;

  if (!config || !store) {
    throw new Error('Could not find config or store on `props` OlaProvider');
  }
  var theme = (0, _extends3['default'])({}, _Settings.DEFAULT_THEME, config.theme);
  return _react2['default'].createElement(
    'div',
    {
      className: _style2['default'].dynamic([['3810224564', [theme.defaultFontSize, theme.titleFontSize, theme.mediumFontSize, theme.secondaryButtonColor, theme.secondaryButtonBackground, theme.borderColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.smallFontSize, theme.primaryColor, theme.primaryColor, theme.primaryButtonBackground, theme.primaryButtonColor, theme.mediumFontSize, theme.progressBarBackground]]]) + ' ' + 'ola-search'
    },
    _react2['default'].createElement(
      _reactRedux.Provider,
      { store: store },
      _react2['default'].createElement(
        _ConfigContext.ConfigProvider,
        { value: config },
        _react2['default'].createElement(
          _OlaIntlProvider2['default'],
          { translations: translations },
          _react2['default'].createElement(
            _ThemeContext.ThemeProvider,
            { value: theme },
            children
          )
        )
      )
    ),
    _react2['default'].createElement(_style2['default'], {
      styleId: '3810224564',
      css: '.ola-search.__jsx-style-dynamic-selector{font-size:' + theme.defaultFontSize + ';}.ola-search.__jsx-style-dynamic-selector .ola-field-title{font-size:' + theme.titleFontSize + ';}.ola-search.__jsx-style-dynamic-selector .ola-field-date,.ola-field-person,.ola-field-distance,.ola-btn-directions,.ola-answer-slots,.ola-location-notify,.ola-field-component-label{font-size:' + theme.mediumFontSize + ';}.ola-search.__jsx-style-dynamic-selector .ola-page,.ola-search.__jsx-style-dynamic-selector .ola-page:hover{color:' + theme.secondaryButtonColor + ';background:' + theme.secondaryButtonBackground + ';border:1px ' + theme.borderColor + ' solid;}.ola-search.__jsx-style-dynamic-selector .ola-page-current,.ola-search.__jsx-style-dynamic-selector .ola-page-current:hover{background-color:#eee;}.ola-search.__jsx-style-dynamic-selector .ola-spell-links,.ola-search.__jsx-style-dynamic-selector .ola-spell-links:hover{color:' + theme.primaryColor + ';}.ola-search.__jsx-style-dynamic-selector .ola-link-show-more,.ola-search.__jsx-style-dynamic-selector .ola-link-show-more:hover{color:' + theme.primaryColor + ';background:none;}.ola-search.__jsx-style-dynamic-selector .ola-link-change-layout,.ola-search.__jsx-style-dynamic-selector .ola-link-change-layout:hover{color:' + theme.primaryColor + ';border:1px ' + theme.primaryColor + ' solid;}.ola-search.__jsx-style-dynamic-selector .ola-link-open-filter,.ola-search.__jsx-style-dynamic-selector .ola-link-open-filter:hover{color:' + theme.primaryColor + ';border:1px ' + theme.primaryColor + ' solid;}.ola-search.__jsx-style-dynamic-selector .ola-suggestions-clear,.ola-search.__jsx-style-dynamic-selector .ola-suggestions-clear:hover{color:' + theme.primaryColor + ';}.ola-search.__jsx-style-dynamic-selector .ola-btn-pill{font-size:' + theme.smallFontSize + ';}.ola-search.__jsx-style-dynamic-selector .noUi-connect{background:' + theme.primaryColor + ';}.ola-search.__jsx-style-dynamic-selector .ola-btn-close{color:' + theme.primaryColor + ';}.ola-search.__jsx-style-dynamic-selector .ola-link-load-more{background:' + theme.primaryButtonBackground + ';color:' + theme.primaryButtonColor + ';font-size:' + theme.mediumFontSize + ';}.ola-search.__jsx-style-dynamic-selector .react-progress-bar-percent{background:' + theme.progressBarBackground + ';}',
      dynamic: [theme.defaultFontSize, theme.titleFontSize, theme.mediumFontSize, theme.secondaryButtonColor, theme.secondaryButtonBackground, theme.borderColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.smallFontSize, theme.primaryColor, theme.primaryColor, theme.primaryButtonBackground, theme.primaryButtonColor, theme.mediumFontSize, theme.progressBarBackground]
    })
  );
}