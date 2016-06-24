'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = _interopRequireDefault(_olaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Directions = function Directions(props) {
  var latlong = props.latlong;
  var translate = props.translate;
  var _props$iconLeft = props.iconLeft;
  var iconLeft = _props$iconLeft === undefined ? null : _props$iconLeft;
  var _props$iconRight = props.iconRight;
  var iconRight = _props$iconRight === undefined ? null : _props$iconRight;

  var rest = _objectWithoutProperties(props, ['latlong', 'translate', 'iconLeft', 'iconRight']);

  if (!latlong) return null;

  var url = 'https://www.google.com/maps?q=' + latlong;

  return _react2['default'].createElement(
    'a',
    _extends({
      className: 'ola-btn ola-btn-directions'
    }, rest, {
      href: url
    }),
    iconLeft,
    translate('get_directions_label'),
    iconRight
  );
};

module.exports = (0, _olaTranslate2['default'])(Directions);