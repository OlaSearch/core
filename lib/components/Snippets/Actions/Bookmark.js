'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actionsBookmarks = require('./../../../actions/Bookmarks');

var BookmarkActions = function BookmarkActions(props) {
	var bookmarks = props.bookmarks;
	var result = props.result;
	var dispatch = props.dispatch;

	var isBookmarked = bookmarks.filter(function (bookmark) {
		return bookmark.id == result.id;
	}).length;

	if (isBookmarked) {
		return _react2['default'].createElement(
			'button',
			{
				type: 'button',
				className: 'ola-link-bookmark-action action-remove',
				onClick: function () {
					dispatch((0, _actionsBookmarks.removeBookmark)(result));
				}
			},
			_react2['default'].createElement(
				'span',
				null,
				'Remove Bookmark'
			)
		);
	} else {

		return _react2['default'].createElement(
			'button',
			{
				type: 'button',
				className: 'ola-link-bookmark-action',
				onClick: function () {
					dispatch((0, _actionsBookmarks.addBookmark)(result));
				} },
			_react2['default'].createElement(
				'span',
				null,
				'Add Bookmark'
			)
		);
	}
};

BookmarkActions.propTypes = {
	bookmarks: _react2['default'].PropTypes.array,
	result: _react2['default'].PropTypes.object,
	dispatch: _react2['default'].PropTypes.func
};

module.exports = BookmarkActions;