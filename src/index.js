/**
 * OLA SEARCH
 * ----
 * User interface elements for search
 *
 * Contributors
 * ----
 * Vinay M <vinay@olasearch.com>
 */

/* Components */
export OlaProvider from './containers/OlaProvider'
export OlaIntlProvider from './containers/OlaIntlProvider'
export AutoComplete from './components/AutoComplete'
export Pagination from './components/Pagination'
export SearchFooter from './components/SearchFooter'
export SearchFilters from './components/SearchFilters'
export SearchResults from './components/SearchResults'
export Translate from './components/Misc/Translate'
export SelectedFilters from './components/SelectedFilters'
export SnippetActions from './components/SnippetActions'
export Fields from './components/Fields'
export GeoLocation from './components/Geo/GeoLocation'
export FacetFilters from './components/FacetFilters'
export Sidebar from './components/Sidebar'
export FilterButton from './components/FilterButton'
export SearchTitle from './components/SearchTitle'
export ClearAllFacets from './components/ClearAllFacets'
export PopularKeywords from './components/PopularKeywords'
export ErrorMessage from './components/Error'
export Sort from './components/Sort'
export InstantSearchForm from './components/InstantSearchForm'
export SpellSuggestion from './components/SpellSuggestion'
export TermSuggestion from './components/TermSuggestion'
export PerPage from './components/PerPage'
export Alert from './components/Alert'
export AddAlert from './components/Alert/AddAlert'
export SearchBar from './components/SearchBar'
export ContentWrapper from './components/ContentWrapper'
export SearchContent from './components/SearchContent'
export ProgressBar from './components/ProgressBar'

export * as Actions from './actions'
export * as Decorators from './decorators'
export olaReducer from './reducers'
export * as utilities from './utilities'
export DateParser from './utilities/dateParser'
export urlSync from './services/urlSync'
export * as storage from './services/storage'

/* Store middlewares */
export createOlaMiddleware from './middleware/createOlaMiddleware'
export createPersistMiddleware from './middleware/createPersistMiddleware'
export createStore from './store/createStore'
export prepareStore from './store/prepareStore'

/* Package version */
export version from './constants/Version'
export * as Settings from './constants/Settings'
export * as ActionTypes from './constants/ActionTypes'

/* Facet filters */
export DefaultFilter from './components/FacetFilters/Default'
export FacetCheckbox from './components/FacetFilters/Checkbox'
export Range from './components/FacetFilters/Range'
export Rating from './components/FacetFilters/Rating'
export DatePicker from './components/FacetFilters/DatePicker'
export TagCloud from './components/FacetFilters/TagCloud'
export Hierarchical from './components/FacetFilters/Hierarchical'
export Tabs from './components/FacetFilters/Tabs'

/* Snippet */
export NoResults from './components/Snippets/NoResults'
export DefaultSnippet from './components/Snippets/Default'

/* Answers */
export Answer from './components/Answer'
export AnswerMC from './components/Answer/AnswerMC'
export AnswerToken from './components/Answer/AnswerToken'
