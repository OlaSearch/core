'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _Settings = require('./../constants/Settings');

var _storage = require('./../services/storage');

var _storage2 = _interopRequireDefault(_storage);

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

  , /* Individual result */
  result: [],
  isLoadingResult: false
};

exports['default'] = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].REQUEST_SEARCH:
      return (0, _extends3['default'])({}, state, {
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
          skipSearchResultsUpdate = action.skipSearchResultsUpdate;
      /* Handle skip update */

      if (skipSearchResultsUpdate) {
        return (0, _extends3['default'])({}, state, {
          isLoading: false,
          error: null,
          answer: answer
        });
      }
      /* Handle infinite scroll */
      if (payload.appendResult) {
        return (0, _extends3['default'])({}, state, {
          results: [].concat((0, _toConsumableArray3['default'])(state.results), (0, _toConsumableArray3['default'])(results)),
          isLoading: false,
          error: null
        });
      }

      return (0, _extends3['default'])({}, state, {
        results: results,
        facets: facets,
        spellSuggestions: spellSuggestions,
        totalResults: totalResults,
        suggestedTerm: suggestedTerm,
        qt: qt,
        answer: answer,
        isLoading: false,
        error: null
      });

    case _ActionTypes2['default'].REQUEST_SEARCH_FAILURE:
      return (0, _extends3['default'])({}, state, {
        error: {
          status: action.error.status,
          statusText: action.error.statusText
        }
      });

    case _ActionTypes2['default'].REQUEST_RESULT:
      return (0, _extends3['default'])({}, state, {
        isLoadingResult: true
      });
    case _ActionTypes2['default'].REQUEST_RESULT_SUCCESS:
      return (0, _extends3['default'])({}, state, {
        result: action.results,
        isLoadingResult: false
      });

    case _ActionTypes2['default'].REQUEST_ANSWER:
      return (0, _extends3['default'])({}, state, {
        isLoadingAnswer: true
      });

    case _ActionTypes2['default'].REQUEST_ANSWER_SUCCESS:
      return (0, _extends3['default'])({}, state, {
        answer: action.answer,
        isLoadingAnswer: false
      });

    case _ActionTypes2['default'].ADD_BOOKMARK:
      return (0, _extends3['default'])({}, state, {
        bookmarks: [action.snippet].concat((0, _toConsumableArray3['default'])(state.bookmarks))
      });

    case _ActionTypes2['default'].REMOVE_BOOKMARK:
      return (0, _extends3['default'])({}, state, {
        bookmarks: state.bookmarks.filter(function (bookmark) {
          return bookmark.id !== action.snippet.id;
        })
      });

    case _ActionTypes2['default'].ADD_HISTORY:
      return (0, _extends3['default'])({}, state, {
        history: [action.history].concat((0, _toConsumableArray3['default'])(state.history))
      });

    case _ActionTypes2['default'].CLEAR_HISTORY:
      return (0, _extends3['default'])({}, state, {
        history: []
      });

    case _ActionTypes2['default'].TERMINATE_SEARCH:
      return (0, _extends3['default'])({}, initialState, {
        bookmarks: state.bookmarks,
        history: state.history,
        namespace: state.namespace
      });

    case _ActionTypes2['default'].OLA_REHYDRATE:
      return (0, _extends3['default'])({}, state, {
        bookmarks: _storage2['default'].get(_Settings.BOOKMARKS_STORAGE_KEY, action.namespace) || [],
        history: _storage2['default'].get(_Settings.HISTORY_STORAGE_KEY, action.namespace) || [],
        namespace: action.namespace
      });

    default:
      return state;
  }
};