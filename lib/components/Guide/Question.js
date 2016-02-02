'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Dropdown = require('./FieldTypes/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Question = function (_React$Component) {
	_inherits(Question, _React$Component);

	function Question(props) {
		_classCallCheck(this, Question);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Question).call(this, props));

		_this.handleChange = function (value) {
			var _this$props = _this.props;
			var item = _this$props.item;
			var index = _this$props.index;

			_this.props.onChange.call(_this, item, value, index);
		};

		return _this;
	}

	_createClass(Question, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var item = this.props.item;

			if (item.defaultValue) {
				this.handleChange.call(this, item.defaultValue);
			}
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps) {

			return nextProps.item != this.props.item || nextProps.active != this.props.active;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var item = _props.item;
			var index = _props.index;
			var active = _props.active;
			var device = _props.device;

			var klass = (0, _classnames2.default)({
				'ola-panel': true,
				'ola-active': active
			});

			return _react2.default.createElement(
				'div',
				{ className: klass },
				_react2.default.createElement(
					'div',
					{ className: 'ola-panel-title' },
					_react2.default.createElement(
						'span',
						{ className: 'ola-panel-number' },
						index + 1
					),
					_react2.default.createElement(
						'span',
						null,
						item.question
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'ola-panel-body' },
					_react2.default.createElement(_Dropdown2.default, {
						item: item,
						handleChange: this.handleChange,
						index: index,
						device: device
					})
				)
			);
		}
	}]);

	return Question;
}(_react2.default.Component);

Question.propTypes = {
	item: _react2.default.PropTypes.object.isRequired,
	index: _react2.default.PropTypes.number.isRequired,
	active: _react2.default.PropTypes.bool.isRequired,
	onChange: _react2.default.PropTypes.func.isRequired
};
;

module.exports = Question;