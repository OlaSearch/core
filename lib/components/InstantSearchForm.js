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

var _olaTranslate = require('./../decorators/olaTranslate');

var _olaTranslate2 = require('../../.babelhelper.js').interopRequireDefault(_olaTranslate);

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

    _this.onChange = function (arg) {
      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var minCharacters = _this$props.minCharacters;

      var isEvent = !!arg.target;
      var term = isEvent ? arg.target.value : arg;

      dispatch((0, _Search.updateQueryTerm)(term));

      if (isEvent && term && term.length < minCharacters) return;

      !isEvent && _this.refs.Input.focus();

      isEvent ? _this.searchDebounce() : dispatch((0, _Search.executeSearch)());
    };

    _this.onClear = function () {
      var dispatch = _this.props.dispatch;

      setTimeout(function () {
        return _this.refs.Input.focus();
      }, 100);
      dispatch((0, _Search.clearQueryTerm)());
      dispatch((0, _Search.executeSearch)());
    };

    _this.onSubmit = function (event) {
      return event.preventDefault();
    };

    var config = context.config;
    var _config$searchTimeout = config.searchTimeoutMobile;
    var searchTimeoutMobile = _config$searchTimeout === undefined ? 0 : _config$searchTimeout;
    var _config$searchTimeOut = config.searchTimeOut;
    var searchTimeOut = _config$searchTimeOut === undefined ? 0 : _config$searchTimeOut;

    var searchDelay = props.isPhone ? searchTimeoutMobile : searchTimeOut;
    _this.searchDebounce = (0, _utilities.debounce)(function () {
      return props.dispatch((0, _Search.executeSearch)());
    }, searchDelay);
    return _this;
  }

  require('../../.babelhelper.js').createClass(InstantSearchForm, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var q = _props.q;
      var showGeoLocation = _props.showGeoLocation;
      var showBookmarks = _props.showBookmarks;
      var showHistory = _props.showHistory;
      var translate = _props.translate;


      var button = q ? _react2['default'].createElement('button', { type: 'button', className: 'ola-clear-button', onClick: this.onClear, 'aria-label': 'Clear' }) : _react2['default'].createElement('button', { type: 'button', className: 'ola-search-button', onClick: this.onClear, 'aria-label': 'Submit' });

      return _react2['default'].createElement(
        'form',
        { className: 'ola-search-form', onSubmit: this.onSubmit },
        _react2['default'].createElement(
          'div',
          { className: 'ola-search-form-container' },
          _react2['default'].createElement('input', {
            ref: 'Input',
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
          showBookmarks && _ref,
          showGeoLocation && _react2['default'].createElement(_GeoLocation2['default'], {
            active: false,
            onSuccess: this.props.onGeoLocationSuccess,
            onFailure: this.props.onGeoLocationFailure,
            onDisable: this.props.onGeoLocationDisable,
            onError: this.props.onGeoError
          }),
          showHistory && _react2['default'].createElement(_History2['default'], { searchUrl: this.props.searchUrl }),
          _react2['default'].createElement(_Speech2['default'], {
            onResult: this.onChange,
            onFinalResult: this.onChange,
            isInstantSearch: true
          })
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
  isPhone: false
};
InstantSearchForm.contextTypes = {
  config: _react2['default'].PropTypes.object
};


module.exports = (0, _olaTranslate2['default'])(InstantSearchForm);