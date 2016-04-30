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
 *  <OlaProvider config, parser, searchServices, queryBuilder, store >
 *    <YourComponent />
 *  </OlaProvider>,
 *  document.getElementById('root'))
 *
 * ContextTypes: {
 *   store: React.PropTypes.object,
 *   config: React.PropTypes.object,
 * }
 *
 */

var areIntlLocalesSupported = require('intl-locales-supported')
var localesMyAppSupports = [ 'en' ]

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and patch the constructors we need with the polyfill's.
    var IntlPolyfill = require('intl')
    global.Intl.NumberFormat = IntlPolyfill.NumberFormat
    global.Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl')
}

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
  Error: require('./components/Misc/Error'),
  Tabs: require('./components/FacetFilters/Tabs'),
  SelectedFilters: require('./components/SelectedFilters'),
  Sort: require('./components/Sort'),
  Actions: {
    AutoSuggest: require('./actions/AutoSuggest'),
    Bookmarks: require('./actions/Bookmarks'),
    Search: require('./actions/Search'),
    History: require('./actions/History'),
    Logger: require('./actions/Logger')
  },
  SnippetActions: {
    Bookmark: require('./components/SnippetActions/Bookmark'),
    Share: require('./components/SnippetActions/Share')
  },
  Fields: {
    Direction: require('./components/Fields/Direction'),
    Phone: require('./components/Fields/Phone'),
    Rating: require('./components/Fields/Rating'),
    Summary: require('./components/Fields/Summary'),
    HighlightedField: require('./components/Fields/HighlightedField'),
    Thumbnail: require('./components/Fields/Thumbnail'),
    Title: require('./components/Fields/Title'),
    Year: require('./components/Fields/Year'),
    DateField: require('./components/Fields/Date')
  },
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
    OlaFacetToggle: require('./decorators/OlaFacetToggle')
  },
  olaReducer: require('./reducers'),
  createOlaMiddleware: require('./middleware/createOlaMiddleware'),
  ReactIntl: require('react-intl'),
  utilities: require('./utilities'),
  DateParser: require('./utilities/dateParser'),
  urlSync: require('./services/urlSync')
}
