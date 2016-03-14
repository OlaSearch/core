'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addBookmark = addBookmark;
exports.removeBookmark = removeBookmark;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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