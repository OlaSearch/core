'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var Directions = function Directions(props) {
  var latlong = props.latlong;
  var translate = props.translate;
  var _props$iconLeft = props.iconLeft;
  var iconLeft = _props$iconLeft === undefined ? null : _props$iconLeft;
  var _props$iconRight = props.iconRight;
  var iconRight = _props$iconRight === undefined ? null : _props$iconRight;

  var rest = require('../../../.babelhelper.js').objectWithoutProperties(props, ['latlong', 'translate', 'iconLeft', 'iconRight']);

  if (!latlong) return null;

  var url = 'https://www.google.com/maps/dir//' + latlong;

  return _react2['default'].createElement(
    'a',
    require('../../../.babelhelper.js')['extends']({ className: 'ola-btn ola-btn-directions', href: url }, rest),
    iconLeft,
    translate('get_directions_label'),
    iconRight
  );
};

module.exports = (0, _OlaTranslate2['default'])(Directions);