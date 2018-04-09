import { cookies, get } from './../services/storage'
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

export function prepareStoreState ({ config }) {
  /* Create user cookie */
  var userSession = cookies.get(USER_SESSION_KEY, config.namespace)
  var isNewUser = cookies.get(USER_NEW_KEY, config.namespace)
  var isNewSession = false
  const storeState = get(OLA_STORAGE_KEY, config.namespace) || {}
  var contextState = cookies.get(CONTEXT_STORAGE_KEY, config.namespace) || {}
  const locale =
    cookies.get(LOCALE_STORAGE_KEY, config.namespace) || DEFAULT_LOCALE
  const botState = get(BOT_STORAGE_KEY, config.namespace)
  const {
    perPage,
    allowedCharacters,
    replaceQueryParamName,
    sidebar,
    layoutSwitching,
    filterInAutoComplete,
    autocompleteDictionary
  } = config

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
    cookies.set(
      getKey(USER_SESSION_KEY, config.namespace),
      userSession,
      USER_SESSION_EXPIRY_DAYS
    )
  }
  /* Check if the user is a new user */
  if (isNewUser === null || isNewUser === undefined) {
    isNewUser = true
    /* Set new user flag */
    cookies.set(
      getKey(USER_NEW_KEY, config.namespace),
      isNewUser,
      USER_SESSION_EXPIRY_DAYS
    )
  }

  /**
   * SearchSession:
   * isNewSession ?
   * Session storage
   */
  var searchSession = sessionStorage.getItem(
    getKey(SEARCH_SESSION_KEY, config.namespace)
  )
  if (searchSession === null || searchSession === undefined) {
    isNewSession = true
    searchSession = uuid()
    try {
      sessionStorage.setItem(
        getKey(SEARCH_SESSION_KEY, config.namespace),
        searchSession
      )
    } catch (err) {
      console.warn(err)
    }
  }

  return {
    searchSession,
    userSession,
    isNewUser,
    isNewSession,
    storeState,
    contextState,
    locale,
    /**
     * Only for initial rehydration. Do not store config variables in state
     */
    configState: {
      perPage,
      allowedCharacters,
      replaceQueryParamName,
      layoutSwitching,
      filterInAutoComplete,
      autocompleteDictionary
    },
    botState
  }
}
