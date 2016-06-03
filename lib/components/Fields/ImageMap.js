'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Map = function Map(props) {
  var latlong = props.latlong;
  var apiKey = props.apiKey;


  if (!latlong) return _react2['default'].createElement('noscript', null);

  var url = 'https://www.google.com/maps?q=' + latlong;
  var map = 'https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=200x200&maptype=roadmap&markers=color:blue|label:A|' + latlong + '&key=' + apiKey;

  return _react2['default'].createElement(
    'a',
    {
      href: url,
      className: 'field field-url'
    },
    _react2['default'].createElement(_Thumbnail2['default'], {
      thumbnail: map,
      thumbnail_mobile: map
    })
  );
};

Map.defaultProps = {
  apiKey: 'AIzaSyAZmAH-qvIuTeS8hgCD9jIYgjYuyoycsaY'
};

module.exports = Map;