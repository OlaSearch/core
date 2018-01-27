'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withTranslate = require('./../../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _withLogger = require('./../../../decorators/withLogger');

var _withLogger2 = _interopRequireDefault(_withLogger);

var _FieldLabel = require('./../FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Displays a Get directions button with distance
 */
function Directions(props) {
  var translate = props.translate,
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
      showIfEmpty = props.showIfEmpty,
      distanceFieldName = props.distanceFieldName,
      locationFieldName = props.locationFieldName,
      collectionId = props.collectionId,
      rest = (0, _objectWithoutProperties3['default'])(props, ['translate', 'label', 'iconLeft', 'iconRight', 'onClick', 'result', 'log', 'fieldLabel', 'snippetId', 'showIfEmpty', 'distanceFieldName', 'locationFieldName', 'collectionId']);


  var latlong = result[locationFieldName];
  if (!latlong && !showIfEmpty) return null;
  if (Array.isArray(latlong) && latlong.length) {
    latlong = latlong[0]; /* Take the first latlng */
  } else if ((typeof latlong === 'undefined' ? 'undefined' : (0, _typeof3['default'])(latlong)) === 'object') {
    latlong = latlong.lat + ',' + latlong.lon;
  }

  var url = 'https://www.google.com/maps/dir//' + latlong;
  /* Calculate distance */
  var distanceValue = result[distanceFieldName];
  var distance = distanceValue ? parseFloat(Math.round(distanceValue * 100) / 100).toFixed(2) + ' ' + translate('distance_unit') : null;

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
        href: url,
        target: '_blank'
      }, rest),
      iconLeft,
      label || translate('get_directions_label'),
      iconRight
    ),
    distance ? _react2['default'].createElement(
      'div',
      { className: 'ola-field-distance' },
      distance
    ) : null
  );
}

Directions.defaultProps = {
  distanceFieldName: 'ola_distance',
  locationFieldName: 'ola_location',
  result: {},
  fieldLabel: null
};

module.exports = (0, _withTranslate2['default'])((0, _withLogger2['default'])(Directions));