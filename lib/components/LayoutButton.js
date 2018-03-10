'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _Ui = require('./../actions/Ui');

var _utilities = require('./../utilities');

var _withTranslate = require('./../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

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
      totalResults = _ref.totalResults,
      layoutSwitching = _ref.layoutSwitching;

  /**
   * Check if its enable
   */
  if (!layoutSwitching) return null;
  var nextView = (0, _utilities.getNextView)(view);
  var classes = (0, _classnames2['default'])('ola-link-change-layout', (_cx = {}, _cx['ola-link-layout-' + nextView] = nextView, _cx));
  var title = translate('change_layout', { view: nextView });
  return _react2['default'].createElement(
    'button',
    {
      className: classes,
      onClick: function onClick() {
        return toggleView(nextView);
      },
      type: 'button',
      title: title,
      disabled: !totalResults
    },
    view === 'list' ? _ref2 : _ref3,
    _react2['default'].createElement(
      'span',
      null,
      title
    )
  );
}

function mapStateToProps(state) {
  return {
    view: state.AppState.view,
    totalResults: state.AppState.totalResults,
    layoutSwitching: state.AppState.layoutSwitching
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { toggleView: _Ui.toggleView })((0, _withTranslate2['default'])(LayoutButton));