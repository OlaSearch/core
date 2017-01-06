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

var _Zone = require('./../Zone');

var _Zone2 = require('../../../.babelhelper.js').interopRequireDefault(_Zone);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _Settings = require('./../../constants/Settings');

var _utilities = require('./../../utilities');

var _InputShadow = require('./InputShadow');

var _InputShadow2 = require('../../../.babelhelper.js').interopRequireDefault(_InputShadow);

var _GeoLocation = require('./../Geo/GeoLocation');

var _GeoLocation2 = require('../../../.babelhelper.js').interopRequireDefault(_GeoLocation);

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
      // event && event.preventDefault()

      // /* Do not call blur event when its a button */
      // if (event.target.nodeName === 'INPUT' && !event.target.value) {
      //   event.target.blur()
      //   this.props.handleClickOutside(event)
      //   return
      // }

      /* Clear query term */
      _this.props.onClear();

      /* Focus input */
      _this.input.focus();
    }, _this.onFocus = function (event) {
      /* Scroll to input */
      if (_this.props.isPhone) (0, _utilities.scrollTo)(_this.input);

      /* Call onFocus event */
      _this.props.onFocus && _this.props.onFocus(event);

      if (!event.target.value) return;

      /* Persist event */
      event.persist();

      setTimeout(function () {
        return _this.props.onChange(event.target.value);
      });
    }, _this.onChangeZone = function () {
      _this.input.focus();
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
          // if (!isOpen) return this.onClear(event)
          if (!isOpen) return _this.input.select();
          return _this.props.handleClickOutside(event);

        case 39:
          // Right
          /**
           * If fuzzy query, do nothing
           */
          if (event.shiftKey || !_this.getShadowTerm()) return;
          return onKeyDown('down');
        // return this.props.onChange(this.getShadowTerm(true))

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
          _this.props.onBlur && _this.props.onBlur(event);
          break;
        case 13:
          // Enter
          event.preventDefault(); // Prevents firing onChange
          return onSubmit();
      }
    }, _this.onSearchButtonClick = function () {
      return _this.props.onSearchButtonClick ? _this.props.onSearchButtonClick() : _this.input.focus();
    }, _this.handleInputChange = function (arg, searchInput) {
      _this.props.onChange(arg.target ? arg.target.value : arg, searchInput);
    }, _this.handleSpeechChange = function (text) {
      _this.handleInputChange(text, _Settings.SEARCH_INPUTS.VOICE);
      _this.props.onSubmit();
    }, _this.getShadowTerm = function () {
      var raw = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
      var _this$props2 = _this.props;
      var fuzzyQuery = _this$props2.fuzzyQuery;
      var q = _this$props2.q;
      var results = _this$props2.results;

      var shadowTerm = !fuzzyQuery && q && results.length ? results[0].term : '';
      if (!q) return '';
      var reg = new RegExp('^' + (0, _utilities.escapeRegEx)(q), 'gi');
      if (!reg.test(shadowTerm) || shadowTerm === q) {
        return '';
      } else {
        return raw ? shadowTerm : shadowTerm.replace(new RegExp('(' + (0, _utilities.escapeRegEx)(q) + ')', 'gi'), q);
      }
    }, _this.registerRef = function (input) {
      _this.input = input;
    }, _temp), require('../../../.babelhelper.js').possibleConstructorReturn(_this, _ret);
  }

  require('../../../.babelhelper.js').createClass(Input, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var q = _props.q;
      var placeholder = _props.placeholder;
      var onBlur = _props.onBlur;
      var showZone = _props.showZone;
      var showGeoLocation = _props.showGeoLocation;


      var klass = (0, _classnames2['default'])('ola-search-form-container', {
        'ola-search-zone-enabled': showZone
      });
      var shadowTerm = this.getShadowTerm();

      return _react2['default'].createElement(
        'div',
        { className: klass },
        showZone && _react2['default'].createElement(_Zone2['default'], {
          isAutosuggest: true,
          onChange: this.onChangeZone
        }),
        _react2['default'].createElement(
          'div',
          { className: 'ola-form-input-wrapper' },
          _react2['default'].createElement('input', {
            ref: this.registerRef,
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
            onKeyDown: this.onKeyDown,
            autoFocus: this.props.autoFocus
          }),
          _react2['default'].createElement(_InputShadow2['default'], {
            value: shadowTerm
          })
        ),
        q && _react2['default'].createElement('button', { type: 'button', className: 'ola-clear-button', onClick: this.onClear }),
        showGeoLocation ? _react2['default'].createElement(_GeoLocation2['default'], {
          active: false,
          onSuccess: this.props.onGeoLocationSuccess,
          onFailure: this.props.onGeoLocationFailure,
          onDisable: this.props.onGeoLocationDisable,
          onError: this.props.onGeoError
        }) : null,
        _react2['default'].createElement(_Speech2['default'], {
          onResult: this.handleSpeechChange,
          onFinalResult: this.handleSpeechChange,
          isAutosuggest: true
        }),
        _react2['default'].createElement(_History2['default'], { onOpen: this.props.handleClose }),
        _react2['default'].createElement(_Bookmarks2['default'], { onOpen: this.props.handleClose }),
        _react2['default'].createElement('button', { type: 'button', className: 'ola-search-button', onClick: this.onSearchButtonClick })
      );
    }
  }]);

  return Input;
}(_react2['default'].Component);

exports['default'] = Input;