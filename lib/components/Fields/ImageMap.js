'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = require('../../../.babelhelper.js').interopRequireDefault(_Thumbnail);

var _Settings = require('./../../constants/Settings');

var Map = function Map(props) {
  var latlong = props.latlong;
  var apiKey = props.apiKey;


  if (!latlong) return _Settings.NO_SCRIPT_TAG;

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