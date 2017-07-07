import { debounce, getKey } from './../utilities'
import { USER_NEW_KEY, USER_SESSION_EXPIRY_DAYS } from './../constants/Settings'
import types from './../constants/ActionTypes'
import storage from './../services/storage'

/**
 * Ola Logger Middleware intercepts this dispatch event and calls the loggerService
 * eventType = Q|C
 * result = only for click event
 * eventSource = search|suggest api
 * searchInput = `voice`|`url`|`keyboard`
 * eventCategory: Typically the object that was interacted with (e.g. 'Video')
 * eventAction: The type of interaction (e.g. 'play')
 * eventLabel: Useful for categorizing events (e.g. 'Fall Campaign')
 * eventValue: A numeric value associated with the event (e.g. 42)
 */

export const debounceLog = debounce(submitLog, 1000)

export function log (params) {
  /* If log is called with no arguments */
  if (!params) throw new Error('Invalid: log was called with no arguments')

  let { eventType, debounce = false, ...rest } = params
  /* If not event type is specified */
  if (!eventType) throw new Error('Invalid: eventType is required')
  return (dispatch, getState) => {
    let state = getState()
    if (debounce) {
      return debounceLog({ dispatch, state, eventType, ...rest })
    }
    return submitLog({ dispatch, state, eventType, ...rest })
  }
}

/**
 * Log submit function
 */
function submitLog (args) {
  var { dispatch, state, ...rest } = args
  dispatch({
    log: true,
    type: 'SEND_LOG',
    state,
    ...rest
  })
  /* Check if the user is new User */
  if (state.Context.isNewUser) {
    /* Set new user flag to false */
    storage.cookies.set(
      getKey(USER_NEW_KEY, state.AppState.namespace),
      false,
      USER_SESSION_EXPIRY_DAYS
    )
    dispatch({
      type: types.SET_NEW_USER_STATUS,
      isNewUser: false
    })
  }
}
