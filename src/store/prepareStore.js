import storage from './../services/storage'
import { getKey, uuid } from './../utilities'
import sessionStorage from './../services/sessionStorage'
import { USER_SESSION_KEY, USER_NEW_KEY, USER_SESSION_EXPIRY_DAYS, SEARCH_SESSION_KEY } from './../constants/Settings'

export const prepareUserState = ({ config }) => {
  /* Create user cookie */
  var userSession = storage.cookies.get(USER_SESSION_KEY, config.namespace)
  var isNewUser = storage.cookies.get(USER_NEW_KEY, config.namespace)

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
  var searchSession = sessionStorage.getItem(getKey(SEARCH_SESSION_KEY, config.namespace))
  if (searchSession === null || searchSession === undefined) {
    searchSession = uuid()
    sessionStorage.setItem(getKey(SEARCH_SESSION_KEY, config.namespace), searchSession)
  }

  return {
    searchSession,
    userSession,
    isNewUser
  }
}
