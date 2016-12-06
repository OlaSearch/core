'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Title = require('./../Fields/Title');

var _Title2 = require('../../../.babelhelper.js').interopRequireDefault(_Title);

var _Thumbnail = require('./../Fields/Thumbnail');

var _Thumbnail2 = require('../../../.babelhelper.js').interopRequireDefault(_Thumbnail);

var _Summary = require('./../Fields/Summary');

var _Summary2 = require('../../../.babelhelper.js').interopRequireDefault(_Summary);

var _Bookmark = require('./../SnippetActions/Bookmark');

var _Bookmark2 = require('../../../.babelhelper.js').interopRequireDefault(_Bookmark);

var DefaultSnippet = function DefaultSnippet(_ref) {
  var result = _ref.result;
  var bookmarks = _ref.bookmarks;
  var dispatch = _ref.dispatch;

  var rest = require('../../../.babelhelper.js').objectWithoutProperties(_ref, ['result', 'bookmarks', 'dispatch']);

  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet' },
    _react2['default'].createElement(
      'div',
      { className: 'ola-snippet-image' },
      _react2['default'].createElement(_Thumbnail2['default'], {
        thumbnail: result.thumbnail,
        thumbnail_mobile: result.thumbnail_mobile
      })
    ),
    _react2['default'].createElement(
      'div',
      { className: 'ola-snippet-content' },
      _react2['default'].createElement(_Bookmark2['default'], require('../../../.babelhelper.js')['extends']({ result: result, bookmarks: bookmarks, dispatch: dispatch }, rest)),
      _react2['default'].createElement(_Title2['default'], { result: result }),
      _react2['default'].createElement(_Summary2['default'], { result: result })
    )
  );
};

module.exports = DefaultSnippet;