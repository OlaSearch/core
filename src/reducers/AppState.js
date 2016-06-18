import types from './../constants/ActionTypes'
import { BOOKMARKS_STORAGE_KEY, HISTORY_STORAGE_KEY } from './../constants/Settings'
import storage from './../services/storage'
import { buildQueryString, character as hashCharacter } from './../services/urlSync'
import flatten from 'ramda/src/flatten'
import equals from 'ramda/src/equals'
import omit from 'ramda/src/omit'

var initialState = {
  totalResults: 0,
  results: [],
  facets: [],
  spellSuggestions: [],
  suggestedTerm: '',
  isLoading: false,
  bookmarks: storage.get(BOOKMARKS_STORAGE_KEY) || [],
  history: storage.get(HISTORY_STORAGE_KEY) || [],
  error: null,
  qt: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_SEARCH:
      return {
        ...state,
        isLoading: true
      }

    case types.REQUEST_SEARCH_SUCCESS:

      var { results, appendResult, spellSuggestions, qt, suggestedTerm, totalResults, facets } = action

      if (appendResult) {
        return {
          ...state,
          results: [ ...state.results, ...action.results ],
          isLoading: false,
          error: null
        }
      }

      return {
        ...state,
        results,
        facets,
        spellSuggestions,
        totalResults,
        suggestedTerm,
        qt,
        isLoading: false,
        error: null
      }

    case types.REQUEST_SEARCH_FAILURE:

      var error = {
        status: action.error.status,
        statusText: action.error.statusText
      }

      return {
        ...state,
        error
      }

    case types.ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [action.snippet, ...state.bookmarks]
      }

    case types.REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: [
          ...state.bookmarks.filter(
            (bookmark) => bookmark.id !== action.snippet.id
          )
        ]
      }

    case types.ADD_HISTORY:

      var query = omit(['page', 'per_page', 'referrer'], action.query)
      var { q, facet_query } = query

      /* Get selected facets */
      var activeFacets = flatten(facet_query.map((item) => item.selected))

      /* Check if it already exists */

      var exists = state.history
        .filter((item) => item.q === q && equals(item.facets, activeFacets))

      /* Check if history already exists */

      if (exists.length) return state

      var history = [{
        q,
        url: hashCharacter + buildQueryString(query),
        dateAdded: new Date().getTime(),
        facets: activeFacets
      }, ...state.history]

      return {
        ...state,
        history
      }

    case types.CLEAR_HISTORY:
      return {
        ...state,
        history: []
      }

    case types.TERMINATE_SEARCH:
      return initialState

    case 'OLA_REHYDRATE':
      return {
        ...state,
        bookmarks: storage.get(BOOKMARKS_STORAGE_KEY, action.namespace) || [],
        history: storage.get(HISTORY_STORAGE_KEY, action.namespace) || []
      }

    default:
      return state
  }
}
