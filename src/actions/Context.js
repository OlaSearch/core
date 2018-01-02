import types from './../constants/ActionTypes'

/* Phasing out */
export function addDynamicField (name, value, filename) {
  return {
    type: types.ADD_DYNAMIC_FIELD,
    name,
    value,
    filename
  }
}

export function removeDynamicField (name) {
  return {
    type: types.REMOVE_DYNAMIC_FIELD,
    name
  }
}

/* Phasing out: ADD_CONTEXT */
export function addContext (contextType, value) {
  if (contextType === 'geo') {
    return addContextField('location', value)
  }
  /* Phasing out: ADD_CONTEXT */
}

/* Phasing out: REMOVE_CONTEXT */
export function removeContext (contextType) {
  
  return {
    type: types.REMOVE_CONTEXT,
    contextType
  }
}

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
