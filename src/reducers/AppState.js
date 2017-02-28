import types from './../constants/ActionTypes'
import { BOOKMARKS_STORAGE_KEY, HISTORY_STORAGE_KEY } from './../constants/Settings'
import storage from './../services/storage'

export const initialState = {
  totalResults: 0,
  results: [],
  facets: [],
  spellSuggestions: [],
  suggestedTerm: '',
  isLoading: false,
  isLoadingAnswer: false,
  bookmarks: storage.get(BOOKMARKS_STORAGE_KEY) || [],
  history: storage.get(HISTORY_STORAGE_KEY) || [],
  error: null,
  qt: null,
  namespace: '' /* Used for creating cookies */,
  answer: null /* Used for instant answers */,

  /* Individual result */
  result: [],
  isLoadingResult: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_SEARCH:
      return {
        ...state,
        isLoading: true
      }

    case types.REQUEST_SEARCH_SUCCESS:
      var { results, payload, spellSuggestions, qt, suggestedTerm, totalResults, facets, answer, skipSearchResultsUpdate } = action
      /* Handle skip update */
      if (skipSearchResultsUpdate) {
        return {
          ...state,
          isLoading: false,
          error: null,
          answer
        }
      }
      /* Handle infinite scroll */
      if (payload.appendResult) {
        return {
          ...state,
          results: [ ...state.results, ...results ],
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
        answer,
        isLoading: false,
        error: null
      }

    case types.REQUEST_SEARCH_FAILURE:
      return {
        ...state,
        error: {
          status: action.error.status,
          statusText: action.error.statusText
        }
      }

    case types.REQUEST_RESULT:
      return {
        ...state,
        isLoadingResult: true
      }
    case types.REQUEST_RESULT_SUCCESS:
      return {
        ...state,
        result: action.results,
        isLoadingResult: false
      }

    case types.REQUEST_ANSWER:
      return {
        ...state,
        isLoadingAnswer: true
      }

    case types.REQUEST_ANSWER_SUCCESS:
      return {
        ...state,
        answer: action.answer,
        isLoadingAnswer: false
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
      return {
        ...initialState,
        bookmarks: state.bookmarks,
        history: state.history
      }

    case types.OLA_REHYDRATE:
      return {
        ...state,
        bookmarks: storage.get(BOOKMARKS_STORAGE_KEY, action.namespace) || [],
        history: storage.get(HISTORY_STORAGE_KEY, action.namespace) || [],
        namespace: action.namespace
      }

    default:
      return state
  }
}
