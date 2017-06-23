'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = _interopRequireDefault(_OlaLogger);

var _FieldLabel = require('./FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Map = function Map(props) {
  var latlong = props.latlong,
      apiKey = props.apiKey,
      width = props.width,
      height = props.height,
      onClick = props.onClick,
      result = props.result,
      log = props.log,
      fieldLabel = props.fieldLabel;


  if (!latlong) return null;

  if ((typeof latlong === 'undefined' ? 'undefined' : (0, _typeof3['default'])(latlong)) === 'object') {
    latlong = latlong.lat + ',' + latlong.lon;
  }

  var url = 'https://www.google.com/maps?q=' + latlong;
  var map = 'https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=' + width + 'x' + height + '&maptype=roadmap&markers=color:blue|label:A|' + latlong + '&key=' + apiKey;

  function handleClick(event) {
    log({
      eventType: 'C',
      result: result,
      eventCategory: 'Map',
      eventAction: 'click',
      eventLabel: 'Map',
      snippetId: props.snippetId
    });
    onClick && onClick(event, result);
  }

  return _react2['default'].createElement(
    'div',
    { classname: 'ola-field ola-field-map' },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    _react2['default'].createElement(
      'a',
      {
        href: url,
        className: 'field field-url',
        onClick: handleClick
      },
      _react2['default'].createElement(_Thumbnail2['default'], {
        thumbnail: map,
        thumbnail_mobile: map
      })
    )
  );
};

Map.defaultProps = {
  apiKey: 'AIzaSyAZmAH-qvIuTeS8hgCD9jIYgjYuyoycsaY',
  width: 200,
  height: 200
};

module.exports = (0, _OlaLogger2['default'])(Map);