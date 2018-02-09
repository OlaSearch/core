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

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Bookmarks = require('./../Bookmarks');

var _Bookmarks2 = _interopRequireDefault(_Bookmarks);

var _Speech = require('./../Speech');

var _Speech2 = _interopRequireDefault(_Speech);

var _Zone = require('./../Zone');

var _Zone2 = _interopRequireDefault(_Zone);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Settings = require('./../../constants/Settings');

var _utilities = require('./../../utilities');

var _InputShadow = require('./InputShadow');

var _InputShadow2 = _interopRequireDefault(_InputShadow);

var _GeoLocation = require('./../Geo/GeoLocation');

var _GeoLocation2 = _interopRequireDefault(_GeoLocation);

var _ContentEditable = require('./../ContentEditable');

var _ContentEditable2 = _interopRequireDefault(_ContentEditable);

var _equals = require('ramda/src/equals');

var _equals2 = _interopRequireDefault(_equals);

var _materialSearch = require('@olasearch/icons/lib/material-search');

var _materialSearch2 = _interopRequireDefault(_materialSearch);

var _x3 = require('@olasearch/icons/lib/x');

var _x4 = _interopRequireDefault(_x3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref3 = _react2['default'].createElement(_x4['default'], null);

var _ref4 = _react2['default'].createElement(_materialSearch2['default'], null);

var Input = function (_React$Component) {
  (0, _inherits3['default'])(Input, _React$Component);

  function Input() {
    var _temp, _this, _ret;

    (0, _classCallCheck3['default'])(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onClear = function (event) {
      /* Focus input */
      _this.props.onClear(function () {
        return _this.input._input.focus();
      });
    }, _this.onFocus = function (event) {
      /* Scroll to input */
      if (_this.props.isPhone) (0, _utilities.scrollTo)(_this.input);

      /* Call onFocus event */
      _this.props.onFocus && _this.props.onFocus(event);

      if (!event.target.value) return;

      /* Persist event */
      event.persist();

      setTimeout(function () {
        return _this.props.onChange(event);
      });
    }, _this.handleMouseDown = function (event) {
      if (!_this.props.q) return;
      event.persist();
      event.stopPropagation();
      /* Check if element already is focused. Only then fire */
      if (document.activeElement === event.target && _this.props.showWordSuggestion) {
        setTimeout(function () {
          return _this.props.onChange(event);
        });
      }
    }, _this.onChangeZone = function () {
      _this.input._input.focus();
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
          // if (!isOpen) return this.onClear(event)
          if (!isOpen) return _this.input._input.select();
          return _this.props.handleClickOutside(event);

        case 39:
          // Right
          /**
           * If fuzzy query, do nothing
           */
          if (event.shiftKey || !_this.getShadowTerm()) return;
          return onKeyDown('down', event);
        // return this.props.onChange(this.getShadowTerm(true))

        case 38:
          // Up
          /**
           * Escape key closes the autosuggests
           * Once closed, when user presses Arrow up/down, we should show the results
           */
          event.preventDefault();
          if (!isOpen && q) return _this.props.onChange(event);
          return onKeyDown('up', event);

        case 40:
          // Down
          event.preventDefault();
          if (!isOpen && q) return _this.props.onChange(event);
          return onKeyDown('down', event);

        case 37:
          return _this.props.onChange(event);

        case 32:
          // Space
          return onKeyDown('space', event);

        case 9:
          // Tab
          return onKeyDown('tab', event);

        case 13:
          // Enter
          event.preventDefault(); // Prevents firing onChange
          return onSubmit();
      }
    }, _this.onSearchButtonClick = function () {
      return _this.props.onSearchButtonClick ? _this.props.onSearchButtonClick() : _this.input.focus();
    }, _this.handleInputChange = function (arg, searchInput) {
      _this.props.onChange(arg, searchInput);

      /* Check if tokens have been changed */

      var _this$formatValue = _this.formatValue(arg.target.value, true),
          oldTokens = _this$formatValue[0],
          newTokens = _this$formatValue[1];

      if (!newTokens || !(0, _equals2['default'])(oldTokens, newTokens)) {
        setTimeout(function () {
          return _this.props.onTokenChange(newTokens);
        });
      }
    }, _this.handleSpeechChange = function (text) {
      _this.handleInputChange(text, _Settings.SEARCH_INPUTS.VOICE);
      _this.props.onSubmit();
    }, _this.getShadowTerm = function () {
      var raw = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$props2 = _this.props,
          fuzzyQuery = _this$props2.fuzzyQuery,
          q = _this$props2.q,
          results = _this$props2.results;

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
    }, _this.formatValue = function (value) {
      var returnTokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!value) return '';
      var tokens = _this.props.fuzzyTokens || _this.props.tokens;
      var terms = tokens.map(function (_ref) {
        var value = _ref.value;
        return value;
      }).concat().sort(_utilities.sortArrayByLength);

      /* If no tokens, return value */
      if (!terms.length) return value;

      /* Raw value */
      var rawValue = value;

      /* Token regex */
      var regX = new RegExp('(' + terms.join('|').replace(/(\(|\))/gi, '\\$1') + ')', 'gi');
      var newTokens = [];
      value = value.replace(regX, function (match, startToken) {
        var escapedMatch = match.replace(/(\(|\))/gi, '\\$1');
        /* Add to list of token */
        returnTokens && newTokens.push(match);
        var name = tokens.filter(function (_ref2) {
          var value = _ref2.value;

          return value.match(new RegExp('^' + escapedMatch + '$', 'gi'));
        }).reduce(function (acc, o) {
          return o.name;
        }, null);
        if (!name) return match;
        var color = (0, _utilities.hexToRGBa)((0, _utilities.stringToColor)(name));
        return '<span class=\'ola-input-tag\'>' + match + '</span>';
      });

      return returnTokens ? [terms, newTokens] : (0, _utilities.highlightTokens)(rawValue, tokens);
    }, _temp), (0, _possibleConstructorReturn3['default'])(_this, _ret);
  }

  Input.prototype.render = function render() {
    var _props = this.props,
        q = _props.q,
        placeholder = _props.placeholder,
        onBlur = _props.onBlur,
        showZone = _props.showZone,
        showGeoLocation = _props.showGeoLocation,
        showWordSuggestion = _props.showWordSuggestion;


    var klass = (0, _classnames2['default'])('ola-search-form-container', {
      'ola-search-zone-enabled': showZone
    });
    var shadowTerm = showWordSuggestion ? '' : this.getShadowTerm();
    return _react2['default'].createElement(
      'div',
      {
        className: _style2['default'].dynamic([['2773465320', [this.props.theme.primaryColor, this.props.theme.primaryColor]]]) + ' ' + (klass || '')
      },
      showZone && _react2['default'].createElement(_Zone2['default'], { isAutosuggest: true, onChange: this.onChangeZone }),
      _react2['default'].createElement(
        'div',
        {
          className: _style2['default'].dynamic([['2773465320', [this.props.theme.primaryColor, this.props.theme.primaryColor]]]) + ' ' + 'ola-form-input-wrapper'
        },
        _react2['default'].createElement(_ContentEditable2['default'], {
          ref: this.registerRef,
          type: 'text',
          value: q,
          className: 'ola-text-input',
          onChange: this.handleInputChange,
          onFocus: this.onFocus,
          onBlur: onBlur,
          autoComplete: 'off',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          spellCheck: 'false',
          placeholder: placeholder,
          onKeyDown: this.onKeyDown,
          autoFocus: this.props.autoFocus,
          formatValue: this.formatValue,
          onMouseDown: this.handleMouseDown
        }),
        _react2['default'].createElement(_InputShadow2['default'], { value: shadowTerm })
      ),
      q && _react2['default'].createElement(
        'button',
        {
          type: 'button',

          tabIndex: '-1',
          onClick: this.onClear,
          'aria-label': 'Clear Search',
          className: _style2['default'].dynamic([['2773465320', [this.props.theme.primaryColor, this.props.theme.primaryColor]]]) + ' ' + 'ola-clear-button'
        },
        _ref3
      ),
      this.props.showAlert && null,
      showGeoLocation ? _react2['default'].createElement(_GeoLocation2['default'], {
        active: false,
        onSuccess: this.props.onGeoLocationSuccess,
        onDisable: this.props.onGeoLocationDisable,
        refreshOnGeoChange: this.props.refreshOnGeoChange,
        onError: this.props.onGeoError
      }) : null,
      _react2['default'].createElement(_Speech2['default'], {
        onResult: this.handleSpeechChange,
        onFinalResult: this.handleSpeechChange,
        isAutosuggest: true
      }),
      _react2['default'].createElement(_Bookmarks2['default'], { onOpen: this.props.handleClose }),
      _react2['default'].createElement(
        'button',
        {
          type: 'button',

          onClick: this.onSearchButtonClick,
          'aria-label': 'Search',
          className: _style2['default'].dynamic([['2773465320', [this.props.theme.primaryColor, this.props.theme.primaryColor]]]) + ' ' + 'ola-search-button'
        },
        _ref4
      ),
      _react2['default'].createElement(_style2['default'], {
        styleId: '2773465320',
        css: '.ola-search-button.__jsx-style-dynamic-selector,.ola-search-button.__jsx-style-dynamic-selector:hover,.ola-search-button.__jsx-style-dynamic-selector:active,.ola-search-button.__jsx-style-dynamic-selector:focus{background:' + this.props.theme.primaryColor + ';border-color:' + this.props.theme.primaryColor + ';}',
        dynamic: [this.props.theme.primaryColor, this.props.theme.primaryColor]
      })
    );
  };

  return Input;
}(_react2['default'].Component);

exports['default'] = Input;