"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var Histogram = function (_React$Component) {
	_inherits(Histogram, _React$Component);

	function Histogram() {
		_classCallCheck(this, Histogram);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Histogram).apply(this, arguments));
	}

	_createClass(Histogram, [{
		key: "render",
		value: function render() {
			var data = this.props.data;


			if (!data.length) return null;

			var max = data.reduce(function (a, b) {
				return a.count > b.count ? a : b;
			});
			var min = data.reduce(function (a, b) {
				return a.count < b.count ? a : b;
			});

			/* Sort data */
			data = data.sort(function (a, b) {
				return a.name - b.name;
			});

			// console.log(data.length)

			return _react2.default.createElement(
				"div",
				{ className: "ola-histogram" },
				data.map(function (item, idx) {

					return _react2.default.createElement("div", {
						key: idx,
						className: "ola-histogram-bar",
						style: {
							height: item.count / max.count * 100 + "%"
						}
					});
				})
			);
		}
	}]);

	return Histogram;
}(_react2.default.Component);

module.exports = Histogram;