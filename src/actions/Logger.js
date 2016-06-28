import { debounce } from './../utilities'

/**
 * Ola Logger Middleware intercepts this dispatch event and calls the loggerService
 * eventType = Q|C
 * result = only for click event
 * eventSource = search|suggest api
 */

var debounceLogger = debounce(submitLog, 1000)

export function log (eventType, result, eventSource) {
  return (dispatch, getState) => {
    switch (eventType) {
      case 'C': // Click event
        submitLog(dispatch, getState, eventType, result, eventSource)
        break

      default:
        debounceLogger(dispatch, getState, eventType, result, eventSource)
        break
    }
  }
}

/**
 * Log submit function
 */
function submitLog () {
  var [ dispatch, getState, eventType, result, eventSource ] = arguments
  dispatch({
    log: true,
    type: 'SEND_LOG',
    eventType,
    result,
    eventSource,
    state: getState()
  })
}
