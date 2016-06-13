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

var _Context = require('./../../actions/Context');

var _once = require('ramda/src/once');

var _once2 = _interopRequireDefault(_once);

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

    _initialiseProps.call(_this);

    if (props.active) _this.getLocation();
    _this._debouceLocation = (0, _once2['default'])(_this.requestGeoLocation);
    return _this;
  }

  _createClass(GeoLocation, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(nextProps) {
      if (nextProps.active !== this.props.active && nextProps.active) {
        // Ask for users gelocation
        this.getLocation();
      }

      this.prompt(nextProps);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.Context !== this.props.Context || nextProps.QueryState.q !== this.props.QueryState.q || nextProps.AppState.isLoading === this.props.AppState.isLoading;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!('geolocation' in navigator)) return null;

      var _props2 = this.props;
      var Context = _props2.Context;
      var active = _props2.active;
      var textPrompt = _props2.textPrompt;
      var textRequesting = _props2.textRequesting;
      var textEnabled = _props2.textEnabled;
      var isRequestingLocation = Context.isRequestingLocation;

      var isGeoEnabled = active || !!Context.location;
      var klass = (0, _classnames2['default'])('ola-link-geo', {
        'ola-link-geo-requesting': isRequestingLocation,
        'ola-link-geo-active': isGeoEnabled
      });
      var hintklass = (0, _classnames2['default'])('ola-btn-hint hint--top', {
        'hint--always': isRequestingLocation
      });
      var title = isRequestingLocation ? textRequesting : isGeoEnabled ? textEnabled : textPrompt;
      return _react2['default'].createElement(
        'button',
        { type: 'button', className: klass, onClick: this.getLocation },
        _react2['default'].createElement('span', { className: hintklass, 'aria-label': title })
      );
    }
  }]);

  return GeoLocation;
}(_react2['default'].Component);

GeoLocation.defaultProps = {
  active: false,
  textRequesting: 'Getting your current location',
  textEnabled: 'Stop using current location',
  textPrompt: 'Use my current location'
};
GeoLocation.contextTypes = {
  config: _react2['default'].PropTypes.object
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.requestGeoLocation = function () {
    _this2.props.dispatch((0, _Context.requestGeoLocation)(_this2.onSuccess, _this2.onError));
  };

  this.prompt = function (props) {
    var _props = props || _this2.props;
    var q = _props.QueryState.q;
    var isLoading = _props.AppState.isLoading;
    var _props$Context = _props.Context;
    var location = _props$Context.location;
    var isRequestingLocation = _props$Context.isRequestingLocation;
    var hasRequestedLocation = _props$Context.hasRequestedLocation;
    var geoLocationKeywords = _this2.context.config.geoLocationKeywords;


    if (!location && !isLoading && !isRequestingLocation && !hasRequestedLocation && geoLocationKeywords && q.match(new RegExp(geoLocationKeywords, 'gi'))) {
      /* Prompt and ask for location */
      _this2._debouceLocation();
    }
  };

  this.getLocation = function () {
    /* If location is already stored */
    if (_this2.props.Context.location) {
      _this2.props.dispatch((0, _Context.removeContext)('geo'));
      _this2.props.onDisable && _this2.props.onDisable();
      return;
    }

    _this2.props.dispatch((0, _Context.requestGeoLocation)(_this2.onSuccess, _this2.onError));
  };

  this.onSuccess = function (results) {
    _this2.props.onSuccess && _this2.props.onSuccess(results);
  };

  this.onError = function (results) {
    _this2.props.onError && _this2.props.onError(results);
  };
};

function mapStateToProps(state) {
  return {
    Context: state.Context,
    AppState: state.AppState,
    QueryState: state.QueryState
  };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps)(GeoLocation);