"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Share = function Share(_ref) {
	var result = _ref.result;
	var title = result.title;
	var url = result.url;


	var emailUrl = "mailto:?&subject=" + title + "&body=" + url;
	var facebookUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url) + "&title=" + title + "&redirect_uri=" + location.href;
	var twitterUrl = "https://twitter.com/intent/tweet?text=" + title + "&url=" + url;

	return _react2["default"].createElement(
		"div",
		{ className: "ola-share-links" },
		_react2["default"].createElement(
			"span",
			null,
			"Share: "
		),
		_react2["default"].createElement(
			"a",
			{ href: emailUrl },
			"Email"
		),
		_react2["default"].createElement(
			"a",
			{ href: facebookUrl },
			"Facebook"
		),
		_react2["default"].createElement(
			"a",
			{ href: twitterUrl },
			"Twitter"
		)
	);
};

module.exports = Share;