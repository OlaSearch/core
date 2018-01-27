'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _maputils = require('./maputils');

var _maputils2 = _interopRequireDefault(_maputils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* global google */
var AnswerMap = function (_React$Component) {
  (0, _inherits3['default'])(AnswerMap, _React$Component);

  function AnswerMap() {
    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, AnswerMap);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.initMap = function () {
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
    }, _this.handleMapClick = function (event) {
      if (_this.infowindow) _this.infowindow.close();
    }, _this.clearAllMarkers = function () {
      for (var i = 0; i < _this.markers.length; i++) {
        _this.markers[i].setMap(null);
      }
    }, _this.handleMarkerClick = function (marker) {
      var title = marker.title;

      var content = '\n      <div className=\'ola-gmap-infowindow\'>\n        <p>' + title + '</p>\n      </div>\n    ';
      _this.infowindow.setContent(content);
      _this.infowindow.open(_this.map, marker);
    }, _this.refreshMap = function () {
      var data = _this.props.data;


      data.forEach(function (_ref) {
        var title = _ref.title,
            location = _ref.location;

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

      /* Fit to bounds */

      _this.map.fitBounds(_this.bounds);
    }, _this.registerMap = function (el) {
      _this.mapEl = el;
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  AnswerMap.prototype.componentDidMount = function componentDidMount() {
    _maputils2['default'].load({ apiKey: 'AIzaSyAfccsQVW0CrUzGHQ1AhQpnCYhWjZgs7bw' }, this.initMap);
  };

  AnswerMap.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  };

  AnswerMap.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    this.clearAllMarkers();
    this.refreshMap();
  };

  AnswerMap.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'ola-answer-map' },
      _react2['default'].createElement('div', { ref: this.registerMap, className: 'ola-answer-gmap' })
    );
  };

  return AnswerMap;
}(_react2['default'].Component);

AnswerMap.defaultProps = {
  markerIcon: null
};


module.exports = AnswerMap;