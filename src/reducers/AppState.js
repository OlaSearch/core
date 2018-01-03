// @flow
import types from './../constants/ActionTypes'

type State = {
  totalResults: number,
  results: Array<Object>,
  facets: Array<Object>,
  spellSuggestions: Array<Object>,
  suggestedTerm: string,
  isLoading: boolean,
  isLoadingAnswer: boolean,
  bookmarks: Array<Object>,
  history: Array<Object>,
  error: ?string,
  qt: ?number,
  namespace: string,
  answer: ?Object,
  resultIds: Array<number>,
  resultsById: Object,
  isLoadingResult: boolean,
  queryIds: Array<number>,
  queriesById: Object,
  isLoadingAlert: boolean,
  inProgressAlert: boolean,
  isSidebarOpen: boolean,
  view: 'list' | 'grid'
}

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
  inProgressAlert: false,

  /* Sidebar */
  isSidebarOpen: false,

  /* View */
  view: 'list'
}

export default (state: State = initialState, action: Object) => {
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
      return {
        ...state,
        ...action.storeState,
        view:
          action.storeState && action.storeState.view
            ? action.storeState.view
            : initialState.view,
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

    case types.REQUEST_CREATE_ALERT:
      return {
        ...state,
        inProgressAlert: true
      }

    case types.REQUEST_CREATE_ALERT_SUCCESS:
      const queries = [...state.queryIds, action.extra.queryId]
      return {
        ...state,
        queryIds: queries.filter(function (item, pos) {
          return queries.indexOf(item) == pos
        }),
        queriesById: {
          ...state.queriesById,
          ...action.extra.queriesById
        },
        inProgressAlert: false
      }

    case types.REQUEST_ALERT_DELETE:
      return {
        ...state,
        inProgressAlert: true
      }

    case types.REQUEST_DELETE_ALERT_DOCS_SUCCESS:
      return {
        ...state,
        queriesById: {
          ...state.queriesById,
          [action.payload.queryId]: {
            ...state.queriesById[action.payload.queryId],
            docIds: []
          }
        }
      }

    case types.REQUEST_DELETE_ALERT:
      return {
        ...state,
        inProgressAlert: true
      }

    case types.REQUEST_DELETE_ALERT_SUCCESS:
      return {
        ...state,
        queryIds: state.queryIds.filter((id) => id !== action.payload.queryId),
        inProgressAlert: false
      }

    case types.CHANGE_VIEW:
      return {
        ...state,
        view: action.view
      }

    default:
      return state
  }
}
