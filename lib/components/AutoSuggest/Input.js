'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Bookmarks = require('./../Bookmarks');

var _Bookmarks2 = _interopRequireDefault(_Bookmarks);

var _History = require('./../History');

var _History2 = _interopRequireDefault(_History);

var _Speech = require('./../Speech');

var _Speech2 = _interopRequireDefault(_Speech);

var _Zone = require('./../Zone');

var _Zone2 = _interopRequireDefault(_Zone);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Settings = require('./../../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Input = function (_React$Component) {
  (0, _inherits3['default'])(Input, _React$Component);

  function Input() {
    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onClear = function (event) {
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
    }, _this.onChangeZone = function () {
      _this.refs.Input.focus();
    }, _this.onKeyDown = function (event) {
      var _this$props = _this.props,
          onKeyDown = _this$props.onKeyDown,
          onSubmit = _this$props.onSubmit,
          isOpen = _this$props.isOpen,
          q = _this$props.q;

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
    }, _this.handleInputChange = function (arg, searchInput) {
      _this.props.onChange(arg.target ? arg.target.value : arg, searchInput);
    }, _this.handleSpeechChange = function (text) {
      _this.handleInputChange(text, _Settings.SEARCH_INPUTS.VOICE);
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  Input.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return nextProps.q !== this.props.q || nextProps.results !== this.props.results;
  };

  Input.prototype.render = function render() {
    var _props = this.props,
        q = _props.q,
        placeholder = _props.placeholder,
        onBlur = _props.onBlur,
        showZone = _props.showZone;

    /**
     * Show clear or submit button
     */

    var button = q ? _react2['default'].createElement('button', {
      type: 'reset',
      className: 'ola-clear-button',
      onClick: this.onClear
    }) : _react2['default'].createElement('button', {
      type: 'button',
      className: 'ola-search-button',
      onClick: this.onSearchButtonClick
    });

    var klass = (0, _classnames2['default'])('ola-search-form-container', {
      'ola-search-zone-enabled': showZone
    });

    return _react2['default'].createElement(
      'div',
      { className: klass },
      showZone && _react2['default'].createElement(_Zone2['default'], { isAutosuggest: true, onChange: this.onChangeZone }),
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
        onResult: this.handleSpeechChange,
        onFinalResult: this.handleSpeechChange,
        isAutosuggest: true
      }),
      _react2['default'].createElement(_Bookmarks2['default'], { onOpen: this.props.handleClose }),
      _react2['default'].createElement(_History2['default'], { onOpen: this.props.handleClose })
    );
  };

  return Input;
}(_react2['default'].Component);

exports['default'] = Input;