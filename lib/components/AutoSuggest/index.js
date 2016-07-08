'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = require('../../../.babelhelper.js').interopRequireDefault(_reactOnclickoutside);

var _AutoSuggest = require('./../../actions/AutoSuggest');

var _SearchResults = require('./../SearchResults');

var _SearchResults2 = require('../../../.babelhelper.js').interopRequireDefault(_SearchResults);

var _Input = require('./Input');

var _Input2 = require('../../../.babelhelper.js').interopRequireDefault(_Input);

var _TermSuggestion = require('./../SpellSuggestions/TermSuggestion');

var _TermSuggestion2 = require('../../../.babelhelper.js').interopRequireDefault(_TermSuggestion);

var _SpellSuggestion = require('./../SpellSuggestions/SpellSuggestion');

var _SpellSuggestion2 = require('../../../.babelhelper.js').interopRequireDefault(_SpellSuggestion);

var _FacetSuggestion = require('./FacetSuggestion');

var _FacetSuggestion2 = require('../../../.babelhelper.js').interopRequireDefault(_FacetSuggestion);

var _urlSync = require('./../../services/urlSync');

var _utilities = require('./../../utilities');

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_olaTranslate);

var _domScrollIntoView = require('dom-scroll-into-view');

var _domScrollIntoView2 = require('../../../.babelhelper.js').interopRequireDefault(_domScrollIntoView);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _FuzzySuggestions = require('./FuzzySuggestions');

var _FuzzySuggestions2 = require('../../../.babelhelper.js').interopRequireDefault(_FuzzySuggestions);

