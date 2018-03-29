import { getFieldLabel } from './../utilities'

export const RANGE_FACETS = ['range', 'rating', 'daterange', 'datepicker']
export const NUMERICAL_RANGE = 'range'
export const OLA_STORAGE_KEY = 'o_store_'
export const CONTEXT_STORAGE_KEY = 'o_context_'
export const CONTEXT_STORAGE_TTL = 0.25 /* Days */
export const LOCALE_STORAGE_KEY = 'o_locale_'
export const BOT_STORAGE_KEY = 'o_bot_'
export const LOCALE_STORAGE_TTL = 30 /* Days */
export const SEARCH_SESSION_KEY = 'o_search_session'
export const USER_SESSION_KEY = 'o_user_session' /* used for analytics only */
export const USER_NEW_KEY = 'o_new_user'
export const USER_SESSION_EXPIRY_DAYS = 365
export const INTENT_SESSION_KEY = 'o_intent_session'
export const INTENT_SESSION_EXPIRY_DAYS = 365
export const DEFAULT_LOCALE = 'en'
export const LAYOUT_OPTIONS = ['list', 'grid']
export const QUERY_ALT_NAME = 'keywords'
export const RE_ESCAPE = new RegExp(
  '(\\' +
    ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join(
      '|\\'
    ) +
    ')',
  'g'
)
export const REMOVE_FROM_QUERY_STRING = [
  'isSearchActive',
  'searchInput',
  'enriched_q',
  'per_page',
  'skip_intent',
  'skip_spellcheck',
  'projectId',
  'env',
  'ola_collection_name',
  'debug',
  'skip_facet_fields'
]
export const SEARCH_COLLECTION_IDENTIFIER = 'ola_collection_name'
export const ALL_VALUES = 'All'
export const STYLE_TAG_ID = 'ola-styles'
export const MODAL_ROOT_CLASSNAME = 'ola-modal-rootActive'
export const TYPE_HISTORY = 'history'
export const TYPE_TAXONOMY = 'taxonomy'
export const TYPE_ENTITY = 'entity'
export const TYPE_QUERY = 'query'
export const TYPE_DOC = 'doc'
export const TYPE_FACET = 'facet'
export const FUZZY_SUGGEST_KEY = 'suggest'
export const INTENT_SUPPORTED_API_KEYS = ['search', 'get']
export const API_IGNORE_LOGGING = ['answer', 'get', 'alert']
export const DEFAULT_API_HANDLER = 'default'
export const DATE_FORMAT_MOBILE = 'YYYY-MM-DD'
export const DEFAULT_DATE_FORMAT = 'DD-MM-YYYY'
export const DATEPICKER_YEAR_RANGE = 20
export const DEFAULT_RANGE_TEMPLATE = '{from} - {to}'
export const DEFAULT_DISPLAY_DATE_FORMAT = 'DD MMMM YYYY'

export const FEEDBACK_INTENT = 'OLA.FeedbackIntent'
export const HELP_INTENT = 'OLA.HelpIntent'
export const PROFANITY_INTENT = 'OLA.ProfanityIntent'
export const UNFILFILLED_INTENT = 'OLA.UnfulfilledIntent'
export const WELCOME_INTENT = 'OLA.WelcomeIntent'
export const NONE_INTENT = 'OLA.NoneIntent'
export const DISAMBIGUATION_INTENT_NAME = 'OLA.DisambiguateIntent'

export const IGNORE_INTENTS = [
  FEEDBACK_INTENT,
  HELP_INTENT,
  PROFANITY_INTENT,
  UNFILFILLED_INTENT,
  WELCOME_INTENT,
  DISAMBIGUATION_INTENT_NAME,
  NONE_INTENT
]

/**
 * Search Input types
 * SPELL_CORRECT: 'spell_suggestion',  Use suggestedTerm in logs to filter these
 * HISTORY: 'history' We are already tracking clicks on history items eventType C, eventLabel History
 */

export const SEARCH_INPUTS = {
  KEYBOARD: 'keyboard',
  VOICE: 'voice',
  URL: 'url',
  DID_YOU_MEAN_SUGGESTION: 'autosuggest',
  SUGGESTION: 'suggest'
}

/**
 * Check env
 */
export const isBrowser = typeof document !== 'undefined'

/**
 * Create filter
 */
export const CREATE_FILTER_OBJECT = ({
  name,
  displayName,
  type = 'string',
  isCollapsed = false,
  showSelectedTag = false,
  multiSelect = true,
  config,
  ...rest
}) => {
  if (config) {
    displayName = getFieldLabel(name, config.fieldLabels)
  }
  return {
    displayName,
    name,
    type,
    multiSelect:
      typeof multiSelect === 'undefined'
        ? RANGE_FACETS.indexOf(type) !== -1
        : multiSelect,
    isCollapsed,
    showSelectedTag,
    ...rest
  }
}

/**
 * Slot types
 */
export const SLOT_DATE = 'OLA.DATE'

/**
 * Taxo entity type
 */
export const TAXO_ENTITY = 'taxo_entity'

/**
 * Multivalued
 */

export const SEARCH_FIELD_TYPE_TAXO = '_ss'

/**
 * Default theme
 */
export const DEFAULT_THEME = {
  /* Color palette */
  primaryColor: '#2579DA',
  primaryInvertColor: 'white',
  secondaryColor: '#2579DA',
  dangerColor: '#f94d3e',
  borderColor: '#ddd',

  /* Search */
  searchLinkColor: '#232323',
  searchLinkHoverColor: '#2579DA',

  /* Chat */
  chatLinkColor: '#2579DA',
  chatLinkHoverColor: '#2579DA',
  chatFontFamily: "'Lato', 'Open Sans', sans-serif",

  chatHeaderColor: 'white',
  chatHeaderBackground: '#2579DA',

  chatBubbleBackground: '#2579DA',
  chatBubbleBackgroundHover: '#2579DA',

  chatUserMessageBackground: '#2579DA',
  chatUserMessageColor: 'white',
  chatBotMessageBackground: '#ddd',
  chatBotMessageColor: '#444',

  /* Slot */

  chatBotSlotButtonColor: '#444',
  chatBotSlotButtonBackground: 'white',

  /* Quick reply */
  chatQuickReplyColor: '#444',
  chatQuickReplyBackground: 'transparent',
  chatQuickReplyHoverColor: 'white',
  chatQuickReplyHoverBackground: '#444',

  chatBackground:
    '#f3f3f3 url("https://cdn.olasearch.com/assets/images/chat-bg.png")',

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
  primaryButtonBackground: '#2579DA',

  /* Secondary button */
  /**
   * Used in
   * pagination
   */
  secondaryButtonColor: '#333',
  secondaryButtonBackground: 'white',

  /* Share button */
  shareButtonColor: '#2579DA',
  shareButtonBackground: 'white',

  /* Font size */
  defaultFontSize: '16px',
  mediumFontSize: '14px',
  smallFontSize: '12px',
  titleFontSize: '20px',

  /* Progress bar */
  progressBarBackground: '#f86936',

  /* Max image height */
  snippetImageMaxHeight: '200px'
}

export const ERROR_CODES = {
  BOT_NO_EXISTS: 'Bad Request. Invalid bot id.'
}

export const EXTERNAL_EVENT_SEARCH_DONE = 'ola:search_complete'
export const SPELLCHECK_SOURCE_UNIVERSAL = 'universal'
export const SPELLCHECK_SOURCE_CONTENT = 'content'

export const BUTTON_TYPE = {
  POSTBACK: 'postback',
  WEB: 'web_url',
  EMAIL: 'email'
}
