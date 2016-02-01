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
 * 	<OlaProvider config, parser, searchServices, queryBuilder, store > 
 * 		<YourComponent /> 
 * 	</OlaProvider>, 
 * 	document.getElementById('root'))
 *
 * ContextTypes: {
 *   store: React.PropTypes.object,
 *   config: React.PropTypes.object,
 * }
 * 
 */


var areIntlLocalesSupported = require('intl-locales-supported');
var localesMyAppSupports = [ 'en' ];

if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(localesMyAppSupports)) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and patch the constructors we need with the polyfill's.
        var IntlPolyfill    = require('intl');
        Intl.NumberFormat   = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
} else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
}

module.exports = {
	OlaProvider  : require('./containers/OlaProvider'),
	AutoSuggest  : require('./components/AutoSuggest'),
	Guide: require('./components/Guide'),
	Search: require('./containers/Search'),
	InstantSearch: require('./components/InstantSearchForm'),
	SpellSuggest: require('./components/SpellSuggestions/SpellSuggestion'),
	TermSuggest: require('./components/SpellSuggestions/TermSuggestion'),
	Pagination: require('./components/Pagination'),
    SearchFooter: require('./components/SearchFooter'),
    SearchFilters: require('./components/SearchFilters'),
    SearchResults: require('./components/SearchResults'),
	Tabs: require('./components/FacetFilters/Tabs'),
    SelectedFilters: require('./components/SelectedFilters'),
	Actions: {
		AutoSuggest: require('./actions/AutoSuggest'),
		Bookmarks: require('./actions/Bookmarks'),
		Guide: require('./actions/Guide'),
        Search: require('./actions/Search'),        
		History: require('./actions/History'),
	},
    SnippetActions: {
        Bookmark: require('./components/Snippets/Actions/Bookmark')
    },
	Fields: {
		Direction: require('./components/Snippets/Fields/Direction'),
		Phone: require('./components/Snippets/Fields/Phone'),
		Rating: require('./components/Snippets/Fields/Rating'),
		Summary: require('./components/Snippets/Fields/Summary'),
		Thumbnail: require('./components/Snippets/Fields/Thumbnail'),
		Title: require('./components/Snippets/Fields/Title'),		
		Year: require('./components/Snippets/Fields/Year'),
	},
    FacetFilters: {
        Boolean: require('./components/FacetFilters/Boolean'),
        Checkbox: require('./components/FacetFilters/Checkbox'),
        DateRange: require('./components/FacetFilters/DateRange'),
        Default: require('./components/FacetFilters/Default'),
        Range: require('./components/FacetFilters/Range'),
        Rating: require('./components/FacetFilters/Rating'),
        Tabs: require('./components/FacetFilters/Tabs'),
    },
	Snippets: {
		Default: require('./components/Snippets/Default')
	},
    Decorators: {
        OlaRoute: require('./decorators/OlaRoute'),
        OlaFacetToggle: require('./decorators/OlaFacetToggle'),
    },
    createStore: require('./store'),
    olaReducer: require('./reducers'),
    createOlaMiddleWare: require('./middleware/createOlaMiddleWare'),
}