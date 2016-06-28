'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _Settings = require('./../constants/Settings');

var _storage = require('./../services/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
  totalResults: 0,
  results: [],
  facets: [],
  spellSuggestions: [],
  suggestedTerm: '',
  isLoading: false,
  bookmarks: _storage2['default'].get(_Settings.BOOKMARKS_STORAGE_KEY) || [],
  history: _storage2['default'].get(_Settings.HISTORY_STORAGE_KEY) || [],
  error: null,
  qt: null
};

exports['default'] = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes2['default'].REQUEST_SEARCH:
      return _extends({}, state, {
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
        return _extends({}, state, {
          results: [].concat(_toConsumableArray(state.results), _toConsumableArray(action.results)),
          isLoading: false,
          error: null
        });
      }

      return _extends({}, state, {
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
      var error = {
        status: action.error.status,
        statusText: action.error.statusText
      };

      return _extends({}, state, {
        error: error
      });

    case _ActionTypes2['default'].ADD_BOOKMARK:
      return _extends({}, state, {
        bookmarks: [action.snippet].concat(_toConsumableArray(state.bookmarks))
      });

    case _ActionTypes2['default'].REMOVE_BOOKMARK:
      return _extends({}, state, {
        bookmarks: state.bookmarks.filter(function (bookmark) {
          return bookmark.id !== action.snippet.id;
        })
      });

    case _ActionTypes2['default'].ADD_HISTORY:
      return _extends({}, state, {
        history: [action.history].concat(_toConsumableArray(state.history))
      });

    case _ActionTypes2['default'].CLEAR_HISTORY:
      return _extends({}, state, {
        history: []
      });

    case _ActionTypes2['default'].TERMINATE_SEARCH:
      return initialState;

    case _ActionTypes2['default'].OLA_REHYDRATE:
      return _extends({}, state, {
        bookmarks: _storage2['default'].get(_Settings.BOOKMARKS_STORAGE_KEY, action.namespace) || [],
        history: _storage2['default'].get(_Settings.HISTORY_STORAGE_KEY, action.namespace) || []
      });

    default:
      return state;
  }
};