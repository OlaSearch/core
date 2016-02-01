'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Phone = function Phone(props) {
	var phone = props.phone;

	if (!phone) return _react2['default'].createElement('noscript', null);

	var url = 'tel://' + phone;

	return _react2['default'].createElement(
		'a',
		{ href: url, className: 'ola-btn ola-btn-call' },
		'Call'
	);
};

module.exports = Phone;