import types from './../constants/ActionTypes'
import {
  BOOKMARKS_STORAGE_KEY,
  HISTORY_STORAGE_KEY,
  ALERT_STORAGE_KEY
} from './../constants/Settings'
import storage from './../services/storage'

export const initialState = {
  totalResults: 0,
  results: [],
  facets: [],
  spellSuggestions: [],
  suggestedTerm: '',
  isLoading: false,
  isLoadingAnswer: false,
  bookmarks: [],
  history: [],
  error: null,
  qt: null,
  namespace: '' /* Used for creating cookies */,
  answer: null /* Used for instant answers */,

  /* Individual result */
  resultIds: [],
  resultsById: {},
  isLoadingResult: false,

  /* Alerts */
  queryIds: [],
  queriesById: {},
  isLoadingAlert: false,

  /* Sidebar */
  isSidebarOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_SEARCH:
      return {
        ...state,
        isLoading: true
      }

    case types.REQUEST_SEARCH_SUCCESS:
      var {
        results,
        payload,
        spellSuggestions,
        qt,
        suggestedTerm,
        totalResults,
        facets,
        answer,
        skipSearchResultsUpdate
      } = action
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
          results: [...state.results, ...results],
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
        resultIds: action.extra.resultIds,
        resultsById: {
          ...state.resultsById,
          ...action.extra.resultsById
        },
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

    case types.UPDATE_HISTORY:
      return {
        ...state,
        history: state.history.map((item) => {
          if (item.q === action.q) {
            return {
              ...item,
              popularity: item.popularity + 1,
              dateAdded: action.dateAdded
            }
          }
          return item
        })
      }

    case types.CLEAR_HISTORY:
      return {
        ...state,
        history: []
      }

    case types.REMOVE_HISTORY:
      return {
        ...state,
        history: state.history.filter(
          ({ q, dateAdded }) =>
            q !== action.result.term && dateAdded !== action.result.dateAdded
        )
      }

    case types.TERMINATE_SEARCH:
      return {
        ...initialState,
        bookmarks: state.bookmarks,
        history: state.history,
        queryIds: state.queryIds,
        queriesById: state.queriesById,
        namespace: state.namespace
      }

    case types.OLA_REHYDRATE:
      let alerts = storage.get(ALERT_STORAGE_KEY, action.namespace)
      return {
        ...state,
        ...alerts,
        bookmarks: storage.get(BOOKMARKS_STORAGE_KEY, action.namespace) || [],
        history: storage.get(HISTORY_STORAGE_KEY, action.namespace) || [],
        namespace: action.namespace
      }

    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen
      }

    case types.REQUEST_ALERT:
      return {
        ...state,
        isLoadingAlert: true
      }

    case types.REQUEST_ALERT_SUCCESS:
      return {
        ...state,
        queriesById: action.extra.queriesById,
        queryIds: action.extra.queryIds,
        isLoadingAlert: false
      }

    case types.REQUEST_ALERT_FAILURE:
      return {
        ...state,
        isLoadingAlert: false
      }

    // case types.REQUEST_CREATE_ALERT_SUCCESS:
    //   return {
    //     ...state,
    //     queryIds: [ ...state.queryIds, action.payload.queryId ],
    //     queriesById: {
    //       ...state.queriesById,
    //     }
    //   }

    case types.REQUEST_DELETE_ALERT_SUCCESS:
      return {
        ...state,
        queryIds: state.queryIds.filter((id) => id !== action.payload.queryId)
      }

    default:
      return state
  }
}
