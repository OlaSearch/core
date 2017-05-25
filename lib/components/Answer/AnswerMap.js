'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _maputils = require('./maputils');

var _maputils2 = _interopRequireDefault(_maputils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; } /* global google */


var AnswerMap = function (_React$Component) {
  _inherits(AnswerMap, _React$Component);

  function AnswerMap() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AnswerMap);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AnswerMap.__proto__ || Object.getPrototypeOf(AnswerMap)).call.apply(_ref, [this].concat(args))), _this), _this.initMap = function () {
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


      data.forEach(function (_ref2) {
        var title = _ref2.title,
            location = _ref2.location;

        var _location$split = location.split(','),
            _location$split2 = _slicedToArray(_location$split, 2),
            lat = _location$split2[0],
            lng = _location$split2[1];

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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AnswerMap, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _maputils2['default'].load({ apiKey: 'AIzaSyAfccsQVW0CrUzGHQ1AhQpnCYhWjZgs7bw' }, this.initMap);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.data !== this.props.data;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      this.clearAllMarkers();
      this.refreshMap();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-map' },
        _react2['default'].createElement('div', { ref: this.registerMap, className: 'ola-answer-gmap' })
      );
    }
  }]);

  return AnswerMap;
}(_react2['default'].Component);

AnswerMap.defaultProps = {
  markerIcon: null
};


module.exports = AnswerMap;