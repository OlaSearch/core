'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnswerToken = exports.AnswerMC = exports.Answer = exports.DefaultSnippet = exports.NoResults = exports.Tabs = exports.Hierarchical = exports.TagCloud = exports.DatePicker = exports.Rating = exports.Range = exports.FacetCheckbox = exports.DefaultFilter = exports.prepareStore = exports.createStore = exports.createPersistMiddleware = exports.createOlaMiddleware = exports.ActionTypes = exports.storage = exports.urlSync = exports.DateParser = exports.utilities = exports.olaReducer = exports.Actions = exports.Decorators = exports.Settings = exports.version = exports.ErrorMessage = exports.PopularKeywords = exports.ClearAllFacets = exports.SearchTitle = exports.ProgressBar = exports.SearchContent = exports.ContentWrapper = exports.SearchBar = exports.AddAlert = exports.Alert = exports.PerPage = exports.TermSuggestion = exports.SpellSuggestion = exports.InstantSearchForm = exports.Sort = exports.FilterButton = exports.Sidebar = exports.Fields = exports.FacetFilters = exports.SnippetActions = exports.SelectedFilters = exports.SearchResults = exports.SearchFilters = exports.SearchFooter = exports.Pagination = exports.AutoComplete = exports.OlaIntlProvider = exports.OlaProvider = undefined;

var _OlaProvider = require('./containers/OlaProvider');

var _OlaProvider2 = _interopRequireDefault(_OlaProvider);

var _OlaIntlProvider = require('./containers/OlaIntlProvider');

var _OlaIntlProvider2 = _interopRequireDefault(_OlaIntlProvider);

