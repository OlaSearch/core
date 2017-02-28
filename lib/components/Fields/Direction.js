'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = _interopRequireDefault(_OlaLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Directions = function Directions(props) {
  var latlong = props.latlong,
      translate = props.translate,
      label = props.label,
      _props$iconLeft = props.iconLeft,
      iconLeft = _props$iconLeft === undefined ? null : _props$iconLeft,
      _props$iconRight = props.iconRight,
      iconRight = _props$iconRight === undefined ? null : _props$iconRight,
      onClick = props.onClick,
      result = props.result,
      log = props.log,
      rest = _objectWithoutProperties(props, ['latlong', 'translate', 'label', 'iconLeft', 'iconRight', 'onClick', 'result', 'log']);

  if (!latlong) return null;
  if ((typeof latlong === 'undefined' ? 'undefined' : _typeof(latlong)) === 'object') {
    latlong = latlong.lat + ',' + latlong.lon;
  }

  var url = 'https://www.google.com/maps/dir//' + latlong;

  function handleClick(event) {
    log({
      eventType: 'C',
      result: result,
      eventCategory: 'Get Directions',
      eventAction: 'click',
      debounce: true,
      snippetId: props.snippetId
    });
    onClick && onClick(event);
  }

  return _react2['default'].createElement(
    'a',
    _extends({ className: 'ola-btn ola-btn-directions',
      onClick: handleClick,
      href: url
    }, rest),
    iconLeft,
    label || translate('get_directions_label'),
    iconRight
  );
};

module.exports = (0, _OlaTranslate2['default'])((0, _OlaLogger2['default'])(Directions));