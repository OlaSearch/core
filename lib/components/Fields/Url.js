'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = _interopRequireDefault(_OlaLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Url = function Url(_ref) {
  var result = _ref.result,
      onClick = _ref.onClick,
      log = _ref.log,
      snippetId = _ref.snippetId;
  var url = result.url;

  if (!url) return null;

  function handleClick(event) {
    log({
      eventType: 'C',
      result: result,
      eventCategory: 'Title',
      eventAction: 'click',
      snippetId: snippetId
    });
    onClick && onClick(event);
  }

  return _react2['default'].createElement(
    'a',
    {
      className: 'ola-field ola-field-url',
      href: url,
      title: url,
      onClick: handleClick
    },
    url
  );
};

module.exports = (0, _OlaLogger2['default'])(Url);