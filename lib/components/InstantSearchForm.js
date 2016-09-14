'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _Search = require('./../actions/Search');

var _Bookmarks = require('./Bookmarks');

var _Bookmarks2 = require('../../.babelhelper.js').interopRequireDefault(_Bookmarks);

var _History = require('./History');

var _History2 = require('../../.babelhelper.js').interopRequireDefault(_History);

var _Speech = require('./Speech');

var _Speech2 = require('../../.babelhelper.js').interopRequireDefault(_Speech);

var _utilities = require('./../utilities');

var _GeoLocation = require('./Geo/GeoLocation');

var _GeoLocation2 = require('../../.babelhelper.js').interopRequireDefault(_GeoLocation);

var _OlaTranslate = require('./../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var _Zone = require('./Zone');

var _Zone2 = require('../../.babelhelper.js').interopRequireDefault(_Zone);

var _classnames = require('classnames');

var _classnames2 = require('../../.babelhelper.js').interopRequireDefault(_classnames);

var _Settings = require('./../constants/Settings');

var _reactRedux = require('react-redux');

/**
 * 1. Debounces search for Mobile devices for better performance: Delay can be configured in config file
 *
 */
var _ref = _react2['default'].createElement(_Bookmarks2['default'], null);

var InstantSearchForm = function (_React$Component) {
  require('../../.babelhelper.js').inherits(InstantSearchForm, _React$Component);

  function InstantSearchForm(props, context) {
    require('../../.babelhelper.js').classCallCheck(this, InstantSearchForm);

    var _this = require('../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(InstantSearchForm).call(this, props));

    _this.onChange = function (arg, searchInput) {
      var _this$props = _this.props;
      var updateQueryTerm = _this$props.updateQueryTerm;
      var minCharacters = _this$props.minCharacters;

      var isEvent = !!arg.target;
      var term = isEvent ? arg.target.value : arg;

      /* Trim */
      if (term.length && (0, _utilities.trim)(term) === '') return;

      updateQueryTerm(term, searchInput);

      if (isEvent && term && term.length < minCharacters) return;

      !isEvent && _this.Input.focus();

      isEvent ? _this.searchDebounce() : _this.executeSearch();
    };

    _this.onSpeechChange = function (text) {
      _this.onChange(text, _Settings.SEARCH_INPUTS.VOICE);
    };

    _this.onClear = function () {
      setTimeout(function () {
        return _this.Input.focus();
      }, 100);
      _this.props.clearQueryTerm();
      _this.executeSearch();
    };

    _this.onSubmit = function (event) {
      return event.preventDefault();
    };

    _this.onChangeZone = function () {
      _this.Input.focus();

      if (_this.props.onChangeZone) return _this.props.onChangeZone();
      if (_this.props.q) _this.executeSearch();
    };

    var config = context.config;
    var _config$searchTimeout = config.searchTimeoutMobile;
    var searchTimeoutMobile = _config$searchTimeout === undefined ? 0 : _config$searchTimeout;
    var _config$searchTimeOut = config.searchTimeOut;
    var searchTimeOut = _config$searchTimeOut === undefined ? 0 : _config$searchTimeOut;

    var searchDelay = props.isPhone ? searchTimeoutMobile : searchTimeOut;
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

  require('../../.babelhelper.js').createClass(InstantSearchForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) this.Input.focus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var q = _props.q;
      var showGeoLocation = _props.showGeoLocation;
      var showBookmarks = _props.showBookmarks;
      var showHistory = _props.showHistory;
      var showZone = _props.showZone;
      var showSpeech = _props.showSpeech;
      var translate = _props.translate;


      var button = q ? _react2['default'].createElement('button', { type: 'button', className: 'ola-clear-button', onClick: this.onClear, 'aria-label': 'Clear' }) : _react2['default'].createElement('button', { type: 'button', className: 'ola-search-button', onClick: this.onClear, 'aria-label': 'Submit' });

      var klass = (0, _classnames2['default'])('ola-search-form', {
        'ola-search-zone-enabled': showZone,
        'ola-speech-not-supported': !(window.SpeechRecognition || window.webkitSpeechRecognition)
      });

      return _react2['default'].createElement(
        'form',
        { className: klass, onSubmit: this.onSubmit },
        _react2['default'].createElement(
          'div',
          { className: 'ola-search-form-container' },
          showZone && _react2['default'].createElement(_Zone2['default'], {
            onChange: this.onChangeZone
          }),
          _react2['default'].createElement('input', {
            ref: function ref(c) {
              _this2.Input = c;
            },
            type: 'text',
            className: 'ola-text-input ola-text-input-round',
            placeholder: translate('instantsearch_placeholder'),
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
          button,
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
          }) : null
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
  autoFocus: false
};
InstantSearchForm.contextTypes = {
  config: _react2['default'].PropTypes.object
};


function mapStateToProps(state) {
  return {
    q: state.QueryState.q
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { updateQueryTerm: _Search.updateQueryTerm, executeSearch: _Search.executeSearch, clearQueryTerm: _Search.clearQueryTerm })((0, _OlaTranslate2['default'])(InstantSearchForm));