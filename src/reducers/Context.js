import types from './../constants/ActionTypes'
import storage from './../services/storage'

const CONTEXT_STORAGE_KEY = 'ola_context'
const STORAGE_TTL = 1/24/60 * 5 /* Days */

var valueFromStorage = storage.cookies.get(CONTEXT_STORAGE_KEY)
var initialState = valueFromStorage
  ? JSON.parse(valueFromStorage)
  : {
    location: null,
    fields: [],
    isRequestingLocation: false,
    hasRequestedLocation: false
  }
var _state

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_GEO_LOCATION:
      return {
        ...state,
        isRequestingLocation: true
      }
    case types.REQUEST_GEO_LOCATION_SUCCESS:
      let { coords } = action.payload
      let { latitude, longitude } = coords

      _state = {
        ...state,
        isRequestingLocation: false,
        location: `${latitude},${longitude}`,
      }
      storage.cookies.set(CONTEXT_STORAGE_KEY, _state, STORAGE_TTL)
      return _state

    case types.REQUEST_GEO_LOCATION_FAILURE:
      _state = {
        ...state,
        isRequestingLocation: false,
        location: null
      }
      storage.cookies.set(CONTEXT_STORAGE_KEY, _state, STORAGE_TTL)
      return _state
    case types.ADD_CONTEXT:
      if (action.contextType === 'geo') {
        _state = {
          ...state,
          location: action.value
        }
      }
      storage.set(CONTEXT_STORAGE_KEY, _state, STORAGE_TTL)
      return _state
    case types.REMOVE_CONTEXT:
      if (action.contextType === 'geo') {
        _state = {
          ...state,
          location: null,
          fields: [],
          hasRequestedLocation: state.location ? true : false
        }
      }
      storage.cookies.remove(CONTEXT_STORAGE_KEY)
      return _state

    case types.ADD_DYNAMIC_FIELD:
      let filtered = state.fields.filter((field) => field.name !== action.name)
      _state = {
        ...state,
        fields: [...filtered, {
          name: action.name,
          value: action.value
        }]
      }
      storage.cookies.set(CONTEXT_STORAGE_KEY, _state, STORAGE_TTL)
      return _state

    case types.REMOVE_DYNAMIC_FIELD:
      _state = {
        ...state,
        fields: state.fields.filter((field) => field.name !== action.name)
      }
      storage.cookies.set(CONTEXT_STORAGE_KEY, _state, STORAGE_TTL)
      return _state

    default:
      return state
  }
}