var _AutoComplete = require('./components/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _Pagination = require('./components/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _SearchFooter = require('./components/SearchFooter');

var _SearchFooter2 = _interopRequireDefault(_SearchFooter);

var _SearchFilters = require('./components/SearchFilters');

var _SearchFilters2 = _interopRequireDefault(_SearchFilters);

var _SearchResults = require('./components/SearchResults');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _Translate = require('./components/Misc/Translate');

var _Translate2 = _interopRequireDefault(_Translate);

var _SelectedFilters = require('./components/SelectedFilters');

var _SelectedFilters2 = _interopRequireDefault(_SelectedFilters);

var _SnippetActions = require('./components/SnippetActions');

var _SnippetActions2 = _interopRequireDefault(_SnippetActions);

var _Fields = require('./components/Fields');

var _Fields2 = _interopRequireDefault(_Fields);

var _GeoLocation = require('./components/Geo/GeoLocation');

var _GeoLocation2 = _interopRequireDefault(_GeoLocation);

var _FacetFilters = require('./components/FacetFilters');

var _FacetFilters2 = _interopRequireDefault(_FacetFilters);

var _Sidebar = require('./components/Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _FilterButton = require('./components/FilterButton');

var _FilterButton2 = _interopRequireDefault(_FilterButton);

var _SearchTitle = require('./components/SearchTitle');

var _SearchTitle2 = _interopRequireDefault(_SearchTitle);

var _ClearAllFacets = require('./components/ClearAllFacets');

var _ClearAllFacets2 = _interopRequireDefault(_ClearAllFacets);

var _PopularKeywords = require('./components/PopularKeywords');

var _PopularKeywords2 = _interopRequireDefault(_PopularKeywords);

var _Error = require('./components/Error');

var _Error2 = _interopRequireDefault(_Error);

var _Sort = require('./components/Sort');

var _Sort2 = _interopRequireDefault(_Sort);

var _InstantSearchForm = require('./components/InstantSearchForm');

var _InstantSearchForm2 = _interopRequireDefault(_InstantSearchForm);

var _SpellSuggestion = require('./components/SpellSuggestion');

var _SpellSuggestion2 = _interopRequireDefault(_SpellSuggestion);

var _TermSuggestion = require('./components/TermSuggestion');

var _TermSuggestion2 = _interopRequireDefault(_TermSuggestion);

var _PerPage = require('./components/PerPage');

var _PerPage2 = _interopRequireDefault(_PerPage);

var _Alert = require('./components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _AddAlert = require('./components/Alert/AddAlert');

var _AddAlert2 = _interopRequireDefault(_AddAlert);

var _SearchBar = require('./components/SearchBar');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _ContentWrapper = require('./components/ContentWrapper');

var _ContentWrapper2 = _interopRequireDefault(_ContentWrapper);

var _SearchContent = require('./components/SearchContent');

var _SearchContent2 = _interopRequireDefault(_SearchContent);

var _ProgressBar = require('./components/ProgressBar');

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _actions = require('./actions');

var Actions = _interopRequireWildcard(_actions);

var _decorators = require('./decorators');

var Decorators = _interopRequireWildcard(_decorators);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _utilities = require('./utilities');

var utilities = _interopRequireWildcard(_utilities);

var _dateParser = require('./utilities/dateParser');

var _dateParser2 = _interopRequireDefault(_dateParser);

var _urlSync = require('./services/urlSync');

var _urlSync2 = _interopRequireDefault(_urlSync);

var _storage = require('./services/storage');

var storage = _interopRequireWildcard(_storage);

var _createOlaMiddleware = require('./middleware/createOlaMiddleware');

var _createOlaMiddleware2 = _interopRequireDefault(_createOlaMiddleware);

var _createPersistMiddleware = require('./middleware/createPersistMiddleware');

var _createPersistMiddleware2 = _interopRequireDefault(_createPersistMiddleware);

var _createStore = require('./store/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _prepareStore = require('./store/prepareStore');

var _prepareStore2 = _interopRequireDefault(_prepareStore);

var _Version = require('./constants/Version');

var _Version2 = _interopRequireDefault(_Version);

var _Settings = require('./constants/Settings');

var Settings = _interopRequireWildcard(_Settings);

var _ActionTypes = require('./constants/ActionTypes');

var ActionTypes = _interopRequireWildcard(_ActionTypes);

var _Default = require('./components/FacetFilters/Default');

var _Default2 = _interopRequireDefault(_Default);

var _Checkbox = require('./components/FacetFilters/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Range = require('./components/FacetFilters/Range');

var _Range2 = _interopRequireDefault(_Range);

var _Rating = require('./components/FacetFilters/Rating');

var _Rating2 = _interopRequireDefault(_Rating);

var _DatePicker = require('./components/FacetFilters/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _TagCloud = require('./components/FacetFilters/TagCloud');

var _TagCloud2 = _interopRequireDefault(_TagCloud);

var _Hierarchical = require('./components/FacetFilters/Hierarchical');

var _Hierarchical2 = _interopRequireDefault(_Hierarchical);

var _Tabs = require('./components/FacetFilters/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _NoResults = require('./components/Snippets/NoResults');

var _NoResults2 = _interopRequireDefault(_NoResults);

var _Default3 = require('./components/Snippets/Default');

var _Default4 = _interopRequireDefault(_Default3);

var _Answer = require('./components/Answer');

var _Answer2 = _interopRequireDefault(_Answer);

var _AnswerMC = require('./components/Answer/AnswerMC');

var _AnswerMC2 = _interopRequireDefault(_AnswerMC);

var _AnswerToken = require('./components/Answer/AnswerToken');

var _AnswerToken2 = _interopRequireDefault(_AnswerToken);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* Package version */


/* Store middlewares */
exports.OlaProvider = _OlaProvider2['default'];
exports.OlaIntlProvider = _OlaIntlProvider2['default'];
exports.AutoComplete = _AutoComplete2['default'];
exports.Pagination = _Pagination2['default'];
exports.SearchFooter = _SearchFooter2['default'];
exports.SearchFilters = _SearchFilters2['default'];
exports.SearchResults = _SearchResults2['default'];
exports.SelectedFilters = _SelectedFilters2['default'];
exports.SnippetActions = _SnippetActions2['default'];
exports.FacetFilters = _FacetFilters2['default'];
exports.Fields = _Fields2['default'];
exports.Sidebar = _Sidebar2['default'];
exports.FilterButton = _FilterButton2['default'];
exports.Sort = _Sort2['default'];
exports.InstantSearchForm = _InstantSearchForm2['default'];
exports.SpellSuggestion = _SpellSuggestion2['default'];
exports.TermSuggestion = _TermSuggestion2['default'];
exports.PerPage = _PerPage2['default'];
exports.Alert = _Alert2['default'];
exports.AddAlert = _AddAlert2['default'];
exports.SearchBar = _SearchBar2['default'];
exports.ContentWrapper = _ContentWrapper2['default'];
exports.SearchContent = _SearchContent2['default'];
exports.ProgressBar = _ProgressBar2['default'];
exports.SearchTitle = _SearchTitle2['default'];
exports.ClearAllFacets = _ClearAllFacets2['default'];
exports.PopularKeywords = _PopularKeywords2['default'];
exports.ErrorMessage = _Error2['default'];
exports.version = _Version2['default'];
exports.Settings = Settings;
exports.Decorators = Decorators;
exports.Actions = Actions;
exports.olaReducer = _reducers2['default'];
exports.utilities = utilities;
exports.DateParser = _dateParser2['default'];
exports.urlSync = _urlSync2['default'];
exports.storage = storage;
exports.ActionTypes = ActionTypes;
exports.createOlaMiddleware = _createOlaMiddleware2['default'];
exports.createPersistMiddleware = _createPersistMiddleware2['default'];
exports.createStore = _createStore2['default'];
exports.prepareStore = _prepareStore2['default'];
exports.DefaultFilter = _Default2['default'];
exports.FacetCheckbox = _Checkbox2['default'];
exports.Range = _Range2['default'];
exports.Rating = _Rating2['default'];
exports.DatePicker = _DatePicker2['default'];
exports.TagCloud = _TagCloud2['default'];
exports.Hierarchical = _Hierarchical2['default'];
exports.Tabs = _Tabs2['default'];
exports.NoResults = _NoResults2['default'];
exports.DefaultSnippet = _Default4['default'];
exports.Answer = _Answer2['default'];
exports.AnswerMC = _AnswerMC2['default'];
exports.AnswerToken = _AnswerToken2['default'];

/* Answers */


/* Snippet */


/* Facet filters */
/**
 * Usage
 *
 * import ReactDOM from 'react';
 * import YourComponent from './YourComponent';
 * import { OlaProvider } from 'olasearch';
 *
 * OlaProvider is a Wrapper for all search components. You have access to the Store,
 * Actions, Dispatcher, Config File
 *
 * ReactDOM.render(
 *  <OlaProvider config, store, translations>
 *    <YourComponent />
 *  </OlaProvider>,
 *  document.getElementById('root')
 *  )
 *
 * ContextTypes: {
 *   store: PropTypes.object, // Required
 *   config: PropTypes.object, // Required
 *   translations: PropTypes.object, // Optional
 * }
 *
 */

/* Components */