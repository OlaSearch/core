'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _AutoSuggest = require('./../../actions/AutoSuggest');

var _SearchResults = require('./../SearchResults');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _TermSuggestion = require('./../SpellSuggestions/TermSuggestion');

var _TermSuggestion2 = _interopRequireDefault(_TermSuggestion);

var _SpellSuggestion = require('./../SpellSuggestions/SpellSuggestion');

var _SpellSuggestion2 = _interopRequireDefault(_SpellSuggestion);

var _FacetSuggestion = require('./FacetSuggestion');

var _FacetSuggestion2 = _interopRequireDefault(_FacetSuggestion);

var _urlSync = require('./../../services/urlSync');

var _domScrollIntoView = require('dom-scroll-into-view');

var _domScrollIntoView2 = _interopRequireDefault(_domScrollIntoView);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoSuggest = function (_React$Component) {
  _inherits(AutoSuggest, _React$Component);

  function AutoSuggest(props) {
    _classCallCheck(this, AutoSuggest);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AutoSuggest).call(this, props));

    _this.handleClickOutside = function (event) {
      var isOpen = _this.props.AutoSuggest.isOpen;
      var dispatch = _this.props.dispatch;


      if (isOpen) {
        dispatch((0, _AutoSuggest.closeAutoSuggest)());
      }

      _this.onBlur();
    };

    _this.onChange = function (term) {
      var dispatch = _this.props.dispatch;


      if (!term) return dispatch((0, _AutoSuggest.clearQueryTerm)());

      dispatch((0, _AutoSuggest.updateQueryTerm)(term));

      dispatch((0, _AutoSuggest.executeAutoSuggest)());
    };

    _this.onClear = function () {
      _this.props.dispatch((0, _AutoSuggest.clearQueryTerm)());
    };

    _this.clearActiveClass = function (nodes, className) {
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].classList.remove(className);
      }
    };

    _this.onKeyDown = function (direction) {
      var _this$props = _this.props;
      var classNames = _this$props.classNames;
      var activeClassName = _this$props.activeClassName;
      var suggestionsContainer = _this.refs.suggestionsContainer;

      var fullActiveClass = '.' + activeClassName;
      var nodes = suggestionsContainer.querySelectorAll(classNames);

      if (!nodes.length) return;

      var target = suggestionsContainer.querySelector(fullActiveClass);
      var index = target ? [].indexOf.call(nodes, target) : -1;
      var next = void 0;

      switch (direction) {
        case 'up':
          _this.clearActiveClass(nodes, activeClassName);
          next = nodes[Math.max(0, --index)];
          next.classList.add(activeClassName);
          break;

        case 'down':
          _this.clearActiveClass(nodes, activeClassName);
          next = nodes[Math.min(nodes.length - 1, ++index)];
          next.classList.add(activeClassName);
          break;
      }

      (0, _domScrollIntoView2['default'])(next, suggestionsContainer, {
        onlyScrollIfNeeded: true
      });
    };

    _this.onSubmit = function (event) {
      /* Check if there is active class */

      var target = _this.refs.suggestionsContainer.querySelector('.' + _this.props.activeClassName);

      if (target) {
        var linkTarget = target.nodeName === 'A' ? target : target.querySelector('a');
        if (linkTarget) linkTarget.click();

        return;
      }

      _this.handleViewAll();

      event && event.preventDefault();
    };

    _this.handleViewAll = function () {
      var _this$props$AutoSugge = _this.props.AutoSuggest.query;
      var q = _this$props$AutoSugge.q;
      var facet_query = _this$props$AutoSugge.facet_query;
      var _this$props2 = _this.props;
      var dispatch = _this$props2.dispatch;
      var onSubmit = _this$props2.onSubmit;
      var _this$context$config = _this.context.config;
      var searchPageUrl = _this$context$config.searchPageUrl;
      var history = _this$context$config.history;

      /* Close autosuggest */

      dispatch((0, _AutoSuggest.closeAutoSuggest)());

      if (onSubmit) return onSubmit(q);

      /* Redirect to search results page */
      window.location.href = searchPageUrl + (0, _urlSync.getHistoryCharacter)(history) + (0, _urlSync.buildQueryString)({ q: q, facet_query: facet_query });
    };

    _this.onFocus = function (event) {
      _this.setState({
        isFocused: true
      });

      _this.props.onFocus && _this.props.onFocus(event);
    };

    _this.onBlur = function (event) {
      _this.setState({
        isFocused: false
      });

      _this.props.onBlur && _this.props.onBlur(event);
    };

    _this.state = {
      isFocused: false
    };

    /**
     * Invariants
     */
    props.showFacetSuggestions && (0, _invariant2['default'])(props.facetSuggestionName, 'facetSuggestionName is not defined');
    return _this;
  }

  _createClass(AutoSuggest, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var dispatch = _props.dispatch;
      var AutoSuggest = _props.AutoSuggest;
      var bookmarks = _props.bookmarks;
      var showFacetSuggestions = _props.showFacetSuggestions;
      var viewAllClassName = _props.viewAllClassName;
      var placeholder = _props.placeholder;
      var facetSuggestionName = _props.facetSuggestionName;
      var className = _props.className;
      var isFocused = this.state.isFocused;
      var results = AutoSuggest.results;
      var query = AutoSuggest.query;
      var spellSuggestions = AutoSuggest.spellSuggestions;
      var suggestedTerm = AutoSuggest.suggestedTerm;
      var isOpen = AutoSuggest.isOpen;
      var totalResults = AutoSuggest.totalResults;
      var facets = AutoSuggest.facets;
      var q = query.q;


      var klass = (0, _classnames2['default'])('ola-suggestions', { 'ola-js-hide': !isOpen });
      var klassContainer = (0, _classnames2['default'])('ola-autosuggest', className, {
        'ola-autosuggest-focus': isFocused,
        'ola-autosuggest-blur': !isFocused
      });

      var shouldShowFacetSuggestions = showFacetSuggestions && !suggestedTerm && !spellSuggestions.length;

      return _react2['default'].createElement(
        'div',
        { className: klassContainer },
        _react2['default'].createElement(
          'div',
          { className: 'ola-autosuggest-container' },
          _react2['default'].createElement(_Input2['default'], {
            q: q,
            onChange: this.onChange,
            onClear: this.onClear,
            onKeyDown: this.onKeyDown,
            onSubmit: this.onSubmit,
            onFocus: this.onFocus,
            placeholder: placeholder,
            handleClickOutside: this.handleClickOutside
          }),
          _react2['default'].createElement(
            'div',
            { className: klass },
            _react2['default'].createElement(_TermSuggestion2['default'], { term: suggestedTerm }),
            _react2['default'].createElement(_SpellSuggestion2['default'], {
              suggestions: spellSuggestions,
              onChange: this.onChange,
              totalResults: totalResults,
              dispatch: dispatch
            }),
            _react2['default'].createElement(
              'div',
              { className: 'ola-suggestions-wrapper', ref: 'suggestionsContainer' },
              shouldShowFacetSuggestions && _react2['default'].createElement(_FacetSuggestion2['default'], {
                facets: facets,
                query: query,
                name: facetSuggestionName,
                dispatch: dispatch,
                onSubmit: this.handleViewAll
              }),
              _react2['default'].createElement(_SearchResults2['default'], {
                results: results,
                isOpen: isOpen,
                dispatch: dispatch,
                bookmarks: bookmarks,
                isAutosuggest: true
              })
            ),
            _react2['default'].createElement(
              'a',
              {
                className: viewAllClassName,
                onClick: this.handleViewAll
              },
              'View all results'
            )
          )
        )
      );
    }
  }]);

  return AutoSuggest;
}(_react2['default'].Component);

AutoSuggest.propTypes = {
  AutoSuggest: _react2['default'].PropTypes.object.isRequired,
  bookmarks: _react2['default'].PropTypes.array,
  showFacetSuggestions: _react2['default'].PropTypes.bool,
  dispatch: _react2['default'].PropTypes.func.isRequired,
  onSubmit: _react2['default'].PropTypes.func,
  viewAllClassName: _react2['default'].PropTypes.string,
  placeholder: _react2['default'].PropTypes.string,
  facetSuggestionName: _react2['default'].PropTypes.string
};
AutoSuggest.contextTypes = {
  config: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object, _react2['default'].PropTypes.func])
};
AutoSuggest.defaultProps = {
  showBookmarks: true,
  showFacetSuggestions: false,
  classNames: '.ola-snippet, .ola-facet-suggestion',
  activeClassName: 'ola-active',
  viewAllClassName: 'ola-autosuggest-all',
  placeholder: 'Enter keywords',
  facetSuggestionName: ''
};


function mapStateToProps(state) {
  return {
    AutoSuggest: state.AutoSuggest,
    bookmarks: state.AppState.bookmarks
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)((0, _reactOnclickoutside2['default'])(AutoSuggest));