"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bookmark = function Bookmark(_ref) {
	var bookmark = _ref.bookmark;
	var onRemove = _ref.onRemove;

	return _react2.default.createElement(
		"div",
		{ className: "ola-module-item" },
		_react2.default.createElement(
			"a",
			{ href: bookmark.url },
			bookmark.title
		),
		_react2.default.createElement("button", {
			type: "button",
			className: "ola-module-clear",
			onClick: onRemove,
			"aria-label": "Remove bookmark"
		})
	);
};

module.exports = Bookmark;