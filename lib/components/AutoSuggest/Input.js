'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Bookmarks = require('./../Bookmarks');

var _Bookmarks2 = _interopRequireDefault(_Bookmarks);

var _Speech = require('./../Speech');

var _Speech2 = _interopRequireDefault(_Speech);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_React$Component) {
	_inherits(Input, _React$Component);

	function Input(props) {
		_classCallCheck(this, Input);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Input).call(this, props));

		_this.onClear = function (event) {

			event && event.preventDefault();

			_this.props.onClear();

			setTimeout(function () {
				return _this.refs.Input.focus();
			}, 0);
		};

		_this.onFocus = function (event) {

			if (!event.target.value) return;

			_this.props.onChange.call(_this, event.target.value);
		};

		_this.onKeyUp = function (event) {

			if (event.which == 27) {

				_this.props.onClear();
			}
		};

		return _this;
	}

	_createClass(Input, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var q = _props.q;
			var _onChange = _props.onChange;
			var placeholder = _props.placeholder;

			/* Show clear or submit button */

			var button = q ? _react2.default.createElement('button', { type: 'reset', className: 'ola-clear-button', onClick: this.onClear }) : _react2.default.createElement('button', { type: 'submit', className: 'ola-search-button' });

			return _react2.default.createElement(
				'div',
				{ className: 'ola-search-form-container' },
				_react2.default.createElement('input', {
					ref: 'Input',
					type: 'text',
					value: q,
					className: 'ola-text-input ola-text-input-round',
					onChange: function onChange(event) {
						_onChange.call(_this2, event.target.value);
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
				_react2.default.createElement(_Speech2.default, {
					onResult: function onResult(value, confidence) {

						_onChange.call(_this2, value);
					},
					onFinalResult: function onFinalResult(value) {

						_onChange.call(_this2, value);
					}
				}),
				_react2.default.createElement(_Bookmarks2.default, null)
			);
		}
	}]);

	return Input;
}(_react2.default.Component);

Input.propTypes = {
	q: _react2.default.PropTypes.string,
	onChange: _react2.default.PropTypes.func,
	placeholder: _react2.default.PropTypes.string
};
Input.defaultProps = {
	placeholder: 'Enter keywords'
};
;

module.exports = Input;