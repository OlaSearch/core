'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Phone = function Phone(props) {
				var phone = props.phone;
				var title = props.title;

				var rest = _objectWithoutProperties(props, ['phone', 'title']);

				if (!phone) return _react2['default'].createElement('noscript', null);

				var url = 'tel://' + phone;

				return _react2['default'].createElement(
								'a',
								_extends({ href: url, className: 'ola-btn ola-btn-call' }, rest),
								title,
								' '
				);
};

Phone.defaultProps = {
				title: 'Call'
};

module.exports = Phone;