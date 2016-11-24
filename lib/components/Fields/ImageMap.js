'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = require('../../../.babelhelper.js').interopRequireDefault(_Thumbnail);

var _Settings = require('./../../constants/Settings');

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaLogger);

var Map = function Map(props) {
  var latlong = props.latlong;
  var apiKey = props.apiKey;
  var width = props.width;
  var height = props.height;
  var _onClick = props.onClick;
  var result = props.result;


  if (!latlong) return _Settings.NO_SCRIPT_TAG;

  if ((typeof latlong === 'undefined' ? 'undefined' : require('../../../.babelhelper.js')['typeof'](latlong)) === 'object') {
    latlong = latlong.lat + ',' + latlong.lon;
  }

  var url = 'https://www.google.com/maps?q=' + latlong;
  var map = 'https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=' + width + 'x' + height + '&maptype=roadmap&markers=color:blue|label:A|' + latlong + '&key=' + apiKey;

  return _react2['default'].createElement(
    'a',
    {
      href: url,
      className: 'field field-url',
      onClick: function onClick(event) {
        props.log({
          eventType: 'C',
          result: result,
          eventCategory: 'Map',
          eventAction: 'click',
          eventLabel: 'Map',
          snippetId: props.snippetId,
          collectionId: props.collectionId
        });
        _onClick && _onClick(event, result);
      }
    },
    _react2['default'].createElement(_Thumbnail2['default'], {
      thumbnail: map,
      thumbnail_mobile: map
    })
  );
};

Map.defaultProps = {
  apiKey: 'AIzaSyAZmAH-qvIuTeS8hgCD9jIYgjYuyoycsaY',
  width: 200,
  height: 200
};

module.exports = (0, _OlaLogger2['default'])(Map);