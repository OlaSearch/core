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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Search = require('./../actions/Search');

var _utilities = require('./../utilities');

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

module.exports = function (WrappedComponent) {
  var OlaRoute = function (_React$Component) {
    (0, _inherits3['default'])(OlaRoute, _React$Component);

    function OlaRoute() {
      var _ref;

      var _temp, _this, _ret;

      (0, _classCallCheck3['default'])(this, OlaRoute);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, (_ref = OlaRoute.__proto__ || (0, _getPrototypeOf2['default'])(OlaRoute)).call.apply(_ref, [this].concat(args))), _this), _this.onPopState = function () {
        _this.props.dispatch((0, _Search.initSearch)({ config: _this.context.config }));
      }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
    }

    (0, _createClass3['default'])(OlaRoute, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (!this.context.router) {
          window.addEventListener('popstate', this.onPopState);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (!this.context.router) {
          window.removeEventListener('popstate', this.onPopState);
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.context.router && this.props.location.search !== nextProps.location.search) {
          this.onPopState();
        }
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
    config: _propTypes2['default'].object,
    router: _propTypes2['default'].object
  };
  OlaRoute.displayName = 'olaRoute(' + (0, _utilities.getComponentDisplayName)(WrappedComponent) + ')';

  return (0, _hoistNonReactStatics2['default'])(OlaRoute, WrappedComponent);
};