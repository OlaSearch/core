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

module.exports = {
  OlaProvider: require('./containers/OlaProvider'),
  OlaIntlProvider: require('./containers/OlaIntlProvider'),
  AutoComplete: require('./components/AutoComplete'),
  Pagination: require('./components/Pagination'),
  SearchFooter: require('./components/SearchFooter'),
  SearchFilters: require('./components/SearchFilters'),
  SearchResults: require('./components/SearchResults'),
  Translate: require('./components/Misc/Translate'),
  SelectedFilters: require('./components/SelectedFilters'),
  Actions: require('./actions'),
  SnippetActions: require('./components/SnippetActions'),
  version: require('./constants/Version'),
  Fields: require('./components/Fields'),
  GeoLocation: require('./components/Geo/GeoLocation'),
  FacetFilters: require('./components/FacetFilters'),
  Sidebar: require('./components/Sidebar'),
  FilterButton: require('./components/FilterButton'),
  Decorators: {
    OlaRoute: require('./decorators/OlaRoute'),
    OlaFacetToggle: require('./decorators/OlaFacetToggle'),
    injectTranslate: require('./decorators/OlaTranslate'),
    withLogger: require('./decorators/OlaLogger')
  },
  olaReducer: require('./reducers'),
  createOlaMiddleware: require('./middleware/createOlaMiddleware'),
  createStore: require('./store/createStore'),
  prepareStore: require('./store/prepareStore'),
  utilities: require('./utilities'),
  DateParser: require('./utilities/dateParser'),
  urlSync: require('./services/urlSync'),
  storage: require('./services/storage'),
  Settings: require('./constants/Settings'),

  // Filters
  DefaultFilter: require('./components/FacetFilters/Default'),
  FacetCheckbox: require('./components/FacetFilters/Checkbox'),
  Range: require('./components/FacetFilters/Range'),
  // RangeNumeric: require('./components/FacetFilters/RangeNumeric'),
  Rating: require('./components/FacetFilters/Rating'),
  DatePicker: require('./components/FacetFilters/DatePicker'),
  TagCloud: require('./components/FacetFilters/TagCloud'),
  Hierarchical: require('./components/FacetFilters/Hierarchical'),
  Tabs: require('./components/FacetFilters/Tabs'),

  // Optional olasearch/lib/{name}
  NoResults: require('./components/Snippets/NoResults'),
  DefaultSnippet: require('./components/Snippets/Default'),
  SearchTitle: require('./components/SearchTitle'),
  ClearAllFacets: require('./components/ClearAllFacets'),
  PopularKeywords: require('./components/PopularKeywords'),
  Error: require('./components/Error'),
  Answer: require('./components/Answer'),
  Sort: require('./components/Sort'),
  InstantSearchForm: require('./components/InstantSearchForm'),
  SpellSuggestion: require('./components/SpellSuggestion'),
  TermSuggestion: require('./components/TermSuggestion'),
  PerPage: require('./components/PerPage'),
  AutoSuggest: require('./components/AutoSuggest'),
  ActionTypes: require('./constants/ActionTypes')
}
