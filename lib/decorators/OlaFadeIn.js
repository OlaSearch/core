'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

module.exports = function (WrappedComponent) {
  var FadeInComponent = function (_React$Component) {
    (0, _inherits3['default'])(FadeInComponent, _React$Component);

    function FadeInComponent() {
      (0, _classCallCheck3['default'])(this, FadeInComponent);
      return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
    }

    FadeInComponent.prototype.componentDidMount = function componentDidMount() {
      // Get the components DOM node
      var elem = _reactDom2['default'].findDOMNode(this);
      // Set the opacity of the element to 0
      elem.style.opacity = 0;
      window.requestAnimationFrame(function () {
        // Now set a transition on the opacity
        elem.style.transition = 'opacity 250ms';
        // and set the opacity to 1
        elem.style.opacity = 1;
      });
    };

    FadeInComponent.prototype.render = function render() {
      return _react2['default'].createElement(WrappedComponent, this.props);
    };

    return FadeInComponent;
  }(_react2['default'].Component);

  return FadeInComponent;
};