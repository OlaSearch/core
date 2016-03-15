'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _InstantSearchForm = require('./../components/InstantSearchForm');

var _InstantSearchForm2 = _interopRequireDefault(_InstantSearchForm);

var _SearchResults = require('./../components/SearchResults');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _NoResults = require('./../components/SearchResults/NoResults');

var _NoResults2 = _interopRequireDefault(_NoResults);

var _SearchFilters = require('./../components/SearchFilters');

var _SearchFilters2 = _interopRequireDefault(_SearchFilters);

var _SelectedFilters = require('./../components/SelectedFilters');

var _SelectedFilters2 = _interopRequireDefault(_SelectedFilters);

var _Tabs = require('./../components/FacetFilters/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _AutoSuggest = require('./../components/AutoSuggest');

var _AutoSuggest2 = _interopRequireDefault(_AutoSuggest);

var _Pagination = require('./../components/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

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

var _reactIntl = require('react-intl');

var _PerPage = require('./../components/PerPage');

var _PerPage2 = _interopRequireDefault(_PerPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_React$Component) {
	_inherits(Search, _React$Component);

	function Search(props) {
		_classCallCheck(this, Search);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Search).call(this, props));

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

	_createClass(Search, [{
		key: 'componentDidMount',
		value: function componentDidMount() {

			this.props.dispatch((0, _Search.initSearch)({ config: this.context.config }));
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
					_react2['default'].createElement('a', { href: 'index.html', className: 'ola-logo' }),
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
						_react2['default'].createElement(
							'h3',
							null,
							_react2['default'].createElement(_reactIntl.FormattedMessage, { id: 'refineResults' })
						),
						_react2['default'].createElement(_ClearAllFacets2['default'], {
							dispatch: dispatch,
							selected: facet_query
						}),
						_react2['default'].createElement(_SearchFilters2['default'], {
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
							_react2['default'].createElement(_Sort2['default'], {
								dispatch: dispatch,
								selected: sort
							}),
							_react2['default'].createElement(_SearchTitle2['default'], {
								totalResults: totalResults,
								page: page,
								perPage: per_page
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
							selected: facet_query
						}),
						_react2['default'].createElement(_SelectedFilters2['default'], {
							facets: facet_query,
							dispatch: dispatch,
							referrer: referrer
						}),
						_react2['default'].createElement(_Error2['default'], {
							error: error
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
							perPage: per_page,
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

module.exports = (0, _reactRedux.connect)(mapStateToProps)((0, _OlaRoute.OlaRoute)(Search));