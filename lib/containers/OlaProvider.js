'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = require('@olasearch/styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _OlaIntlProvider = require('./OlaIntlProvider');

var _OlaIntlProvider2 = _interopRequireDefault(_OlaIntlProvider);

var _OlaThemeContext = require('./OlaThemeContext');

var _Settings = require('./../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var OlaProvider = function (_React$Component) {
  (0, _inherits3['default'])(OlaProvider, _React$Component);

  function OlaProvider(props) {
    (0, _classCallCheck3['default'])(this, OlaProvider);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    var config = props.config,
        store = props.store;

    if (!config || !store) {
      throw new Error('Could not find config or store on this.props ' + (_this.constructor.displayName || ''));
    }
    return _this;
  }

  OlaProvider.prototype.getChildContext = function getChildContext() {
    return {
      config: this.props.config
    };
  };

  OlaProvider.prototype.render = function render() {
    var theme = (0, _extends3['default'])({}, _Settings.DEFAULT_THEME, this.props.config.theme);
    return _react2['default'].createElement(
      'div',
      {
        className: _style2['default'].dynamic([['3503117455', [theme.defaultFontSize, theme.titleFontSize, theme.mediumFontSize, theme.secondaryButtonColor, theme.secondaryButtonBackground, theme.borderColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.smallFontSize]]]) + ' ' + 'ola-search'
      },
      _react2['default'].createElement(
        _reactRedux.Provider,
        { store: this.props.store },
        _react2['default'].createElement(
          _OlaIntlProvider2['default'],
          { translations: this.props.translations },
          _react2['default'].createElement(
            _OlaThemeContext.ThemeProvider,
            { value: theme },
            this.props.children
          )
        )
      ),
      _react2['default'].createElement(_style2['default'], {
        styleId: '3503117455',
        css: '.ola-search.__jsx-style-dynamic-selector{font-size:' + theme.defaultFontSize + ';}.ola-search.__jsx-style-dynamic-selector .ola-field-title{font-size:' + theme.titleFontSize + ';}.ola-search.__jsx-style-dynamic-selector .ola-field-date,.ola-field-person,.ola-field-distance,.ola-btn-directions,.ola-answer-slots,.ola-location-notify,.ola-field-component-label{font-size:' + theme.mediumFontSize + ';}.ola-search.__jsx-style-dynamic-selector .ola-page,.ola-search.__jsx-style-dynamic-selector .ola-page:hover{color:' + theme.secondaryButtonColor + ';background:' + theme.secondaryButtonBackground + ';border:1px ' + theme.borderColor + ' solid;}.ola-search.__jsx-style-dynamic-selector .ola-page-current,.ola-search.__jsx-style-dynamic-selector .ola-page-current:hover{background-color:#eee;}.ola-search.__jsx-style-dynamic-selector .ola-spell-links,.ola-search.__jsx-style-dynamic-selector .ola-spell-links:hover{color:' + theme.primaryColor + ';}.ola-search.__jsx-style-dynamic-selector .ola-link-show-more,.ola-search.__jsx-style-dynamic-selector .ola-link-show-more:hover{color:' + theme.primaryColor + ';background:none;}.ola-search.__jsx-style-dynamic-selector .ola-link-change-layout,.ola-search.__jsx-style-dynamic-selector .ola-link-change-layout:hover{color:' + theme.primaryColor + ';border:1px ' + theme.primaryColor + ' solid;}.ola-search.__jsx-style-dynamic-selector .ola-link-open-filter,.ola-search.__jsx-style-dynamic-selector .ola-link-open-filter:hover{color:' + theme.primaryColor + ';border:1px ' + theme.primaryColor + ' solid;}.ola-search.__jsx-style-dynamic-selector .ola-suggestions-clear,.ola-search.__jsx-style-dynamic-selector .ola-suggestions-clear:hover{color:' + theme.primaryColor + ';}.ola-search.__jsx-style-dynamic-selector .ola-btn-pill{font-size:' + theme.smallFontSize + ';}',
        dynamic: [theme.defaultFontSize, theme.titleFontSize, theme.mediumFontSize, theme.secondaryButtonColor, theme.secondaryButtonBackground, theme.borderColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.primaryColor, theme.smallFontSize]
      })
    );
  };

  return OlaProvider;
}(_react2['default'].Component);

OlaProvider.childContextTypes = {
  config: _propTypes2['default'].any.isRequired
};
exports['default'] = OlaProvider;