'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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

var _OlaTranslate = require('./../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _Zone = require('./Zone');

var _Zone2 = _interopRequireDefault(_Zone);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Settings = require('./../constants/Settings');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * 1. Debounces search for Mobile devices for better performance: Delay can be configured in config file
 *
 */
var _ref = _react2['default'].createElement(_Bookmarks2['default'], null);

var InstantSearchForm = function (_React$Component) {
  (0, _inherits3['default'])(InstantSearchForm, _React$Component);

  function InstantSearchForm(props, context) {
    (0, _classCallCheck3['default'])(this, InstantSearchForm);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (InstantSearchForm.__proto__ || (0, _getPrototypeOf2['default'])(InstantSearchForm)).call(this, props));

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

    var config = context.config;
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

  (0, _createClass3['default'])(InstantSearchForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) this.refs.Input.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          q = _props.q,
          showGeoLocation = _props.showGeoLocation,
          showBookmarks = _props.showBookmarks,
          showHistory = _props.showHistory,
          showZone = _props.showZone,
          showSpeech = _props.showSpeech,
          translate = _props.translate,
          placeholder = _props.placeholder;


      var button = q ? _react2['default'].createElement('button', {
        type: 'button',
        className: 'ola-clear-button',
        onClick: this.onClear,
        'aria-label': 'Clear'
      }) : _react2['default'].createElement('button', {
        type: 'button',
        className: 'ola-search-button',
        onClick: this.onClear,
        'aria-label': 'Submit'
      });

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
          showZone && _react2['default'].createElement(_Zone2['default'], { onChange: this.onChangeZone }),
          _react2['default'].createElement('input', {
            ref: 'Input',
            type: 'text',
            className: 'ola-text-input ola-text-input-round',
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
          showBookmarks ? _ref : null,
          showGeoLocation ? _react2['default'].createElement(_GeoLocation2['default'], {
            active: false,
            onSuccess: this.props.onGeoLocationSuccess,
            onFailure: this.props.onGeoLocationFailure,
            onDisable: this.props.onGeoLocationDisable,
            onError: this.props.onGeoError
          }) : null,
          showHistory ? _react2['default'].createElement(_History2['default'], { searchUrl: this.props.searchUrl }) : null,
          showSpeech ? _react2['default'].createElement(_Speech2['default'], {
            onResult: this.onSpeechChange,
            onFinalResult: this.onSpeechChange,
            isInstantSearch: true
          }) : null,
          button
        )
      );
    }
  }]);
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
InstantSearchForm.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
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
})((0, _OlaTranslate2['default'])(InstantSearchForm));