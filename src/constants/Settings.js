import types from './ActionTypes'

export const RANGE_FACETS = ['range', 'rating', 'daterange']
export const NO_SCRIPT_TAG = null
export const BOOKMARKS_STORAGE_KEY = '_ola_bookmarks_'
export const HISTORY_STORAGE_KEY = '_ola_history_'
export const CONTEXT_STORAGE_KEY = '_ola_context_'
export const CONTEXT_STORAGE_TTL = 1 / 24 / 60 * 5
export const LOCALE_STORAGE_KEY = '_ola_locale_'
export const LOCALE_STORAGE_TTL = 30 /* Days */

export const STATE_TYPE_KEYS = [
  types.ADD_BOOKMARK,
  types.REMOVE_BOOKMARK,
  types.ADD_HISTORY,
  types.CLEAR_HISTORY
]