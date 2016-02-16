'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Directions = function Directions(props) {
				var latlong = props.latlong;

				var rest = _objectWithoutProperties(props, ['latlong']);

				if (!latlong) return _react2.default.createElement('noscript', null);

				var url = 'https://www.google.com/maps?q=' + latlong;

				return _react2.default.createElement(
								'a',
								_extends({ className: 'ola-btn ola-btn-directions' }, rest, { href: url }),
								'Get directions'
				);
};

module.exports = Directions;