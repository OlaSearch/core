'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../../utilities');

var _withTranslate = require('./../../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _withLogger = require('./../../../decorators/withLogger');

var _withLogger2 = _interopRequireDefault(_withLogger);

var _FieldLabel = require('./../FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Phone(props) {
  var phone = props.phone,
      label = props.label,
      translate = props.translate,
      log = props.log,
      onClick = props.onClick,
      result = props.result,
      snippetId = props.snippetId,
      fieldLabel = props.fieldLabel,
      logPayload = props.logPayload,
      rest = (0, _objectWithoutProperties3['default'])(props, ['phone', 'label', 'translate', 'log', 'onClick', 'result', 'snippetId', 'fieldLabel', 'logPayload']);


  if (!phone) return null;

  var url = 'tel://' + (0, _utilities.sanitizePhone)(phone);

  function handleClick(event) {
    log({
      eventType: 'C',
      result: result,
      eventCategory: 'Call',
      eventAction: 'click',
      snippetId: snippetId,
      payload: logPayload
    });
    onClick && onClick(event, result);
  }

  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-phone' },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    _react2['default'].createElement(
      'a',
      (0, _extends3['default'])({
        href: url,
        className: 'ola-cta-button ola-btn-call',
        onClick: handleClick
      }, rest),
      label || translate('call_label')
    )
  );
}

module.exports = (0, _withLogger2['default'])((0, _withTranslate2['default'])(Phone));