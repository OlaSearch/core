import types from './../constants/ActionTypes'
import { CONTEXT_STORAGE_KEY } from './../constants/Settings'
import storage from './../services/storage'

var valueFromStorage = storage.cookies.get(CONTEXT_STORAGE_KEY)
export const initialState = {
  location: null,
  fields: [],
  isRequestingLocation: false,
  hasRequestedLocation: false,
  userSession: null,
  userId: null,
  isNewUser: false,
  ...valueFromStorage ? JSON.parse(valueFromStorage) : {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_GEO_LOCATION:
      return {
        ...state,
        isRequestingLocation: true
      }
    case types.REQUEST_GEO_LOCATION_SUCCESS:
      let { coords: { latitude, longitude } } = action.payload
      return {
        ...state,
        isRequestingLocation: false,
        location: `${latitude},${longitude}`
      }

    case types.REQUEST_GEO_LOCATION_FAILURE:
      return {
        ...state,
        isRequestingLocation: false,
        location: null
      }
    case types.ADD_CONTEXT:
      if (action.contextType === 'geo') {
        return {
          ...state,
          location: action.value
        }
      }
      return state
    case types.REMOVE_CONTEXT:
      if (action.contextType === 'geo') {
        return {
          ...state,
          location: null,
          fields: [],
          hasRequestedLocation: !!state.location
        }
      }
      return state

    case types.ADD_DYNAMIC_FIELD:
      let filtered = state.fields.filter((field) => field.name !== action.name)
      return {
        ...state,
        fields: [...filtered, {
          name: action.name,
          value: action.value,
          filename: action.filename
        }]
      }
    case types.REMOVE_DYNAMIC_FIELD:
      return {
        ...state,
        fields: state.fields.filter((field) => field.name !== action.name)
      }

    case types.SET_USER_SESSION:
      return {
        ...state,
        userSession: action.userSession,
        isNewUser: action.isNewUser
      }

    default:
      return state
  }
}
