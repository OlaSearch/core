'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _reactRedux = require('react-redux');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _AutoSuggest = require('./../../actions/AutoSuggest');

var _History = require('./../../actions/History');

var _Search = require('./../../actions/Search');

var _Logger = require('./../../actions/Logger');

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _utilities = require('./../../utilities');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _domScrollIntoView = require('dom-scroll-into-view');

var _domScrollIntoView2 = _interopRequireDefault(_domScrollIntoView);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FuzzySuggestions = require('./FuzzySuggestions');

var _FuzzySuggestions2 = _interopRequireDefault(_FuzzySuggestions);

var _find = require('rambda/lib/find');

var _find2 = _interopRequireDefault(_find);

var _propEq = require('rambda/lib/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

var _Settings = require('./../../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var AutoComplete = function (_React$Component) {
  (0, _inherits3['default'])(AutoComplete, _React$Component);

  function AutoComplete(props) {
    (0, _classCallCheck3['default'])(this, AutoComplete);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));

    _this.clearFuzzyQueryTerm = function () {
      _this.setState({
        fuzzyQuery: null
      });
    };

    _this.updateFuzzyQueryTerm = function (term) {
      _this.setState({
        fuzzyQuery: term
      });
    };

    _this.closeAutoSuggest = function () {
      _this.setState({
        isOpen: false
      });
    };

    _this.updateQueryTerm = function (term, searchInput) {
      _this.setState({
        q: term,
        searchInput: searchInput
      });
    };

    _this.clearQueryTerm = function (cb) {
      _this.setState({
        q: '',
        fuzzyQuery: null,
        results: _this.props.showHistory ? (0, _utilities.mergeResultsWithHistory)({
          history: _this.props.history,
          showHistoryForQuery: _this.props.showHistoryForQuery
        }) : [],
        isOpen: _this.props.history.length > 0
      }, cb);
    };

    _this.handleHistoryChange = function (newHistory) {
      _this.setState({
        results: _this.props.showHistory ? (0, _utilities.mergeResultsWithHistory)({
          history: newHistory,
          results: _this.state.results,
          query: _this.state.q,
          showHistoryForQuery: _this.props.showHistoryForQuery
        }) : []
      });
    };

    _this.terminateAutoSuggest = function () {
      _this.setState({
        isOpen: false,
        results: []
      });
    };

    _this.handleClickOutside = function (event) {
      /* Prevent rendering when autocomplete is closed */
      if (_this.state.isOpen) {
        _this.terminateAutoSuggest();
        /**
         * For Fuzzy suggestion, restore the original query term
         */
        if (event && event.nativeEvent && event.nativeEvent.type === 'keydown') {
          return _this.clearFuzzyQueryTerm();
        }
      }
      if (event && event.type === 'keydown') return;
      _this.onBlur();
    };

    _this.onChange = function (term, searchInput) {
      var q = _this.state.q;

      /* Trim text */

      if (term && term.length && (0, _utilities.trim)(term) === '') return;

      if (!term && !q) {
        /* Close auto suggest */
        _this.closeAutoSuggest();
        /* Remove fuzzy term */
        _this.clearFuzzyQueryTerm();

        /* terminate */
        _this.terminateAutoSuggest();
        return;
      }

      if (!term) return _this.clearQueryTerm();

      var allowedCharacters = _this.context.config.allowedCharacters;


      _this.updateQueryTerm(term, searchInput);

      _this.clearFuzzyQueryTerm();

      if (allowedCharacters && !(0, _utilities.checkForAllowedCharacters)(term, allowedCharacters)) {
        _this.terminateAutoSuggest();
      } else {
        _this.props.executeFuzzyAutoSuggest(term).then(function (results) {
          if (!results) return;

          /* Parse payload */
          var res = [];
          var categoryFound = false;

          var _loop = function _loop(i, len) {
            var _results$i = results[i],
                payload = _results$i.payload,
                rest = (0, _objectWithoutProperties3['default'])(_results$i, ['payload']);

            if (typeof payload === 'string') payload = JSON.parse(payload);
            var isCategory = payload.taxo_terms && payload.taxo_terms.length > 0 && !categoryFound && payload.type !== _Settings.TYPE_TAXONOMY;
            var _payload = payload,
                topClicks = _payload.topClicks;

            var topClickDocs = i === 0 && topClicks && topClicks.length ? topClicks.filter(function (_, idx) {
              return idx === 0;
            }).map(function (item) {
              return (0, _extends3['default'])({
                term: rest.term,
                title: item.title,
                type: _Settings.TYPE_DOC
              }, item);
            }) : [];

            /* If categories are found, we will need to create additional array items */
            if (isCategory) {
              var categories = _this.props.visibleCategoryGroups ? payload.taxo_terms.filter(function (item) {
                var _item$split = item.split('|'),
                    name = _item$split[0];

                return _this.props.visibleCategoryGroups.indexOf(name) !== -1;
              }) : payload.taxo_terms;

              var totalCategories = categories.length;
              /* Get the display names of the facets */
              var facet = (0, _find2['default'])((0, _propEq2['default'])('name', payload.taxo_label))(_this.context.config.facets);

              /* First term in the suggestion */
              res = [].concat(res, [(0, _extends3['default'])({}, rest, {
                suggestion_raw: payload.suggestion_raw,
                label: payload.label,
                answer: payload.answer,
                type: payload.type /* The first item is a query */
              })], topClickDocs);

              for (var j = 0; j < totalCategories; j++) {
                var _payload$taxo_terms$j = payload.taxo_terms[j].split('|'),
                    name = _payload$taxo_terms$j[0];

                var _ref = payload.taxo_paths ? payload.taxo_paths[j].split('|') : [],
                    path = _ref[0];

                var displayName = facet ? facet.facetNames[name] || name : name;
                res.push((0, _extends3['default'])({}, rest, {
                  taxo_term: displayName,
                  isLastCategory: j === totalCategories - 1,
                  isFirstCategory: j === 0
                }, payload, {
                  suggestion_raw: payload.suggestion_raw,
                  taxo_path: path
                }));
                categoryFound = true;
              }
            } else {
              res = [].concat(res, [(0, _extends3['default'])({}, rest, payload)], topClickDocs);
            }
          };

          for (var i = 0, len = results.length; i < len; i++) {
            _loop(i, len);
          }

          var finalResults = _this.props.showHistory ? (0, _utilities.mergeResultsWithHistory)({
            history: _this.props.history,
            results: res,
            query: _this.state.q,
            showHistoryForQuery: _this.props.showHistoryForQuery
          }) : res;

          _this.setState({
            results: finalResults,
            isOpen: _this.state.q ? !!finalResults.length : false
          });
        });
      }

      /* Remove currently selected item from the autosuggest */
      _this.clearActiveClass();
    };

    _this.clearActiveClass = function () {
      var nodes = _this.suggestionsContainer.querySelectorAll(_this.props.classNames);
      for (var i = 0, len = nodes.length; i < len; i++) {
        nodes[i].classList.remove(_this.props.activeClassName);
      }
    };

    _this.onKeyDown = function (direction) {
      var _this$props = _this.props,
          classNames = _this$props.classNames,
          activeClassName = _this$props.activeClassName;

      var fullActiveClass = '.' + activeClassName;
      var nodes = _this.suggestionsContainer.querySelectorAll(classNames);

      if (!nodes.length) {
        if (_this.props.history.length) return _this.clearQueryTerm();
      }

      var target = _this.suggestionsContainer.querySelector(fullActiveClass);
      var index = target ? [].indexOf.call(nodes, target) : -1;
      var next = void 0;

      switch (direction) {
        case 'up':
          _this.clearActiveClass();
          next = nodes[Math.max(0, --index)];
          if (index < 0) {
            next.classList.remove(activeClassName);
            if (index === -1) _this.clearFuzzyQueryTerm();
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
            _this.clearFuzzyQueryTerm();
            _this.clearActiveClass();
          } else {
            next.classList.add(activeClassName);
          }
          break;
      }

      var term = _this.state.results[index] ? _this.state.results[index] : null;
      if (term) {
        _this.updateFuzzyQueryTerm(term);
      }

      /* Add a timeout */
      if (_this.props.searchOnSelect && !_this.props.isPhone && term) {
        if (_this._autosearch) clearTimeout(_this._autosearch);
        _this._autosearch = setTimeout(function () {
          _this.onSubmit(null, { stayOpen: true });
        }, _this.props.searchTimeout);
      }

      (0, _domScrollIntoView2['default'])(next, _this.suggestionsContainer, {
        onlyScrollIfNeeded: true
      });
    };

    _this.onSubmit = function (event, options) {
      /* If there is a fuzzy term */
      if (_this.state.fuzzyQuery) {
        return _this.onFuzzySelect(_this.state.fuzzyQuery, options);
      }

      _this.setState({
        results: [],
        isOpen: false
      });

      /* Update query term */
      _this.props.updateQueryTerm(_this.state.q, _this.state.searchInput);

      /* Trigger search */
      _this.onSelect(_this.state.q);

      /* trigger blur on mobile devices */
      if (_this.props.isPhone) {
        setTimeout(function () {
          return document.activeElement.blur();
        }, 100);
      }

      event && event.preventDefault();
    };

    _this.onSelect = function (suggestion, options) {
      if (_this.props.onSelect) {
        _this.props.onSelect(suggestion, {
          removeAllFacets: _this.props.removeAllFacets,
          updateQueryTerm: _this.props.updateQueryTerm
        });
      }

      if (_this.props.forceRedirect) {
        _this.props.setSearchSource('suggest');
      }

      /* Check if user deliberately clicked on selected the query */
      if (options && options.fromSuggestion) {
        _this.props.log({
          eventType: 'C',
          eventSource: 'suggest',
          eventCategory: 'autosuggest',
          query: _this.state.q /* override query */
          , eventAction: 'click',
          suggestion_taxo_label: suggestion.taxo_label,
          suggestion_taxo_term: suggestion.taxo_term,
          suggestion: suggestion.term,
          position: options.position,
          result: suggestion.id ? {
            title: suggestion.title,
            url: suggestion.url,
            id: suggestion.id
          } : null
        });
      }

      /* If its a document */
      if (suggestion.type === _Settings.TYPE_DOC) {
        /* Update state */
        return (0, _utilities.redirect)(suggestion.url);
      }

      _this.props.executeSearch({
        forceRedirect: _this.props.forceRedirect,
        searchPageUrl: _this.context.config.searchPageUrl,
        routeChange: !_this.props.forceRedirect,
        replaceQueryParamName: _this.context.config.replaceQueryParamName
      });

      /* Clear timeout */
      if (_this._autosearch) clearTimeout(_this._autosearch);
    };

    _this.onFuzzySelect = function (suggestion, options) {
      var type = suggestion.type;

      var facet = void 0;
      var isTaxonomy = type === _Settings.TYPE_TAXONOMY;
      var isEntity = type === _Settings.TYPE_ENTITY;
      var isQuery = type === _Settings.TYPE_QUERY;
      var isHistory = type === _Settings.TYPE_HISTORY;
      var term = suggestion.suggestion_raw || suggestion.term;
      var stayOpen = options && options.stayOpen;

      if (!stayOpen) {
        _this.setState({
          results: [],
          isOpen: false,
          fuzzyQuery: null
        });
      }

      /* Update state */
      _this.updateQueryTerm(term);

      if (isEntity || isTaxonomy) {
        /**
         * For Barack Obama in Climate
         */
        if (suggestion.taxo_label && suggestion.taxo_term) {
          facet = (0, _find2['default'])((0, _propEq2['default'])('name', suggestion.taxo_label))(_this.context.config.facets);
          _this.props.replaceFacet(facet, suggestion.taxo_path || suggestion.taxo_term);
        }
        _this.props.updateQueryTerm(term, _Settings.SEARCH_INPUTS.SUGGESTION);
      }
      if (isQuery || isHistory) {
        if (suggestion.taxo_label && suggestion.taxo_term) {
          /* Remove all selected facets */
          _this.props.removeAllFacets();
          facet = (0, _find2['default'])((0, _propEq2['default'])('name', suggestion.taxo_label))(_this.context.config.facets);
          _this.props.replaceFacet(facet, suggestion.taxo_path || suggestion.taxo_term);
        }
        _this.props.updateQueryTerm(term, _Settings.SEARCH_INPUTS.SUGGESTION);
      }

      return _this.onSelect(suggestion, (0, _extends3['default'])({}, options, { fromSuggestion: true }));
    };

    _this.onFocus = function (event) {
      /* Set scroll position on phone */
      if (_this.props.isPhone && _this.props.scrollOnFocus) {
        document.documentElement.scrollTop = document.body.scrollTop = (0, _utilities.getCoords)(event.target).top - _this.props.scrollPadding;
      }

      if (!_this.state.q) {
        _this.setState({
          isFocused: true,
          isOpen: true,
          results: _this.props.showHistory ? (0, _utilities.mergeResultsWithHistory)({
            history: _this.props.history,
            results: _this.state.results,
            query: _this.state.q,
            showHistoryForQuery: _this.props.showHistoryForQuery
          }) : _this.state.results
        });
      }

      _this.props.onFocus && _this.props.onFocus(event);
    };

    _this.onBlur = function (event) {
      _this.setState({
        isFocused: false,
        results: []
      });

      _this.props.onBlur && _this.props.onBlur(event);
    };

    _this.onSoftBlur = function (e) {
      if (!e.relatedTarget) return;
      if (_this.suggestionsContainer.contains(e.relatedTarget)) return;

      _this.setState({
        isFocused: false,
        isOpen: false,
        fuzzyQuery: null,
        results: []
      });
    };

    _this.registerRef = function (input) {
      _this.suggestionsContainer = input;
    };

    _this.registerEl = function (el) {
      _this.el = el;
    };

    _this.state = {
      isFocused: false,
      fuzzyQuery: null,
      isOpen: false,
      q: props.q,
      results: [],
      searchInput: null
    };
    _this.isSizeSmall = false;
    return _this;
  }

  AutoComplete.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.q !== this.props.q) {
      this.setState({
        q: nextProps.q,
        fuzzyQuery: null,
        results: []
      });
    }
    /* Eg: page changes with empty query */
    if (nextProps.q !== this.state.q) {
      this.setState({
        q: nextProps.q
      });
    }
    if (nextProps.history !== this.props.history) {
      this.handleHistoryChange(nextProps.history);
    }
  };

  AutoComplete.prototype.componentDidMount = function componentDidMount() {
    if (!this.el) return;
    this.isSizeSmall = (0, _utilities.getCoords)(this.el).width <= 600;
  };

  AutoComplete.prototype.render = function render() {
    var _props = this.props,
        showZone = _props.showZone,
        className = _props.className,
        translate = _props.translate,
        resultLimit = _props.resultLimit,
        resultLimitDesktop = _props.resultLimitDesktop,
        isDesktop = _props.isDesktop;
    var _state = this.state,
        isFocused = _state.isFocused,
        fuzzyQuery = _state.fuzzyQuery,
        q = _state.q,
        results = _state.results;

    if (results.length > resultLimit) {
      results.length = isDesktop ? resultLimitDesktop : resultLimit;
    }
    var showSuggestionHelp = this.context.config.showSuggestionHelp;

    var isOpen = !results.length ? false : this.state.isOpen;
    var klass = (0, _classnames2['default'])('ola-suggestions', { 'ola-js-hide': !isOpen });
    var klassContainer = (0, _classnames2['default'])(className, {
      'ola-autosuggest-focus': isFocused,
      'ola-autosuggest-blur': !isFocused,
      'ola-autosuggest-small': this.isSizeSmall,
      'ola-speech-not-supported': !(window.SpeechRecognition || window.webkitSpeechRecognition)
    });

    var queryTerm = fuzzyQuery ? fuzzyQuery.term || q : q;

    return _react2['default'].createElement(
      'div',
      { className: klassContainer, ref: this.registerEl },
      _react2['default'].createElement(
        'div',
        { className: this.props.containerClass },
        _react2['default'].createElement(_Input2['default'], {
          q: queryTerm,
          onChange: this.onChange,
          onClear: this.clearQueryTerm,
          onKeyDown: this.onKeyDown,
          onSubmit: this.onSubmit,
          onFocus: this.onFocus,
          isOpen: isOpen,
          placeholder: translate('autosuggest_placeholder'),
          handleClickOutside: this.handleClickOutside,
          onSearchButtonClick: this.onSubmit,
          results: results,
          showZone: showZone,
          fuzzyQuery: fuzzyQuery,
          showGeoLocation: this.props.showGeoLocation,
          onGeoLocationSuccess: this.props.onGeoLocationSuccess,
          onGeoLocationDisable: this.props.onGeoLocationDisable,
          autoFocus: this.props.autoFocus,
          isPhone: this.props.isPhone,
          onBlur: this.onSoftBlur,
          handleClose: this.terminateAutoSuggest
        }),
        _react2['default'].createElement(
          'div',
          { className: klass },
          _react2['default'].createElement(
            'div',
            { className: 'ola-suggestions-wrapper', ref: this.registerRef },
            showSuggestionHelp ? _react2['default'].createElement(
              'div',
              { className: 'ola-suggestions-help' },
              q ? translate('autosuggest_help') : _react2['default'].createElement(
                'span',
                null,
                translate('autosuggest_help_history'),
                _react2['default'].createElement(
                  'a',
                  {
                    onClick: this.props.clearHistory,
                    className: 'ola-suggestions-clear'
                  },
                  'clear'
                )
              )
            ) : null,
            _react2['default'].createElement(_FuzzySuggestions2['default'], {
              results: results,
              onSelect: this.onFuzzySelect,
              onRemoveHistory: this.onRemoveHistory,
              activeClassName: this.props.activeClassName,
              q: q
            })
          )
        )
      )
    );
  };

  return AutoComplete;
}(_react2['default'].Component);

