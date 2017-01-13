'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = require('../../.babelhelper.js').interopRequireDefault(_reactDom);

module.exports = function (WrappedComponent) {
  var FadeInComponent = function (_React$Component) {
    require('../../.babelhelper.js').inherits(FadeInComponent, _React$Component);

    function FadeInComponent() {
      require('../../.babelhelper.js').classCallCheck(this, FadeInComponent);

      return require('../../.babelhelper.js').possibleConstructorReturn(this, (FadeInComponent.__proto__ || Object.getPrototypeOf(FadeInComponent)).apply(this, arguments));
    }

    require('../../.babelhelper.js').createClass(FadeInComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        // Get the components DOM node
        var elem = _reactDom2['default'].findDOMNode(this);
        // Set the opacity of the element to 0
        elem.style.opacity = 0;
        window.requestAnimationFrame(function () {
          // Now set a transition on the opacity
          elem.style.transition = "opacity 250ms";
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