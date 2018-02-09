'use strict';

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _Ui = require('./../actions/Ui');

var _utilities = require('./../utilities');

var _withTranslate = require('./../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _OlaThemeContext = require('./../containers/OlaThemeContext');

var _materialView_module = require('@olasearch/icons/lib/material-view_module');

var _materialView_module2 = _interopRequireDefault(_materialView_module);

var _materialView_list = require('@olasearch/icons/lib/material-view_list');

var _materialView_list2 = _interopRequireDefault(_materialView_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(_materialView_module2['default'], null);

var _ref3 = _react2['default'].createElement(_materialView_list2['default'], null);

function LayoutButton(_ref) {
  var _cx;

  var toggleView = _ref.toggleView,
      facets = _ref.facets,
      view = _ref.view,
      translate = _ref.translate,
      layoutSwitching = _ref.layoutSwitching;

  /**
   * Check if its enable
   */
  if (!layoutSwitching) return null;
  var nextView = (0, _utilities.getNextView)(view);
  var classes = (0, _classnames2['default'])('ola-link-change-layout', (_cx = {}, _cx['ola-link-layout-' + nextView] = nextView, _cx));
  var title = translate('change_layout', { view: nextView });

  var _ref4 = _react2['default'].createElement(
    'span',
    null,
    title
  );

  return _react2['default'].createElement(
    _OlaThemeContext.ThemeConsumer,
    null,
    function (theme) {
      return _react2['default'].createElement(
        'button',
        {
          onClick: function onClick() {
            return toggleView(nextView);
          },
          type: 'button',
          title: title,
          className: _style2['default'].dynamic([['2276645316', [theme.primaryColor, theme.primaryColor]]]) + ' ' + (classes || '')
        },
        view === 'list' ? _ref2 : _ref3,
        _ref4,
        _react2['default'].createElement(_style2['default'], {
          styleId: '2276645316',
          css: '.ola-link-change-layout.__jsx-style-dynamic-selector,.ola-link-change-layout.__jsx-style-dynamic-selector:hover{color:' + theme.primaryColor + ';border-color:' + theme.primaryColor + ';}',
          dynamic: [theme.primaryColor, theme.primaryColor]
        })
      );
    }
  );
}

function mapStateToProps(state) {
  return {
    view: state.AppState.view,
    layoutSwitching: state.AppState.layoutSwitching
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { toggleView: _Ui.toggleView })((0, _withTranslate2['default'])(LayoutButton));