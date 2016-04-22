'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Bookmarks = require('./../Bookmarks');

var _Bookmarks2 = _interopRequireDefault(_Bookmarks);

var _History = require('./../History');

var _History2 = _interopRequireDefault(_History);

var _Speech = require('./../Speech');

var _Speech2 = _interopRequireDefault(_Speech);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Input)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onClear = function (event) {
      event && event.preventDefault();

      /* Do not call blur event when its a button */
      if (event.target.nodeName === 'INPUT' && !event.target.value) {
        event.target.blur();
        _this.props.handleClickOutside(event);
        return;
      }

      _this.props.onClear();

      setTimeout(function () {
        return _this.refs.Input.focus();
      }, 0);
    }, _this.onFocus = function (event) {
      _this.props.onFocus && _this.props.onFocus(event);

      if (!event.target.value) return;

      _this.props.onChange(event.target.value);
    }, _this.onKeyDown = function (event) {
      var _this$props = _this.props;
      var onMove = _this$props.onMove;
      var onSubmit = _this$props.onSubmit;


      switch (event.which) {

        case 27:
          // Esc
          _this.onClear(event);
          break;
        case 38:
          // Up
          onMove('up');
          break;

        case 40:
          // Down
          onMove('down');
          break;

        case 9:
          // Tab
          break;
        case 13:
          // Enter
          onSubmit();
          break;
      }
    }, _this.onSearchButtonClick = function () {
      _this.refs.Input.focus();
    }, _this.handleInputChange = function (arg) {
      _this.props.onChange(arg.target ? arg.target.value : arg);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Input, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.q !== this.props.q;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var q = _props.q;
      var placeholder = _props.placeholder;
      var onBlur = _props.onBlur;

      /* Show clear or submit button */

      var button = q ? _react2['default'].createElement('button', { type: 'reset', className: 'ola-btn ola-clear-button', onClick: this.onClear }) : _react2['default'].createElement('button', { type: 'button', className: 'ola-btn ola-search-button', onClick: this.onSearchButtonClick });

      return _react2['default'].createElement(
        'div',
        { className: 'ola-search-form-container' },
        _react2['default'].createElement('input', {
          ref: 'Input',
          type: 'text',
          value: q,
          className: 'ola-text-input ola-text-input-round',
          onChange: this.handleInputChange,
          onFocus: this.onFocus,
          onBlur: onBlur,
          autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          spellCheck: 'false',
          placeholder: placeholder,
          onKeyDown: this.onKeyDown
        }),
        button,
        _react2['default'].createElement(_Speech2['default'], {
          onResult: this.handleInputChange,
          onFinalResult: this.handleInputChange
        }),
        _react2['default'].createElement(_Bookmarks2['default'], null),
        _react2['default'].createElement(_History2['default'], null)
      );
    }
  }]);

  return Input;
}(_react2['default'].Component);

Input.propTypes = {
  q: _react2['default'].PropTypes.string,
  onChange: _react2['default'].PropTypes.func
};


module.exports = Input;