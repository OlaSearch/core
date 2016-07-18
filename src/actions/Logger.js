import { debounce } from './../utilities'

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
    if (debounce) {
      return debounceLog({ dispatch, getState, eventType, ...rest })
    }
    return submitLog({ dispatch, getState, eventType, ...rest })
  }
}

/**
 * Log submit function
 */
function submitLog (args) {
  var { dispatch, getState, ...rest } = args
  dispatch({
    log: true,
    type: 'SEND_LOG',
    state: getState(),
    ...rest
  })
}
