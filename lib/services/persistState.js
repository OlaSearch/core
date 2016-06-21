'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATE_TYPE_KEYS = exports.debouncePersistState = undefined;

var _utilities = require('./../utilities');

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _storage = require('./../services/storage');

var _storage2 = _interopRequireDefault(_storage);

var _Settings = require('./../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Throttled function which is called from createOlaMiddleware.js
 * @type {[type]}
 */
var PERSIST_TIMEOUT = 500;
var debouncePersistState = exports.debouncePersistState = (0, _utilities.debounce)(persistState, PERSIST_TIMEOUT);

/* Actions to watch */
var STATE_TYPE_KEYS = exports.STATE_TYPE_KEYS = [_ActionTypes2['default'].ADD_BOOKMARK, _ActionTypes2['default'].REMOVE_BOOKMARK, _ActionTypes2['default'].ADD_HISTORY, _ActionTypes2['default'].CLEAR_HISTORY, _ActionTypes2['default'].SET_LOCALE, _ActionTypes2['default'].REQUEST_GEO_LOCATION_SUCCESS, _ActionTypes2['default'].REQUEST_GEO_LOCATION_FAILURE, _ActionTypes2['default'].ADD_CONTEXT, _ActionTypes2['default'].REMOVE_CONTEXT, _ActionTypes2['default'].ADD_DYNAMIC_FIELD, _ActionTypes2['default'].REMOVE_DYNAMIC_FIELD];

/* Based on actions: persist states to localstorage */
function persistState(action, getState, namespace) {
  switch (action.type) {
    case _ActionTypes2['default'].ADD_BOOKMARK:
    case _ActionTypes2['default'].REMOVE_BOOKMARK:
      return _storage2['default'].set(_Settings.BOOKMARKS_STORAGE_KEY, getState().AppState.bookmarks, namespace);

    case _ActionTypes2['default'].ADD_HISTORY:
    case _ActionTypes2['default'].CLEAR_HISTORY:
      return _storage2['default'].set(_Settings.HISTORY_STORAGE_KEY, getState().AppState.history, namespace);

    case _ActionTypes2['default'].SET_LOCALE:
      return _storage2['default'].cookies.set(_Settings.LOCALE_STORAGE_KEY, action.locale, _Settings.LOCALE_STORAGE_TTL);

    case _ActionTypes2['default'].REQUEST_GEO_LOCATION_SUCCESS:
    case _ActionTypes2['default'].REQUEST_GEO_LOCATION_FAILURE:
    case _ActionTypes2['default'].ADD_CONTEXT:
    case _ActionTypes2['default'].REMOVE_CONTEXT:
    case _ActionTypes2['default'].ADD_DYNAMIC_FIELD:
    case _ActionTypes2['default'].REMOVE_DYNAMIC_FIELD:
      return _storage2['default'].cookies.set(_Settings.CONTEXT_STORAGE_KEY, getState().Context, _Settings.CONTEXT_STORAGE_TTL);
  }
}