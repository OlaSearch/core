import storage from './../services/storage'
import { getKey, uuid } from './../utilities'
import sessionStorage from './../services/sessionStorage'
import {
  USER_SESSION_KEY,
  USER_NEW_KEY,
  USER_SESSION_EXPIRY_DAYS,
  SEARCH_SESSION_KEY,
  OLA_STORAGE_KEY,
  CONTEXT_STORAGE_KEY,
  LOCALE_STORAGE_KEY,
  DEFAULT_LOCALE,
  BOT_STORAGE_KEY
} from './../constants/Settings'

export function prepareUserState ({ config }) {
  /* Create user cookie */
  var userSession = storage.cookies.get(USER_SESSION_KEY, config.namespace)
  var isNewUser = storage.cookies.get(USER_NEW_KEY, config.namespace)
  const storeState = storage.get(OLA_STORAGE_KEY, config.namespace) || {}
  var contextState =
    storage.cookies.get(CONTEXT_STORAGE_KEY, config.namespace) || {}
  const locale =
    storage.cookies.get(LOCALE_STORAGE_KEY, config.namespace) || DEFAULT_LOCALE
  const botState = storage.get(BOT_STORAGE_KEY, config.namespace)
  var { perPage } = config

  if (typeof contextState === 'string') {
    try {
      contextState = JSON.parse(decodeURIComponent(contextState))
    } catch (e) {
      contextState = {}
    }
  }

  /* Cast isNewUser to Boolean */
  if (typeof isNewUser === 'string') {
    isNewUser = isNewUser === 'true'
  }

  /* Check for user session */
  if (userSession === null || userSession === undefined) {
    userSession = uuid()
    storage.cookies.set(
      getKey(USER_SESSION_KEY, config.namespace),
      userSession,
      USER_SESSION_EXPIRY_DAYS
    )
  }
  /* Check if the user is a new user */
  if (isNewUser === null || isNewUser === undefined) {
    isNewUser = true
    /* Set new user flag */
    storage.cookies.set(
      getKey(USER_NEW_KEY, config.namespace),
      isNewUser,
      USER_SESSION_EXPIRY_DAYS
    )
  }

  /**
   * searchSession
   * Session storage
   */
  var searchSession = sessionStorage.getItem(
    getKey(SEARCH_SESSION_KEY, config.namespace)
  )
  if (searchSession === null || searchSession === undefined) {
    searchSession = uuid()
    sessionStorage.setItem(
      getKey(SEARCH_SESSION_KEY, config.namespace),
      searchSession
    )
  }

  return {
    searchSession,
    userSession,
    isNewUser,
    storeState,
    contextState,
    locale,
    configState: { perPage },
    botState
  }
}

export default prepareUserState
