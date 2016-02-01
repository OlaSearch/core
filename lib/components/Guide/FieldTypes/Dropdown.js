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

var _utilities = require('./../../../utilities');

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _reactOnclickoutsideDecorator = require('react-onclickoutside/decorator');

var _reactOnclickoutsideDecorator2 = _interopRequireDefault(_reactOnclickoutsideDecorator);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Dropdown = (function (_React$Component) {
	_inherits(Dropdown, _React$Component);

	function Dropdown(props) {
		var _this = this;

		_classCallCheck(this, _Dropdown);

		_get(Object.getPrototypeOf(_Dropdown.prototype), 'constructor', this).call(this, props);
		this.state = {
			filterText: '',
			isOpen: false,
			curIndex: 0,
			selectedText: this.props.item.defaultValue
		};

		this.handleClickOutside = function (event) {
			var _props$device = _this.props.device;
			var isPhone = _props$device.isPhone;
			var isTablet = _props$device.isTablet;

			if (isPhone || isTablet) {
				return;
			}

			_this.setState({
				isOpen: false
			});
		};

		this.focusAndSelect = function () {

			_this.refs.Input.focus();

			_this.refs.Input.select();
		};

		this.handleEvents = function (event) {
			var isOpen = _this.state.isOpen;

			switch (event.type) {

				case 'mouseup':
					_this.setState({
						isOpen: !isOpen
					});

					_this.focusAndSelect();

					break;

				case 'blur':
					var _props$device2 = _this.props.device,
					    isPhone = _props$device2.isPhone,
					    isTablet = _props$device2.isTablet;

					if (isPhone || isTablet) return;

					_this.setState({
						isOpen: false
					});
					break;

				case 'click':
				case 'focus':

					_this.setState({
						isOpen: true,
						filterText: ''
					});

					break;
			}
		};

		this.handleKeyUp = function (event) {
			var curIndex = _this.state.curIndex;
			var values = _this.props.item.values;

			switch (event.which) {
				case 13:
					//ENTER				
					_this._values.length && _this.selectItem(_this._values[curIndex].name, curIndex);
					break;
				case 27:
					// ESC
					_this.setState({
						isOpen: false,
						curIndex: 0
					});
					break;
				case 40:
					//DOWN

					_this.setState({
						curIndex: Math.min(++curIndex, values.length - 1),
						isOpen: true
					});
					break;
				case 38:
					//UP
					_this.setState({
						curIndex: Math.max(--curIndex, 0),
						isOpen: true
					});
					break;

				default:
					_this.setState({
						filterText: event.target.value,
						curIndex: 0,
						isOpen: true
					});
					break;
			}

			if (_this.refs.ItemList) _this.refs.ItemList.scrollTo(curIndex);
		};

		this.selectItem = function (value, index, event) {

			_this.props.handleChange.call(_this, value);

			_this.setState({
				isOpen: false,
				filterText: '',
				curIndex: index,
				selectedText: value
			});

			_this.refs.Input.value = value;

			setTimeout(function () {
				var _props$device3 = _this.props.device;
				var isPhone = _props$device3.isPhone;
				var isTablet = _props$device3.isTablet;

				if (!isPhone && !isTablet) {

					_this.refs.Input.focus();
				}
			}, 100);
		};
	}

	_createClass(Dropdown, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var index = this.props.index;

			if (index > 0) this.focusAndSelect();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.item.values != this.props.item.values) {

				/* Set current index */

				var _nextProps$item = nextProps.item;
				var values = _nextProps$item.values;
				var defaultValue = _nextProps$item.defaultValue;

				values = values.sort(function (a, b) {
					return a.name.localeCompare(b.name);
				});

				for (var i = 0; i < values.length; i++) {
					if (values[i].name === defaultValue) {

						this.setState({
							curIndex: i
						});
					}
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var item = this.props.item;
			var defaultValue = item.defaultValue;
			var values = item.values;
			var _state = this.state;
			var filterText = _state.filterText;
			var isOpen = _state.isOpen;
			var curIndex = _state.curIndex;
			var selectedText = _state.selectedText;

			values = values || [];

			/**
    * Filter values
    */

			this._values = values = values.filter(function (item) {
				return item.name.match(new RegExp(filterText, 'i'));
			}).sort(function (a, b) {
				return a.name.localeCompare(b.name);
			});

			var len = values.length;
			var selectedIndex = 0;

			/* Find selectedIndex */

			for (var i = 0; i < len; i++) {
				if (values[i].name === selectedText) {
					selectedIndex = i;
					break;
				}
			}

			if (curIndex == 0 && selectedIndex) curIndex = selectedIndex;

			/**
    * ClassName
    */
			var klass = (0, _classnames2['default'])({
				'ola-dropdown-container': true,
				'ola-dropdown-open': isOpen
			});

			return _react2['default'].createElement(
				'div',
				{ className: klass },
				_react2['default'].createElement('input', {
					ref: 'Input',
					type: 'text',
					className: 'ola-text-input',
					placeholder: 'Select',
					defaultValue: defaultValue,
					onClick: this.handleEvents,
					onBlur: this.handleEvents,
					onKeyUp: this.handleKeyUp
				}),
				_react2['default'].createElement('div', { className: 'ola-dropdown-arrow', onMouseUp: this.handleEvents }),
				isOpen ? _react2['default'].createElement(
					'div',
					{ className: 'ola-dropdown', ref: 'Dropdown' },
					_react2['default'].createElement(_reactList2['default'], {
						ref: 'ItemList',
						initialIndex: selectedIndex,
						itemRenderer: function (idx, key) {

							var name = values[idx].name;
							var selectItem = _this2.selectItem.bind(_this2, name, idx);
							var klassName = (0, _classnames2['default'])({
								'ola-dropdown-item': true,
								'ola-dropdown-item-active': selectedIndex == idx,
								'ola-dropdown-item-hover': curIndex == idx
							});

							return _react2['default'].createElement(
								'a',
								{
									key: key,
									className: klassName,
									onMouseDown: selectItem
								},
								name
							);
						},
						length: len,
						type: 'uniform'
					})
				) : null
			);
		}
	}]);

	var _Dropdown = Dropdown;
	Dropdown = (0, _reactOnclickoutsideDecorator2['default'])()(Dropdown) || Dropdown;
	return Dropdown;
})(_react2['default'].Component);

exports['default'] = Dropdown;
module.exports = exports['default'];