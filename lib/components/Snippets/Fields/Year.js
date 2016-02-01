'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Year = function Year(props) {
	var year = props.year;

	if (!year) return _react2['default'].createElement('noscript', null);

	return _react2['default'].createElement(
		'span',
		null,
		' (',
		year,
		')'
	);
};

module.exports = Year;