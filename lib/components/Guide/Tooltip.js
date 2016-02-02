"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tooltip = function Tooltip(props) {

	if (!props.isShown) return _react2.default.createElement("noscript", null);

	var onClose = props.onClose;

	return _react2.default.createElement(
		"div",
		{ className: "ola-tooltip-holder" },
		_react2.default.createElement(
			"div",
			{ className: "ola-tooltip-content" },
			_react2.default.createElement(
				"p",
				null,
				"Here are your selections. You can always add or remove filters."
			),
			_react2.default.createElement(
				"a",
				{ onClick: onClose },
				"Close"
			)
		),
		_react2.default.createElement("div", { className: "ola-modal-background", onClick: onClose })
	);
};

module.exports = Tooltip;