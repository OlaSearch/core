'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Bookmark = function Bookmark(_ref) {
  var bookmark = _ref.bookmark;
  var onRemove = _ref.onRemove;
  var url = bookmark.url;
  var title = bookmark.title;

  var isValidUrl = url && url.indexOf('http') !== -1;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-module-item' },
    isValidUrl ? _react2['default'].createElement(
      'a',
      { href: url },
      title
    ) : _react2['default'].createElement(
      'span',
      null,
      title
    ),
    _react2['default'].createElement(
      'button',
      {
        type: 'button',
        className: 'ola-module-clear',
        onClick: onRemove,
        'aria-label': 'Remove bookmark'
      },
      _react2['default'].createElement(
        'span',
        null,
        'Remove'
      )
    )
  );
};

module.exports = Bookmark;