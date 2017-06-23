'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Ui = require('./../actions/Ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Sidebar = function Sidebar(_ref) {
  var children = _ref.children,
      isSidebarOpen = _ref.isSidebarOpen,
      toggleSidebar = _ref.toggleSidebar;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-sidebar' },
    children,
    _react2['default'].createElement(
      'button',
      {
        onClick: toggleSidebar,
        type: 'button',
        className: 'ola-close-sidebar'
      },
      'Close'
    )
  );
};

function mapStateToProps(state) {
  return {
    isSidebarOpen: state.AppState.isSidebarOpen
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { toggleSidebar: _Ui.toggleSidebar })(Sidebar);