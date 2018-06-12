import types from './../constants/ActionTypes'

/**
 * Request user's location using geolocation api
 * @param  {Function} onSuccess
 * @param  {Function} onFailure
 * @return {Function}
 */
export function requestGeoLocation (onSuccess, onFailure) {
  if (!navigator.geolocation) return
  return (dispatch, getState) => {
    dispatch({
      type: types.REQUEST_GEO_LOCATION
    })
    navigator.geolocation.getCurrentPosition(
      (event) => {
        dispatch({
          type: types.REQUEST_GEO_LOCATION_SUCCESS,
          payload: event
        })
        onSuccess && onSuccess(event)
      },
      (error) => {
        console.warn(error)
        dispatch({
          type: types.REQUEST_GEO_LOCATION_FAILURE,
          payload: error
        })
        onFailure && onFailure(error)
      }
    )
  }
}

/**
 * Add a field to the context
 * @param {string} field
 * @param {string} value
 */
export function addContextField (field, value) {
  return {
    type: types.ADD_CONTEXT_FIELD,
    field,
    value
  }
}

/**
 * Remove a field from the context
 * @param  {string} field
 * @return {Object}
 */
export function removeContextField (field) {
  return {
    type: types.REMOVE_CONTEXT_FIELD,
    field
  }
}

/**
 * Remove location from the context
 * @return {Object}
 */
export function removeContextLocation () {
  return {
    type: types.REMOVE_CONTEXT_LOCATION
  }
}
