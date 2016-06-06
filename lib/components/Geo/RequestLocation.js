'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var RequestLocation = function (_React$Component) {
  _inherits(RequestLocation, _React$Component);

  function RequestLocation() {
    _classCallCheck(this, RequestLocation);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RequestLocation).call(this));

    _this.check = function (props) {
      var _props = props || _this.props;
      var q = _props.QueryState.q;
      var isLoading = _props.AppState.isLoading;
      var location = _props.Context.location;


      if (!location && !isLoading && q === 'atm') {
        /* Prompt and asl */
        console.log('called');
      }
    };

    _this.state = {
      isActive: true
    };
    return _this;
  }

  _createClass(RequestLocation, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      /* Check for prompts */
      this.check();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(nextProps) {
      this.check();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var Context = _props2.Context;
      var QueryState = _props2.QueryState;
      var AppState = _props2.AppState;

      return _react2['default'].createElement(
        'div',
        null,
        'Hey'
      );
    }
  }]);

  return RequestLocation;
}(_react2['default'].Component);

function mapStateToProps(state) {
  return {
    Context: state.Context,
    AppState: state.AppState,
    QueryState: state.QueryState
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)(RequestLocation);