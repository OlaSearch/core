'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loader = require('./utils/loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var Map = function (_React$Component) {
    _inherits(Map, _React$Component);

    function Map(props) {
        _classCallCheck(this, Map);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Map).call(this, props));

        _this.handleMarkerClick = function (marker) {

            _this.infowindow.setContent(marker.title);
            _this.infowindow.open(_this.map, marker);
        };

        _this.handleMapClick = function (event) {

            if (_this.infowindow) _this.infowindow.close();
        };

        _this.updateMap = function () {
            var results = _this.props.results;


            if (_this.map) {

                results.forEach(function (result) {
                    var location = result.location;
                    var title = result.title;
                    var placeId = result.placeId;


                    if (location) {
                        var _location$split = location.split(',');

                        var _location$split2 = _slicedToArray(_location$split, 2);

                        var lat = _location$split2[0];
                        var lng = _location$split2[1];

                        var position = { lat: parseFloat(lat), lng: parseFloat(lng) };

                        var marker = new google.maps.Marker({
                            position: position,
                            map: _this.map,
                            title: title
                        });

                        var handleMarkerClick = _this.handleMarkerClick.bind(_this, marker);

                        marker.addListener('click', handleMarkerClick);

                        _this.markers.push(marker);

                        _this.places.push(placeId);

                        // this.bounds.extend( position )
                    }
                });

                // this.map.fitBounds( this.bounds );
            }
        };

        _this.initMap = function () {

            _this.map = new google.maps.Map(_this.refs.map, {
                center: { lat: -34.0622928, lng: 23.3755341 },
                zoom: 8
            });

            _this.map.addListener('click', _this.handleMapClick);

            // this.bounds = new google.maps.LatLngBounds();

            _this.infowindow = new google.maps.InfoWindow({
                content: 'Loading'
            });

            var drawingManager = new google.maps.drawing.DrawingManager({
                drawingMode: google.maps.drawing.OverlayType.CIRCLE,
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    draggable: true,
                    drawingModes: [google.maps.drawing.OverlayType.CIRCLE]
                },
                circleOptions: {
                    fillColor: '#ffff00',
                    fillOpacity: 0,
                    strokeWeight: 2,
                    clickable: true,
                    editable: true,
                    zIndex: 1
                }
            });

            drawingManager.setMap(_this.map);

            drawingManager.setDrawingMode(null);

            google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {

                _this.onDragEnd.call(_this, event.overlay);

                // Switch back to non-drawing mode after drawing a shape.

                drawingManager.setDrawingMode(null);
            });

            google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle) {

                google.maps.event.addListener(circle, 'radius_changed', function () {
                    return _this.onDragEnd.call(_this, circle);
                });
                google.maps.event.addListener(circle, 'center_changed', function () {
                    return _this.onDragEnd.call(_this, circle);
                });
            });

            _this.updateMap();
        };

        _this.onDragEnd = function (circle) {
            var onCircleDragEnd = _this.props.onCircleDragEnd;


            var center = circle.center;
            var radius = circle.radius;

            onCircleDragEnd && onCircleDragEnd.call(_this, center, radius);
        };

        _this.markers = [];

        _this.places = [];
        return _this;
    }

    _createClass(Map, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var apiKey = this.props.apiKey;


            _loader2['default'].load({ apiKey: apiKey }, this.initMap);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {

            this.updateMap();
        }
    }, {
        key: 'render',
        value: function render() {
            var results = this.props.results;


            return _react2['default'].createElement(
                'div',
                { className: 'ola-map' },
                _react2['default'].createElement('div', { id: 'map', ref: 'map', style: { width: '100%', height: '400' } })
            );
        }
    }]);

    return Map;
}(_react2['default'].Component);

module.exports = Map;