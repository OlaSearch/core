'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _FieldLabel = require('./../FieldLabel');

var _FieldLabel2 = _interopRequireDefault(_FieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function SMS(_ref) {
  var number = _ref.number,
      body = _ref.body,
      _ref$iconLeft = _ref.iconLeft,
      iconLeft = _ref$iconLeft === undefined ? null : _ref$iconLeft,
      _ref$iconRight = _ref.iconRight,
      iconRight = _ref$iconRight === undefined ? null : _ref$iconRight,
      label = _ref.label,
      Device = _ref.Device,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? '' : _ref$placeholder,
      fieldLabel = _ref.fieldLabel;
  var isApple = Device.isApple,
      isPhone = Device.isPhone;


  if (!isPhone || !number) {
    return placeholder ? _react2['default'].createElement(
      'p',
      { className: 'ola-field ola-field-sms' },
      placeholder
    ) : null;
  }

  var bodyText = isApple && isApple.device ? '&body' : '?body';
  var link = 'sms:' + number + bodyText + '=' + body;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-sms' },
    _react2['default'].createElement(_FieldLabel2['default'], { label: fieldLabel }),
    _react2['default'].createElement(
      'a',
      { href: link, className: 'ola-btn ola-btn-sms' },
      iconLeft,
      label,
      iconRight
    )
  );
}

function mapStateToProps(state) {
  return {
    Device: state.Device
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)(SMS);