import types from './../constants/ActionTypes'
import { BOOKMARKS_STORAGE_KEY, HISTORY_STORAGE_KEY } from './../constants/Settings'
import storage from './../services/storage'

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
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== action.snippet.id
        )
      }

    case types.ADD_HISTORY:
      return {
        ...state,
        history: [action.history, ...state.history]
      }

    case types.CLEAR_HISTORY:
      return {
        ...state,
        history: []
      }

    case types.TERMINATE_SEARCH:
      return initialState

    case types.OLA_REHYDRATE:
      return {
        ...state,
        bookmarks: storage.get(BOOKMARKS_STORAGE_KEY, action.namespace) || [],
        history: storage.get(HISTORY_STORAGE_KEY, action.namespace) || []
      }

    default:
      return state
  }
}
