'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Tooltip = function Tooltip(_ref) {
  var isShown = _ref.isShown;
  var onClose = _ref.onClose;
  var content = _ref.content;

  if (!isShown) return null;
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