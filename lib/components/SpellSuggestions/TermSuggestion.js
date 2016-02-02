"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TermSuggestion = function TermSuggestion(props) {
	var term = props.term;

	if (!term) return _react2.default.createElement("noscript", null);

	return _react2.default.createElement(
		"div",
		{ className: "ola-term-suggestion" },
		"Showing results for ",
		_react2.default.createElement(
			"strong",
			null,
			term
		)
	);
};

module.exports = TermSuggestion;