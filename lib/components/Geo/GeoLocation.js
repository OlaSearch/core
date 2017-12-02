'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var _Logger = require('./../../actions/Logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var GeoLocation = function (_React$Component) {
  (0, _inherits3['default'])(GeoLocation, _React$Component);

  function GeoLocation(props) {
    (0, _classCallCheck3['default'])(this, GeoLocation);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _initialiseProps.call(_this);

    if (props.active) _this.getLocation();
    _this._debouceLocation = _this.requestGeoLocation;
    return _this;
  }

  GeoLocation.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active && prevProps.active) {
      // Ask for users gelocation
      this.getLocation();
    }
    this.prompt(this.props);
  };

  GeoLocation.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.Context !== this.props.Context || nextProps.q !== this.props.q || nextProps.isLoading === this.props.isLoading;
  };

  GeoLocation.prototype.render = function render() {
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
  };

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