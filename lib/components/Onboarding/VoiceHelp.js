'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref2 = _react2['default'].createElement(
  'div',
  { className: 'ola-onboarding-content' },
  _react2['default'].createElement(
    'p',
    null,
    'Hi there, you can use your voice to explore this collection.'
  ),
  _react2['default'].createElement(
    'p',
    null,
    'Tap the button and ask ',
    _react2['default'].createElement(
      'strong',
      null,
      ' "What can i do"'
    ),
    ' to get started'
  )
);

var VoiceHelp = function VoiceHelp(_ref) {
  var hasUsedVoice = _ref.hasUsedVoice,
      onDismiss = _ref.onDismiss;

  if (hasUsedVoice) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-onboarding' },
    _react2['default'].createElement('div', { className: 'ola-onboarding-overlay', onClick: onDismiss }),
    _ref2
  );
};

function mapStateToProps(state) {
  return {
    hasUsedVoice: state.Context.hasUsedVoice
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)(VoiceHelp);