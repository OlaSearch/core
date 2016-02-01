'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Directions = function Directions(props) {
	var latlong = props.latlong;

	if (!latlong) return _react2['default'].createElement('noscript', null);

	var url = 'https://www.google.com/maps?q=' + latlong;

	return _react2['default'].createElement(
		'a',
		{ className: 'ola-btn ola-btn-directions', href: url },
		'Get directions'
	);
};

module.exports = Directions;