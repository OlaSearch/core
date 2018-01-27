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
import OlaProvider from './containers/OlaProvider'
import OlaIntlProvider from './containers/OlaIntlProvider'
import AutoComplete from './components/AutoComplete'
import Pagination from './components/Pagination'
import SearchFooter from './components/SearchFooter'
import SearchFilters from './components/SearchFilters'
import SearchResults from './components/SearchResults'
import Translate from './components/Misc/Translate'
import SelectedFilters from './components/SelectedFilters'
import SnippetActions from './components/SnippetActions'
import Fields from './components/Fields'
import GeoLocation from './components/Geo/GeoLocation'
import FacetFilters from './components/FacetFilters'
import Sidebar from './components/Sidebar'
import FilterButton from './components/FilterButton'
import SearchTitle from './components/SearchTitle'
import ClearAllFacets from './components/ClearAllFacets'
import PopularKeywords from './components/PopularKeywords'
import ErrorMessage from './components/Error'
import Sort from './components/Sort'
import InstantSearchForm from './components/InstantSearchForm'
import SpellSuggestion from './components/SpellSuggestion'
import TermSuggestion from './components/TermSuggestion'
import PerPage from './components/PerPage'
import Alert from './components/Alert'
import AddAlert from './components/Alert/AddAlert'
import SearchBar from './components/SearchBar'
import ContentWrapper from './components/ContentWrapper'
import SearchContent from './components/SearchContent'
import ProgressBar from './components/ProgressBar'

import * as Actions from './actions'
import * as Decorators from './decorators'
import olaReducer from './reducers'
import * as utilities from './utilities'
import DateParser from './utilities/dateParser'
import urlSync from './services/urlSync'
import * as storage from './services/storage'

/* Store middlewares */
import createOlaMiddleware from './middleware/createOlaMiddleware'
import createPersistMiddleware from './middleware/createPersistMiddleware'
import createStore from './store/createStore'
import prepareStore from './store/prepareStore'

/* Package version */
import version from './constants/Version'
import * as Settings from './constants/Settings'
import * as ActionTypes from './constants/ActionTypes'

/* Facet filters */
import DefaultFilter from './components/FacetFilters/Default'
import FacetCheckbox from './components/FacetFilters/Checkbox'
import Range from './components/FacetFilters/Range'
import Rating from './components/FacetFilters/Rating'
import DatePicker from './components/FacetFilters/DatePicker'
import TagCloud from './components/FacetFilters/TagCloud'
import Hierarchical from './components/FacetFilters/Hierarchical'
import Tabs from './components/FacetFilters/Tabs'

/* Snippet */
import NoResults from './components/Snippets/NoResults'
import DefaultSnippet from './components/Snippets/Default'

/* Answers */
import Answer from './components/Answer'
import AnswerMC from './components/Answer/AnswerMC'
import AnswerToken from './components/Answer/AnswerToken'

export {
  OlaProvider,
  OlaIntlProvider,
  AutoComplete,
  Pagination,
  SearchFooter,
  SearchFilters,
  SearchResults,
  SelectedFilters,
  SnippetActions,
  FacetFilters,
  Fields,
  Sidebar,
  FilterButton,
  Sort,
  InstantSearchForm,
  SpellSuggestion,
  TermSuggestion,
  PerPage,
  Alert,
  AddAlert,
  SearchBar,
  ContentWrapper,
  SearchContent,
  ProgressBar,
  SearchTitle,
  ClearAllFacets,
  PopularKeywords,
  ErrorMessage,
  version,
  Settings,
  Decorators,
  Actions,
  olaReducer,
  utilities,
  DateParser,
  urlSync,
  storage,
  ActionTypes,
  createOlaMiddleware,
  createPersistMiddleware,
  createStore,
  prepareStore,
  DefaultFilter,
  FacetCheckbox,
  Range,
  Rating,
  DatePicker,
  TagCloud,
  Hierarchical,
  Tabs,
  NoResults,
  DefaultSnippet,
  Answer,
  AnswerMC,
  AnswerToken
}
