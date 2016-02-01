'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FieldTypesDropdown = require('./FieldTypes/Dropdown');

var _FieldTypesDropdown2 = _interopRequireDefault(_FieldTypesDropdown);

var Question = (function (_React$Component) {
	_inherits(Question, _React$Component);

	function Question(props) {
		var _this = this;

		_classCallCheck(this, Question);

		_get(Object.getPrototypeOf(Question.prototype), 'constructor', this).call(this, props);

		this.handleChange = function (value) {
			var _props = _this.props;
			var item = _props.item;
			var index = _props.index;

			_this.props.onChange.call(_this, item, value, index);
		};
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
			var _props2 = this.props;
			var item = _props2.item;
			var index = _props2.index;
			var active = _props2.active;
			var device = _props2.device;

			var klass = (0, _classnames2['default'])({
				'ola-panel': true,
				'ola-active': active
			});

			return _react2['default'].createElement(
				'div',
				{ className: klass },
				_react2['default'].createElement(
					'div',
					{ className: 'ola-panel-title' },
					_react2['default'].createElement(
						'span',
						{ className: 'ola-panel-number' },
						index + 1
					),
					_react2['default'].createElement(
						'span',
						null,
						item.question
					)
				),
				_react2['default'].createElement(
					'div',
					{ className: 'ola-panel-body' },
					_react2['default'].createElement(_FieldTypesDropdown2['default'], {
						item: item,
						handleChange: this.handleChange,
						index: index,
						device: device
					})
				)
			);
		}
	}], [{
		key: 'propTypes',
		value: {
			item: _react2['default'].PropTypes.object.isRequired,
			index: _react2['default'].PropTypes.number.isRequired,
			active: _react2['default'].PropTypes.bool.isRequired,
			onChange: _react2['default'].PropTypes.func.isRequired
		},
		enumerable: true
	}]);

	return Question;
})(_react2['default'].Component);

exports['default'] = Question;
;
module.exports = exports['default'];