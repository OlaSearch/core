export const RANGE_FACETS = ['range', 'rating', 'daterange']
export const NO_SCRIPT_TAG = null
export const BOOKMARKS_STORAGE_KEY = '_ola_bookmarks_'
export const HISTORY_STORAGE_KEY = '_ola_history_'
export const CONTEXT_STORAGE_KEY = '_ola_context_'
export const CONTEXT_STORAGE_TTL = 1 / 24 / 60 * 5
export const LOCALE_STORAGE_KEY = '_ola_locale_'
export const LOCALE_STORAGE_TTL = 30 /* Days */

/**
 * Search Input types
 */

export const SEARCH_INPUTS = {
  KEYBOARD: 'keyboard',
  VOICE: 'voice',
  URL: 'url',
  DID_YOU_MEAN_SUGGESTION: 'suggestion',
  /* SPELL_CORRECT: 'spell_suggestion',  Use suggestedTerm in logs to filter these */
  /* HISTORY: 'history' We are already tracking clicks on history items eventType C, eventLabel History */
}