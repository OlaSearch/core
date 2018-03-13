'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _core = require('@olasearch/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref = _react2['default'].createElement(_core.AnswerToken, null);

var _ref2 = _react2['default'].createElement(_core.FilterButton, null);

var _ref3 = _react2['default'].createElement(_core.Sort, null);

var _ref4 = _react2['default'].createElement(_core.ProgressBar, null);

var _ref5 = _react2['default'].createElement(_core.TermSuggestion, null);

var Search = function (_React$Component) {
  (0, _inherits3['default'])(Search, _React$Component);

  function Search() {
    (0, _classCallCheck3['default'])(this, Search);
    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
  }

  Search.prototype.componentDidMount = function componentDidMount() {
    this.props.dispatch(_core.Actions.Search.initSearch({ config: this.props.config }));
  };

  Search.prototype.render = function render() {
    var _props = this.props,
        dispatch = _props.dispatch,
        AppState = _props.AppState,
        QueryState = _props.QueryState,
        components = _props.components,
        Device = _props.Device;
    var results = AppState.results,
        facets = AppState.facets,
        isLoading = AppState.isLoading,
        suggestedTerm = AppState.suggestedTerm,
        spellSuggestions = AppState.spellSuggestions,
        bookmarks = AppState.bookmarks,
        totalResults = AppState.totalResults,
        error = AppState.error,
        answer = AppState.answer,
        mc = AppState.mc,
        isLoadingAnswer = AppState.isLoadingAnswer,
        isSidebarOpen = AppState.isSidebarOpen,
        filterInAutoComplete = AppState.filterInAutoComplete;
    var q = QueryState.q,
        facet_query = QueryState.facet_query,
        page = QueryState.page,
        per_page = QueryState.per_page,
        referrer = QueryState.referrer,
        isSearchActive = QueryState.isSearchActive;
    var isPhone = Device.isPhone,
        isTablet = Device.isTablet;


    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(_core.SearchBar, {
        q: q,
        showAlert: false,
        showHelp: true,
        wordSuggestion: filterInAutoComplete
      }),
      _react2['default'].createElement(_core.SelectedFilters, {
        facets: facet_query,
        dispatch: dispatch,
        referrer: referrer,
        grouped: false
      }),
      _ref,
      _react2['default'].createElement(
        _core.ContentWrapper,
        null,
        _react2['default'].createElement(
          _core.Sidebar,
          null,
          _react2['default'].createElement(_core.SearchFilters, {
            facets: facets,
            selected: facet_query,
            dispatch: dispatch
          })
        ),
        _react2['default'].createElement(
          _core.SearchContent,
          null,
          _ref2,
          _ref3,
          _react2['default'].createElement(_core.SearchTitle, {
            totalResults: totalResults,
            page: page,
            perPage: per_page,
            isLoading: isLoading,
            isPhone: isPhone
          }),
          _ref4,
          _ref5,
          _react2['default'].createElement(_core.SpellSuggestion, {
            suggestions: spellSuggestions,
            totalResults: totalResults,
            dispatch: this.props.dispatch
          }),
          _react2['default'].createElement(_core.Answer, { answer: answer, mc: mc, isLoading: isLoadingAnswer }),
          _react2['default'].createElement(_core.ErrorMessage, { error: error }),
          _react2['default'].createElement(_core.SearchResults, {
            results: this.props.AppState.results,
            bookmarks: this.props.AppState.bookmarks,
            dispatch: this.props.dispatch
          }),
          _react2['default'].createElement(_core.NoResults, {
            q: q,
            isLoading: isLoading,
            suggestedTerm: suggestedTerm,
            facets: facet_query,
            totalResults: totalResults,
            dispatch: dispatch
          }),
          _react2['default'].createElement(_core.SearchFooter, {
            totalResults: totalResults,
            currentPage: page,
            perPage: per_page,
            dispatch: dispatch,
            isPhone: isPhone,
            isLoading: isLoading
          })
        )
      )
    );
  };

  return Search;
}(_react2['default'].Component);

function mapStateToProps(state) {
  return {
    AppState: state.AppState,
    QueryState: state.QueryState,
    Device: state.Device
  };
}

exports['default'] = (0, _reactRedux.connect)(mapStateToProps)(_core.Decorators.withConfig(_core.Decorators.withRoute(Search)));