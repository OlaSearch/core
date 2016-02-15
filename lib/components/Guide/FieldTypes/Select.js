'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_React$Component) {
	_inherits(Select, _React$Component);

	function Select() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Select);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Select)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onChange = function (event) {

			var values = (0, _utilities.getValuesFromSelect)(event.target);

			_this.props.handleChange.call(_this, values);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Select, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var item = _props.item;
			var handleChange = _props.handleChange;
			var defaultValue = item.defaultValue;
			var values = item.values;


			if (!values) return null;

			return _react2.default.createElement(
				'select',
				{
					ref: 'select',
					onChange: this.onChange,
					defaultValue: defaultValue
				},
				_react2.default.createElement(
					'option',
					{ value: '' },
					'Please select'
				),
				values.map(function (value, idx) {
					return _react2.default.createElement(
						'option',
						{ key: idx, value: value.name },
						value.name
					);
				})
			);
		}
	}]);

	return Select;
}(_react2.default.Component);

module.exports = Select;