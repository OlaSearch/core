import { getFieldLabel } from './../utilities'

/**
 * Facet types that are used as range. {from} - {to}
 */
export const RANGE_FACETS = ['range', 'rating', 'daterange', 'datepicker']

/**
 * Date facet types
 */
export const DATE_RANGE_FACETS = ['daterange', 'datepicker']

/**
 * Numerical range type
 */
export const NUMERICAL_RANGE = 'range'

/**
 * Cache key suffix for ola store
 */
export const OLA_STORAGE_KEY = 'o_store_'
/**
 * Cache key to store context
 */
export const CONTEXT_STORAGE_KEY = 'o_context_'

/**
 * Context cache ttl
 */
export const CONTEXT_STORAGE_TTL = 0.25 /* Days */

/**
 * Cache key to store locale
 */
export const LOCALE_STORAGE_KEY = 'o_locale_'

/**
 * Ttl of locale storage
 */
export const LOCALE_STORAGE_TTL = 30 /* Days */

/**
 * Cache key to store bot settings
 */
export const BOT_STORAGE_KEY = 'o_bot_'

/**
 * Time to wait before adding data to cache
 */
export const PERSIST_TIMEOUT = 500

/**
 * Search session storage key
 */
export const SEARCH_SESSION_KEY = 'o_search_session'

/**
 * User session/ User id storage key
 */
export const USER_SESSION_KEY = 'o_user_session' /* used for analytics only */

/**
 * Cookie key to store if user is new or returning
 */
export const USER_NEW_KEY = 'o_new_user'

/**
 * Expire new user info after 365 days
 */
export const USER_SESSION_EXPIRY_DAYS = 365

/**
 * Default locale
 */
export const DEFAULT_LOCALE = 'en'

/**
 * Layout switcher options
 */
export const LAYOUT_OPTIONS = ['list', 'grid']

/**
 * Some CMS does not `q` as query string /search?q=hello , We can use `keywords` instead by setting
 * config.replaceQueryParam = true
 */
export const QUERY_ALT_NAME = 'keywords'

/**
 * Escape special characters
 */
export const RE_ESCAPE = new RegExp(
  '(\\' +
    ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join(
      '|\\'
    ) +
    ')',
  'g'
)

/**
 * Remove these values from browser query string when a new search is made
 */
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

/**
 * Ola Collection key
 */
export const SEARCH_COLLECTION_IDENTIFIER = 'ola_collection_name'

/**
 * All value to display in Checkbox Filter
 */
export const ALL_VALUES = 'All'

/**
 * <style> id to be used to insert mobile css
 */
export const STYLE_TAG_ID = 'ola-styles'

/**
 * Classname injected in <html> for mobile devices
 */
export const MODAL_ROOT_CLASSNAME = 'ola-modal-rootActive'

/**
 * History Autocomplete type
 */
export const TYPE_HISTORY = 'history'

/**
 * Taxonomy Autocomplete type
 */
export const TYPE_TAXONOMY = 'taxonomy'

/**
 * Entity Autocomplete type
 */
export const TYPE_ENTITY = 'entity'

/**
 * Query Autocomplete type
 */
export const TYPE_QUERY = 'query'

/**
 * Document Autocomplete type
 */
export const TYPE_DOC = 'doc'

/**
 * Facet Autocomplete type
 */
export const TYPE_FACET = 'facet'

/**
 * Suggest api key
 */
export const FUZZY_SUGGEST_KEY = 'suggest'

/**
 * These `api` support intent
 */
export const INTENT_SUPPORTED_API_KEYS = ['search', 'get']

/**
 * Do not log these `api`
 */
export const API_IGNORE_LOGGING = ['answer', 'get', 'alert']

/**
 * Date format for mobile date input
 */
export const DATE_FORMAT_MOBILE = 'YYYY-MM-DD'

/**
 * Default date format used everywhere
 */
export const DEFAULT_DATE_FORMAT = 'DD-MM-YYYY'

/**
 * Number of years to show in datepicker
 */
export const DATEPICKER_YEAR_RANGE = 20

/**
 * Default range template to be shown in tags
 */
export const DEFAULT_RANGE_TEMPLATE = '{from} - {to}'

/**
 * Default date format in tags
 */
export const DEFAULT_DISPLAY_DATE_FORMAT = 'DD MMMM YYYY'

/**
 * Feedback intent name
 */
export const FEEDBACK_INTENT = 'OLA.FeedbackIntent'

/**
 * Help intent name
 */
export const HELP_INTENT = 'OLA.HelpIntent'

/**
 * Profanity intent name
 */
export const PROFANITY_INTENT = 'OLA.ProfanityIntent'

/**
 * Unfulfilled intent name
 */
export const UNFILFILLED_INTENT = 'OLA.UnfulfilledIntent'

/**
 * Welcome intent name
 */
export const WELCOME_INTENT = 'OLA.WelcomeIntent'

/**
 * None intent name
 */
export const NONE_INTENT = 'OLA.NoneIntent'

/**
 * Disambiguation intent name
 */
export const DISAMBIGUATION_INTENT_NAME = 'OLA.DisambiguateIntent'

