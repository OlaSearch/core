"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Rating = function Rating(props) {
	var rating = props.rating;

	var normalized = rating / 20;

	var star = [];

	var total = Math.max(Math.ceil(normalized), 1);

	for (var i = 0; i < total; i++) {
		star.push(_react2["default"].createElement("em", { key: i, className: "ion ion-ios-star ola-rating-active" }));
	}

	for (var i = total; i < 5; i++) {
		star.push(_react2["default"].createElement("em", { key: i, className: "ion ion-ios-star ola-rating-inactive" }));
	}

	if (!star.length) star = _react2["default"].createElement("em", { className: "ion ion-ios-star" });

	return _react2["default"].createElement(
		"div",
		{ className: "ola-snippet-rating" },
		star
	);
};

module.exports = Rating;