AutoComplete.contextTypes = {
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};
AutoComplete.defaultProps = {
  showBookmarks: true,
  classNames: '.ola-snippet, .ola-facet-suggestion, .ola-suggestion-item',
  activeClassName: 'ola-active',
  viewAllClassName: 'ola-autosuggest-all',
  placeholder: 'Enter keywords',
  showZone: false,
  className: 'ola-autosuggest',
  containerClass: 'ola-autosuggest-container',
  showGeoLocation: false,
  visibleCategoryGroups: null,
  autoFocus: false,
  forceRedirect: false,
  showHistory: true,
  showHistoryForQuery: false,
  q: '',
  scrollOnFocus: true,
  scrollPadding: 16,
  resultLimit: 5,
  resultLimitDesktop: 10,
  searchOnSelect: false,
  searchTimeout: 400
};


function mapStateToProps(state, ownProps) {
  return {
    isPhone: state.Device.isPhone,
    isDesktop: state.Device.isDesktop,
    history: state.AppState.history
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, {
  executeFuzzyAutoSuggest: _AutoSuggest.executeFuzzyAutoSuggest,
  updateQueryTerm: _Search.updateQueryTerm,
  replaceFacet: _Search.replaceFacet,
  removeAllFacets: _Search.removeAllFacets,
  executeSearch: _Search.executeSearch,
  setSearchSource: _Search.setSearchSource,
  clearHistory: _History.clearHistory,
  log: _Logger.log
})((0, _OlaTranslate2['default'])((0, _reactOnclickoutside2['default'])(AutoComplete)));