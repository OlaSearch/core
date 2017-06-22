'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = _interopRequireDefault(_OlaLogger);

var _FieldLabel = require('./FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Phone = function Phone(props) {
  var phone = props.phone,
      label = props.label,
      translate = props.translate,
      log = props.log,
      onClick = props.onClick,
      result = props.result,
      snippetId = props.snippetId,
      fieldLabel = props.fieldLabel,
      rest = _objectWithoutProperties(props, ['phone', 'label', 'translate', 'log', 'onClick', 'result', 'snippetId', 'fieldLabel']);

  if (!phone) return null;

  var url = 'tel://' + (0, _utilities.sanitizePhone)(phone);

  function handleClick(event) {
    log({
      eventType: 'C',
      result: result,
      eventCategory: 'Call',
      eventAction: 'click',
      snippetId: snippetId
    });
    onClick && onClick(event, result);
  }

  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-phone' },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    _react2['default'].createElement(
      'a',
      _extends({
        href: url,
        className: 'ola-cta-button ola-btn-call',
        onClick: handleClick
      }, rest),
      label || translate('call_label')
    )
  );
};

module.exports = (0, _OlaLogger2['default'])((0, _OlaTranslate2['default'])(Phone));