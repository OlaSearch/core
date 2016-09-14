'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = require('../../../.babelhelper.js').interopRequireDefault(_reactOnclickoutside);

var _AutoSuggest = require('./../../actions/AutoSuggest');

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

    _this.updateQueryTerm = function (term) {
      _this.setState({
        q: term
      });
    };

    _this.clearQueryTerm = function (term) {
      _this.setState({
        q: '',
        fuzzyQuery: null,
        results: [],
        isOpen: false
      });
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

      if (term.length && (0, _utilities.trim)(term) === '') return;

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
        _this.props.executeFuzzyAutoSuggest(term).then(function (res, xhr) {
          var results = res.response.docs;
          _this.setState({
            results: results,
            isOpen: !!results.length
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
      var nodes = _this.refs.suggestionsContainer.querySelectorAll(_this.props.classNames);
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].classList.remove(_this.props.activeClassName);
      }
    };

    _this.onKeyDown = function (direction) {
      var _this$props = _this.props;
      var classNames = _this$props.classNames;
      var activeClassName = _this$props.activeClassName;
      var dispatch = _this$props.dispatch;
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

      /* If onSelect prop is set */
      if (_this.props.onSelect) return _this.props.onSelect(_this.state.q);

      var _this$context$config = _this.context.config;
      var searchPageUrl = _this$context$config.searchPageUrl;
      var history = _this$context$config.history;

      var url = (0, _urlSync.buildQueryString)({ q: _this.state.q });
      window.location.href = searchPageUrl + (0, _urlSync.getHistoryCharacter)(history) + url;
      event && event.preventDefault();
    };

    _this.onFuzzySelect = function (term) {
      var type = term.type;
      var suggestion = term.suggestion;
      var taxo_group = term.taxo_group;
      var taxo_id = term.taxo_id;
      /* If onSelect prop is set */

      if (_this.props.onSelect) {
        _this.closeAutoSuggest();
        _this.setState({
          q: suggestion
        });
        return _this.props.onSelect(term);
      }
      var _this$context$config2 = _this.context.config;
      var searchPageUrl = _this$context$config2.searchPageUrl;
      var history = _this$context$config2.history;

      var url = void 0;
      if (taxo_group) {
        url = (0, _urlSync.buildQueryString)({ facet_query: [{ name: taxo_group, selected: taxo_id }] });
      } else {
        url = (0, _urlSync.buildQueryString)({ q: suggestion });
      }
      window.location.href = searchPageUrl + (0, _urlSync.getHistoryCharacter)(history) + url;
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
      var dispatch = _props.dispatch;
      var AutoSuggest = _props.AutoSuggest;
      var showZone = _props.showZone;
      var viewAllClassName = _props.viewAllClassName;
      var facetSuggestionName = _props.facetSuggestionName;
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
      var queryTerm = fuzzyQuery ? fuzzyQuery.suggestion || q : q;

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
  showGeoLocation: false
};


module.exports = (0, _reactRedux.connect)(null, { executeFuzzyAutoSuggest: _AutoSuggest.executeFuzzyAutoSuggest })((0, _OlaTranslate2['default'])((0, _reactOnclickoutside2['default'])(AutoComplete)));