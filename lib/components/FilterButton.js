'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _Ui = require('./../actions/Ui');

var _withTranslate = require('./../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _materialTune = require('@olasearch/icons/lib/material-tune');

var _materialTune2 = _interopRequireDefault(_materialTune);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(_materialTune2['default'], null);

function FilterButton(_ref) {
  var toggleSidebar = _ref.toggleSidebar,
      facets = _ref.facets,
      isSidebarOpen = _ref.isSidebarOpen,
      translate = _ref.translate,
      showSidebar = _ref.showSidebar;

  /**
   * Check if its enable
   */
  if (!showSidebar) return null;
  var hasFilter = facets.some(function (item) {
    return item.values.length > 0;
  });
  var classes = (0, _classnames2['default'])('ola-link-open-filter', {
    'ola-link-open-filter-active': isSidebarOpen
  });
  var title = isSidebarOpen ? translate('filter_button_close') : translate('filter_button_open');
  return _react2['default'].createElement(
    'button',
    {
      className: classes,
      onClick: toggleSidebar,
      type: 'button',
      disabled: !hasFilter,
      title: title
    },
    _ref2,
    _react2['default'].createElement(
      'span',
      null,
      title
    )
  );
}

FilterButton.defaultProps = {
  facets: []
};

FilterButton.contextTypes = {
  sidebar: _propTypes2['default'].bool
};

function mapStateToProps(state) {
  return {
    isSidebarOpen: state.AppState.isSidebarOpen,
    showSidebar: state.AppState.showSidebar,
    facets: state.AppState.facets
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { toggleSidebar: _Ui.toggleSidebar })((0, _withTranslate2['default'])(FilterButton));