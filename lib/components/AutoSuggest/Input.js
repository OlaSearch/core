'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _Bookmarks = require('./../Bookmarks');

var _Bookmarks2 = require('../../../.babelhelper.js').interopRequireDefault(_Bookmarks);

var _History = require('./../History');

var _History2 = require('../../../.babelhelper.js').interopRequireDefault(_History);

var _Speech = require('./../Speech');

var _Speech2 = require('../../../.babelhelper.js').interopRequireDefault(_Speech);

var _ref = _react2['default'].createElement(_Bookmarks2['default'], null);

var _ref2 = _react2['default'].createElement(_History2['default'], null);

var Input = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(Input, _React$Component);

  function Input() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    require('../../../.babelhelper.js').classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Input)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onClear = function (event) {
      event && event.preventDefault();

      /* Do not call blur event when its a button */
      if (event.target.nodeName === 'INPUT' && !event.target.value) {
        event.target.blur();
        _this.props.handleClickOutside(event);
        return;
      }

      /* Clear query term */
      _this.props.onClear();

      /* Focus input */
      _this.refs.Input.focus();
    }, _this.onFocus = function (event) {
      _this.props.onFocus && _this.props.onFocus(event);

      if (!event.target.value) return;

      /* Persist event */
      event.persist();

      setTimeout(function () {
        return _this.props.onChange(event.target.value);
      });
    }, _this.onKeyDown = function (event) {
      var _this$props = _this.props;
      var onKeyDown = _this$props.onKeyDown;
      var onSubmit = _this$props.onSubmit;
      var isOpen = _this$props.isOpen;
      var q = _this$props.q;

      switch (event.which) {

        case 27:
          // Esc
          /**
           * When autosuggest is closed and user presses escape key multiple times,
           * Clear query term
           */
          if (!isOpen) return _this.onClear(event);
          return _this.props.handleClickOutside(event);
        case 38:
          // Up
          /**
           * Escape key closes the autosuggests
           * Once closed, when user presses Arrow up/down, we should show the results
           */
          event.preventDefault();
          if (!isOpen && q) return _this.props.onChange(q);
          return onKeyDown('up');

        case 40:
          // Down
          event.preventDefault();
          if (!isOpen && q) return _this.props.onChange(q);
          return onKeyDown('down');

        case 9:
          // Tab
          break;
        case 13:
          // Enter
          return onSubmit();
      }
    }, _this.onSearchButtonClick = function () {
      return _this.props.onSearchButtonClick ? _this.props.onSearchButtonClick() : _this.refs.Input.focus();
    }, _this.handleInputChange = function (arg) {
      _this.props.onChange(arg.target ? arg.target.value : arg);
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(Input, [{
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

      var button = q ? _react2['default'].createElement('button', { type: 'reset', className: 'ola-clear-button', onClick: this.onClear }) : _react2['default'].createElement('button', { type: 'button', className: 'ola-search-button', onClick: this.onSearchButtonClick });

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
        _ref,
        _ref2
      );
    }
  }]);

  return Input;
}(_react2['default'].Component);

exports['default'] = Input;