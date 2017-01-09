'use strict';

var _react = require('react');

var _react2 = require('../../.babelhelper.js').interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _InstantSearchForm = require('./../components/InstantSearchForm');

var _InstantSearchForm2 = require('../../.babelhelper.js').interopRequireDefault(_InstantSearchForm);

var _NoResults = require('./../components/Snippets/NoResults');

var _NoResults2 = require('../../.babelhelper.js').interopRequireDefault(_NoResults);

var _SearchResults = require('./../components/SearchResults');

var _SearchResults2 = require('../../.babelhelper.js').interopRequireDefault(_SearchResults);

var _SearchFilters = require('./../components/SearchFilters');

var _SearchFilters2 = require('../../.babelhelper.js').interopRequireDefault(_SearchFilters);

var _SelectedFilters = require('./../components/SelectedFilters');

var _SelectedFilters2 = require('../../.babelhelper.js').interopRequireDefault(_SelectedFilters);

var _Tabs = require('./../components/FacetFilters/Tabs');

var _Tabs2 = require('../../.babelhelper.js').interopRequireDefault(_Tabs);

var _SearchTitle = require('./../components/SearchTitle');

var _SearchTitle2 = require('../../.babelhelper.js').interopRequireDefault(_SearchTitle);

var _ClearAllFacets = require('./../components/Misc/ClearAllFacets');

var _ClearAllFacets2 = require('../../.babelhelper.js').interopRequireDefault(_ClearAllFacets);

var _Error = require('./../components/Misc/Error');

var _Error2 = require('../../.babelhelper.js').interopRequireDefault(_Error);

var _TermSuggestion = require('./../components/SpellSuggestions/TermSuggestion');

var _TermSuggestion2 = require('../../.babelhelper.js').interopRequireDefault(_TermSuggestion);

var _SpellSuggestion = require('./../components/SpellSuggestions/SpellSuggestion');

var _SpellSuggestion2 = require('../../.babelhelper.js').interopRequireDefault(_SpellSuggestion);

var _Sort = require('./../components/Sort');

var _Sort2 = require('../../.babelhelper.js').interopRequireDefault(_Sort);

var _SearchFooter = require('./../components/SearchFooter');

var _SearchFooter2 = require('../../.babelhelper.js').interopRequireDefault(_SearchFooter);

var _OlaRoute = require('./../decorators/OlaRoute');

var _Search = require('./../actions/Search');

var _classnames = require('classnames');

var _classnames2 = require('../../.babelhelper.js').interopRequireDefault(_classnames);

var _ref = _react2['default'].createElement('a', { href: 'index.html', className: 'ola-logo' });

var _ref2 = _react2['default'].createElement(
  'h3',
  null,
  'Refine your results'
);

var Search = function (_React$Component) {
  require('../../.babelhelper.js').inherits(Search, _React$Component);

  function Search(props) {
    require('../../.babelhelper.js').classCallCheck(this, Search);

    var _this = require('../../.babelhelper.js').possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

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

  require('../../.babelhelper.js').createClass(Search, [{
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
  config: _react2['default'].PropTypes.object
};


function mapStateToProps(state) {
  return {
    AppState: state.AppState,
    QueryState: state.QueryState,
    Device: state.Device
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)((0, _OlaRoute.olaRoute)(Search));