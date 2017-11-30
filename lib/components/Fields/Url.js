'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaLogger = require('./../../decorators/OlaLogger');

var _OlaLogger2 = _interopRequireDefault(_OlaLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function Url(_ref) {
  var result = _ref.result,
      field = _ref.field,
      onClick = _ref.onClick,
      log = _ref.log,
      snippetId = _ref.snippetId,
      anchorLink = _ref.anchorLink,
      label = _ref.label,
      className = _ref.className;
  var url = result.url;

  if (field) {
    url = result[field];
  }
  if (!url) return null;
  if (anchorLink) url = url + '#' + anchorLink;
  if (!label) label = url;
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
  var klassName = 'ola-field ola-field-url';

  if (className) {
    klassName = klassName + ' ' + className;
  }

  return _react2['default'].createElement(
    'a',
    {
      className: klassName,
      href: url,
      title: url,
      onClick: handleClick
    },
    label
  );
}

module.exports = (0, _OlaLogger2['default'])(Url);