'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var initialState = exports.initialState = {
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
  namespace: '' /* Used for creating cookies */
  , answer: null /* Used for instant answers */
  , mc: null /* Machine comprehension */
  , isLoadingMc: false,

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

  /* Settings */
  allowedCharacters: null,
  replaceQueryParamName: false,
  showSidebar: true,
  layoutSwitching: true,
  filterInAutoComplete: true,

  /* View */
  view: 'list'
};

exports['default'] = function () {
  var _extends2;

  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].REQUEST_SEARCH:
      return (0, _extends4['default'])({}, state, {
        isLoading: true
      });

    case _ActionTypes2['default'].REQUEST_SEARCH_SUCCESS:
      var results = action.results,
          payload = action.payload,
          spellSuggestions = action.spellSuggestions,
          qt = action.qt,
          suggestedTerm = action.suggestedTerm,
          totalResults = action.totalResults,
          facets = action.facets,
          answer = action.answer,
          mc = action.mc,
          skipSearchResultsUpdate = action.skipSearchResultsUpdate;
      /* Handle skip update */

      if (skipSearchResultsUpdate) {
        return (0, _extends4['default'])({}, state, {
          isLoading: false,
          error: null,
          answer: answer,
          mc: mc
        });
      }
      /* Handle infinite scroll */
      if (payload.appendResult) {
        return (0, _extends4['default'])({}, state, {
          results: [].concat(state.results, results),
          isLoading: false,
          error: null
        });
      }

      return (0, _extends4['default'])({}, state, {
        results: results,
        facets: facets,
        spellSuggestions: spellSuggestions,
        totalResults: totalResults,
        suggestedTerm: suggestedTerm,
        qt: qt,
        answer: answer,
        mc: mc,
        isLoading: false,
        error: null
      });

    case _ActionTypes2['default'].REQUEST_SEARCH_FAILURE:
      return (0, _extends4['default'])({}, state, {
        error: {
          status: action.error.status,
          statusText: action.error.statusText
        }
      });

    case _ActionTypes2['default'].REQUEST_RESULT:
      return (0, _extends4['default'])({}, state, {
        isLoadingResult: true
      });

    case _ActionTypes2['default'].REQUEST_RESULT_SUCCESS:
      return (0, _extends4['default'])({}, state, {
        resultIds: action.extra.resultIds,
        resultsById: (0, _extends4['default'])({}, state.resultsById, action.extra.resultsById),
        isLoadingResult: false
      });

    case _ActionTypes2['default'].REQUEST_ANSWER:
      return (0, _extends4['default'])({}, state, {
        isLoadingAnswer: true
      });

    case _ActionTypes2['default'].REQUEST_ANSWER_SUCCESS:
      return (0, _extends4['default'])({}, state, {
        answer: action.answer,
        isLoadingAnswer: false
      });

    case _ActionTypes2['default'].ADD_BOOKMARK:
      return (0, _extends4['default'])({}, state, {
        bookmarks: [action.snippet].concat(state.bookmarks)
      });

    case _ActionTypes2['default'].REMOVE_BOOKMARK:
      return (0, _extends4['default'])({}, state, {
        bookmarks: state.bookmarks.filter(function (bookmark) {
          return bookmark.id !== action.snippet.id;
        })
      });

    case _ActionTypes2['default'].ADD_HISTORY:
      return (0, _extends4['default'])({}, state, {
        history: [action.history].concat(state.history)
      });

    case _ActionTypes2['default'].UPDATE_HISTORY:
      return (0, _extends4['default'])({}, state, {
        history: state.history.map(function (item) {
          if (item.q === action.q) {
            return (0, _extends4['default'])({}, item, {
              popularity: item.popularity + 1,
              dateAdded: action.dateAdded
            });
          }
          return item;
        })
      });

    case _ActionTypes2['default'].CLEAR_HISTORY:
      return (0, _extends4['default'])({}, state, {
        history: []
      });

    case _ActionTypes2['default'].REMOVE_HISTORY:
      return (0, _extends4['default'])({}, state, {
        history: state.history.filter(function (_ref) {
          var q = _ref.q,
              dateAdded = _ref.dateAdded;
          return q !== action.result.term && dateAdded !== action.result.dateAdded;
        })
      });

    case _ActionTypes2['default'].TERMINATE_SEARCH:
      return (0, _extends4['default'])({}, initialState, {
        bookmarks: state.bookmarks,
        history: state.history,
        queryIds: state.queryIds,
        queriesById: state.queriesById,
        namespace: state.namespace
      });

    case _ActionTypes2['default'].OLA_REHYDRATE:
      return (0, _extends4['default'])({}, state, action.storeState, { /* Includes bookmarks, history */
        view: action.storeState && action.storeState.view /* Results view grid|list */
        ? action.storeState.view : initialState.view,
        namespace: action.namespace /* Project namespace */
        , allowedCharacters: action.configState /* Allowed characters in the query */
        ? action.configState.allowedCharacters : state.allowedCharacters,
        replaceQueryParamName: action.configState ? action.configState.replaceQueryParamName : state.replaceQueryParamName,
        showSidebar: action.configState ? action.configState.showSidebar : state.showSidebar,
        layoutSwitching: action.configState ? action.configState.layoutSwitching : state.layoutSwitching,
        filterInAutoComplete: action.configState ? action.configState.filterInAutoComplete : state.filterInAutoComplete,
        isSidebarOpen: action.configState ? action.configState.showSidebar ? action.storeState.isSidebarOpen : false : state.isSidebarOpen
      });

    case _ActionTypes2['default'].TOGGLE_SIDEBAR:
      return (0, _extends4['default'])({}, state, {
        isSidebarOpen: !state.isSidebarOpen
      });

    case _ActionTypes2['default'].REQUEST_ALERT:
      return (0, _extends4['default'])({}, state, {
        isLoadingAlert: true
      });

    case _ActionTypes2['default'].REQUEST_ALERT_SUCCESS:
      return (0, _extends4['default'])({}, state, {
        queriesById: action.extra.queriesById,
        queryIds: action.extra.queryIds,
        isLoadingAlert: false
      });

    case _ActionTypes2['default'].REQUEST_ALERT_FAILURE:
      return (0, _extends4['default'])({}, state, {
        isLoadingAlert: false
      });

    case _ActionTypes2['default'].REQUEST_CREATE_ALERT:
      return (0, _extends4['default'])({}, state, {
        inProgressAlert: true
      });

    case _ActionTypes2['default'].REQUEST_CREATE_ALERT_SUCCESS:
      var queries = [].concat(state.queryIds, [action.extra.queryId]);
      return (0, _extends4['default'])({}, state, {
        queryIds: queries.filter(function (item, pos) {
          return queries.indexOf(item) == pos;
        }),
        queriesById: (0, _extends4['default'])({}, state.queriesById, action.extra.queriesById),
        inProgressAlert: false
      });

    case _ActionTypes2['default'].REQUEST_ALERT_DELETE:
      return (0, _extends4['default'])({}, state, {
        inProgressAlert: true
      });

    case _ActionTypes2['default'].REQUEST_DELETE_ALERT_DOCS_SUCCESS:
      return (0, _extends4['default'])({}, state, {
        queriesById: (0, _extends4['default'])({}, state.queriesById, (_extends2 = {}, _extends2[action.payload.queryId] = (0, _extends4['default'])({}, state.queriesById[action.payload.queryId], {
          docIds: []
        }), _extends2))
      });

    case _ActionTypes2['default'].REQUEST_DELETE_ALERT:
      return (0, _extends4['default'])({}, state, {
        inProgressAlert: true
      });

    case _ActionTypes2['default'].REQUEST_DELETE_ALERT_SUCCESS:
      return (0, _extends4['default'])({}, state, {
        queryIds: state.queryIds.filter(function (id) {
          return id !== action.payload.queryId;
        }),
        inProgressAlert: false
      });

    case _ActionTypes2['default'].CHANGE_VIEW:
      return (0, _extends4['default'])({}, state, {
        view: action.view
      });

    case _ActionTypes2['default'].REQUEST_MC:
      return (0, _extends4['default'])({}, state, {
        isLoadingMc: true
      });

    case _ActionTypes2['default'].REQUEST_MC_SUCCESS:
      /* Is the bot requesting for MC */
      if (action.payload.bot) {
        return (0, _extends4['default'])({}, state, {
          isLoadingMc: false
        });
      }
      return (0, _extends4['default'])({}, state, {
        mc: action.mc,
        isLoadingMc: false
      });

    case _ActionTypes2['default'].REQUEST_MC_FAILURE:
      return (0, _extends4['default'])({}, state, {
        isLoadingMc: false
      });

    default:
      return state;
  }
};