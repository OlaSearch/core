'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _decorator = require('react-onclickoutside/decorator');

var _decorator2 = _interopRequireDefault(_decorator);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_React$Component) {
	_inherits(Dropdown, _React$Component);

	function Dropdown(props) {
		_classCallCheck(this, Dropdown);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown).call(this, props));

		_this.handleClickOutside = function (event) {
			var _this$props$device = _this.props.device;
			var isPhone = _this$props$device.isPhone;
			var isTablet = _this$props$device.isTablet;


			if (isPhone || isTablet) {
				return;
			}

			_this.setState({
				isOpen: false
			});
		};

		_this.focusAndSelect = function () {

			_this.refs.Input.focus();

			_this.refs.Input.select();
		};

		_this.handleEvents = function (event) {
			var isOpen = _this.state.isOpen;


			switch (event.type) {

				case 'mouseup':
					_this.setState({
						isOpen: !isOpen
					});

					_this.focusAndSelect();

					break;

				case 'blur':
					var _this$props$device2 = _this.props.device;
					var isPhone = _this$props$device2.isPhone;
					var isTablet = _this$props$device2.isTablet;


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

		_this.handleKeyUp = function (event) {
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

		_this.selectItem = function (value, index, event) {

			_this.props.handleChange.call(_this, value);

			_this.setState({
				isOpen: false,
				filterText: '',
				curIndex: index,
				selectedText: value
			});

			_this.refs.Input.value = value;

			setTimeout(function () {
				var _this$props$device3 = _this.props.device;
				var isPhone = _this$props$device3.isPhone;
				var isTablet = _this$props$device3.isTablet;


				if (!isPhone && !isTablet) {

					_this.refs.Input.focus();
				}
			}, 100);
		};

		_this.state = {
			filterText: '',
			isOpen: false,
			curIndex: 0,
			selectedText: props.item ? props.item.defaultValue : ''
		};
		return _this;
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
						itemRenderer: function itemRenderer(idx, key) {

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

	return Dropdown;
}(_react2['default'].Component);

module.exports = (0, _decorator2['default'])(Dropdown);