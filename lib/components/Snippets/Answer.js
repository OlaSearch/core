'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _Bookmark = require('./../SnippetActions/Bookmark');

var _Bookmark2 = _interopRequireDefault(_Bookmark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function DefaultAnswerSnippet(_ref) {
  var result = _ref.result,
      bookmarks = _ref.bookmarks,
      dispatch = _ref.dispatch,
      rest = (0, _objectWithoutProperties3['default'])(_ref, ['result', 'bookmarks', 'dispatch']);
  var answer = result.ola_answer;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet ola-snippet-static-answer' },
    _react2['default'].createElement('div', { className: 'ola-snippet-answer-result', dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(answer) }),
    _react2['default'].createElement(_Bookmark2['default'], (0, _extends3['default'])({ result: result, bookmarks: bookmarks, dispatch: dispatch }, rest))
  );
}

module.exports = DefaultAnswerSnippet;