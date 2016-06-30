'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBookmark = addBookmark;
exports.removeBookmark = removeBookmark;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

function addBookmark(snippet) {
  return {
    type: _ActionTypes2['default'].ADD_BOOKMARK,
    snippet: snippet
  };
}

function removeBookmark(snippet) {
  return {
    type: _ActionTypes2['default'].REMOVE_BOOKMARK,
    snippet: snippet
  };
}