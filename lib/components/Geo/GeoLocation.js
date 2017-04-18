'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _Context = require('./../../actions/Context');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _once = require('ramda/src/once');

var _once2 = _interopRequireDefault(_once);

var _Logger = require('./../../actions/Logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var GeoLocation = function (_React$Component) {
  _inherits(GeoLocation, _React$Component);

  function GeoLocation(props) {
    _classCallCheck(this, GeoLocation);

    var _this = _possibleConstructorReturn(this, (GeoLocation.__proto__ || Object.getPrototypeOf(GeoLocation)).call(this, props));

    _initialiseProps.call(_this);

    if (props.active) _this.getLocation();
    _this._debouceLocation = (0, _once2['default'])(_this.requestGeoLocation);
    return _this;
  }

  _createClass(GeoLocation, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.active !== this.props.active && prevProps.active) {
        // Ask for users gelocation
        this.getLocation();
      }
      this.prompt(this.props);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.Context !== this.props.Context || nextProps.q !== this.props.q || nextProps.isLoading === this.props.isLoading;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!('geolocation' in navigator)) return null;

      var _props2 = this.props,
          Context = _props2.Context,
          active = _props2.active,
          translate = _props2.translate;
      var isRequestingLocation = Context.isRequestingLocation;

      var isGeoEnabled = active || !!Context.location;
      var klass = (0, _classnames2['default'])('ola-link-geo', {
        'ola-link-geo-requesting': isRequestingLocation,
        'ola-link-geo-active': isGeoEnabled
      });
      var hintklass = (0, _classnames2['default'])('ola-btn-hint hint--top', {
        'hint--always': isRequestingLocation
      });
      var title = isRequestingLocation ? translate('geo_location_requesting') : isGeoEnabled ? translate('geo_location_enabled') : translate('geo_location_prompt');
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
  active: false
};
GeoLocation.contextTypes = {
  config: _propTypes2['default'].object
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.requestGeoLocation = function () {
    _this2.props.dispatch((0, _Context.requestGeoLocation)(_this2.onSuccess, _this2.onError));
  };

  this.prompt = function (props) {
    var _props = props || _this2.props;
    var q = _props.q,
        isLoading = _props.isLoading;
    var _props$Context = _props.Context,
        location = _props$Context.location,
        isRequestingLocation = _props$Context.isRequestingLocation,
        hasRequestedLocation = _props$Context.hasRequestedLocation;
    var geoLocationKeywords = _this2.context.config.geoLocationKeywords;


    if (!location && !isLoading && !isRequestingLocation && !hasRequestedLocation && geoLocationKeywords && q.match(new RegExp(geoLocationKeywords, 'gi'))) {
      /* Prompt and ask for location */
      _this2._debouceLocation();
    }
  };

  this.getLocation = function () {
    var dispatch = _this2.props.dispatch;
    /* If location is already stored */

    if (_this2.props.Context.location) {
      dispatch((0, _Context.removeContext)('geo'));
      _this2.props.onDisable && _this2.props.onDisable();
      return;
    }

    dispatch((0, _Logger.log)({
      eventType: 'C',
      eventCategory: 'Geolocation button',
      eventAction: 'request_location',
      eventLabel: 'Geolocation',
      debounce: true
    }));

    dispatch((0, _Context.requestGeoLocation)(_this2.onSuccess, _this2.onError));
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
    isLoading: state.AppState.isLoading,
    q: state.QueryState.q
  };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps)((0, _OlaTranslate2['default'])(GeoLocation));