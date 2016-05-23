'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _storage = require('./../services/storage');

var _storage2 = _interopRequireDefault(_storage);

var _urlSync = require('./../services/urlSync');

var _flatten = require('ramda/src/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _equals = require('ramda/src/equals');

var _equals2 = _interopRequireDefault(_equals);

var _omit = require('ramda/src/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
  totalResults: 0,
  results: [],
  facets: [],
  spellSuggestions: [],
  suggestedTerm: '',
  isLoading: false,
  bookmarks: _storage2['default'].get('bookmarks') || [],
  history: _storage2['default'].get('history') || [],
  locale: 'en-US',
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
      var appendResult = action.appendResult;
      var spellSuggestions = action.spellSuggestions;
      var qt = action.qt;
      var suggestedTerm = action.suggestedTerm;
      var totalResults = action.totalResults;
      var facets = action.facets;


      if (appendResult) {
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

      var bookmarks = [action.snippet].concat(_toConsumableArray(state.bookmarks));

      _storage2['default'].set('bookmarks', bookmarks);

      return _extends({}, state, {
        bookmarks: bookmarks
      });

    case _ActionTypes2['default'].REMOVE_BOOKMARK:

      var _bookmarks = [].concat(_toConsumableArray(state.bookmarks.filter(function (bookmark) {
        return bookmark.id !== action.snippet.id;
      })));

      _storage2['default'].set('bookmarks', _bookmarks);

      return _extends({}, state, {
        bookmarks: _bookmarks
      });

    case _ActionTypes2['default'].ADD_HISTORY:

      var query = (0, _omit2['default'])(['page', 'per_page', 'referrer'], action.query);

      var q = query.q;
      var facet_query = query.facet_query;

      /* Get selected facets */

      var activeFacets = (0, _flatten2['default'])(facet_query.map(function (item) {
        return item.selected;
      }));

      /* Check if it already exists */

      var exists = state.history.filter(function (item) {
        return item.q === q && (0, _equals2['default'])(item.facets, activeFacets);
      });

      /* Check if history already exists */

      if (exists.length) return state;

      var history = [{
        q: q,
        url: _urlSync.character + (0, _urlSync.buildQueryString)(query),
        dateAdded: new Date().getTime(),
        facets: activeFacets
      }].concat(_toConsumableArray(state.history));

      _storage2['default'].set('history', history);

      return _extends({}, state, {
        history: history
      });

    case _ActionTypes2['default'].CLEAR_HISTORY:

      _storage2['default'].set('history', []);

      return _extends({}, state, {
        history: []
      });

    case _ActionTypes2['default'].SET_LOCALE:
      var locale = action.locale;

      return _extends({}, state, {
        locale: locale
      });

    default:
      return state;
  }
};