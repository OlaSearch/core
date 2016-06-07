'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Settings = require('./../../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Tooltip = function Tooltip(props) {
  if (!props.isShown) return _Settings.NO_SCRIPT_TAG;

  var onClose = props.onClose;
  var content = props.content;


  return _react2['default'].createElement(
    'div',
    { className: 'ola-tooltip-holder' },
    _react2['default'].createElement(
      'div',
      { className: 'ola-tooltip-content' },
      _react2['default'].createElement(
        'p',
        null,
        content
      ),
      _react2['default'].createElement(
        'a',
        { onClick: onClose },
        'Close'
      )
    ),
    _react2['default'].createElement('div', { className: 'ola-modal-background', onClick: onClose })
  );
};

Tooltip.defaultProps = {
  content: 'Here are your selections. You can always add or remove filters.'
};

module.exports = Tooltip;