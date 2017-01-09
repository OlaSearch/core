'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaLogger);

var Button = function Button(_ref) {
  var label = _ref.label,
      className = _ref.className,
      url = _ref.url,
      fullWidth = _ref.fullWidth,
      onClick = _ref.onClick,
      result = _ref.result,
      snippetId = _ref.snippetId,
      log = _ref.log;

  function handleClick(event) {
    log({
      eventType: 'C',
      result: result,
      eventCategory: label,
      eventAction: 'click',
      snippetId: snippetId
    });

    if (onClick) return onClick(event, result);

    event.preventDefault();
    window.location.href = url;
  }

  var klass = (0, _classnames2['default'])('ola-cta-button', className, {
    'ola-btn-fullwidth': fullWidth
  });
  if (!label) return null;
  return _react2['default'].createElement(
    'a',
    {
      className: klass,
      onClick: handleClick,
      href: url
    },
    label
  );
};

Button.defaultProps = {
  fullWidth: false
};

module.exports = (0, _OlaLogger2['default'])(Button);