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
export * as Fields from './components/Fields'
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
export SearchHeader from './components/SearchHeader'
export ProgressBar from './components/ProgressBar'
export Swipeable from './components/Swipeable'
export Portal from './components/Portal'
export Checkbox from './components/Checkbox'
export Overlay from './components/Overlay'
export Bookmarks, { BookmarksContainer } from './components/Bookmarks'
export Arrow from './components/Arrow'
export Tab from './components/Tab'

export * as Actions from './actions'
export * as Decorators from './decorators'
export * as storage from './services/storage'
export * as utilities from './utilities'
export olaReducer from './reducers'
export DateParser from './utilities/dateParser'
export * as urlSync from './services/urlSync'

/* Store middlewares */
export createOlaMiddleware from './middleware/createOlaMiddleware'
export createPersistMiddleware from './middleware/createPersistMiddleware'
export createStore from './store/createStore'
export * as prepareStore from './store/prepareStore'

/* Package version */
export version from './constants/Version'
export * as Settings from './constants/Settings'
export ActionTypes from './constants/ActionTypes'

/* Facet filters */
export DefaultFilter from './components/FacetFilters/Default'
export FacetCheckbox from './components/FacetFilters/Checkbox'
export Range from './components/FacetFilters/Range'
export Rating from './components/FacetFilters/Rating'
export DatePicker from './components/FacetFilters/DatePicker'
export TagCloud from './components/FacetFilters/TagCloud'
export Hierarchical from './components/FacetFilters/Hierarchical'
export Tabs from './components/FacetFilters/Tabs'
export SelectFilter from './components/FacetFilters/SelectFilter'

/* Snippet */
export NoResults from './components/Snippets/NoResults'
export DefaultSnippet from './components/Snippets/Default'

/* Answers */
export Answer from './components/Answer'
export AnswerList from './components/Answer/AnswerList'
export AnswerWordMap from './components/Answer/AnswerWordMap'
export AnswerMap from './components/Answer/AnswerMap'
export AnswerCard from './components/Answer/AnswerCard'
export AnswerCarousel from './components/Answer/AnswerCarousel'
export AnswerMC from './components/Answer/AnswerMC'
export AnswerVideo from './components/Answer/AnswerVideo'
export AnswerEmbed from './components/Answer/AnswerEmbed'
export AnswerLineChart from './components/Answer/AnswerLineChart'
export AnswerTable from './components/Answer/AnswerTable'
export AnswerArticle from './components/Answer/AnswerArticle'
export SlotSuggestion from './components/SlotSuggestion'

/* Visualization */
export Chart from './components/Visualization/Chart'
export Dashboard from './components/Visualization/Dashboard'

/* Export theme */
export { ThemeProvider, ThemeConsumer } from './containers/ThemeContext'

/* Export config providers */
export { ConfigProvider, ConfigConsumer } from './containers/ConfigContext'
