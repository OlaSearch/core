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

var _Bookmarks = require('./../Bookmarks');

var _Bookmarks2 = _interopRequireDefault(_Bookmarks);

var _Speech = require('./../Speech');

var _Speech2 = _interopRequireDefault(_Speech);

var Input = (function (_React$Component) {
	_inherits(Input, _React$Component);

	function Input(props) {
		var _this = this;

		_classCallCheck(this, Input);

		_get(Object.getPrototypeOf(Input.prototype), 'constructor', this).call(this, props);

		this.onClear = function (event) {

			event && event.preventDefault();

			_this.props.onClear();

			setTimeout(function () {
				return _this.refs.Input.focus();
			}, 0);
		};

		this.onFocus = function (event) {

			if (!event.target.value) return;

			_this.props.onChange.call(_this, event.target.value);
		};

		this.onKeyUp = function (event) {

			if (event.which == 27) {

				_this.props.onClear();
			}
		};
	}

	_createClass(Input, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var q = _props.q;
			var onChange = _props.onChange;
			var placeholder = _props.placeholder;

			/* Show clear or submit button */

			var button = q ? _react2['default'].createElement('button', { type: 'reset', className: 'ola-clear-button', onClick: this.onClear }) : _react2['default'].createElement('button', { type: 'submit', className: 'ola-search-button' });

			return _react2['default'].createElement(
				'div',
				{ className: 'ola-search-form-container' },
				_react2['default'].createElement('input', {
					ref: 'Input',
					type: 'text',
					value: q,
					className: 'ola-text-input ola-text-input-round',
					onChange: function (event) {
						onChange.call(_this2, event.target.value);
					},
					onFocus: this.onFocus,
					autoComplete: 'off',
					autoCorrect: 'off',
					autoCapitalize: 'off',
					spellCheck: 'false',
					placeholder: placeholder,
					onKeyUp: this.onKeyUp
				}),
				button,
				_react2['default'].createElement(_Speech2['default'], {
					onResult: function (value, confidence) {

						onChange.call(_this2, value);
					},
					onFinalResult: function (value) {

						onChange.call(_this2, value);
					}
				}),
				_react2['default'].createElement(_Bookmarks2['default'], null)
			);
		}
	}], [{
		key: 'propTypes',
		value: {
			q: _react2['default'].PropTypes.string,
			onChange: _react2['default'].PropTypes.func,
			placeholder: _react2['default'].PropTypes.string
		},
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			placeholder: 'Enter keywords'
		},
		enumerable: true
	}]);

	return Input;
})(_react2['default'].Component);

exports['default'] = Input;
;
module.exports = exports['default'];