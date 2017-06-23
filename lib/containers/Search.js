'use strict';

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

var _InstantSearchForm = require('./../components/InstantSearchForm');

var _InstantSearchForm2 = _interopRequireDefault(_InstantSearchForm);

var _NoResults = require('./../components/Snippets/NoResults');

var _NoResults2 = _interopRequireDefault(_NoResults);

var _SearchResults = require('./../components/SearchResults');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _SearchFilters = require('./../components/SearchFilters');

var _SearchFilters2 = _interopRequireDefault(_SearchFilters);

var _SelectedFilters = require('./../components/SelectedFilters');

var _SelectedFilters2 = _interopRequireDefault(_SelectedFilters);

var _Tabs = require('./../components/FacetFilters/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _SearchTitle = require('./../components/SearchTitle');

var _SearchTitle2 = _interopRequireDefault(_SearchTitle);

var _ClearAllFacets = require('./../components/Misc/ClearAllFacets');

var _ClearAllFacets2 = _interopRequireDefault(_ClearAllFacets);

var _Error = require('./../components/Misc/Error');

var _Error2 = _interopRequireDefault(_Error);

var _TermSuggestion = require('./../components/SpellSuggestions/TermSuggestion');

var _TermSuggestion2 = _interopRequireDefault(_TermSuggestion);

var _SpellSuggestion = require('./../components/SpellSuggestions/SpellSuggestion');

var _SpellSuggestion2 = _interopRequireDefault(_SpellSuggestion);

var _Sort = require('./../components/Sort');

var _Sort2 = _interopRequireDefault(_Sort);

var _SearchFooter = require('./../components/SearchFooter');

var _SearchFooter2 = _interopRequireDefault(_SearchFooter);

var _OlaRoute = require('./../decorators/OlaRoute');

var _Search = require('./../actions/Search');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ref = _react2['default'].createElement('a', { href: 'index.html', className: 'ola-logo' });

var _ref2 = _react2['default'].createElement(
  'h3',
  null,
  'Refine your results'
);

var Search = function (_React$Component) {
  (0, _inherits3['default'])(Search, _React$Component);

  function Search(props) {
    (0, _classCallCheck3['default'])(this, Search);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Search.__proto__ || (0, _getPrototypeOf2['default'])(Search)).call(this, props));

    _this.toggleSidebar = function () {
      _this.setState({
        isSidebarOpen: !_this.state.isSidebarOpen
      });
    };

    _this.state = {
      isSidebarOpen: false
    };
    return _this;
  }

  (0, _createClass3['default'])(Search, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.dispatch((0, _Search.initSearch)({ config: this.context.config }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          dispatch = _props.dispatch,
          AppState = _props.AppState,
          QueryState = _props.QueryState,
          components = _props.components,
          Device = _props.Device;
      var results = AppState.results,
          facets = AppState.facets,
          suggestedTerm = AppState.suggestedTerm,
          spellSuggestions = AppState.spellSuggestions,
          bookmarks = AppState.bookmarks,
          totalResults = AppState.totalResults,
          error = AppState.error,
          isLoading = AppState.isLoading;
      var q = QueryState.q,
          facetQuery = QueryState.facet_query,
          page = QueryState.page,
          perPage = QueryState.per_page,
          sort = QueryState.sort,
          referrer = QueryState.referrer;
      var isPhone = Device.isPhone;
      var isSidebarOpen = this.state.isSidebarOpen;


      var klassSearchContainer = (0, _classnames2['default'])({
        'ola-search-container': true,
        'ola-sidebar-open': isSidebarOpen
      });

      var klassModal = (0, _classnames2['default'])({
        'ola-modal-background': true,
        'ola-modal-hide': !isSidebarOpen,
        'ola-modal-show': isSidebarOpen
      });

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement('div', { className: klassModal, onClick: this.toggleSidebar }),
        _react2['default'].createElement(
          'div',
          { className: 'ola-form-container ola-header-section' },
          _ref,
          _react2['default'].createElement(_InstantSearchForm2['default'], {
            q: q,
            dispatch: dispatch,
            spellSuggestions: spellSuggestions
          })
        ),
        _react2['default'].createElement(
          'div',
          { className: klassSearchContainer },
          _react2['default'].createElement('button', { type: 'button', className: 'ola-link-open-filter', onClick: this.toggleSidebar }),
          _react2['default'].createElement(
            'div',
            { className: 'ola-sidebar' },
            _ref2,
            _react2['default'].createElement(_ClearAllFacets2['default'], {
              dispatch: dispatch,
              selected: facetQuery
            }),
            _react2['default'].createElement(_SearchFilters2['default'], {
              facets: facets,
              selected: facetQuery,
              dispatch: dispatch })
          ),
          _react2['default'].createElement(
            'div',
            { className: 'ola-results-container' },
            _react2['default'].createElement(
              'div',
              { className: 'ola-title-container' },
              _react2['default'].createElement(_Sort2['default'], {
                dispatch: dispatch,
                selected: sort
              }),
              _react2['default'].createElement(_SearchTitle2['default'], {
                totalResults: totalResults,
                page: page,
                perPage: perPage
              }),
              _react2['default'].createElement(_TermSuggestion2['default'], {
                term: suggestedTerm,
                q: q
              }),
              _react2['default'].createElement(_SpellSuggestion2['default'], {
                suggestions: spellSuggestions,
                totalResults: totalResults,
                dispatch: dispatch
              })
            ),
            _react2['default'].createElement(_Tabs2['default'], {
              facets: facets,
              dispatch: dispatch,
              selected: facetQuery
            }),
            _react2['default'].createElement(_SelectedFilters2['default'], {
              facets: facetQuery,
              dispatch: dispatch,
              referrer: referrer
            }),
            _react2['default'].createElement(_Error2['default'], {
              error: error
            }),
            _react2['default'].createElement(_NoResults2['default'], {
              results: results,
              isLoading: isLoading
            }),
            _react2['default'].createElement(_SearchResults2['default'], {
              q: q,
              results: results,
              bookmarks: bookmarks,
              dispatch: dispatch,
              components: components
            }),
            _react2['default'].createElement(_SearchFooter2['default'], {
              totalResults: totalResults,
              currentPage: page,
              perPage: perPage,
              dispatch: dispatch,
              isPhone: isPhone
            })
          )
        )
      );
    }
  }]);
  return Search;
}(_react2['default'].Component);

Search.contextTypes = {
  config: _propTypes2['default'].object
};


function mapStateToProps(state) {
  return {
    AppState: state.AppState,
    QueryState: state.QueryState,
    Device: state.Device
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)((0, _OlaRoute.olaRoute)(Search));