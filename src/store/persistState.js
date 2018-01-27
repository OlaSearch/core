import { debounce } from './../utilities'
import types from './../constants/ActionTypes'
import { pick } from './../utilities'
import { cookies, set } from './../services/storage'
import {
  LOCALE_STORAGE_KEY,
  LOCALE_STORAGE_TTL,
  CONTEXT_STORAGE_KEY,
  CONTEXT_STORAGE_TTL,
  OLA_STORAGE_KEY
} from './../constants/Settings'

/**
 * Throttled function which is called from createOlaMiddleware.js
 * @type {[type]}
 */
const PERSIST_TIMEOUT = 500
export const debouncePersistState = debounce(persistState, PERSIST_TIMEOUT)
export const statesToTrack = [
  'history',
  'bookmarks',
  'isSidebarOpen',
  'queryIds',
  'queriesById',
  'view'
]

/* Actions to watch */
export const STATE_TYPE_KEYS = [
  types.ADD_BOOKMARK,
  types.REMOVE_BOOKMARK,
  types.ADD_HISTORY,
  types.CLEAR_HISTORY,
  types.SET_LOCALE,
  types.REQUEST_GEO_LOCATION_SUCCESS,
  types.REQUEST_GEO_LOCATION_FAILURE,
  types.ADD_CONTEXT_FIELD,
  types.REMOVE_CONTEXT_FIELD,
  types.REMOVE_CONTEXT_LOCATION,
  types.UPDATE_HISTORY,
  types.REMOVE_HISTORY,
  types.REQUEST_ALERT_SUCCESS,
  types.REQUEST_DELETE_ALERT_SUCCESS,
  types.REQUEST_CREATE_ALERT_SUCCESS,
  types.TOGGLE_SIDEBAR,
  types.CHANGE_VIEW
]

/* Based on actions: persist states to localstorage */
function persistState (action, getState, namespace) {
  let state = getState()
  switch (action.type) {
    case types.REQUEST_GEO_LOCATION_SUCCESS:
    case types.REQUEST_GEO_LOCATION_FAILURE:
    case types.ADD_CONTEXT_FIELD:
    case types.REMOVE_CONTEXT_FIELD:
    case types.REMOVE_CONTEXT_LOCATION:
      return cookies.set(
        CONTEXT_STORAGE_KEY,
        state.Context,
        CONTEXT_STORAGE_TTL,
        namespace
      )
    case types.SET_LOCALE:
      return cookies.set(
        LOCALE_STORAGE_KEY,
        state.Intl.locale,
        LOCALE_STORAGE_TTL,
        namespace
      )

    case types.ADD_HISTORY:
    case types.CLEAR_HISTORY:
    case types.UPDATE_HISTORY:
    case types.REMOVE_HISTORY:
    case types.ADD_BOOKMARK:
    case types.REMOVE_BOOKMARK:
    case types.REQUEST_ALERT_SUCCESS:
    case types.REQUEST_DELETE_ALERT_SUCCESS:
    case types.REQUEST_CREATE_ALERT_SUCCESS:
    case types.TOGGLE_SIDEBAR:
    case types.CHANGE_VIEW:
      return set(
        OLA_STORAGE_KEY,
        pick(statesToTrack, state.AppState),
        namespace
      )
  }
}
