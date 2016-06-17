'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var _olaTranslate = require('./../decorators/olaTranslate');

var _olaTranslate2 = _interopRequireDefault(_olaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var _ref = _react2['default'].createElement(_Bookmarks2['default'], null);

var InstantSearchForm = function (_React$Component) {
  _inherits(InstantSearchForm, _React$Component);

  function InstantSearchForm(props, context) {
    _classCallCheck(this, InstantSearchForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InstantSearchForm).call(this, props));

    _this.onChange = function (arg) {
      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var minCharacters = _this$props.minCharacters;

      var isEvent = !!arg.target;
      var term = isEvent ? arg.target.value : arg;

      dispatch((0, _Search.updateQueryTerm)(term));

      if (isEvent && term && term.length < minCharacters) return;

      !isEvent && _this.refs.Input.focus();

      isEvent ? _this.instantSearchDebounce() : dispatch((0, _Search.executeSearch)());
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

    _this.instantSearchDebounce = (0, _utilities.debounce)(function () {
      return _this.props.dispatch((0, _Search.executeSearch)());
    }, context.config.searchTimeOut);
    return _this;
  }

  _createClass(InstantSearchForm, [{
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
            'aria-label': 'searchInput',
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
            onFinalResult: this.onChange
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
  showHistory: true
};
InstantSearchForm.contextTypes = {
  config: _react2['default'].PropTypes.object
};


module.exports = (0, _olaTranslate2['default'])(InstantSearchForm);