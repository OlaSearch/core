'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RANGE_FACETS = exports.RANGE_FACETS = ['range', 'rating', 'daterange', 'datepicker'];
var OLA_STORAGE_KEY = exports.OLA_STORAGE_KEY = 'o_store_';
var CONTEXT_STORAGE_KEY = exports.CONTEXT_STORAGE_KEY = 'o_context_';
var CONTEXT_STORAGE_TTL = exports.CONTEXT_STORAGE_TTL = 0.25; /* Days */
var LOCALE_STORAGE_KEY = exports.LOCALE_STORAGE_KEY = 'o_locale_';
var BOT_STORAGE_KEY = exports.BOT_STORAGE_KEY = 'o_bot_';
var LOCALE_STORAGE_TTL = exports.LOCALE_STORAGE_TTL = 30; /* Days */
var SEARCH_SESSION_KEY = exports.SEARCH_SESSION_KEY = 'o_search_session';
var USER_SESSION_KEY = exports.USER_SESSION_KEY = 'o_user_session'; /* used for analytics only */
var USER_NEW_KEY = exports.USER_NEW_KEY = 'o_new_user';
var USER_SESSION_EXPIRY_DAYS = exports.USER_SESSION_EXPIRY_DAYS = 365;
var INTENT_SESSION_KEY = exports.INTENT_SESSION_KEY = 'o_intent_session';
var INTENT_SESSION_EXPIRY_DAYS = exports.INTENT_SESSION_EXPIRY_DAYS = 365;
var DEFAULT_LOCALE = exports.DEFAULT_LOCALE = 'en';
var LAYOUT_OPTIONS = exports.LAYOUT_OPTIONS = ['list', 'grid'];
var RE_ESCAPE = exports.RE_ESCAPE = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g');
var REMOVE_FROM_QUERY_STRING = exports.REMOVE_FROM_QUERY_STRING = ['isSearchActive', 'searchInput', 'enriched_q', 'per_page', 'skip_intent', 'projectId', 'env', 'ola_collection_name', 'debug', 'skip_facet_fields'];
var SEARCH_COLLECTION_IDENTIFIER = exports.SEARCH_COLLECTION_IDENTIFIER = 'ola_collection_name';
var ALL_VALUES = exports.ALL_VALUES = 'All';
var STYLE_TAG_ID = exports.STYLE_TAG_ID = 'ola-styles';
var MODAL_ROOT_CLASSNAME = exports.MODAL_ROOT_CLASSNAME = 'ola-modal-rootActive';
var TYPE_HISTORY = exports.TYPE_HISTORY = 'history';
var TYPE_TAXONOMY = exports.TYPE_TAXONOMY = 'taxonomy';
var TYPE_ENTITY = exports.TYPE_ENTITY = 'entity';
var TYPE_QUERY = exports.TYPE_QUERY = 'query';
var TYPE_DOC = exports.TYPE_DOC = 'doc';
var TYPE_FACET = exports.TYPE_FACET = 'facet';
var FUZZY_SUGGEST_KEY = exports.FUZZY_SUGGEST_KEY = 'suggest';
var INTENT_SUPPORTED_API_KEYS = exports.INTENT_SUPPORTED_API_KEYS = ['search', 'get'];
var API_IGNORE_LOGGING = exports.API_IGNORE_LOGGING = ['answer', 'get', 'alert'];
var DEFAULT_API_HANDLER = exports.DEFAULT_API_HANDLER = 'default';
var DATE_FORMAT_MOBILE = exports.DATE_FORMAT_MOBILE = 'YYYY-MM-DD';
var DEFAULT_DATE_FORMAT = exports.DEFAULT_DATE_FORMAT = 'DD-MM-YYYY';
var DATEPICKER_YEAR_RANGE = exports.DATEPICKER_YEAR_RANGE = 20;
var DEFAULT_RANGE_TEMPLATE = exports.DEFAULT_RANGE_TEMPLATE = '{name}: {from} - {to}';
var DEFAULT_DISPLAY_DATE_FORMAT = exports.DEFAULT_DISPLAY_DATE_FORMAT = 'DD MMMM YYYY';

var FEEDBACK_INTENT = exports.FEEDBACK_INTENT = 'OLA.FeedbackIntent';
var HELP_INTENT = exports.HELP_INTENT = 'OLA.HelpIntent';
var PROFANITY_INTENT = exports.PROFANITY_INTENT = 'OLA.ProfanityIntent';
var UNFILFILLED_INTENT = exports.UNFILFILLED_INTENT = 'OLA.UnfulfilledIntent';
var WELCOME_INTENT = exports.WELCOME_INTENT = 'OLA.WelcomeIntent';
var NONE_INTENT = exports.NONE_INTENT = 'OLA.NoneIntent';
var DISAMBIGUATION_INTENT_NAME = exports.DISAMBIGUATION_INTENT_NAME = 'OLA.DisambiguateIntent';

var IGNORE_INTENTS = exports.IGNORE_INTENTS = [FEEDBACK_INTENT, HELP_INTENT, PROFANITY_INTENT, UNFILFILLED_INTENT, WELCOME_INTENT, DISAMBIGUATION_INTENT_NAME, NONE_INTENT];

/**
 * Search Input types
 * SPELL_CORRECT: 'spell_suggestion',  Use suggestedTerm in logs to filter these
 * HISTORY: 'history' We are already tracking clicks on history items eventType C, eventLabel History
 */

var SEARCH_INPUTS = exports.SEARCH_INPUTS = {
  KEYBOARD: 'keyboard',
  VOICE: 'voice',
  URL: 'url',
  DID_YOU_MEAN_SUGGESTION: 'autosuggest',
  SUGGESTION: 'suggest'
};