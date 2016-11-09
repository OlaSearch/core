'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = require('../../../.babelhelper.js').interopRequireDefault(_reactOnclickoutside);

var _AutoSuggest = require('./../../actions/AutoSuggest');

var _Search = require('./../../actions/Search');

var _Input = require('./Input');

var _Input2 = require('../../../.babelhelper.js').interopRequireDefault(_Input);

var _urlSync = require('./../../services/urlSync');

var _utilities = require('./../../utilities');

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var _domScrollIntoView = require('dom-scroll-into-view');

var _domScrollIntoView2 = require('../../../.babelhelper.js').interopRequireDefault(_domScrollIntoView);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _FuzzySuggestions = require('./FuzzySuggestions');

var _FuzzySuggestions2 = require('../../../.babelhelper.js').interopRequireDefault(_FuzzySuggestions);

var _find = require('ramda/src/find');

var _find2 = require('../../../.babelhelper.js').interopRequireDefault(_find);

var _propEq = require('ramda/src/propEq');

var _propEq2 = require('../../../.babelhelper.js').interopRequireDefault(_propEq);

var AutoComplete = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(AutoComplete, _React$Component);

  function AutoComplete(props) {
    require('../../../.babelhelper.js').classCallCheck(this, AutoComplete);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(AutoComplete).call(this, props));

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

    _this.clearQueryTerm = function (term) {
      _this.setState({
        q: '',
        fuzzyQuery: null,
        results: [],
        isOpen: false
      });

      _this.props.updateQueryTerm('');
    };

    _this.terminateAutoSuggest = function () {
      _this.setState({
        isOpen: false,
        results: []
      });
    };

    _this.handleClickOutside = function (event) {
      if (_this.state.isOpen) {
        _this.closeAutoSuggest();

        /**
         * For Fuzzy suggestion, restore the original query term
         */
        if (event && event.nativeEvent && event.nativeEvent.type === 'keydown') {
          _this.clearFuzzyQueryTerm();
        }
      }
      _this.onBlur();
    };

    _this.onChange = function (term, searchInput) {
      var q = _this.state.q;
      /* Trim text */

      if (term && term.length && (0, _utilities.trim)(term) === '') return;

      if (!term && !q) {
        _this.closeAutoSuggest();
        return;
      }

      if (!term) return _this.clearQueryTerm();

      var allowedCharacters = _this.context.config.allowedCharacters;


      _this.updateQueryTerm(term, searchInput);

      _this.clearFuzzyQueryTerm();

      /* Get the display names of the facets */
      var facet = (0, _find2['default'])((0, _propEq2['default'])('name', _this.props.categoryGroup))(_this.context.config.facets);

      if (allowedCharacters && !(0, _utilities.checkForAllowedCharacters)(term, allowedCharacters)) {
        _this.terminateAutoSuggest();
      } else {
        _this.props.executeFuzzyAutoSuggest(term).then(function (results, xhr) {
          /* Parse payload */
          var res = [];
          var categoryFound = false;

          for (var i = 0; i < results.length; i++) {
            var _results$i = results[i];
            var payload = _results$i.payload;
            var answer = _results$i.answer;

            var rest = require('../../../.babelhelper.js').objectWithoutProperties(_results$i, ['payload', 'answer']);

            if (typeof payload === 'string') payload = JSON.parse(payload);
            var isCategory = payload.taxo_terms && payload.taxo_terms.length > 0 && !categoryFound && payload.type !== 'taxonomy';
            /**
             * Check if answers are found
             * @type {[type]}
             */
            // if (i === 0 && !answer && payload.answer) {
            //   answer = payload.answer
            //   res.unshift({
            //     term: payload.suggestion_raw,
            //     payload: {
            //       type: 'answer',
            //       answer
            //     }
            //   })
            // }

            /* If categories are found, we will need to create additional array items */
            if (isCategory) {
              var categories = _this.props.visibleCategoryGroups ? payload.taxo_terms.filter(function (item) {
                var _item$split = item.split('|');

                var _item$split2 = require('../../../.babelhelper.js').slicedToArray(_item$split, 1);

                var name = _item$split2[0];

                return _this.props.visibleCategoryGroups.indexOf(name) !== -1;
              }) : payload.taxo_terms;

              var totalCategories = categories.length;

              res.push(require('../../../.babelhelper.js')['extends']({}, rest, {
                term: payload.suggestion_raw,
                label: payload.label,
                type: payload.type
              }));

              for (var j = 0; j < totalCategories; j++) {
                var _payload$taxo_terms$j = payload.taxo_terms[j].split('|');

                var _payload$taxo_terms$j2 = require('../../../.babelhelper.js').slicedToArray(_payload$taxo_terms$j, 1);

                var name = _payload$taxo_terms$j2[0];

                var displayName = facet.facetNames[name] || name;
                res.push(require('../../../.babelhelper.js')['extends']({}, rest, {
                  taxo_term: displayName,
                  isLastCategory: j === totalCategories - 1,
                  isFirstCategory: j === 0
                }, payload, {
                  term: payload.suggestion_raw
                }));
                categoryFound = true;
              }
            } else {
              res.push(require('../../../.babelhelper.js')['extends']({}, rest, payload));
            }
          }

          _this.setState({
            results: res,
            isOpen: !!results.length
          });
        });
      }

      /* Remove currently selected item from the autosuggest */
      _this.clearActiveClass();
    };

    _this.onClear = function () {
      _this.clearQueryTerm();
      _this.props.onSelect && _this.props.onSelect('');
    };

    _this.clearActiveClass = function () {
      var nodes = _this.refs.suggestionsContainer.querySelectorAll(_this.props.classNames);
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].classList.remove(_this.props.activeClassName);
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
      term && _this.updateFuzzyQueryTerm(term);

      (0, _domScrollIntoView2['default'])(next, suggestionsContainer, {
        onlyScrollIfNeeded: true
      });
    };

    _this.onSubmit = function (event) {
      _this.closeAutoSuggest();
      /* If there is a fuzzy term */
      if (_this.state.fuzzyQuery) {
        return _this.onFuzzySelect(_this.state.fuzzyQuery);
      }

      _this.setState({
        results: [],
        isOpen: false
      });

      /* Remove all selected facets */
      _this.props.removeAllFacets();

      /* Update query term */
      _this.props.updateQueryTerm(_this.state.q, _this.state.searchInput);

      _this.props.onSelect && _this.props.onSelect(_this.state.q);

      event && event.preventDefault();
    };

    _this.onFuzzySelect = function (suggestion) {
      var type = suggestion.type;
      var taxo_label = suggestion.taxo_label;
      var label = suggestion.label;
      var taxo_term = suggestion.taxo_term;
      var taxo_terms = suggestion.taxo_terms;
      var suggestion_raw = suggestion.suggestion_raw;

      var facet = void 0;
      var isTaxonomy = type === 'taxonomy';
      var isEntity = type === 'entity';
      var isQuery = type === 'query';
      var hasQueryTerm = isQuery || isEntity && taxo_terms;
      var term = suggestion_raw || suggestion.term;

      _this.setState({
        q: hasQueryTerm ? term : '',
        results: [],
        isOpen: false,
        fuzzyQuery: null
      });

      /* Remove all selected facets */
      _this.props.removeAllFacets();

      if (isEntity || isTaxonomy) {
        /**
         * For Barack Obama in Climate
         */
        if (taxo_label && taxo_term) {
          facet = (0, _find2['default'])((0, _propEq2['default'])('name', taxo_label))(_this.context.config.facets);
          _this.props.replaceFacet(facet, taxo_term);
          _this.props.updateQueryTerm(term);
        } else {
          facet = (0, _find2['default'])((0, _propEq2['default'])('name', label))(_this.context.config.facets);
          _this.props.replaceFacet(facet, term);
          _this.props.updateQueryTerm('');
        }
      }

      if (isQuery) {
        if (taxo_label && taxo_term) {
          facet = (0, _find2['default'])((0, _propEq2['default'])('name', taxo_label))(_this.context.config.facets);
          _this.props.replaceFacet(facet, taxo_term);
        }
        _this.props.updateQueryTerm(term);
      }

      return _this.props.onSelect && _this.props.onSelect(suggestion);
    };

    _this.onFocus = function (event) {
      _this.setState({
        isFocused: true
      });

      _this.props.onFocus && _this.props.onFocus(event);
    };

    _this.onBlur = function (event) {
      _this.setState({
        isFocused: false,
        results: []
      });

      _this.props.onBlur && _this.props.onBlur(event);
    };

    _this.state = {
      isFocused: false,
      fuzzyQuery: null,
      isOpen: false,
      q: props.q,
      results: []
    };
    return _this;
  }

  require('../../../.babelhelper.js').createClass(AutoComplete, [{
    key: 'componentWillReceiveProps',
    //['credit-card-detail-page', 'save', 'borrow', 'invest', 'insure', 'help-centre']
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.q !== this.props.q) {
        this.setState({
          q: nextProps.q
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var showZone = _props.showZone;
      var className = _props.className;
      var translate = _props.translate;
      var enabledFocusBlur = _props.enabledFocusBlur;
      var _state = this.state;
      var isFocused = _state.isFocused;
      var fuzzyQuery = _state.fuzzyQuery;
      var q = _state.q;
      var results = _state.results;
      var isOpen = _state.isOpen;

      var klass = (0, _classnames2['default'])('ola-suggestions', { 'ola-js-hide': !isOpen });
      var klassContainer;
      if (enabledFocusBlur) {
        klassContainer = (0, _classnames2['default'])(className, {
          'ola-autosuggest-focus': isFocused,
          'ola-autosuggest-blur': !isFocused,
          'ola-speech-not-supported': !(window.SpeechRecognition || window.webkitSpeechRecognition)
        });
      } else {
        klassContainer = className;
      }
      var queryTerm = fuzzyQuery ? fuzzyQuery.term || q : q;

      return _react2['default'].createElement(
        'div',
        { className: klassContainer },
        _react2['default'].createElement(
          'div',
          { className: this.props.containerClass },
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
            onSearchButtonClick: this.props.onSearchButtonClick,
            results: results,
            showZone: showZone,
            fuzzyQuery: fuzzyQuery,
            showGeoLocation: this.props.showGeoLocation,
            onGeoLocationSuccess: this.props.onGeoLocationSuccess,
            onGeoLocationDisable: this.props.onGeoLocationDisable
          }),
          _react2['default'].createElement(
            'div',
            { className: klass },
            _react2['default'].createElement(
              'div',
              { className: 'ola-suggestions-wrapper', ref: 'suggestionsContainer' },
              _react2['default'].createElement(_FuzzySuggestions2['default'], {
                results: results,
                onSelect: this.onFuzzySelect,
                activeClassName: this.props.activeClassName,
                q: q
              })
            )
          )
        )
      );
    }
  }]);

  return AutoComplete;
}(_react2['default'].Component);

AutoComplete.contextTypes = {
  config: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object, _react2['default'].PropTypes.func])
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
  enabledFocusBlur: true,
  showGeoLocation: false,
  categoryGroup: 'section_s',
  visibleCategoryGroups: [] };


module.exports = (0, _reactRedux.connect)(null, { executeFuzzyAutoSuggest: _AutoSuggest.executeFuzzyAutoSuggest, updateQueryTerm: _Search.updateQueryTerm, replaceFacet: _Search.replaceFacet, removeAllFacets: _Search.removeAllFacets })((0, _OlaTranslate2['default'])((0, _reactOnclickoutside2['default'])(AutoComplete)));