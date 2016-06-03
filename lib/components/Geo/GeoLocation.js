'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _Search = require('./../../actions/Search');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var GeoLocation = function (_React$Component) {
  _inherits(GeoLocation, _React$Component);

  function GeoLocation(props) {
    _classCallCheck(this, GeoLocation);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GeoLocation).call(this, props));

    _this.getLocation = function () {
      /* If location is already stored */
      if (_this.props.Context.location) {
        _this.props.dispatch((0, _Search.removeContext)('geo'));
        _this.props.onDisable && _this.props.onDisable();
        return;
      }
      if (navigator.geolocation) {
        _this.setState({
          isRequesting: true
        });
        navigator.geolocation.getCurrentPosition(_this.onSuccess, _this.onError);
      }
    };

    _this.onSuccess = function (results) {
      _this.props.onSuccess && _this.props.onSuccess(results);
      _this.setState({
        isRequesting: false
      });
    };

    _this.onError = function (results) {
      _this.props.onError && _this.props.onError(results);
      _this.setState({
        isRequesting: false
      });
    };

    if (props.active) _this.getLocation();

    _this.state = {
      isRequesting: false
    };
    return _this;
  }

  _createClass(GeoLocation, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(nextProps) {
      if (nextProps.active !== this.props.active && nextProps.active) {
        // Ask for users gelocation
        this.getLocation();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var Context = this.props.Context;
      var _state = this.state;
      var isRequesting = _state.isRequesting;
      var active = _state.active;

      var isGeoEnabled = active || !!Context.location;
      var klass = (0, _classnames2['default'])('ola-link-geo', {
        'ola-link-geo-requesting': isRequesting,
        'ola-link-geo-active': isGeoEnabled
      });
      var title = isGeoEnabled ? 'Stop using my location' : 'Use my location';
      return _react2['default'].createElement(
        'button',
        { className: klass, onClick: this.getLocation },
        _react2['default'].createElement('span', { className: 'ola-btn-hint hint--top', 'aria-label': title })
      );
    }
  }]);

  return GeoLocation;
}(_react2['default'].Component);

GeoLocation.defaultProps = {
  active: false
};


function mapStateToProps(state) {
  return {
    Context: state.Context
  };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps)(GeoLocation);