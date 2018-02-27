'use strict';

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

var _maputils = require('./maputils');

var _maputils2 = _interopRequireDefault(_maputils);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AnswerMap = function (_React$Component) {
  (0, _inherits3['default'])(AnswerMap, _React$Component);

  function AnswerMap(props) {
    (0, _classCallCheck3['default'])(this, AnswerMap);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.initMap = function () {
      var google = _this.window.google;

      _this.map = new google.maps.Map(_this.mapEl, {
        center: { lat: -34.0622928, lng: 23.3755341 },
        zoom: 4,
        scrollwheel: false
      });

      _this.bounds = new google.maps.LatLngBounds();

      /* Add click handler to map */
      _this.map.addListener('click', _this.handleMapClick);

      /* Info window */
      _this.infowindow = new google.maps.InfoWindow({
        content: 'Loading'
      });

      _this.markers = [];

      /* Max zoom */
      google.maps.event.addListenerOnce(_this.map, 'bounds_changed', function (event) {
        if (_this.map.getZoom() > 12) {
          _this.map.setZoom(12);
        }
      });

      /* Add markers */
      _this.refreshMap();
    };

    _this.handleMapClick = function (event) {
      if (_this.infowindow) _this.infowindow.close();
    };

    _this.clearAllMarkers = function () {
      for (var i = 0; i < _this.markers.length; i++) {
        _this.markers[i].setMap(null);
      }
    };

    _this.handleMarkerClick = function (marker) {
      var title = marker.title;

      var content = '\n      <div className=\'ola-gmap-infowindow\'>\n        <p>' + title + '</p>\n      </div>\n    ';
      _this.infowindow.setContent(content);
      _this.infowindow.open(_this.map, marker);
    };

    _this.refreshMap = function () {
      var _this$props = _this.props,
          data = _this$props.data,
          results = _this$props.results;
      var _data = data,
          element_keys = _data.element_keys,
          source = _data.source,
          title = _data.title;
      var google = _this.window.google;
      /**
       * Source of the data
       */

      if (source) {
        data = results.map(function (result) {
          return {
            title: result[element_keys['title']],
            location: result[element_keys['location']]
          };
        });
      }
      /* Only display markers with location */
      data = data.filter(function (_ref) {
        var location = _ref.location;
        return location;
      });

      /* Check if any data exists */
      var hasData = data.length > 0;

      _this.setState({
        hasData: hasData
      });
      /* Do nothing if no markers */
      if (!hasData) return;

      data.forEach(function (_ref2) {
        var title = _ref2.title,
            location = _ref2.location;

        /* Get the first location */
        if (location && location.length) location = location[0];

        var _location$split = location.split(','),
            lat = _location$split[0],
            lng = _location$split[1];

        var position = { lat: parseFloat(lat), lng: parseFloat(lng) };
        var latLngPosition = new google.maps.LatLng(position.lat, position.lng);

        var marker = new google.maps.Marker({
          position: position,
          map: _this.map,
          title: title,
          icon: _this.props.markerIcon
        });

        _this.markers.push(marker);

        /* Add click handler to marker */
        marker.addListener('click', function () {
          return _this.handleMarkerClick(marker);
        });

        _this.bounds.extend(latLngPosition);
      });

      /* Final add user's location */
      if (_this.props.location) {
        var _this$props$location$ = _this.props.location.split(','),
            lat = _this$props$location$[0],
            lng = _this$props$location$[1];

        var position = { lat: parseFloat(lat), lng: parseFloat(lng) };
        var latLngPosition = new google.maps.LatLng(position.lat, position.lng);
        var marker = new google.maps.Marker({
          position: position,
          map: _this.map,
          icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png', new google.maps.Size(22, 22), new google.maps.Point(0, 18), new google.maps.Point(11, 11))
        });
        _this.bounds.extend(latLngPosition);
      }

      /* Fit to bounds */

      _this.map.fitBounds(_this.bounds);
    };

    _this.registerMap = function (el) {
      _this.mapEl = el;
    };

    _this.state = {
      hasData: false
    };
    return _this;
  }

  AnswerMap.prototype.componentDidMount = function componentDidMount() {
    _maputils2['default'].load({ apiKey: 'AIzaSyAfccsQVW0CrUzGHQ1AhQpnCYhWjZgs7bw' }, this.context.window, this.context.document, this.initMap);
    this.window = this.context.window || window;
  };

  AnswerMap.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data || nextProps.results !== this.props.results || this.state.hasData !== nextState.hasData;
  };

  AnswerMap.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevState.hasData !== this.state.hasData) return;
    this.clearAllMarkers();
    this.refreshMap();
  };

  AnswerMap.prototype.render = function render() {
    var classes = (0, _classnames2['default'])('ola-answer-map', {
      'ola-answer-map-empty': !this.state.hasData
    });
    return _react2['default'].createElement(
      'div',
      { className: classes },
      _react2['default'].createElement('div', { ref: this.registerMap, className: 'ola-answer-gmap' })
    );
  };

  return AnswerMap;
}(_react2['default'].Component);

AnswerMap.defaultProps = {
  markerIcon: null
};
AnswerMap.contextTypes = {
  window: _propTypes2['default'].object,
  document: _propTypes2['default'].object
};


module.exports = AnswerMap;