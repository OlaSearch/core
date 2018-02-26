import types from './../constants/ActionTypes'

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

export function addContextField (field, value) {
  return {
    type: types.ADD_CONTEXT_FIELD,
    field,
    value
  }
}

export function removeContextField (field) {
  return {
    type: types.REMOVE_CONTEXT_FIELD,
    field
  }
}

export function removeContextLocation () {
  return {
    type: types.REMOVE_CONTEXT_LOCATION
  }
}
