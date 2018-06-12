/**
 * 1. State persistence for Bookmarks, History and Context
 */
import { debouncePersistState, STATE_TYPE_KEYS } from './../store/persistState'
import {
  INTENT_SUPPORTED_API_KEYS,
  API_IGNORE_LOGGING
} from './../constants/Settings'

/**
 * Create a redux middleware to persist date to localstorage or cookie
 * @param  {string} options.namespace Project namespace
 * @param  {Array} options.types
 * @param  {function} options.callback
 */
export default function ({
  namespace,
  types = STATE_TYPE_KEYS,
  callback = debouncePersistState
}) {
  return ({ dispatch, getState }) => (next) => (action) => {
    /* Persist store state */
    if (types.indexOf(action.type) !== -1) {
      callback(action, getState, namespace)
    }
    return next(action)
  }
}
