'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _componentsInstantSearchForm = require('./../components/InstantSearchForm');

var _componentsInstantSearchForm2 = _interopRequireDefault(_componentsInstantSearchForm);

var _componentsSearchResults = require('./../components/SearchResults');

var _componentsSearchResults2 = _interopRequireDefault(_componentsSearchResults);

var _componentsSearchResultsNoResults = require('./../components/SearchResults/NoResults');

var _componentsSearchResultsNoResults2 = _interopRequireDefault(_componentsSearchResultsNoResults);

var _componentsSearchFilters = require('./../components/SearchFilters');

var _componentsSearchFilters2 = _interopRequireDefault(_componentsSearchFilters);

var _componentsSelectedFilters = require('./../components/SelectedFilters');

var _componentsSelectedFilters2 = _interopRequireDefault(_componentsSelectedFilters);

var _componentsFacetFiltersTabs = require('./../components/FacetFilters/Tabs');

var _componentsFacetFiltersTabs2 = _interopRequireDefault(_componentsFacetFiltersTabs);

var _componentsAutoSuggest = require('./../components/AutoSuggest');

var _componentsAutoSuggest2 = _interopRequireDefault(_componentsAutoSuggest);

var _componentsPagination = require('./../components/Pagination');

var _componentsPagination2 = _interopRequireDefault(_componentsPagination);

var _componentsSearchTitle = require('./../components/SearchTitle');

var _componentsSearchTitle2 = _interopRequireDefault(_componentsSearchTitle);

var _componentsMiscClearAllFacets = require('./../components/misc/ClearAllFacets');

var _componentsMiscClearAllFacets2 = _interopRequireDefault(_componentsMiscClearAllFacets);

var _componentsMiscError = require('./../components/misc/Error');

var _componentsMiscError2 = _interopRequireDefault(_componentsMiscError);

var _componentsSpellSuggestionsTermSuggestion = require('./../components/SpellSuggestions/TermSuggestion');

var _componentsSpellSuggestionsTermSuggestion2 = _interopRequireDefault(_componentsSpellSuggestionsTermSuggestion);

var _componentsSpellSuggestionsSpellSuggestion = require('./../components/SpellSuggestions/SpellSuggestion');

var _componentsSpellSuggestionsSpellSuggestion2 = _interopRequireDefault(_componentsSpellSuggestionsSpellSuggestion);

var _componentsSort = require('./../components/Sort');

var _componentsSort2 = _interopRequireDefault(_componentsSort);

var _componentsSearchFooter = require('./../components/SearchFooter');

var _componentsSearchFooter2 = _interopRequireDefault(_componentsSearchFooter);

var _componentsVisualizationBarChart = require('./../components/Visualization/BarChart');

var _componentsVisualizationBarChart2 = _interopRequireDefault(_componentsVisualizationBarChart);

var _componentsVisualizationPieChart = require('./../components/Visualization/PieChart');

var _componentsVisualizationPieChart2 = _interopRequireDefault(_componentsVisualizationPieChart);

var _decoratorsOlaRoute = require('./../decorators/OlaRoute');

var _actionsSearch = require('./../actions/Search');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactIntl = require('react-intl');

var _componentsPerPage = require('./../components/PerPage');

var _componentsPerPage2 = _interopRequireDefault(_componentsPerPage);

