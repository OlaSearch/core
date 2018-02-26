'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withLogger = require('./../../../decorators/withLogger');

var _withLogger2 = _interopRequireDefault(_withLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Button(_ref) {
  var title = _ref.title,
      label = _ref.label,
      className = _ref.className,
      url = _ref.url,
      fullWidth = _ref.fullWidth,
      onClick = _ref.onClick,
      result = _ref.result,
      snippetId = _ref.snippetId,
      log = _ref.log,
      target = _ref.target,
      openInNewWindow = _ref.openInNewWindow,
      eventLabel = _ref.eventLabel,
      eventCategory = _ref.eventCategory,
      logPayload = _ref.logPayload;

  if (title) label = title;
  function handleClick(event) {
    log({
      eventType: 'C',
      result: result,
      eventCategory: eventCategory || 'button',
      eventAction: 'click',
      eventLabel: eventLabel || label,
      snippetId: snippetId,
      payload: logPayload
    });

    if (onClick) return onClick(event, result);

    if (target) return;
    event.preventDefault();
    if (url) window.location.href = url;
  }

  /* Check if it should be opened in new page */
  if (openInNewWindow) {
    target = '_blank';
  }

  var klass = (0, _classnames2['default'])('ola-btn', 'ola-cta-button', className, {
    'ola-btn-fullwidth': fullWidth
  });
  if (!label) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-field ola-field-button' },
    _react2['default'].createElement(
      'button',
      {
        type: 'button',
        className: klass,
        onClick: handleClick,
        target: target
      },
      label
    )
  );
}

Button.defaultProps = {
  fullWidth: false,
  target: null
};

module.exports = (0, _withLogger2['default'])(Button);