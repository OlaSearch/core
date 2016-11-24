'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaLogger);

var Directions = function Directions(props) {
  var latlong = props.latlong;
  var translate = props.translate;
  var label = props.label;
  var _props$iconLeft = props.iconLeft;
  var iconLeft = _props$iconLeft === undefined ? null : _props$iconLeft;
  var _props$iconRight = props.iconRight;
  var iconRight = _props$iconRight === undefined ? null : _props$iconRight;
  var _onClick = props.onClick;
  var result = props.result;
  var log = props.log;

  var rest = require('../../../.babelhelper.js').objectWithoutProperties(props, ['latlong', 'translate', 'label', 'iconLeft', 'iconRight', 'onClick', 'result', 'log']);

  if (!latlong) return null;
  if ((typeof latlong === 'undefined' ? 'undefined' : require('../../../.babelhelper.js')['typeof'](latlong)) === 'object') {
    latlong = latlong.lat + ',' + latlong.lon;
  }

  var url = 'https://www.google.com/maps/dir//' + latlong;

  return _react2['default'].createElement(
    'a',
    require('../../../.babelhelper.js')['extends']({ className: 'ola-btn ola-btn-directions',
      onClick: function onClick(event) {
        log({
          eventType: 'C',
          result: result,
          eventCategory: 'Get Directions',
          eventAction: 'click',
          debounce: true,
          snippetId: props.snippetId
        });
        _onClick && _onClick(event);
      },
      href: url
    }, rest),
    iconLeft,
    label || translate('get_directions_label'),
    iconRight
  );
};

module.exports = (0, _OlaTranslate2['default'])((0, _OlaLogger2['default'])(Directions));