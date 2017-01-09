'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../actions/Search');

var _utilities = require('./../utilities');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = require('../../.babelhelper.js').interopRequireDefault(_hoistNonReactStatics);

module.exports = function (WrappedComponent) {
  var OlaRoute = function (_React$Component) {
    require('../../.babelhelper.js').inherits(OlaRoute, _React$Component);

    function OlaRoute() {
      var _ref;

      var _temp, _this, _ret;

      require('../../.babelhelper.js').classCallCheck(this, OlaRoute);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = require('../../.babelhelper.js').possibleConstructorReturn(this, (_ref = OlaRoute.__proto__ || Object.getPrototypeOf(OlaRoute)).call.apply(_ref, [this].concat(args))), _this), _this.onPopState = function () {
        _this.props.dispatch((0, _Search.initSearch)({ config: _this.context.config }));
      }, _temp), require('../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
    }

    require('../../.babelhelper.js').createClass(OlaRoute, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (!this.context.router) window.addEventListener('popstate', this.onPopState);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (!this.context.router) window.removeEventListener('popstate', this.onPopState);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.context.router && this.props.location.search !== nextProps.location.search) this.onPopState();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(WrappedComponent, this.props);
      }
    }]);

    return OlaRoute;
  }(_react2['default'].Component);

  OlaRoute.contextTypes = {
    config: _react2['default'].PropTypes.object,
    router: _react2['default'].PropTypes.object
  };
  OlaRoute.displayName = 'olaRoute(' + (0, _utilities.getComponentDisplayName)(WrappedComponent) + ')';

  return (0, _hoistNonReactStatics2['default'])(OlaRoute, WrappedComponent);
};