/**
 * Autocorrect/Spellcheck query if any of these intents are active
 */
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
 * Check if current env is browser
 */
export const isBrowser = typeof document !== 'undefined'

/**
 * Create filter
 */
export function CREATE_FILTER_OBJECT ({
  name,
  displayName,
  type = 'string',
  isCollapsed = false,
  showSelectedTag = false,
  multiSelect = true,
  config,
  ...rest
}) {
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
export const SLOT_NUMBER = 'OLA.NUMBER'

/**
 * Taxo entity type
 */
export const TAXO_ENTITY = 'taxo_entity'

/**
 * Multivalued
 */

export const SEARCH_FIELD_TYPE_TAXO = '_ss'

/**
 * Event category
 */
export const EVENT_CATEGORY_CARD = 'card'

/**
 * Default theme
 */
export const DEFAULT_THEME = {
  /* Color palette */
  primaryColor: '#2579DA',
  primaryBorderColor: '#2579DA',
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
  chatInputFontSize: '14px',

  chatHeaderColor: 'white',
  chatHeaderBackground: '#2579DA',

  chatBubbleBackground: '#2579DA',
  chatBubbleBackgroundHover: '#2579DA',

  chatUserMessageBackground: '#2579DA',
  chatUserMessageColor: 'white',
  chatBotMessageBackground: '#ddd',
  chatBotMessageColor: '#444',
  chatMessageFontSize: '14px',

  chatMessagePadding: '10px 14px',
  chatSlotsPadding: '9px 14px',
  chatQuickReplyPadding: '9px 14px',

  chatMessageMinHeight: '60px',
  chatMessageBorderRadius: '20px',
  chatTypingIndicatorPadding: '12px 14px',

  /* Slot */

  chatBotSlotButtonColor: '#2579DA',
  chatBotSlotButtonBackground: 'white',
  chatSlotButtonFontSize: '14px',

  /* Quick reply */
  chatQuickReplyColor: '#2579DA',
  chatQuickReplyBackground: 'transparent',
  chatQuickReplyHoverColor: 'white',
  chatQuickReplyHoverBackground: '#2579DA',
  chatQuickReplyFontSize: '14px',
  chatBotWidth: 300,

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
  largeFontSize: '24px',
  titleFontSize: '20px',
  titleFontSizeTablet: '18px',
  titleFontSizeMobile: '18px',

  /* Progress bar */
  progressBarBackground: '#f86936',

  /* Max image height */
  snippetImageMaxHeight: '200px'
}

/**
 * Error codes
 */
export const ERROR_CODES = {
  BOT_NO_EXISTS: 'Bad Request. Invalid bot id.'
}

/**
 * Event trigger names
 */
export const EXTERNAL_EVENT_SEARCH_DONE = 'ola:search_complete'

/**
 * Spellcheck
 * Ola has 2 stages of spellchecking
 * 1. Universal spellchecker
 * 2. Client specific spellchecker (Done by the search engine)
 */
export const SPELLCHECK_SOURCE_UNIVERSAL = 'universal'
export const SPELLCHECK_SOURCE_CONTENT = 'content'

/**
 * Button types
 */
export const BUTTON_TYPE = {
  POSTBACK: 'postback',
  WEB: 'web_url',
  EMAIL: 'email'
}

/**
 * Media breakpoints
 */
export const BREAKPOINT_TABLET = '768px'
export const BREAKPOINT_DESKTOP = '960px'
export const BREAKPOINT_PHONE = '480px'
export const MEDIA_TYPE_DESTOP = 'desktop'
export const MEDIA_TYPE_TABLET = 'tablet'
export const MEDIA_TYPE_PHONE = 'mobile'

/**
 * 1. Background is set to white (cos of iOS bottom padding on input when focused). Input is always white in color. Re-consider this setting
 * 2. height, min-height: 100% => Fix to prevent input from increasing height on iOS
 * 3. margin, padding reset => same as 4
 * 4. overflow hidden => same as 4
 * 5. -webkit-overflow-scrolling => same as 4
 * @return {string}
 */
export const BODY_STYLE_MODAL = `
  .${MODAL_ROOT_CLASSNAME}, .${MODAL_ROOT_CLASSNAME} body {
    -webkit-overflow-scrolling : touch !important;
    overflow: hidden !important;
    height: 100% !important;
    min-height: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    background: white !important;
  }
`

/**
 * Link targets
 */
export const LINK_TARGETS = {
  BLANK: '_blank',
  SELF: 'self'
}

/**
 * Event category for logging
 * eventCategory
 */
export const LOG_EVENT_CATEGORIES = {
  bookmarks: 'Bookmarks',
  autosuggest: 'autosuggest',
  serp: 'serp'
}

/**
 * Event labels for logging
 * eventLabel
 */
export const LOG_EVENT_LABELS = {
  title: 'Title'
}

/**
 * Default autocomplete payload
 */
export const DEFAULT_AUTOCOMPLETE_PAYLOAD = { type: 'query' }

/**
 * Visualizations
 */
export const CHART_DEBOUNCE_TIMING = 300
export const CHART_CATEGORY_NAME = 'category'
