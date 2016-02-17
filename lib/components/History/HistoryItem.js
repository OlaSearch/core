"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var HistoryItem = function HistoryItem(_ref) {
	var history = _ref.history;
	var searchUrl = _ref.searchUrl;


	var url = searchUrl + history.url;

	return _react2.default.createElement(
		"div",
		{ className: "ola-module-item" },
		_react2.default.createElement(
			"a",
			{ href: url },
			history.q
		),
		history.facets.map(function (facet, idx) {
			return _react2.default.createElement(
				"span",
				{ key: idx, className: "ola-search-facet-count" },
				facet
			);
		})
	);
};

module.exports = HistoryItem;