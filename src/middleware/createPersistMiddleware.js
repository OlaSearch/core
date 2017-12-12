/**
 * 1. State persistence for Bookmarks, History and Context
 */
import { debouncePersistState, STATE_TYPE_KEYS } from './../store/persistState'
import {
  INTENT_SUPPORTED_API_KEYS,
  API_IGNORE_LOGGING
} from './../constants/Settings'

module.exports = ({ namespace }) => {
  return ({ dispatch, getState }) => (next) => (action) => {
    /* Persist store state */
    if (STATE_TYPE_KEYS.indexOf(action.type) !== -1) {
      debouncePersistState(action, getState, namespace)
    }
    return next(action)
  }
}
