'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _Context = require('./../../actions/Context');

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_olaTranslate);

var _once = require('ramda/src/once');

var _once2 = require('../../../.babelhelper.js').interopRequireDefault(_once);

var GeoLocation = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(GeoLocation, _React$Component);

  function GeoLocation(props) {
    require('../../../.babelhelper.js').classCallCheck(this, GeoLocation);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(GeoLocation).call(this, props));

    _initialiseProps.call(_this);

    if (props.active) _this.getLocation();
    _this._debouceLocation = (0, _once2['default'])(_this.requestGeoLocation);
    return _this;
  }

  require('../../../.babelhelper.js').createClass(GeoLocation, [{
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
      var translate = _props2.translate;
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

exports['default'] = (0, _reactRedux.connect)(mapStateToProps)((0, _olaTranslate2['default'])(GeoLocation));