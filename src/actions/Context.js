import types from './../constants/ActionTypes'

export function addDynamicField (name, value, filename) {
  return {
    type: types.ADD_DYNAMIC_FIELD,
    name, value, filename
  }
}

export function removeDynamicField (name) {
  return {
    type: types.REMOVE_DYNAMIC_FIELD,
    name
  }
}

export function addContext (contextType, value) {
  return {
    type: types.ADD_CONTEXT,
    contextType, value
  }
}

export function removeContext (contextType) {
  return {
    type: types.REMOVE_CONTEXT,
    contextType
  }
}

export function requestGeoLocation (onSuccess, onFailure) {
  return (dispatch, getState) => {
    if (navigator.geolocation) {
      dispatch({
        type: types.REQUEST_GEO_LOCATION
      })
      navigator.geolocation.getCurrentPosition((event) => {
        dispatch({
          type: types.REQUEST_GEO_LOCATION_SUCCESS,
          payload: event
        })

        onSuccess && onSuccess(event)
      }, (error) => {
        dispatch({
          type: types.REQUEST_GEO_LOCATION_FAILURE,
          payload: error
        })

        onFailure && onFailure(error)
      })
    }
  }
}
