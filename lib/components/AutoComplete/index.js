'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _AutoSuggest = require('./../../actions/AutoSuggest');

var _Search = require('./../../actions/Search');

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

var _find = require('ramda/src/find');

var _find2 = _interopRequireDefault(_find);

var _propEq = require('ramda/src/propEq');

var _propEq2 = _interopRequireDefault(_propEq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoComplete = function (_React$Component) {
  _inherits(AutoComplete, _React$Component);

  function AutoComplete(props) {
    _classCallCheck(this, AutoComplete);

    var _this = _possibleConstructorReturn(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).call(this, props));

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

      if (allowedCharacters && !(0, _utilities.checkForAllowedCharacters)(term, allowedCharacters)) {
        _this.terminateAutoSuggest();
      } else {
        _this.props.executeFuzzyAutoSuggest(term).then(function (results) {
          if (!results) return;

          /* Parse payload */
          var res = [];
          var categoryFound = false;

          for (var i = 0, len = results.length; i < len; i++) {
            var _results$i = results[i],
                payload = _results$i.payload,
                rest = _objectWithoutProperties(_results$i, ['payload']);

            if (typeof payload === 'string') payload = JSON.parse(payload);
            var isCategory = payload.taxo_terms && payload.taxo_terms.length > 0 && !categoryFound && payload.type !== 'taxonomy';

            /* If categories are found, we will need to create additional array items */
            if (isCategory) {
              var categories = _this.props.visibleCategoryGroups ? payload.taxo_terms.filter(function (item) {
                var _item$split = item.split('|'),
                    _item$split2 = _slicedToArray(_item$split, 1),
                    name = _item$split2[0];

                return _this.props.visibleCategoryGroups.indexOf(name) !== -1;
              }) : payload.taxo_terms;

              var totalCategories = categories.length;
              /* Get the display names of the facets */
              var facet = (0, _find2['default'])((0, _propEq2['default'])('name', payload.taxo_label))(_this.context.config.facets);

              res.push(_extends({}, rest, {
                suggestion_raw: payload.suggestion_raw,
                label: payload.label,
                type: 'query' /* The first item is a query */
              }));
              for (var j = 0; j < totalCategories; j++) {
                var _payload$taxo_terms$j = payload.taxo_terms[j].split('|'),
                    _payload$taxo_terms$j2 = _slicedToArray(_payload$taxo_terms$j, 1),
                    name = _payload$taxo_terms$j2[0];

                var _ref = payload.taxo_paths ? payload.taxo_paths[j].split('|') : [],
                    _ref2 = _slicedToArray(_ref, 1),
                    path = _ref2[0];

                var displayName = facet ? facet.facetNames[name] || name : name;
                res.push(_extends({}, rest, {
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
              res.push(_extends({}, rest, payload));
            }
          }

          _this.setState({
            results: res,
            isOpen: _this.state.q ? !!results.length : false
          });
        });
      }

      /* Remove currently selected item from the autosuggest */
      _this.clearActiveClass();
    };

    _this.onClear = function () {
      _this.clearQueryTerm();
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

      if (!nodes.length) return;

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
      term && _this.updateFuzzyQueryTerm(term);

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

      /* Remove all selected facets */
      /* Keep the selected facets if its a freeform search */
      // this.props.removeAllFacets()

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

    _this.onSelect = function (suggestion) {
      if (_this.props.onSelect) {
        _this.props.onSelect(suggestion, {
          removeAllFacets: _this.props.removeAllFacets,
          updateQueryTerm: _this.props.updateQueryTerm
        });
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
      var type = suggestion.type,
          label = suggestion.label,
          path = suggestion.path;

      var facet = void 0;
      var isTaxonomy = type === 'taxonomy';
      var isEntity = type === 'entity';
      var isQuery = type === 'query';
      var hasQueryTerm = isQuery || isEntity && suggestion.taxo_terms;
      var term = suggestion.suggestion_raw || suggestion.term;
      var stayOpen = options && options.stayOpen;

      if (!stayOpen) {
        _this.setState({
          q: hasQueryTerm ? term : '',
          results: [],
          isOpen: false,
          fuzzyQuery: null
        });
      }

      /**
       * Check if a filter is already applied
       */
      if (_this.props.facets.length) {
        _this.props.updateQueryTerm(term);
        return _this.onSelect(suggestion);
      }

      if (isEntity || isTaxonomy) {
        /* Remove all selected facets */
        _this.props.removeAllFacets();
        /**
         * For Barack Obama in Climate
         */
        if (suggestion.taxo_label && suggestion.taxo_term) {
          facet = (0, _find2['default'])((0, _propEq2['default'])('name', suggestion.taxo_label))(_this.context.config.facets);
          _this.props.replaceFacet(facet, suggestion.taxo_path || suggestion.taxo_term);
          _this.props.updateQueryTerm(term);
        } else {
          facet = (0, _find2['default'])((0, _propEq2['default'])('name', label))(_this.context.config.facets);
          _this.props.replaceFacet(facet, path || term);
          /* Remove query term */
          _this.props.updateQueryTerm('');
        }
      }
      if (isQuery) {
        if (suggestion.taxo_label && suggestion.taxo_term) {
          /* Remove all selected facets */
          _this.props.removeAllFacets();

          facet = (0, _find2['default'])((0, _propEq2['default'])('name', suggestion.taxo_label))(_this.context.config.facets);
          _this.props.replaceFacet(facet, suggestion.taxo_path || suggestion.taxo_term);
        }
        _this.props.updateQueryTerm(term);
      }

      return _this.onSelect(suggestion);
    };

    _this.onFocus = function (event) {
      /* Set scroll position on phone */
      if (_this.props.isPhone && _this.props.scrollOnFocus) {
        document.documentElement.scrollTop = document.body.scrollTop = (0, _utilities.getCoords)(event.target).top - _this.props.scrollPadding;
      }

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

    _this.onSoftBlur = function (event) {
      _this.setState({
        isFocused: false
      });
    };

    _this.registerRef = function (input) {
      _this.suggestionsContainer = input;
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

  _createClass(AutoComplete, [{
    key: 'componentWillReceiveProps',
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
      var _props = this.props,
          showZone = _props.showZone,
          className = _props.className,
          translate = _props.translate,
          enabledFocusBlur = _props.enabledFocusBlur;
      var _state = this.state,
          isFocused = _state.isFocused,
          fuzzyQuery = _state.fuzzyQuery,
          q = _state.q,
          results = _state.results,
          isOpen = _state.isOpen;

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
            handleClose: this.closeAutoSuggest
          }),
          _react2['default'].createElement(
            'div',
            { className: klass },
            _react2['default'].createElement(
              'div',
              { className: 'ola-suggestions-wrapper', ref: this.registerRef },
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
  enabledFocusBlur: true,
  showGeoLocation: false,
  categoryGroup: 'section_s',
  visibleCategoryGroups: null,
  autoFocus: false,
  forceRedirect: false,
  q: '',
  scrollOnFocus: true,
  scrollPadding: 16,
  searchOnSelect: false,
  searchTimeout: 400
};


function mapStateToProps(state, ownProps) {
  return {
    isPhone: state.Device.isPhone,
    facets: state.QueryState.facet_query
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps, { executeFuzzyAutoSuggest: _AutoSuggest.executeFuzzyAutoSuggest, updateQueryTerm: _Search.updateQueryTerm, replaceFacet: _Search.replaceFacet, removeAllFacets: _Search.removeAllFacets, executeSearch: _Search.executeSearch, navigateToResultsPage: _Search.navigateToResultsPage })((0, _OlaTranslate2['default'])((0, _reactOnclickoutside2['default'])(AutoComplete)));