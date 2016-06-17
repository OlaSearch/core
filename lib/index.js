'use strict';

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
  AutoSuggest: require('./components/AutoSuggest'),
  Search: require('./containers/Search'),
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
  Actions: {
    AutoSuggest: require('./actions/AutoSuggest'),
    Bookmarks: require('./actions/Bookmarks'),
    Search: require('./actions/Search'),
    Context: require('./actions/Context'),
    History: require('./actions/History'),
    Logger: require('./actions/Logger'),
    Intl: require('./actions/Intl')
  },
  SnippetActions: {
    Bookmark: require('./components/SnippetActions/Bookmark'),
    Share: require('./components/SnippetActions/Share')
  },
  version: require('./constants/Version'),
  Fields: {
    Direction: require('./components/Fields/Direction'),
    Phone: require('./components/Fields/Phone'),
    Rating: require('./components/Fields/Rating'),
    Summary: require('./components/Fields/Summary'),
    HighlightedField: require('./components/Fields/HighlightedField'),
    Thumbnail: require('./components/Fields/Thumbnail'),
    Title: require('./components/Fields/Title'),
    Year: require('./components/Fields/Year'),
    DateField: require('./components/Fields/Date'),
    Map: require('./components/Fields/ImageMap')
  },
  GeoLocation: require('./components/Geo/GeoLocation'),
  FacetFilters: {
    Boolean: require('./components/FacetFilters/Boolean'),
    Checkbox: require('./components/FacetFilters/Checkbox'),
    DatePicker: require('./components/FacetFilters/DateRangePicker'),
    Default: require('./components/FacetFilters/Default'),
    Range: require('./components/FacetFilters/Range'),
    Rating: require('./components/FacetFilters/Rating'),
    Tabs: require('./components/FacetFilters/Tabs')
  },
  Snippets: {
    Default: require('./components/Snippets/Default')
  },
  Decorators: {
    OlaRoute: require('./decorators/OlaRoute'),
    OlaFacetToggle: require('./decorators/OlaFacetToggle'),
    injectTranslate: require('./decorators/olaTranslate')
  },
  olaReducer: require('./reducers'),
  createOlaMiddleware: require('./middleware/createOlaMiddleware'),
  utilities: require('./utilities'),
  DateParser: require('./utilities/dateParser'),
  urlSync: require('./services/urlSync'),
  storage: require('./services/storage'),
  Settings: require('./constants/Settings')
};