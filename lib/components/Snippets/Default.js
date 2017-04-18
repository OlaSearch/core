'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Title = require('./../Fields/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Thumbnail = require('./../Fields/Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _Summary = require('./../Fields/Summary');

var _Summary2 = _interopRequireDefault(_Summary);

var _Bookmark = require('./../SnippetActions/Bookmark');

var _Bookmark2 = _interopRequireDefault(_Bookmark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DefaultSnippet = function DefaultSnippet(_ref) {
  var result = _ref.result,
      bookmarks = _ref.bookmarks,
      dispatch = _ref.dispatch,
      rest = _objectWithoutProperties(_ref, ['result', 'bookmarks', 'dispatch']);

  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet' },
    _react2['default'].createElement(
      'div',
      { className: 'ola-snippet-image' },
      _react2['default'].createElement(_Thumbnail2['default'], _extends({
        thumbnail: result.thumbnail,
        thumbnail_mobile: result.thumbnail_mobile
      }, rest))
    ),
    _react2['default'].createElement(
      'div',
      { className: 'ola-snippet-content' },
      _react2['default'].createElement(_Bookmark2['default'], _extends({ result: result, bookmarks: bookmarks, dispatch: dispatch }, rest)),
      _react2['default'].createElement(_Title2['default'], _extends({ result: result }, rest)),
      _react2['default'].createElement(_Summary2['default'], _extends({ result: result }, rest))
    )
  );
};

module.exports = DefaultSnippet;