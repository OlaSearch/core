'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Search = require('./../actions/Search');

var _utilities = require('./../utilities');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (WrappedComponent) {
  var OlaRoute = function (_React$Component) {
    _inherits(OlaRoute, _React$Component);

    function OlaRoute() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, OlaRoute);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OlaRoute.__proto__ || Object.getPrototypeOf(OlaRoute)).call.apply(_ref, [this].concat(args))), _this), _this.onPopState = function () {
        _this.props.dispatch((0, _Search.initSearch)({ config: _this.context.config }));
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OlaRoute, [{
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