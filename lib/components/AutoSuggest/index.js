'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactRedux = require('react-redux');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _AutoSuggest = require('./../../actions/AutoSuggest');

var _SearchResults = require('./../SearchResults');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _TermSuggestion = require('./../TermSuggestion');

var _TermSuggestion2 = _interopRequireDefault(_TermSuggestion);

var _SpellSuggestion = require('./../SpellSuggestion');

var _SpellSuggestion2 = _interopRequireDefault(_SpellSuggestion);

var _FacetSuggestion = require('./FacetSuggestion');

var _FacetSuggestion2 = _interopRequireDefault(_FacetSuggestion);

var _urlSync = require('./../../services/urlSync');

var _utilities = require('./../../utilities');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _domScrollIntoView = require('dom-scroll-into-view');

var _domScrollIntoView2 = _interopRequireDefault(_domScrollIntoView);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AutoSuggest = function (_React$Component) {
  (0, _inherits3['default'])(AutoSuggest, _React$Component);

  function AutoSuggest(props) {
    (0, _classCallCheck3['default'])(this, AutoSuggest);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (AutoSuggest.__proto__ || (0, _getPrototypeOf2['default'])(AutoSuggest)).call(this, props));

    _this.handleClickOutside = function (event) {
      if (_this.props.AutoSuggest.isOpen) {
        _this.props.dispatch((0, _AutoSuggest.closeAutoSuggest)());
      }
      _this.onBlur();
    };

    _this.onChange = function (term, searchInput) {
      var _this$props = _this.props,
          dispatch = _this$props.dispatch,
          AutoSuggest = _this$props.AutoSuggest;

      /* Trim text */

      if (term.length && (0, _utilities.trim)(term) === '') return;

      if (!term && !AutoSuggest.q) {
        dispatch((0, _AutoSuggest.closeAutoSuggest)());
        return;
      }

      if (!term) return dispatch((0, _AutoSuggest.clearQueryTerm)());

      var allowedCharacters = _this.context.config.allowedCharacters;


      dispatch((0, _AutoSuggest.updateQueryTerm)(term, searchInput));

      if (allowedCharacters && !(0, _utilities.checkForAllowedCharacters)(term, allowedCharacters)) {
        dispatch((0, _AutoSuggest.terminateAutoSuggest)());
      } else {
        dispatch((0, _AutoSuggest.executeAutoSuggest)());
      }

      /* Remove currently selected item from the autosuggest */
      _this.clearActiveClass();
    };

    _this.onClear = function () {
      _this.props.dispatch((0, _AutoSuggest.clearQueryTerm)());
    };

    _this.clearActiveClass = function () {
      var nodes = _this.refs.suggestionsContainer.querySelectorAll(_this.props.classNames);
      for (var i = 0, len = nodes.length; i < len; i++) {
        nodes[i].classList.remove(_this.props.activeClassName);
      }
    };

    _this.onKeyDown = function (direction) {
      var _this$props2 = _this.props,
          classNames = _this$props2.classNames,
          activeClassName = _this$props2.activeClassName;
      var suggestionsContainer = _this.refs.suggestionsContainer;

      var fullActiveClass = '.' + activeClassName;
      var nodes = suggestionsContainer.querySelectorAll(classNames);

      if (!nodes.length) return;

      var target = suggestionsContainer.querySelector(fullActiveClass);
      var index = target ? [].indexOf.call(nodes, target) : -1;
      var next = void 0;

      switch (direction) {
        case 'up':
          _this.clearActiveClass();
          next = nodes[Math.max(0, --index)];
          if (index < 0) {
            next.classList.remove(activeClassName);
          } else {
            next.classList.add(activeClassName);
          }
          if (index < -1) {
            index = nodes.length - 1;
            next = nodes[index];
            next.classList.add(activeClassName);
          }
          break;

        case 'down':
          _this.clearActiveClass();
          next = nodes[Math.min(nodes.length - 1, ++index)];
          if (index >= nodes.length) {
            _this.clearActiveClass();
          } else {
            next.classList.add(activeClassName);
          }
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
      var _this$props$AutoSugge = _this.props.AutoSuggest,
          q = _this$props$AutoSugge.q,
          facet_query = _this$props$AutoSugge.facet_query;
      var _this$props3 = _this.props,
          dispatch = _this$props3.dispatch,
          onSubmit = _this$props3.onSubmit;
      var _this$context$config = _this.context.config,
          searchPageUrl = _this$context$config.searchPageUrl,
          history = _this$context$config.history;

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
      isFocused: false,
      fuzzyQuery: null
    };
    return _this;
  }

  (0, _createClass3['default'])(AutoSuggest, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          dispatch = _props.dispatch,
          AutoSuggest = _props.AutoSuggest,
          bookmarks = _props.bookmarks,
          showFacetSuggestions = _props.showFacetSuggestions,
          showZone = _props.showZone,
          viewAllClassName = _props.viewAllClassName,
          facetSuggestionName = _props.facetSuggestionName,
          className = _props.className,
          translate = _props.translate;
      var isFocused = this.state.isFocused;
      var results = AutoSuggest.results,
          q = AutoSuggest.q,
          spellSuggestions = AutoSuggest.spellSuggestions,
          suggestedTerm = AutoSuggest.suggestedTerm,
          isOpen = AutoSuggest.isOpen,
          totalResults = AutoSuggest.totalResults,
          facets = AutoSuggest.facets;

      var klass = (0, _classnames2['default'])('ola-suggestions', { 'ola-js-hide': !isOpen });
      var klassContainer = (0, _classnames2['default'])('ola-autosuggest', className, {
        'ola-autosuggest-focus': isFocused,
        'ola-autosuggest-blur': !isFocused,
        'ola-speech-not-supported': !(window.SpeechRecognition || window.webkitSpeechRecognition)
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
            isOpen: isOpen,
            placeholder: translate('autosuggest_placeholder'),
            handleClickOutside: this.handleClickOutside,
            onSearchButtonClick: this.props.onSearchButtonClick,
            results: results,
            showZone: showZone,
            handleClose: this.handleClickOutside
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
                q: q,
                name: facetSuggestionName,
                dispatch: dispatch,
                onSubmit: this.handleViewAll
              }),
              _react2['default'].createElement(_SearchResults2['default'], (0, _extends3['default'])({
                results: results,
                isOpen: isOpen,
                dispatch: dispatch,
                bookmarks: bookmarks,
                isAutosuggest: true
              }, this.props.Device))
            ),
            _react2['default'].createElement(
              'a',
              {
                className: viewAllClassName,
                onClick: this.handleViewAll
              },
              translate('autosuggest_viewall')
            )
          )
        )
      );
    }
  }]);
  return AutoSuggest;
}(_react2['default'].Component);

AutoSuggest.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};
AutoSuggest.defaultProps = {
  showBookmarks: true,
  showFacetSuggestions: false,
  classNames: '.ola-snippet, .ola-facet-suggestion, .ola-suggestion-item',
  activeClassName: 'ola-active',
  viewAllClassName: 'ola-autosuggest-all',
  placeholder: 'Enter keywords',
  facetSuggestionName: '',
  showZone: false
};


function mapStateToProps(state) {
  return {
    AutoSuggest: state.AutoSuggest,
    Device: state.Device,
    bookmarks: state.AppState.bookmarks
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)((0, _OlaTranslate2['default'])((0, _reactOnclickoutside2['default'])(AutoSuggest)));