'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATE_TYPE_KEYS = exports.LOCALE_STORAGE_TTL = exports.LOCALE_STORAGE_KEY = exports.CONTEXT_STORAGE_TTL = exports.CONTEXT_STORAGE_KEY = exports.HISTORY_STORAGE_KEY = exports.BOOKMARKS_STORAGE_KEY = exports.NO_SCRIPT_TAG = exports.RANGE_FACETS = undefined;

var _ActionTypes = require('./ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RANGE_FACETS = exports.RANGE_FACETS = ['range', 'rating', 'daterange'];
var NO_SCRIPT_TAG = exports.NO_SCRIPT_TAG = null;
var BOOKMARKS_STORAGE_KEY = exports.BOOKMARKS_STORAGE_KEY = '_ola_bookmarks_';
var HISTORY_STORAGE_KEY = exports.HISTORY_STORAGE_KEY = '_ola_history_';
var CONTEXT_STORAGE_KEY = exports.CONTEXT_STORAGE_KEY = '_ola_context_';
var CONTEXT_STORAGE_TTL = exports.CONTEXT_STORAGE_TTL = 1 / 24 / 60 * 5;
var LOCALE_STORAGE_KEY = exports.LOCALE_STORAGE_KEY = '_ola_locale_';
var LOCALE_STORAGE_TTL = exports.LOCALE_STORAGE_TTL = 30; /* Days */

var STATE_TYPE_KEYS = exports.STATE_TYPE_KEYS = [_ActionTypes2['default'].ADD_BOOKMARK, _ActionTypes2['default'].REMOVE_BOOKMARK, _ActionTypes2['default'].ADD_HISTORY, _ActionTypes2['default'].CLEAR_HISTORY];