'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = withFacetToggle;

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _utilities = require('./../utilities');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = require('../../.babelhelper.js').interopRequireDefault(_hoistNonReactStatics);

function withFacetToggle(WrappedComponent) {
  var WithFacetToggle = function (_React$Component) {
    require('../../.babelhelper.js').inherits(WithFacetToggle, _React$Component);

    function WithFacetToggle(props) {
      require('../../.babelhelper.js').classCallCheck(this, WithFacetToggle);

      var _this = require('../../.babelhelper.js').possibleConstructorReturn(this, (WithFacetToggle.__proto__ || Object.getPrototypeOf(WithFacetToggle)).call(this, props));

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

    require('../../.babelhelper.js').createClass(WithFacetToggle, [{
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
        return _react2['default'].createElement(WrappedComponent, require('../../.babelhelper.js')['extends']({}, this.props, { isCollapsed: this.state.isCollapsed, toggleDisplay: this.toggleDisplay }));
      }
    }]);

    return WithFacetToggle;
  }(_react2['default'].Component);

  WithFacetToggle.displayName = 'withFacetToggle(' + (0, _utilities.getComponentDisplayName)(WrappedComponent) + ')';

  return (0, _hoistNonReactStatics2['default'])(WithFacetToggle, WrappedComponent);
}