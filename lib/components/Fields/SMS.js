'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SMS = function SMS(_ref) {
  var number = _ref.number;
  var body = _ref.body;
  var _ref$iconLeft = _ref.iconLeft;
  var iconLeft = _ref$iconLeft === undefined ? null : _ref$iconLeft;
  var _ref$iconRight = _ref.iconRight;
  var iconRight = _ref$iconRight === undefined ? null : _ref$iconRight;
  var text = _ref.text;
  var Device = _ref.Device;
  var _ref$placeholder = _ref.placeholder;
  var placeholder = _ref$placeholder === undefined ? '' : _ref$placeholder;
  var isApple = Device.isApple;
  var isPhone = Device.isPhone;


  if (!isPhone || !number) return placeholder ? _react2['default'].createElement(
    'p',
    { className: 'ola-field ola-field-sms' },
    placeholder
  ) : null;

  var bodyText = isApple && isApple.device ? '&body' : '?body';
  var link = 'sms:' + number + bodyText + '=' + body;

  return _react2['default'].createElement(
    'a',
    {
      href: link,
      className: 'ola-btn ola-btn-sms'
    },
    iconLeft,
    text,
    iconRight
  );
};

function mapStateToProps(state) {
  return {
    Device: state.Device
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)(SMS);