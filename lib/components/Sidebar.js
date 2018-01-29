'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Ui = require('./../actions/Ui');

var _Settings = require('./../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Sidebar = function (_React$Component) {
  (0, _inherits3['default'])(Sidebar, _React$Component);

  function Sidebar() {
    (0, _classCallCheck3['default'])(this, Sidebar);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
  }

  Sidebar.prototype.componentDidMount = function componentDidMount() {
    if (document.getElementById(_Settings.STYLE_TAG_ID) || this.props.isDesktop) return;
    /* Add inline css */
    var style = document.createElement('style');
    style.id = _Settings.STYLE_TAG_ID;
    style.type = 'text/css';
    style.innerHTML = this.props.isDesktop ? '' : '\n      .' + _Settings.MODAL_ROOT_CLASSNAME + ', .' + _Settings.MODAL_ROOT_CLASSNAME + ' body{\n        -webkit-overflow-scrolling : touch !important;\n        overflow: hidden !important;\n        height: 100% !important;\n    ';
    document.getElementsByTagName('head')[0].appendChild(style);
  };

  Sidebar.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.isSidebarOpen !== this.props.isSidebarOpen) {
      document.documentElement.classList.toggle(_Settings.MODAL_ROOT_CLASSNAME, this.props.isSidebarOpen);
    }
  };

  Sidebar.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        toggleSidebar = _props.toggleSidebar,
        isSidebarOpen = _props.isSidebarOpen;

    return _react2['default'].createElement(
      'div',
      { className: 'ola-sidebar' },
      isSidebarOpen && children,
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

  return Sidebar;
}(_react2['default'].Component);

function mapStateToProps(state, ownProps) {
  return {
    isSidebarOpen: ownProps.isSidebarOpen || state.AppState.isSidebarOpen,
    isDesktop: state.Device.isDesktop
  };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps, { toggleSidebar: _Ui.toggleSidebar })(Sidebar);