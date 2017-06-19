'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (WrappedComponent) {
  var FadeInComponent = function (_React$Component) {
    _inherits(FadeInComponent, _React$Component);

    function FadeInComponent() {
      _classCallCheck(this, FadeInComponent);

      return _possibleConstructorReturn(this, (FadeInComponent.__proto__ || Object.getPrototypeOf(FadeInComponent)).apply(this, arguments));
    }

    _createClass(FadeInComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        // Get the components DOM node
        var elem = _reactDom2['default'].findDOMNode(this
        // Set the opacity of the element to 0
        );elem.style.opacity = 0;
        window.requestAnimationFrame(function () {
          // Now set a transition on the opacity
          elem.style.transition = 'opacity 250ms';
          // and set the opacity to 1
          elem.style.opacity = 1;
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(WrappedComponent, this.props);
      }
    }]);

    return FadeInComponent;
  }(_react2['default'].Component);

  return FadeInComponent;
};