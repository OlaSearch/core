'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports['default'] = withFacetToggle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

function withFacetToggle(WrappedComponent) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    _inherits(WithFacetToggle, _React$Component);

    function WithFacetToggle(props) {
      _classCallCheck(this, WithFacetToggle);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WithFacetToggle).call(this, props));

      _this.toggleDisplay = function () {
        _this.setState({
          isCollapsed: !_this.state.isCollapsed
        });
      };

      _this.state = {
        isCollapsed: props.facet.isCollapsed || false
      };
      return _this;
    }

    _createClass(WithFacetToggle, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.facet.isCollapsed !== this.props.facet.isCollapsed) {
          this.setState({
            isCollapsed: nextProps.facet.isCollapsed
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(WrappedComponent, _extends({}, this.props, { isCollapsed: this.state.isCollapsed, toggleDisplay: this.toggleDisplay }));
      }
    }]);

    return WithFacetToggle;
  }(_react2['default'].Component), _class.displayName = 'withFacetToggle(' + (0, _utilities.getComponentDisplayName)(WrappedComponent) + ')', _temp;
}