var AutoSuggest = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(AutoSuggest, _React$Component);

  function AutoSuggest(props) {
    require('../../../.babelhelper.js').classCallCheck(this, AutoSuggest);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(AutoSuggest).call(this, props));

    _this.handleClickOutside = function (event) {
      if (_this.props.AutoSuggest.isOpen) {
        _this.props.dispatch((0, _AutoSuggest.closeAutoSuggest)());

        /**
         * For Fuzzy suggestion, restore the original query term
         */
        if (event && event.nativeEvent.type === 'keydown' && _this.props.isFuzzySuggest) {
          _this.props.dispatch((0, _AutoSuggest.clearTempQueryTerm)());
        }
      }
      _this.onBlur();
    };

    _this.onChange = function (term) {
      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var AutoSuggest = _this$props.AutoSuggest;


      if (!term && !AutoSuggest.query.q) {
        dispatch((0, _AutoSuggest.closeAutoSuggest)());
        return;
      }

      if (!term) return dispatch((0, _AutoSuggest.clearQueryTerm)());

      var allowedCharacters = _this.context.config.allowedCharacters;


      dispatch((0, _AutoSuggest.updateQueryTerm)(term));

      if (allowedCharacters && !(0, _utilities.checkForAllowedCharacters)(term, allowedCharacters)) {
        dispatch((0, _AutoSuggest.terminateAutoSuggest)());
      } else {
        if (_this.props.isFuzzySuggest) dispatch((0, _AutoSuggest.executeFuzzyAutoSuggest)());else dispatch((0, _AutoSuggest.executeAutoSuggest)());
      }
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
      var _this$props2 = _this.props;
      var classNames = _this$props2.classNames;
      var activeClassName = _this$props2.activeClassName;
      var dispatch = _this$props2.dispatch;
      var isFuzzySuggest = _this$props2.isFuzzySuggest;
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
          if (index < 0) {
            next.classList.remove(activeClassName);
            if (index === -1 && isFuzzySuggest) dispatch((0, _AutoSuggest.clearTempQueryTerm)());
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
          _this.clearActiveClass(nodes, activeClassName);
          next = nodes[Math.min(nodes.length - 1, ++index)];
          if (index >= nodes.length) {
            isFuzzySuggest && dispatch((0, _AutoSuggest.clearTempQueryTerm)());
            _this.clearActiveClass(nodes, activeClassName);
          } else {
            next.classList.add(activeClassName);
          }
          break;
      }

      if (_this.props.isFuzzySuggest) {
        var term = _this.props.AutoSuggest.results[index] ? _this.props.AutoSuggest.results[index].term : null;
        term && _this.props.dispatch((0, _AutoSuggest.updateTempQueryTerm)(term));
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
      var _this$props3 = _this.props;
      var dispatch = _this$props3.dispatch;
      var onSubmit = _this$props3.onSubmit;
      var _this$context$config = _this.context.config;
      var searchPageUrl = _this$context$config.searchPageUrl;
      var history = _this$context$config.history;

      /* Close autosuggest */

      dispatch((0, _AutoSuggest.closeAutoSuggest)());

      if (onSubmit) return onSubmit(q);

      /* Redirect to search results page */
      window.location.href = searchPageUrl + (0, _urlSync.getHistoryCharacter)(history) + (0, _urlSync.buildQueryString)({ q: q, facet_query: facet_query });
    };

    _this.onFuzzySelect = function (term) {
      var _this$context$config2 = _this.context.config;
      var searchPageUrl = _this$context$config2.searchPageUrl;
      var history = _this$context$config2.history;

      window.location.href = searchPageUrl + (0, _urlSync.getHistoryCharacter)(history) + (0, _urlSync.buildQueryString)({ q: term });
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
    return _this;
  }

  require('../../../.babelhelper.js').createClass(AutoSuggest, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var dispatch = _props.dispatch;
      var AutoSuggest = _props.AutoSuggest;
      var bookmarks = _props.bookmarks;
      var showFacetSuggestions = _props.showFacetSuggestions;
      var viewAllClassName = _props.viewAllClassName;
      var facetSuggestionName = _props.facetSuggestionName;
      var className = _props.className;
      var translate = _props.translate;
      var isFuzzySuggest = _props.isFuzzySuggest;
      var isFocused = this.state.isFocused;
      var results = AutoSuggest.results;
      var query = AutoSuggest.query;
      var spellSuggestions = AutoSuggest.spellSuggestions;
      var suggestedTerm = AutoSuggest.suggestedTerm;
      var isOpen = AutoSuggest.isOpen;
      var totalResults = AutoSuggest.totalResults;
      var facets = AutoSuggest.facets;
      var tempQuery = AutoSuggest.tempQuery;
      var q = query.q;

      var klass = (0, _classnames2['default'])('ola-suggestions', { 'ola-js-hide': !isOpen });
      var klassContainer = (0, _classnames2['default'])('ola-autosuggest', className, {
        'ola-autosuggest-focus': isFocused,
        'ola-autosuggest-blur': !isFocused
      });

      var shouldShowFacetSuggestions = showFacetSuggestions && !suggestedTerm && !spellSuggestions.length;
      var queryTerm = isFuzzySuggest ? tempQuery || q : q;
      return _react2['default'].createElement(
        'div',
        { className: klassContainer },
        _react2['default'].createElement(
          'div',
          { className: 'ola-autosuggest-container' },
          _react2['default'].createElement(_Input2['default'], {
            q: queryTerm,
            onChange: this.onChange,
            onClear: this.onClear,
            onKeyDown: this.onKeyDown,
            onSubmit: this.onSubmit,
            onFocus: this.onFocus,
            isOpen: isOpen,
            placeholder: translate('autosuggest_placeholder'),
            handleClickOutside: this.handleClickOutside,
            onSearchButtonClick: this.props.onSearchButtonClick
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
              isFuzzySuggest ? _react2['default'].createElement(_FuzzySuggestions2['default'], {
                results: results,
                onSelect: this.onFuzzySelect,
                activeClassName: this.props.activeClassName
              }) : _react2['default'].createElement(_SearchResults2['default'], require('../../../.babelhelper.js')['extends']({
                results: results,
                isOpen: isOpen,
                dispatch: dispatch,
                bookmarks: bookmarks,
                isAutosuggest: true
              }, this.props.Device))
            ),
            !isFuzzySuggest && _react2['default'].createElement(
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
  config: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object, _react2['default'].PropTypes.func])
};
AutoSuggest.defaultProps = {
  showBookmarks: true,
  showFacetSuggestions: false,
  classNames: '.ola-snippet, .ola-facet-suggestion, .ola-suggestion-item',
  activeClassName: 'ola-active',
  viewAllClassName: 'ola-autosuggest-all',
  placeholder: 'Enter keywords',
  facetSuggestionName: '',
  fuzzySuggest: false
};


function mapStateToProps(state) {
  return {
    AutoSuggest: state.AutoSuggest,
    Device: state.Device,
    bookmarks: state.AppState.bookmarks
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)((0, _olaTranslate2['default'])((0, _reactOnclickoutside2['default'])(AutoSuggest)));