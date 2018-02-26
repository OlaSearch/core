'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATE_TYPE_KEYS = exports.statesToTrack = exports.debouncePersistState = undefined;

var _utilities = require('./../utilities');

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _storage = require('./../services/storage');

var _Settings = require('./../constants/Settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Throttled function which is called from createOlaMiddleware.js
 * @type {[type]}
 */
var PERSIST_TIMEOUT = 500;
var debouncePersistState = exports.debouncePersistState = (0, _utilities.debounce)(persistState, PERSIST_TIMEOUT);
var statesToTrack = exports.statesToTrack = ['history', 'bookmarks', 'isSidebarOpen', 'showSearchHelp', 'queryIds', 'queriesById', 'view'];

/* Actions to watch */
var STATE_TYPE_KEYS = exports.STATE_TYPE_KEYS = [_ActionTypes2['default'].ADD_BOOKMARK, _ActionTypes2['default'].REMOVE_BOOKMARK, _ActionTypes2['default'].ADD_HISTORY, _ActionTypes2['default'].CLEAR_HISTORY, _ActionTypes2['default'].SET_LOCALE, _ActionTypes2['default'].REQUEST_GEO_LOCATION_SUCCESS, _ActionTypes2['default'].REQUEST_GEO_LOCATION_FAILURE, _ActionTypes2['default'].ADD_CONTEXT_FIELD, _ActionTypes2['default'].REMOVE_CONTEXT_FIELD, _ActionTypes2['default'].REMOVE_CONTEXT_LOCATION, _ActionTypes2['default'].UPDATE_HISTORY, _ActionTypes2['default'].REMOVE_HISTORY, _ActionTypes2['default'].REQUEST_ALERT_SUCCESS, _ActionTypes2['default'].REQUEST_DELETE_ALERT_SUCCESS, _ActionTypes2['default'].REQUEST_CREATE_ALERT_SUCCESS, _ActionTypes2['default'].TOGGLE_SIDEBAR, _ActionTypes2['default'].CHANGE_VIEW, _ActionTypes2['default'].HIDE_SEARCH_HELP];

/* Based on actions: persist states to localstorage */
function persistState(action, getState, namespace) {
  var state = getState();
  switch (action.type) {
    case _ActionTypes2['default'].REQUEST_GEO_LOCATION_SUCCESS:
    case _ActionTypes2['default'].REQUEST_GEO_LOCATION_FAILURE:
    case _ActionTypes2['default'].ADD_CONTEXT_FIELD:
    case _ActionTypes2['default'].REMOVE_CONTEXT_FIELD:
    case _ActionTypes2['default'].REMOVE_CONTEXT_LOCATION:
      return _storage.cookies.set(_Settings.CONTEXT_STORAGE_KEY, state.Context, _Settings.CONTEXT_STORAGE_TTL, namespace);
    case _ActionTypes2['default'].SET_LOCALE:
      return _storage.cookies.set(_Settings.LOCALE_STORAGE_KEY, state.Intl.locale, _Settings.LOCALE_STORAGE_TTL, namespace);

    case _ActionTypes2['default'].ADD_HISTORY:
    case _ActionTypes2['default'].CLEAR_HISTORY:
    case _ActionTypes2['default'].UPDATE_HISTORY:
    case _ActionTypes2['default'].REMOVE_HISTORY:
    case _ActionTypes2['default'].ADD_BOOKMARK:
    case _ActionTypes2['default'].REMOVE_BOOKMARK:
    case _ActionTypes2['default'].REQUEST_ALERT_SUCCESS:
    case _ActionTypes2['default'].REQUEST_DELETE_ALERT_SUCCESS:
    case _ActionTypes2['default'].REQUEST_CREATE_ALERT_SUCCESS:
    case _ActionTypes2['default'].TOGGLE_SIDEBAR:
    case _ActionTypes2['default'].CHANGE_VIEW:
    case _ActionTypes2['default'].HIDE_SEARCH_HELP:
      return (0, _storage.set)(_Settings.OLA_STORAGE_KEY, (0, _utilities.pick)(statesToTrack, state.AppState), namespace);
  }
}