'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var NoBookmarks = function NoBookmarks(_ref) {
  var translate = _ref.translate,
      bookmarks = _ref.bookmarks;

  if (bookmarks.length) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet ola-snippet-noresults' },
    translate('bookmarks_empty_label')
  );
};

module.exports = (0, _OlaTranslate2['default'])(NoBookmarks);