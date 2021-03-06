// @flow
import types from './../constants/ActionTypes'

type State = {
  totalResults: number,
  results: Array<Object>,
  facets: Array<Object>,
  spellSuggestions: Array<Object>,
  suggestedTerm: string,
  spellCheckSource: ?string,
  isLoading: boolean,
  isLoadingAnswer: boolean,
  bookmarks: Array<Object>,
  history: Array<Object>,
  error: ?string,
  qt: ?number,
  namespace: string,
  answer: ?Object,
  mc: ?Object,
  resultIds: Array<number>,
  resultsById: Object,
  isLoadingResult: boolean,
  queryIds: Array<number>,
  queriesById: Object,
  isLoadingAlert: boolean,
  inProgressAlert: boolean,
  isSidebarOpen: boolean,
  showSearchHelp: boolean,
  filterInAutoComplete: boolean,
  view: 'list' | 'grid',
  allowedCharacters: string,
  searchOnLoad: boolean
}

export const initialState = {
  totalResults: 0,
  results: [],
  facets: [],
  spellSuggestions: [],
  suggestedTerm: '',
  spellCheckSource: null,
  isLoading: false,
  isLoadingAnswer: false,
  bookmarks: [],
  history: [],
  error: null,
  qt: null,
  namespace: '' /* Used for creating cookies */,
  answer: null /* Used for instant answers */,
  mc: null /* Machine comprehension */,
  isLoadingMc: false,

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

  /* Search help */
  showSearchHelp: true,

  /* Settings */
  allowedCharacters: null,
  replaceQueryParamName: false,
  layoutSwitching: true,
  filterInAutoComplete: true,

  /* View */
  view: 'list',
  /* Search on load */
  searchOnLoad: true
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
        spellCheckSource,
        totalResults,
        facets,
        answer,
        mc,
        skipSearchResultsUpdate
      } = action
      /* Handle skip update */
      if (skipSearchResultsUpdate) {
        return {
          ...state,
          isLoading: false,
          error: null,
          answer,
          mc
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
        spellCheckSource,
        qt,
        answer,
        mc,
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
        namespace: state.namespace,
        allowedCharacters: state.allowedCharacters,
        replaceQueryParamName: state.replaceQueryParamName,
        layoutSwitching: state.layoutSwitching,
        filterInAutoComplete: state.filterInAutoComplete,
        searchOnLoad: state.searchOnLoad,
        isSidebarOpen: state.isSidebarOpen
      }

    case types.OLA_REHYDRATE:
      /**
       * Todo - refactor and make pass test
       */
      const { configState, storeState, namespace } = action
      return {
        ...state,
        ...action.storeState /* Includes bookmarks, history */,
        view:
          storeState && storeState.view /* Results view grid|list */
            ? storeState.view
            : initialState.view,
        namespace /* Project namespace */,
        allowedCharacters: configState /* Allowed characters in the query */
          ? configState.allowedCharacters
          : state.allowedCharacters,
        replaceQueryParamName: configState
          ? configState.replaceQueryParamName
          : state.replaceQueryParamName,
        filterInAutoComplete: configState
          ? configState.filterInAutoComplete
          : state.filterInAutoComplete,
        isSidebarOpen: configState && configState.isSidebarOpen,
        searchOnLoad: configState && configState.searchOnLoad
      }

    case types.UPDATE_OLA_PARAMETERS:
      return {
        ...state,
        searchOnLoad:
          action.configState && action.configState.searchOnLoad
            ? action.configState.searchOnLoad
            : state.searchOnLoad
      }

    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen
      }

    case types.OPEN_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: true
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

    case types.REQUEST_MC:
      return {
        ...state,
        isLoadingMc: true
      }

    case types.REQUEST_MC_SUCCESS:
      /* Is the bot requesting for MC */
      if (action.payload.bot) {
        return {
          ...state,
          isLoadingMc: false
        }
      }
      return {
        ...state,
        mc: action.mc,
        isLoadingMc: false
      }

    case types.REQUEST_MC_FAILURE:
      return {
        ...state,
        isLoadingMc: false
      }

    case types.HIDE_SEARCH_HELP:
      return {
        ...state,
        showSearchHelp: false
      }

    case types.CLEAR_SUGGESTED_TERM:
      return {
        ...state,
        suggestedTerm: null
      }

    default:
      return state
  }
}
