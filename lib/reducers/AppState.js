'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var _Settings = require('./../constants/Settings');

var _storage = require('./../services/storage');

var _storage2 = require('../../.babelhelper.js').interopRequireDefault(_storage);

var initialState = exports.initialState = {
  totalResults: 0,
  results: [],
  facets: [],
  spellSuggestions: [],
  suggestedTerm: '',
  isLoading: false,
  isLoadingAnswer: false,
  bookmarks: _storage2['default'].get(_Settings.BOOKMARKS_STORAGE_KEY) || [],
  history: _storage2['default'].get(_Settings.HISTORY_STORAGE_KEY) || [],
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
      return require('../../.babelhelper.js')['extends']({}, state, {
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
          answer = action.answer;

      if (payload.appendResult) {
        return require('../../.babelhelper.js')['extends']({}, state, {
          results: [].concat(require('../../.babelhelper.js').toConsumableArray(state.results), require('../../.babelhelper.js').toConsumableArray(results)),
          isLoading: false,
          error: null
        });
      }

      return require('../../.babelhelper.js')['extends']({}, state, {
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
      return require('../../.babelhelper.js')['extends']({}, state, {
        error: {
          status: action.error.status,
          statusText: action.error.statusText
        }
      });

    case _ActionTypes2['default'].REQUEST_RESULT:
      return require('../../.babelhelper.js')['extends']({}, state, {
        isLoadingResult: true
      });
    case _ActionTypes2['default'].REQUEST_RESULT_SUCCESS:
      return require('../../.babelhelper.js')['extends']({}, state, {
        result: action.results,
        isLoadingResult: false
      });

    case _ActionTypes2['default'].REQUEST_ANSWER:
      return require('../../.babelhelper.js')['extends']({}, state, {
        isLoadingAnswer: true
      });

    case _ActionTypes2['default'].REQUEST_ANSWER_SUCCESS:
      return require('../../.babelhelper.js')['extends']({}, state, {
        answer: action.answer,
        isLoadingAnswer: false
      });

    case _ActionTypes2['default'].ADD_BOOKMARK:
      return require('../../.babelhelper.js')['extends']({}, state, {
        bookmarks: [action.snippet].concat(require('../../.babelhelper.js').toConsumableArray(state.bookmarks))
      });

    case _ActionTypes2['default'].REMOVE_BOOKMARK:
      return require('../../.babelhelper.js')['extends']({}, state, {
        bookmarks: state.bookmarks.filter(function (bookmark) {
          return bookmark.id !== action.snippet.id;
        })
      });

    case _ActionTypes2['default'].ADD_HISTORY:
      return require('../../.babelhelper.js')['extends']({}, state, {
        history: [action.history].concat(require('../../.babelhelper.js').toConsumableArray(state.history))
      });

    case _ActionTypes2['default'].CLEAR_HISTORY:
      return require('../../.babelhelper.js')['extends']({}, state, {
        history: []
      });

    case _ActionTypes2['default'].TERMINATE_SEARCH:
      return require('../../.babelhelper.js')['extends']({}, initialState, {
        bookmarks: state.bookmarks,
        history: state.history
      });

    case _ActionTypes2['default'].OLA_REHYDRATE:
      return require('../../.babelhelper.js')['extends']({}, state, {
        bookmarks: _storage2['default'].get(_Settings.BOOKMARKS_STORAGE_KEY, action.namespace) || [],
        history: _storage2['default'].get(_Settings.HISTORY_STORAGE_KEY, action.namespace) || [],
        namespace: action.namespace
      });

    default:
      return state;
  }
};