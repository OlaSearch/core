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
  bookmarks: _storage2['default'].get(_Settings.BOOKMARKS_STORAGE_KEY) || [],
  history: _storage2['default'].get(_Settings.HISTORY_STORAGE_KEY) || [],
  error: null,
  qt: null,
  namespace: '' /* Used for creating cookies */
};

exports['default'] = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].REQUEST_SEARCH:
      return require('../../.babelhelper.js')['extends']({}, state, {
        isLoading: true
      });

    case _ActionTypes2['default'].REQUEST_SEARCH_SUCCESS:
      var results = action.results;
      var payload = action.payload;
      var spellSuggestions = action.spellSuggestions;
      var qt = action.qt;
      var suggestedTerm = action.suggestedTerm;
      var totalResults = action.totalResults;
      var facets = action.facets;

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
      return initialState;

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