'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

exports['default'] = withToggle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../utilities');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function withToggle(WrappedComponent) {
  var WithToggle = function (_React$Component) {
    (0, _inherits3['default'])(WithToggle, _React$Component);

    function WithToggle(props) {
      (0, _classCallCheck3['default'])(this, WithToggle);

      var _this = (0, _possibleConstructorReturn3['default'])(this, (WithToggle.__proto__ || (0, _getPrototypeOf2['default'])(WithToggle)).call(this, props));

      _this.toggleDisplay = function () {
        _this.setState({
          isCollapsed: !_this.state.isCollapsed
        });
      };

      _this.hide = function () {
        return _this.setState({ isCollapsed: false });
      };

      _this.open = function () {
        return _this.setState({ isCollapsed: true });
      };

      _this.state = {
        isCollapsed: props.facet ? props.facet.isCollapsed : false
      };
      return _this;
    }

    (0, _createClass3['default'])(WithToggle, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.facet && nextProps.facet.isCollapsed !== this.props.facet.isCollapsed) {
          this.setState({
            isCollapsed: nextProps.facet.isCollapsed
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(WrappedComponent, (0, _extends3['default'])({}, this.props, {
          isCollapsed: this.state.isCollapsed,
          toggleDisplay: this.toggleDisplay,
          open: open,
          hide: hide
        }));
      }
    }]);
    return WithToggle;
  }(_react2['default'].Component);

  WithToggle.displayName = 'withToggle(' + (0, _utilities.getComponentDisplayName)(WrappedComponent) + ')';

  return (0, _hoistNonReactStatics2['default'])(WithToggle, WrappedComponent);
}