var Search = (function (_React$Component) {
	_inherits(Search, _React$Component);

	function Search(props) {
		var _this = this;

		_classCallCheck(this, _Search);

		_get(Object.getPrototypeOf(_Search.prototype), 'constructor', this).call(this, props);

		this.toggleChart = function () {

			_this.setState({
				showChart: !_this.state.showChart
			});
		};

		this.toggleSidebar = function () {

			_this.setState({
				isSidebarOpen: !_this.state.isSidebarOpen
			});
		};

		this.state = {
			showChart: false
		};
	}

	_createClass(Search, [{
		key: 'componentDidMount',
		value: function componentDidMount() {

			this.props.dispatch((0, _actionsSearch.initSearch)({ config: this.context.config }));
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var dispatch = _props.dispatch;
			var AppState = _props.AppState;
			var QueryState = _props.QueryState;
			var components = _props.components;
			var Device = _props.Device;
			var results = AppState.results;
			var facets = AppState.facets;
			var isLoading = AppState.isLoading;
			var suggestedTerm = AppState.suggestedTerm;
			var spellSuggestions = AppState.spellSuggestions;
			var bookmarks = AppState.bookmarks;
			var totalResults = AppState.totalResults;
			var error = AppState.error;
			var q = QueryState.q;
			var facet_query = QueryState.facet_query;
			var page = QueryState.page;
			var per_page = QueryState.per_page;
			var sort = QueryState.sort;
			var referrer = QueryState.referrer;
			var isPhone = Device.isPhone;
			var isTablet = Device.isTablet;
			var _state = this.state;
			var showChart = _state.showChart;
			var isSidebarOpen = _state.isSidebarOpen;

			var charts = showChart ? _react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement(_componentsVisualizationBarChart2['default'], {
					facets: facets,
					facetName: 'year_i',
					selected: facet_query,
					dispatch: dispatch
				}),
				_react2['default'].createElement(_componentsVisualizationBarChart2['default'], {
					facets: facets,
					facetName: 'year_i',
					selected: facet_query,
					dispatch: dispatch,
					type: 'line'
				}),
				_react2['default'].createElement(_componentsVisualizationPieChart2['default'], {
					facets: facets,
					facetName: 'genres_sm',
					selected: facet_query,
					dispatch: dispatch,
					multiple: false
				})
			) : _react2['default'].createElement('div', null);

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
					_react2['default'].createElement('a', { href: 'index.html', className: 'ola-logo' }),
					_react2['default'].createElement(_componentsInstantSearchForm2['default'], {
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
						_react2['default'].createElement(
							'h3',
							null,
							_react2['default'].createElement(_reactIntl.FormattedMessage, { id: 'refineResults' })
						),
						_react2['default'].createElement(_componentsMiscClearAllFacets2['default'], {
							dispatch: dispatch,
							selected: facet_query
						}),
						_react2['default'].createElement(_componentsSearchFilters2['default'], {
							facets: facets,
							selected: facet_query,
							dispatch: dispatch })
					),
					_react2['default'].createElement(
						'div',
						{ className: 'ola-results-container' },
						_react2['default'].createElement(
							'div',
							{ className: 'ola-title-container' },
							_react2['default'].createElement(_componentsSort2['default'], {
								dispatch: dispatch,
								selected: sort
							}),
							_react2['default'].createElement(
								'a',
								{ className: 'ola-show-viz-link', onClick: this.toggleChart },
								_react2['default'].createElement('em', { className: 'ion-arrow-graph-up-right' }),
								_react2['default'].createElement(
									'span',
									null,
									' ',
									showChart ? 'Hide charts' : 'Show charts'
								)
							),
							_react2['default'].createElement(_componentsSearchTitle2['default'], {
								totalResults: totalResults,
								page: page,
								perPage: per_page
							}),
							_react2['default'].createElement(_componentsSpellSuggestionsTermSuggestion2['default'], {
								term: suggestedTerm,
								q: q
							}),
							_react2['default'].createElement(_componentsSpellSuggestionsSpellSuggestion2['default'], {
								suggestions: spellSuggestions,
								totalResults: totalResults,
								dispatch: dispatch
							})
						),
						_react2['default'].createElement(_componentsFacetFiltersTabs2['default'], {
							facets: facets,
							dispatch: dispatch,
							selected: facet_query
						}),
						_react2['default'].createElement(_componentsSelectedFilters2['default'], {
							facets: facet_query,
							dispatch: dispatch,
							referrer: referrer
						}),
						charts,
						_react2['default'].createElement(_componentsMiscError2['default'], {
							error: error
						}),
						_react2['default'].createElement(_componentsSearchResultsNoResults2['default'], {
							results: results,
							q: q,
							isLoading: isLoading
						}),
						_react2['default'].createElement(_componentsSearchResults2['default'], {
							results: results,
							bookmarks: bookmarks,
							dispatch: dispatch,
							components: components
						}),
						_react2['default'].createElement(_componentsSearchFooter2['default'], {
							totalResults: totalResults,
							currentPage: page,
							perPage: per_page,
							dispatch: dispatch,
							isPhone: isPhone
						})
					)
				)
			);
		}
	}], [{
		key: 'contextTypes',
		value: {
			config: _react2['default'].PropTypes.object
		},
		enumerable: true
	}]);

	var _Search = Search;
	Search = (0, _decoratorsOlaRoute.OlaRoute)(Search) || Search;
	Search = (0, _reactRedux.connect)(function (state) {
		return {
			AppState: state.AppState,
			QueryState: state.QueryState,
			Device: state.Device
		};
	})(Search) || Search;
	return Search;
})(_react2['default'].Component);

exports['default'] = Search;
module.exports = exports['default'];