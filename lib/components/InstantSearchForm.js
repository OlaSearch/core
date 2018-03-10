'use strict';

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

var _Search = require('./../actions/Search');

var _Bookmarks = require('./Bookmarks');

var _Bookmarks2 = _interopRequireDefault(_Bookmarks);

var _History = require('./History');

var _History2 = _interopRequireDefault(_History);

var _Speech = require('./Speech');

var _Speech2 = _interopRequireDefault(_Speech);

var _utilities = require('./../utilities');

var _GeoLocation = require('./Geo/GeoLocation');

var _GeoLocation2 = _interopRequireDefault(_GeoLocation);

var _withTranslate = require('./../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _withConfig = require('./../decorators/withConfig');

var _withConfig2 = _interopRequireDefault(_withConfig);

var _Zone = require('./Zone');

var _Zone2 = _interopRequireDefault(_Zone);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Settings = require('./../constants/Settings');

var _reactRedux = require('react-redux');

var _materialSearch = require('@olasearch/icons/lib/material-search');

var _materialSearch2 = _interopRequireDefault(_materialSearch);

var _x = require('@olasearch/icons/lib/x');

var _x2 = _interopRequireDefault(_x);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * 1. Debounces search for Mobile devices for better performance: Delay can be configured in config file
 *
 */
var _ref = _react2['default'].createElement(_x2['default'], null);

var _ref2 = _react2['default'].createElement(_materialSearch2['default'], null);

var _ref3 = _react2['default'].createElement(_Bookmarks2['default'], null);

var InstantSearchForm = function (_React$Component) {
  (0, _inherits3['default'])(InstantSearchForm, _React$Component);

  function InstantSearchForm(props) {
    (0, _classCallCheck3['default'])(this, InstantSearchForm);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.onChange = function (arg, searchInput) {
      var _this$props = _this.props,
          updateQueryTerm = _this$props.updateQueryTerm,
          minCharacters = _this$props.minCharacters;

      var isEvent = !!arg.target;
      var term = isEvent ? arg.target.value : arg;

      /* Trim */
      if (term.length && (0, _utilities.trim)(term) === '') return;

      updateQueryTerm(term, searchInput);

      if (isEvent && term && term.length < minCharacters) return;

      !isEvent && _this.refs.Input.focus();

      isEvent ? _this.searchDebounce() : _this.executeSearch();
    };

    _this.onSpeechChange = function (text) {
      _this.onChange(text, _Settings.SEARCH_INPUTS.VOICE);
    };

    _this.onClear = function () {
      setTimeout(function () {
        return _this.refs.Input.focus();
      }, 100);
      _this.props.clearQueryTerm();
      _this.executeSearch();
    };

    _this.onSubmit = function (event) {
      return event.preventDefault();
    };

    _this.onChangeZone = function () {
      _this.refs.Input.focus();

      if (_this.props.onChangeZone) return _this.props.onChangeZone();
      if (_this.props.q) _this.executeSearch();
    };

    var config = props.config;
    var _config$searchTimeout = config.searchTimeoutMobile,
        searchTimeoutMobile = _config$searchTimeout === undefined ? 0 : _config$searchTimeout,
        _config$searchTimeout2 = config.searchTimeout,
        searchTimeout = _config$searchTimeout2 === undefined ? 0 : _config$searchTimeout2;

    var searchDelay = props.isPhone ? searchTimeoutMobile : searchTimeout;
    /**
     * Add url Sync option
     */
    _this.executeSearch = function () {
      return props.executeSearch({
        urlSync: props.urlSync
      });
    };
    /**
     * Debounce search
     */
    _this.searchDebounce = (0, _utilities.debounce)(_this.executeSearch, searchDelay);
    return _this;
  }

  InstantSearchForm.prototype.componentDidMount = function componentDidMount() {
    if (this.props.autoFocus) this.refs.Input.focus();
  };

  InstantSearchForm.prototype.render = function render() {
    var _props = this.props,
        q = _props.q,
        showGeoLocation = _props.showGeoLocation,
        showBookmarks = _props.showBookmarks,
        showHistory = _props.showHistory,
        showZone = _props.showZone,
        showSpeech = _props.showSpeech,
        translate = _props.translate,
        placeholder = _props.placeholder;


    var button = q ? _react2['default'].createElement(
      'button',
      {
        type: 'button',
        className: 'ola-clear-button',
        onClick: this.onClear,
        'aria-label': 'Clear'
      },
      _ref
    ) : _react2['default'].createElement(
      'button',
      {
        type: 'button',
        className: 'ola-search-button',
        onClick: this.onClear,
        'aria-label': 'Submit'
      },
      _ref2
    );

    var klass = (0, _classnames2['default'])('ola-search-form', this.props.className, {
      'ola-search-zone-enabled': showZone,
      'ola-speech-not-supported': !(window.SpeechRecognition || window.webkitSpeechRecognition)
    });

    var _placeholder = placeholder || translate('instantsearch_placeholder');

    return _react2['default'].createElement(
      'form',
      { className: klass, onSubmit: this.onSubmit },
      _react2['default'].createElement(
        'div',
        { className: 'ola-search-form-container' },
        _react2['default'].createElement(
          'div',
          { className: 'ola-form-input-wrapper' },
          showZone && _react2['default'].createElement(_Zone2['default'], { onChange: this.onChangeZone }),
          _react2['default'].createElement('input', {
            ref: 'Input',
            type: 'text',
            className: 'ola-text-input',
            placeholder: _placeholder,
            value: q,
            'aria-label': 'Search input',
            autoComplete: 'off',
            autoCorrect: 'off',
            autoCapitalize: 'off',
            spellCheck: 'false',
            onFocus: this.props.onFocus,
            onBlur: this.props.onBlur,
            onChange: this.onChange
          }),
          showBookmarks ? _ref3 : null,
          showGeoLocation ? _react2['default'].createElement(_GeoLocation2['default'], {
            active: false,
            onSuccess: this.props.onGeoLocationSuccess,
            onFailure: this.props.onGeoLocationFailure,
            onDisable: this.props.onGeoLocationDisable,
            onError: this.props.onGeoError
          }) : null,
          showSpeech ? _react2['default'].createElement(_Speech2['default'], {
            onResult: this.onSpeechChange,
            onFinalResult: this.onSpeechChange,
            isInstantSearch: true
          }) : null
        ),
        button
      )
    );
  };

  return InstantSearchForm;
}(_react2['default'].Component);

InstantSearchForm.defaultProps = {
  minCharacters: 0,
  showGeoLocation: false,
  showBookmarks: true,
  showHistory: true,
  showSpeech: true,
  showZone: false,
  isPhone: false,
  urlSync: true,
  autoFocus: false,
  className: null
};


function mapStateToProps(state) {
  return {
    q: state.QueryState.q
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, {
  updateQueryTerm: _Search.updateQueryTerm,
  executeSearch: _Search.executeSearch,
  clearQueryTerm: _Search.clearQueryTerm
})((0, _withConfig2['default'])((0, _withTranslate2['default'])(InstantSearchForm)));