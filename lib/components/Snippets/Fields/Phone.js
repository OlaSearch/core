'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Phone = function Phone(_ref) {
	var phone = _ref.phone;

	if (!phone) return _react2.default.createElement('noscript', null);

	var url = 'tel://' + phone;

	return _react2.default.createElement(
		'a',
		{ href: url, className: 'ola-btn ola-btn-call' },
		'Call'
	);
};

module.exports = Phone;