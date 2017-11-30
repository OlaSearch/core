'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = _interopRequireDefault(_OlaLogger);

var _FieldLabel = require('./FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Directions(props) {
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
      fieldLabel = props.fieldLabel,
      snippetId = props.snippetId,
      rest = (0, _objectWithoutProperties3['default'])(props, ['latlong', 'translate', 'label', 'iconLeft', 'iconRight', 'onClick', 'result', 'log', 'fieldLabel', 'snippetId']);


  if (!latlong) return null;
  if ((typeof latlong === 'undefined' ? 'undefined' : (0, _typeof3['default'])(latlong)) === 'object') {
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
      snippetId: snippetId
    });
    onClick && onClick(event);
  }

  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-directions' },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    _react2['default'].createElement(
      'a',
      (0, _extends3['default'])({
        className: 'ola-btn ola-btn-directions',
        onClick: handleClick,
        href: url
      }, rest),
      iconLeft,
      label || translate('get_directions_label'),
      iconRight
    )
  );
}

module.exports = (0, _OlaTranslate2['default'])((0, _OlaLogger2['default'])(Directions));