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

var _style = require('@olasearch/styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactOnclickoutside = require('@olasearch/react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _AutoSuggest = require('./../../actions/AutoSuggest');

var _History = require('./../../actions/History');

var _Search = require('./../../actions/Search');

var _Logger = require('./../../actions/Logger');

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _utilities = require('./../../utilities');

var _withTranslate = require('./../../decorators/withTranslate');

var _withTranslate2 = _interopRequireDefault(_withTranslate);

var _domScrollIntoView = require('dom-scroll-into-view');

var _domScrollIntoView2 = _interopRequireDefault(_domScrollIntoView);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FuzzySuggestions = require('./FuzzySuggestions');

var _FuzzySuggestions2 = _interopRequireDefault(_FuzzySuggestions);

var _find = require('ramda/src/find');

var _find2 = _interopRequireDefault(_find);

var _propEq = require('ramda/src/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

var _Settings = require('./../../constants/Settings');

var _QueryHelp = require('./../Onboarding/QueryHelp');

var _QueryHelp2 = _interopRequireDefault(_QueryHelp);

var _withTheme = require('./../../decorators/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _withConfig = require('./../../decorators/withConfig');

var _withConfig2 = _interopRequireDefault(_withConfig);

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

    _this.updateFuzzyQueryTerm = function (fuzzyQuery) {
      _this.setState({
        fuzzyQuery: fuzzyQuery
      }, function () {
        if (!_this.props.wordSuggestion) return;
        /* Update cursor position */
        var tokenIndex = _this.state.startToken + _this.getFacetDisplayName(fuzzyQuery.term).length;
        _this.updateCursor(tokenIndex);
      });
    };

    _this.getFacetDisplayName = function (term) {
      return (0, _utilities.getDisplayName)(null, term);
    };

    _this.closeAutoSuggest = function () {
      _this.setState({
        isOpen: false,
        leftPosition: 0
      });
    };

    _this.updateQueryTerm = function (_ref) {
      var term = _ref.term,
          rest = (0, _objectWithoutProperties3['default'])(_ref, ['term']);

      _this.setState((0, _extends3['default'])({
        q: term
      }, rest));
    };

    _this.clearQueryTerm = function (cb) {
      _this.setState({
        q: '',
        fuzzyQuery: null,
        results: _this.props.showHistory ? (0, _utilities.mergeResultsWithHistory)({
          history: _this.props.history,
          showHistoryForQuery: _this.props.showHistoryForQuery
        }) : [],
        isOpen: _this.props.history.length > 0,
        leftPosition: _this.props.leftPadding,
        showWordSuggestion: false
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
      if (!_this.state.isFocused) return;
      if (event && event.type === 'keydown') return;
      _this.onBlur();
    };

    _this.onTokenChange = function (tokens) {
      if ((!tokens || !tokens.length) && _this.props.tokens.length) {
        return _this.props.removeAllTokens();
      }
      var tokensToRemove = _this.props.tokens.filter(function (_ref2) {
        var value = _ref2.value;
        return tokens.indexOf(value) === -1;
      });
      tokensToRemove.forEach(function (_ref3) {
        var value = _ref3.value;
        return _this.props.removeToken(value);
      });
    };

    _this.onChange = function (event, searchInput) {
      /* Set the term */
      var term = event.target ? event.target.value : event;
      /* Get partial term */
      var startToken = void 0,
          endToken = void 0,
          leftPosition = void 0,
          partialWord = void 0;
      if (_this.props.wordSuggestion) {
        var wordPosition = (0, _utilities.getWordPosition)(event.target);
        partialWord = wordPosition.word;
        leftPosition = wordPosition.leftPosition;
        startToken = wordPosition.startToken;
        endToken = wordPosition.endToken;

        /* if its the same word stop */
        if (_this.state.partialWord === partialWord && event && event.type === 'mousedown') {
          return;
        }

        /* Update facet if startToken + endToken has changed */
        // let changedTokens = this.props.tokens.filter(
        //   ({ startToken: st, endToken: et }) => {
        //     return st === startToken && et !== endToken
        //   }
        // )
        if (startToken !== _this.state.startToken) {
          // Word has changed, clear the results
          _this.setState({ results: [] });
        }
        /* Remove facets if tokens are changed */
        // if (changedTokens) {
        //   changedTokens.forEach(({name, value}) => {
        //     this.props.removeFacet({ name }, value)
        //   });
        // }
      }

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

      if (_this.state.q !== term) {}
      // console.log(this.state.q)
      // console.log(term)
      // console.log(syncTokens(this.state.q, term, this.props.tokens))
      // const tokens = syncTokens(this.state.q, term, this.props.tokens)
      /* Update tokens */
      // this.props.replaceTokens(tokens)


      /* No of words in the query */
      var hasMoreTerms = term.match(/\s/gi);
      var showWordSuggestion = _this.props.wordSuggestion && !!(hasMoreTerms && hasMoreTerms.length);

      var allowedCharacters = _this.props.config.allowedCharacters;

      /* Update state */

      if (_this.props.wordSuggestion) {
        _this.updateQueryTerm({
          term: term,
          searchInput: searchInput,
          startToken: startToken,
          endToken: endToken,
          leftPosition: leftPosition,
          showWordSuggestion: showWordSuggestion,
          partialWord: partialWord
        });
      } else {
        _this.updateQueryTerm({ term: term });
      }

      /* Clear fuzzy term selection on query change */
      _this.clearFuzzyQueryTerm();

      /* Close auto suggest early */
      if (showWordSuggestion && !partialWord) {
        return _this.closeAutoSuggest();
      }

      /* Which request */
      var ajaxRequest = showWordSuggestion ? _this.props.executeFacetSearch(term, partialWord, startToken, endToken) : _this.props.executeFuzzyAutoSuggest(term);

      if (allowedCharacters && !(0, _utilities.checkForAllowedCharacters)(term, allowedCharacters)) {
        _this.terminateAutoSuggest();
      } else {
        ajaxRequest.then(function (results) {
          if (!results) return;
          /* Prepare results */
          var res = (0, _utilities.getAutoCompleteResults)(results, _this.props.config.facets, showWordSuggestion, _this.props.tokens);
          var finalResults = _this.props.showHistory ? (0, _utilities.mergeResultsWithHistory)({
            history: _this.props.history,
            results: res,
            query: _this.state.q,
            showHistoryForQuery: _this.props.showHistoryForQuery
          }) : res;
          /* Refactor */

          _this.setState({
            results: finalResults,
            isOpen: showWordSuggestion ? _this.state.startToken !== startToken ? false : !!finalResults.length : _this.props.wordSuggestion ? showWordSuggestion !== _this.state.showWordSuggestion ? false : !!finalResults.length : _this.state.q ? !!finalResults.length : _this.props.history.length > 0
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

    _this.updateCursor = function (start) {
      setTimeout(function () {
        return _this.inputEl.input.setSelectionRange(start, start);
      });
    };

    _this.onKeyDown = function (direction, event) {
      var _this$props = _this.props,
          classNames = _this$props.classNames,
          activeClassName = _this$props.activeClassName;

      var fullActiveClass = '.' + activeClassName;
      var nodes = _this.suggestionsContainer.querySelectorAll(classNames);

      if (!nodes.length) {
        if (_this.props.history.length && ['tab', 'space'].indexOf(direction) === -1) {
          return _this.clearQueryTerm();
        }
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
            if (index === -1) {
              _this.clearFuzzyQueryTerm();
              _this.updateCursor(_this.state.endToken);
            }
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
            _this.updateCursor(_this.state.endToken);
          } else {
            next.classList.add(activeClassName);
          }
          break;

        case 'tab':
        case 'space':
          if (_this.props.wordSuggestion) {
            if (_this.state.results[index]) {
              if (direction === 'tab') event.preventDefault();
              return _this.onFuzzySelect(_this.state.results[index]);
            } else {
              if (direction === 'tab') _this.onSoftBlur(event);
              return;
            }
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

      next && (0, _domScrollIntoView2['default'])(next, _this.suggestionsContainer, {
        onlyScrollIfNeeded: true
      });
    };

    _this.onSubmit = function (event, options) {
      /* If there is a fuzzy term */
      if (_this.state.fuzzyQuery) {
        return _this.onFuzzySelect(_this.state.fuzzyQuery, options);
      }
      /* Remove facets that are tokens */
      var activeTokens = _this.props.tokens.map(function (_ref4) {
        var name = _ref4.name,
            value = _ref4.value;
        return name + ':' + value;
      });

      /* Check if there are any tokens */
      if (_this.props.tokens.length) {
        _this.props.tokens.forEach(function (_ref5) {
          var value = _ref5.value,
              name = _ref5.name;

          var facet = (0, _find2['default'])((0, _propEq2['default'])('name', name))(_this.props.config.facets);
          /* Set from query as true */
          facet.isToken = true;
          _this.props.addFacet(facet, value);
        });
      }
      /* Remove facets that are tokens */
      _this.props.facet_query.filter(function (_ref6) {
        var isToken = _ref6.isToken;
        return isToken;
      }).forEach(function (item) {
        var selected = item.selected;

        for (var i = 0; i < selected.length; i++) {
          if (activeTokens.indexOf(item.name + ':' + selected[i]) === -1) {
            _this.props.removeFacet(item, selected[i]);
          }
        }
      });

      /* Clear results and close the suggestions */
      _this.setState({
        results: [],
        isOpen: false
      });

      /**
       * Update query term
       * Only if query has changed. Should we set skip_spellsuggest or skip_intent to false here ?
       */
      if (_this.state.q !== _this.props.q) {
        _this.props.updateQueryTerm(_this.state.q, _this.state.searchInput);
      }

      /* Remove facets from ie */
      // this.props.removeIntentEngineFacets()

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
        searchPageUrl: _this.props.config.searchPageUrl,
        routeChange: !_this.props.forceRedirect
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
      var isFacet = type === _Settings.TYPE_FACET;
      var term = suggestion.suggestion_raw || suggestion.term;
      var stayOpen = options && options.stayOpen;

      /* Focus on the input if click event */
      if (options && options.event && options.event.type === 'click') {
        // To do
      }

      if (isFacet) {
        term = _this.getFacetDisplayName(term);
      }

      if (_this.props.wordSuggestion) {
        term = _this.state.q.substr(0, _this.state.startToken) + term + _this.state.q.substr(_this.state.endToken);
      }

      if (!stayOpen) {
        _this.setState({
          results: [],
          isOpen: false,
          fuzzyQuery: null
        });
      }

      /* Update state */
      _this.updateQueryTerm({ term: term });

      /* isFacet */
      if (isFacet) {
        facet = (0, _find2['default'])((0, _propEq2['default'])('name', suggestion.taxo_label))(_this.props.config.facets);
        _this.props.addToken({
          startToken: _this.state.startToken,
          endToken: _this.state.startToken + (0, _utilities.getDisplayName)(suggestion.term).length,
          isHidden: true,
          value: suggestion.term,
          name: facet.name
        });

        // /* Do not submit if user is continuing to filter */
        return;
      }

      if (isEntity || isTaxonomy) {
        /**
         * For Barack Obama in Climate
         */
        if (suggestion.taxo_label && suggestion.taxo_term) {
          facet = (0, _find2['default'])((0, _propEq2['default'])('name', suggestion.taxo_label))(_this.props.config.facets);
          _this.props.replaceFacet(facet, suggestion.taxo_path || suggestion.taxo_term);
        }
        _this.props.updateQueryTerm(term, _Settings.SEARCH_INPUTS.SUGGESTION);
      }
      if (isQuery || isHistory) {
        if (suggestion.taxo_label && suggestion.taxo_term) {
          /* Remove all selected facets */
          _this.props.removeAllFacets();
          facet = (0, _find2['default'])((0, _propEq2['default'])('name', suggestion.taxo_label))(_this.props.config.facets);
          _this.props.replaceFacet(facet, suggestion.taxo_path || suggestion.taxo_term);
        }

        /* Check for tokens */
        if (suggestion.tokens) {
          _this.props.replaceTokens(suggestion.tokens);
          for (var i = 0; i < suggestion.tokens.length; i++) {
            facet = (0, _find2['default'])((0, _propEq2['default'])('name', suggestion.tokens[i].name))(_this.props.config.facets);
            /**
             * Make sure to add isToken attribute
             */
            _this.props.replaceFacet((0, _extends3['default'])({}, facet, { isToken: true }), suggestion.tokens[i].value);
          }
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

      /* Set focus status */
      _this.setState({
        isFocused: true,
        isOpen: true,
        results: !_this.state.q && _this.props.showHistory ? (0, _utilities.mergeResultsWithHistory)({
          history: _this.props.history,
          results: _this.state.results,
          query: _this.state.q,
          showHistoryForQuery: _this.props.showHistoryForQuery
        }) : _this.state.results
      });

      _this.props.onFocus && _this.props.onFocus(event);
    };

    _this.onBlur = function (event) {
      _this.setState({
        isFocused: false,
        results: [],
        fuzzyQuery: null,
        partialWord: null
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

    _this.registerInput = function (el) {
      _this.inputEl = el;
    };

    _this.state = {
      isFocused: false,
      fuzzyQuery: null,
      isOpen: false,
      q: props.q,
      results: [],
      searchInput: null,

      /* word suggestion */
      leftPosition: props.leftPadding,
      partialWord: null,
      showWordSuggestion: false
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
    if (nextProps.q !== this.state.q && nextProps.tokens === this.props.tokens && !this.state.isFocused /* Check if the input is focused: then ignore */
    ) {
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
        isDesktop = _props.isDesktop,
        theme = _props.theme;
    var _state = this.state,
        isFocused = _state.isFocused,
        fuzzyQuery = _state.fuzzyQuery,
        q = _state.q,
        results = _state.results,
        startToken = _state.startToken,
        endToken = _state.endToken,
        showWordSuggestion = _state.showWordSuggestion;

    if (results.length > resultLimit) {
      results.length = isDesktop ? resultLimitDesktop : resultLimit;
    }
    var showSuggestionHelp = this.props.config.showSuggestionHelp;

    var isOpen = !results.length ? false : this.state.isOpen;
    var klass = (0, _classnames2['default'])('ola-suggestions', { 'ola-js-hide': !isOpen });
    var klassContainer = (0, _classnames2['default'])(className, {
      'ola-autosuggest-focus': isFocused,
      'ola-autosuggest-blur': !isFocused,
      'ola-autosuggest-small': this.isSizeSmall,
      'ola-speech-not-supported': !(window.SpeechRecognition || window.webkitSpeechRecognition)
    });

    var queryTerm = fuzzyQuery ? showWordSuggestion ? q.substr(0, startToken) + this.getFacetDisplayName(fuzzyQuery.term) + q.substr(endToken) || q : this.getFacetDisplayName(fuzzyQuery.term) : q;

    var fuzzyTokens = fuzzyQuery ? fuzzyQuery.tokens : null;

    var leftPosition = showWordSuggestion ? Math.max(0, this.state.leftPosition - this.props.leftPadding) : 0;

    return _react2['default'].createElement(
      'div',
      { ref: this.registerEl, className: _style2['default'].dynamic([['3998807529', [theme.primaryColor]]]) + ' ' + (klassContainer || '')
      },
      _react2['default'].createElement(
        'div',
        {
          className: _style2['default'].dynamic([['3998807529', [theme.primaryColor]]]) + ' ' + (this.props.containerClass || '')
        },
        _react2['default'].createElement(_Input2['default'], {
          q: queryTerm,
          ref: this.registerInput,
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
          refreshOnGeoChange: this.props.refreshOnGeoChange,
          autoFocus: this.props.autoFocus,
          isPhone: this.props.isPhone,
          onBlur: this.onSoftBlur,
          handleClose: this.terminateAutoSuggest,
          tokens: this.props.tokens,
          onTokenChange: this.onTokenChange,
          showWordSuggestion: showWordSuggestion,
          showAlert: this.props.showAlert,
          fuzzyTokens: fuzzyTokens,
          theme: theme,
          isFocused: this.state.isFocused
        }),
        _react2['default'].createElement(
          'div',
          {
            style: {
              left: leftPosition,
              width: showWordSuggestion ? this.props.wordSuggestionWidth : 'auto'
            },
            className: _style2['default'].dynamic([['3998807529', [theme.primaryColor]]]) + ' ' + (klass || '')
          },
          _react2['default'].createElement(
            'div',
            { ref: this.registerRef, className: _style2['default'].dynamic([['3998807529', [theme.primaryColor]]]) + ' ' + 'ola-suggestions-wrapper'
            },
            showSuggestionHelp ? _react2['default'].createElement(
              'div',
              {
                className: _style2['default'].dynamic([['3998807529', [theme.primaryColor]]]) + ' ' + 'ola-suggestions-help'
              },
              q ? showWordSuggestion ? null : translate('autosuggest_help') : _react2['default'].createElement(
                'span',
                {
                  className: _style2['default'].dynamic([['3998807529', [theme.primaryColor]]])
                },
                translate('autosuggest_help_history'),
                _react2['default'].createElement(
                  'a',
                  {
                    onClick: this.props.clearHistory,
                    className: _style2['default'].dynamic([['3998807529', [theme.primaryColor]]]) + ' ' + 'ola-suggestions-clear'
                  },
                  translate('autosuggest_clear_history_label')
                )
              )
            ) : null,
            _react2['default'].createElement(_FuzzySuggestions2['default'], {
              results: results,
              onSelect: this.onFuzzySelect,
              onRemoveHistory: this.onRemoveHistory,
              activeClassName: this.props.activeClassName,
              fieldLabels: this.props.config.fieldLabels,
              q: q
            })
          )
        ),
        _react2['default'].createElement(_QueryHelp2['default'], {
          isVisible: this.props.showHelp && !isOpen && isFocused && !queryTerm && !results.length
        })
      ),
      _react2['default'].createElement(_style2['default'], {
        styleId: '3998807529',
        css: '.ola-autosuggest-focus.__jsx-style-dynamic-selector .ola-search-form-container{border-color:' + theme.primaryColor + ';box-shadow:none;}',
        dynamic: [theme.primaryColor]
      })
    );
  };

  return AutoComplete;
}(_react2['default'].Component);

AutoComplete.defaultProps = {
  showBookmarks: true,
  showAlert: false,
  showHelp: true,
  refreshOnGeoChange: false,
  classNames: '.ola-snippet, .ola-facet-suggestion, .ola-suggestion-item',
  activeClassName: 'ola-active',
  viewAllClassName: 'ola-autosuggest-all',
  placeholder: 'Enter keywords',
  showZone: false,
  className: 'ola-autosuggest',
  containerClass: 'ola-autosuggest-container',
  showGeoLocation: false,
  wordSuggestion: false,
  wordSuggestionWidth: 300,
  leftPadding: 10,
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
    history: state.AppState.history,
    tokens: state.QueryState.tokens,
    facet_query: state.QueryState.facet_query,
    wordSuggestion: ownProps.wordSuggestion && state.Device.isDesktop
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
  log: _Logger.log,
  executeFacetSearch: _Search.executeFacetSearch,
  addFacet: _Search.addFacet,
  removeFacet: _Search.removeFacet,
  addToken: _Search.addToken,
  removeToken: _Search.removeToken,
  removeAllTokens: _Search.removeAllTokens,
  replaceTokens: _Search.replaceTokens,
  removeTokenFacets: _Search.removeTokenFacets,
  removeIntentEngineFacets: _Search.removeIntentEngineFacets
})((0, _withConfig2['default'])((0, _withTheme2['default'])((0, _withTranslate2['default'])((0, _reactOnclickoutside2['default'])(AutoComplete)))));