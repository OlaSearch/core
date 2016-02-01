'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.addBookmark = addBookmark;
exports.removeBookmark = removeBookmark;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constantsActionTypes = require('./../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

function addBookmark(snippet) {

	return {
		type: _constantsActionTypes2['default'].ADD_BOOKMARK,
		snippet: snippet
	};
}

function removeBookmark(snippet) {

	return {
		type: _constantsActionTypes2['default'].REMOVE_BOOKMARK,
		snippet: snippet
	};
}