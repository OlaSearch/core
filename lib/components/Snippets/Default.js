'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Title = require('./../Fields/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Thumbnail = require('./../Fields/Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _TextField = require('./../Fields/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Bookmark = require('./../SnippetActions/Bookmark');

var _Bookmark2 = _interopRequireDefault(_Bookmark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function DefaultSnippet(_ref) {
  var result = _ref.result,
      bookmarks = _ref.bookmarks,
      dispatch = _ref.dispatch,
      rest = (0, _objectWithoutProperties3['default'])(_ref, ['result', 'bookmarks', 'dispatch']);

  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet' },
    _react2['default'].createElement(
      'div',
      { className: 'ola-snippet-image' },
      _react2['default'].createElement(_Thumbnail2['default'], (0, _extends3['default'])({
        thumbnail: result.thumbnail,
        thumbnail_mobile: result.thumbnail_mobile
      }, rest))
    ),
    _react2['default'].createElement(
      'div',
      { className: 'ola-snippet-content' },
      _react2['default'].createElement(_Bookmark2['default'], (0, _extends3['default'])({ result: result, bookmarks: bookmarks, dispatch: dispatch }, rest)),
      _react2['default'].createElement(_Title2['default'], (0, _extends3['default'])({ result: result }, rest)),
      _react2['default'].createElement(_TextField2['default'], (0, _extends3['default'])({ result: result }, rest))
    )
  );
}

module.exports = DefaultSnippet;