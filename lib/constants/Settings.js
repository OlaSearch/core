'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_THEME = exports.SLOT_DATE = exports.CREATE_FILTER_OBJECT = exports.isBrowser = exports.SEARCH_INPUTS = exports.IGNORE_INTENTS = exports.DISAMBIGUATION_INTENT_NAME = exports.NONE_INTENT = exports.WELCOME_INTENT = exports.UNFILFILLED_INTENT = exports.PROFANITY_INTENT = exports.HELP_INTENT = exports.FEEDBACK_INTENT = exports.DEFAULT_DISPLAY_DATE_FORMAT = exports.DEFAULT_RANGE_TEMPLATE = exports.DATEPICKER_YEAR_RANGE = exports.DEFAULT_DATE_FORMAT = exports.DATE_FORMAT_MOBILE = exports.DEFAULT_API_HANDLER = exports.API_IGNORE_LOGGING = exports.INTENT_SUPPORTED_API_KEYS = exports.FUZZY_SUGGEST_KEY = exports.TYPE_FACET = exports.TYPE_DOC = exports.TYPE_QUERY = exports.TYPE_ENTITY = exports.TYPE_TAXONOMY = exports.TYPE_HISTORY = exports.MODAL_ROOT_CLASSNAME = exports.STYLE_TAG_ID = exports.ALL_VALUES = exports.SEARCH_COLLECTION_IDENTIFIER = exports.REMOVE_FROM_QUERY_STRING = exports.RE_ESCAPE = exports.QUERY_ALT_NAME = exports.LAYOUT_OPTIONS = exports.DEFAULT_LOCALE = exports.INTENT_SESSION_EXPIRY_DAYS = exports.INTENT_SESSION_KEY = exports.USER_SESSION_EXPIRY_DAYS = exports.USER_NEW_KEY = exports.USER_SESSION_KEY = exports.SEARCH_SESSION_KEY = exports.LOCALE_STORAGE_TTL = exports.BOT_STORAGE_KEY = exports.LOCALE_STORAGE_KEY = exports.CONTEXT_STORAGE_TTL = exports.CONTEXT_STORAGE_KEY = exports.OLA_STORAGE_KEY = exports.NUMERICAL_RANGE = exports.RANGE_FACETS = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RANGE_FACETS = exports.RANGE_FACETS = ['range', 'rating', 'daterange', 'datepicker'];
var NUMERICAL_RANGE = exports.NUMERICAL_RANGE = 'range';
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
var QUERY_ALT_NAME = exports.QUERY_ALT_NAME = 'keywords';
var RE_ESCAPE = exports.RE_ESCAPE = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g');
var REMOVE_FROM_QUERY_STRING = exports.REMOVE_FROM_QUERY_STRING = ['isSearchActive', 'searchInput', 'enriched_q', 'per_page', 'skip_intent', 'skip_spellcheck', 'projectId', 'env', 'ola_collection_name', 'debug', 'skip_facet_fields'];
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
var DEFAULT_RANGE_TEMPLATE = exports.DEFAULT_RANGE_TEMPLATE = '{from} - {to}';
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

  /**
   * Check env
   */
};var isBrowser = exports.isBrowser = typeof document !== 'undefined';

/**
 * Create filter
 */
var CREATE_FILTER_OBJECT = function CREATE_FILTER_OBJECT(_ref) {
  var name = _ref.name,
      displayName = _ref.displayName,
      type = _ref.type,
      _ref$isCollapsed = _ref.isCollapsed,
      isCollapsed = _ref$isCollapsed === undefined ? false : _ref$isCollapsed,
      _ref$showSelectedTag = _ref.showSelectedTag,
      showSelectedTag = _ref$showSelectedTag === undefined ? false : _ref$showSelectedTag,
      _ref$multiSelect = _ref.multiSelect,
      multiSelect = _ref$multiSelect === undefined ? true : _ref$multiSelect,
      rest = (0, _objectWithoutProperties3['default'])(_ref, ['name', 'displayName', 'type', 'isCollapsed', 'showSelectedTag', 'multiSelect']);

  return (0, _extends3['default'])({
    displayName: displayName,
    name: name,
    type: type,
    multiSelect: typeof multiSelect === 'undefined' ? RANGE_FACETS.indexOf(type) !== -1 : multiSelect,
    isCollapsed: isCollapsed,
    showSelectedTag: showSelectedTag
  }, rest);
};

/**
 * Slot types
 */
exports.CREATE_FILTER_OBJECT = CREATE_FILTER_OBJECT;
var SLOT_DATE = exports.SLOT_DATE = 'OLA.DATE';

/**
 * Default theme
 */
var DEFAULT_THEME = exports.DEFAULT_THEME = {
  /* Color palette */
  primaryColor: '#289dcc',
  primaryInvertColor: 'white',
  secondaryColor: '#289dcc',
  dangerColor: '#f94d3e',
  borderColor: '#ddd',

  /* Search */
  searchLinkColor: '#232323',
  searchLinkHoverColor: '#289dcc',

  /* Chat */
  chatLinkColor: '#289dcc',
  chatLinkHoverColor: '#289dcc',
  chatFontFamily: "'Lato', 'Open Sans', sans-serif",

  chatHeaderColor: 'white',
  chatHeaderBackground: '#289dcc',

  chatBubbleBackground: '#289dcc',
  chatBubbleBackgroundHover: '#289dcc',

  chatUserMessageBackground: '#289dcc',
  chatUserMessageColor: 'white',
  chatBotMessageBackground: '#ddd',
  chatBotMessageColor: '#444',

  chatBotSlotButtonColor: '#444',
  chatBotSlotButtonBackground: 'white',

  /* Primary button */
  /**
   * Used in
   * ola cta button
   * close sidebar
   * slots
   * geo
   *
   */
  primaryButtonColor: 'white',
  primaryButtonBackground: '#289dcc',

  /* Secondary button */
  /**
   * Used in
   * pagination
   */
  secondaryButtonColor: '#333',
  secondaryButtonBackground: 'white',

  /* Share button */
  shareButtonColor: '#289dcc',
  shareButtonBackground: 'white',

  /* Font size */
  defaultFontSize: '16px',
  mediumFontSize: '14px',
  smallFontSize: '12px',
  titleFontSize: '20px',

  /* Progress bar */
  progressBarBackground: '#f86936'
};