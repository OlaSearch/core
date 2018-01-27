'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _Ui = require('./../actions/Ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function ContentWrapper(_ref) {
  var toggleSidebar = _ref.toggleSidebar,
      isSidebarOpen = _ref.isSidebarOpen,
      view = _ref.view,
      children = _ref.children;

  var classes = (0, _classnames2['default'])('ola-results-flex', 'ola-results-view-' + view, {
    'ola-sidebar-open': isSidebarOpen,
    'ola-sidebar-closed': !isSidebarOpen
  });
  var modalClasses = (0, _classnames2['default'])('ola-modal-background', {
    'ola-modal-show': isSidebarOpen,
    'ola-modal-hide': !isSidebarOpen
  });
  return _react2['default'].createElement(
    'div',
    { className: classes },
    _react2['default'].createElement('div', { className: modalClasses, onClick: toggleSidebar }),
    children
  );
}

function mapStateToProps(state) {
  return {
    isSidebarOpen: state.AppState.isSidebarOpen,
    view: state.AppState.view
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { toggleSidebar: _Ui.toggleSidebar })(ContentWrapper);