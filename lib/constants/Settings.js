'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RANGE_FACETS = exports.RANGE_FACETS = ['range', 'rating', 'daterange', 'datepicker'];
var BOOKMARKS_STORAGE_KEY = exports.BOOKMARKS_STORAGE_KEY = '_ola_bookmarks_';
var HISTORY_STORAGE_KEY = exports.HISTORY_STORAGE_KEY = '_ola_history_';
var CONTEXT_STORAGE_KEY = exports.CONTEXT_STORAGE_KEY = '_ola_context_';
var CONTEXT_STORAGE_TTL = exports.CONTEXT_STORAGE_TTL = 30;
var LOCALE_STORAGE_KEY = exports.LOCALE_STORAGE_KEY = '_ola_locale_';
var LOCALE_STORAGE_TTL = exports.LOCALE_STORAGE_TTL = 30; /* Days */
var SEARCH_SESSION_KEY = exports.SEARCH_SESSION_KEY = 'ola_search_session';
var USER_SESSION_KEY = exports.USER_SESSION_KEY = 'ola_user_session'; /* used for analytics only */
var USER_SESSION_EXPIRY_DAYS = exports.USER_SESSION_EXPIRY_DAYS = 365;
var INTENT_SESSION_KEY = exports.INTENT_SESSION_KEY = 'ola_intent_session';
var INTENT_SESSION_EXPIRY_DAYS = exports.INTENT_SESSION_EXPIRY_DAYS = 365;
var RE_ESCAPE = exports.RE_ESCAPE = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g');
var REMOVE_FROM_QUERY_STRING = exports.REMOVE_FROM_QUERY_STRING = ['isSearchActive', 'searchInput', 'enriched_q', 'per_page', 'skip_intent', 'projectId', 'env', 'ola_collection_name'];
var SEARCH_COLLECTION_IDENTIFIER = exports.SEARCH_COLLECTION_IDENTIFIER = 'ola_collection_name';

/**
 * Search Input types
 * SPELL_CORRECT: 'spell_suggestion',  Use suggestedTerm in logs to filter these
 * HISTORY: 'history' We are already tracking clicks on history items eventType C, eventLabel History
 */

var SEARCH_INPUTS = exports.SEARCH_INPUTS = {
  KEYBOARD: 'keyboard',
  VOICE: 'voice',
  URL: 'url',
  DID_YOU_MEAN_SUGGESTION: 'suggestion'
};