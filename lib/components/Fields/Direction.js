'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaLogger);

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
      rest = require('../../../.babelhelper.js').objectWithoutProperties(props, ['latlong', 'translate', 'label', 'iconLeft', 'iconRight', 'onClick', 'result', 'log']);

  if (!latlong) return null;
  if ((typeof latlong === 'undefined' ? 'undefined' : require('../../../.babelhelper.js')['typeof'](latlong)) === 'object') {
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
    require('../../../.babelhelper.js')['extends']({ className: 'ola-btn ola-btn-directions',
      onClick: handleClick,
      href: url
    }, rest),
    iconLeft,
    label || translate('get_directions_label'),
    iconRight
  );
};

module.exports = (0, _OlaTranslate2['default'])((0, _OlaLogger2['default'])(Directions));