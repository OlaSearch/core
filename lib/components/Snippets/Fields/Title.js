'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Year = require('./Year');

var _Year2 = _interopRequireDefault(_Year);

var _utilities = require('./../../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Title = function Title(props) {
	var result = props.result;
	var isLink = props.isLink;
	var year = result.year;
	var title = result.title;
	var url = result.url;
	var highlighting = result.highlighting;

	/* Check for highlighting */

	if (highlighting) {
		var highlighted_title = highlighting.title;


		if ((typeof highlighted_title === 'undefined' ? 'undefined' : _typeof(highlighted_title)) == 'object') {
			title = highlighted_title[0];
		}
	}

	return _react2.default.createElement(
		'h3',
		{ className: 'ola-field ola-field-title' },
		isLink ? _react2.default.createElement('a', { href: url, dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(title) }) : _react2.default.createElement('div', { dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(title) }),
		props.children
	);
};

Title.defaultProps = {
	isLink: true
};

module.exports = Title;