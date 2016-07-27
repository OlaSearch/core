'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RANGE_FACETS = exports.RANGE_FACETS = ['range', 'rating', 'daterange'];
var NO_SCRIPT_TAG = exports.NO_SCRIPT_TAG = null;
var BOOKMARKS_STORAGE_KEY = exports.BOOKMARKS_STORAGE_KEY = '_ola_bookmarks_';
var HISTORY_STORAGE_KEY = exports.HISTORY_STORAGE_KEY = '_ola_history_';
var CONTEXT_STORAGE_KEY = exports.CONTEXT_STORAGE_KEY = '_ola_context_';
var CONTEXT_STORAGE_TTL = exports.CONTEXT_STORAGE_TTL = 1 / 24 / 60 * 5;
var LOCALE_STORAGE_KEY = exports.LOCALE_STORAGE_KEY = '_ola_locale_';
var LOCALE_STORAGE_TTL = exports.LOCALE_STORAGE_TTL = 30; /* Days */

/**
 * Search Input types
 */

var SEARCH_INPUTS = exports.SEARCH_INPUTS = {
  KEYBOARD: 'keyboard',
  VOICE: 'voice',
  URL: 'url',
  DID_YOU_MEAN_SUGGESTION: 'suggestion'
};