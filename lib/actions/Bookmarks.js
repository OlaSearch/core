'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBookmark = addBookmark;
exports.removeBookmark = removeBookmark;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _omit = require('rambda/lib/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function addBookmark(snippet) {
  return {
    type: _ActionTypes2['default'].ADD_BOOKMARK,
    snippet: (0, _omit2['default'])(['highlighting'], snippet) /* Remove highlighting in snippet */
  };
}

function removeBookmark(snippet) {
  return {
    type: _ActionTypes2['default'].REMOVE_BOOKMARK,
    snippet: snippet
  };
}