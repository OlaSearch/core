'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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
    return (0, _possibleConstructorReturn3['default'])(this, (Sidebar.__proto__ || (0, _getPrototypeOf2['default'])(Sidebar)).apply(this, arguments));
  }

  (0, _createClass3['default'])(Sidebar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (document.getElementById(_Settings.STYLE_TAG_ID) || this.props.isDesktop) return;
      /* Add inline css */
      var style = document.createElement('style');
      style.id = _Settings.STYLE_TAG_ID;
      style.type = 'text/css';
      style.innerHTML = this.props.isDesktop ? '' : '\n      .' + _Settings.MODAL_ROOT_CLASSNAME + ', .' + _Settings.MODAL_ROOT_CLASSNAME + ' body{\n        -webkit-overflow-scrolling : touch !important;\n        overflow: hidden !important;\n        height: 100% !important;\n    ';
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.isSidebarOpen !== this.props.isSidebarOpen) {
        document.documentElement.classList.toggle(_Settings.MODAL_ROOT_CLASSNAME, this.props.isSidebarOpen);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          toggleSidebar = _props.toggleSidebar;

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
    }
  }]);
  return Sidebar;
}(_react2['default'].Component);

function mapStateToProps(state) {
  return {
    isSidebarOpen: state.AppState.isSidebarOpen,
    isDesktop: state.Device.isDesktop
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { toggleSidebar: _Ui.toggleSidebar })(Sidebar);