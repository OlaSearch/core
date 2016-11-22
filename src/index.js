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
 *   store: React.PropTypes.object, // Required
 *   config: React.PropTypes.object, // Required
 *   translations: React.PropTypes.object, // Optional
 * }
 *
 */

module.exports = {
  OlaProvider: require('./containers/OlaProvider'),
  OlaIntlProvider: require('./containers/OlaIntlProvider'),
  AutoSuggest: require('./components/AutoSuggest'),
  AutoComplete: require('./components/AutoComplete'),
  InstantSearchForm: require('./components/InstantSearchForm'),
  SpellSuggestion: require('./components/SpellSuggestions/SpellSuggestion'),
  TermSuggestion: require('./components/SpellSuggestions/TermSuggestion'),
  Pagination: require('./components/Pagination'),
  PerPage: require('./components/PerPage'),
  SearchFooter: require('./components/SearchFooter'),
  SearchFilters: require('./components/SearchFilters'),
  SearchResults: require('./components/SearchResults'),
  NoResults: require('./components/Snippets/NoResults'),
  SearchTitle: require('./components/SearchTitle'),
  ClearAllFacets: require('./components/Misc/ClearAllFacets'),
  PopularKeywords: require('./components/Misc/PopularKeywords'),
  Error: require('./components/Misc/Error'),
  Translate: require('./components/Misc/Translate'),
  Tabs: require('./components/FacetFilters/Tabs'),
  SelectedFilters: require('./components/SelectedFilters'),
  Sort: require('./components/Sort'),
  Actions: require('./actions'),
  SnippetActions: {
    Bookmark: require('./components/SnippetActions/Bookmark'),
    Share: require('./components/SnippetActions/Share')
  },
  version: require('./constants/Version'),
  Fields: require('./components/Fields'),
  GeoLocation: require('./components/Geo/GeoLocation'),
  FacetFilters: require('./components/FacetFilters'),
  Snippets: {
    Default: require('./components/Snippets/Default')
  },
  Answer: require('./components/Answer/Answer'),
  Decorators: {
    OlaRoute: require('./decorators/OlaRoute'),
    OlaFacetToggle: require('./decorators/OlaFacetToggle'),
    injectTranslate: require('./decorators/OlaTranslate'),
    withLogger: require('./decorators/OlaLogger')
  },
  olaReducer: require('./reducers'),
  createOlaMiddleware: require('./middleware/createOlaMiddleware'),
  createStore: require('./store/createStore'),
  utilities: require('./utilities'),
  DateParser: require('./utilities/dateParser'),
  urlSync: require('./services/urlSync'),
  storage: require('./services/storage'),
  Settings: require('./constants/Settings'),

  // Filters
  DefaultFilter: require('./components/FacetFilters/Default'),
  FacetCheckbox: require('./components/FacetFilters/Checkbox'),
  Range: require('./components/FacetFilters/Range'),
  RangeNumeric: require('./components/FacetFilters/RangeNumeric'),
  Rating: require('./components/FacetFilters/Rating'),
  DateRangePicker: require('./components/FacetFilters/DateRangePicker'),
  TagCloud: require('./components/FacetFilters/TagCloud'),
  Hierarchical: require('./components/FacetFilters/Hierarchical')
}
