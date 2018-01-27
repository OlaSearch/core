'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function NoBookmarks(_ref) {
  var translate = _ref.translate,
      bookmarks = _ref.bookmarks;

  if (bookmarks.length) return null;
  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet ola-snippet-noresults' },
    translate('bookmarks_empty_label')
  );
}

exports['default'] = (0, _withTranslate2['default'])(NoBookmarks);