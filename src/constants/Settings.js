export const RANGE_FACETS = ['range', 'rating', 'daterange', 'datepicker']
export const BOOKMARKS_STORAGE_KEY = '_ola_bookmarks_'
export const HISTORY_STORAGE_KEY = '_ola_history_'
export const CONTEXT_STORAGE_KEY = '_ola_context_'
export const CONTEXT_STORAGE_TTL = 30
export const LOCALE_STORAGE_KEY = '_ola_locale_'
export const LOCALE_STORAGE_TTL = 30 /* Days */
export const SEARCH_SESSION_KEY = 'ola_search_session'
export const USER_SESSION_KEY = 'ola_user_session' /* used for analytics only */
export const USER_SESSION_EXPIRY_DAYS = 365
export const INTENT_SESSION_KEY = 'ola_intent_session'
export const INTENT_SESSION_EXPIRY_DAYS = 365
export const RE_ESCAPE = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'].join('|\\') + ')', 'g')
export const REMOVE_FROM_QUERY_STRING = ['isSearchActive', 'searchInput', 'enriched_q', 'per_page', 'skip_intent', 'projectId', 'env', 'ola_collection_name']
export const SEARCH_COLLECTION_IDENTIFIER = 'ola_collection_name'

/**
 * Search Input types
 * SPELL_CORRECT: 'spell_suggestion',  Use suggestedTerm in logs to filter these
 * HISTORY: 'history' We are already tracking clicks on history items eventType C, eventLabel History
 */

export const SEARCH_INPUTS = {
  KEYBOARD: 'keyboard',
  VOICE: 'voice',
  URL: 'url',
  DID_YOU_MEAN_SUGGESTION: 'suggestion'
}
