import { debounce } from './../utilities'
import types from './../constants/ActionTypes'
import storage from './../services/storage'
import { BOOKMARKS_STORAGE_KEY, HISTORY_STORAGE_KEY, LOCALE_STORAGE_KEY, LOCALE_STORAGE_TTL, CONTEXT_STORAGE_KEY, CONTEXT_STORAGE_TTL } from './../constants/Settings'

/* Persist debouncer */
export const debouncePersistState = debounce(persistState, 500)

/* Actions to watch */
export const STATE_TYPE_KEYS = [
  types.ADD_BOOKMARK,
  types.REMOVE_BOOKMARK,
  types.ADD_HISTORY,
  types.CLEAR_HISTORY,
  types.SET_LOCALE,
  types.REQUEST_GEO_LOCATION_SUCCESS,
  types.REQUEST_GEO_LOCATION_FAILURE,
  types.ADD_CONTEXT,
  types.REMOVE_CONTEXT,
  types.ADD_DYNAMIC_FIELD,
  types.REMOVE_DYNAMIC_FIELD
]

/* Based on actions: persist states to localstorage */
function persistState (action, getState, namespace) {
  switch (action.type) {
    case types.ADD_BOOKMARK:
    case types.REMOVE_BOOKMARK:
      return storage.set(BOOKMARKS_STORAGE_KEY, getState().AppState.bookmarks, namespace)

    case types.ADD_HISTORY:
    case types.CLEAR_HISTORY:
      return storage.set(HISTORY_STORAGE_KEY, getState().AppState.history, namespace)

    case types.SET_LOCALE:
      return storage.cookies.set(LOCALE_STORAGE_KEY, action.locale, LOCALE_STORAGE_TTL)

    case types.REQUEST_GEO_LOCATION_SUCCESS:
    case types.REQUEST_GEO_LOCATION_FAILURE:
    case types.ADD_CONTEXT:
    case types.REMOVE_CONTEXT:
    case types.ADD_DYNAMIC_FIELD:
    case types.REMOVE_DYNAMIC_FIELD:
      return storage.cookies.set(CONTEXT_STORAGE_KEY, getState().Context, CONTEXT_STORAGE_TTL)
  }
}