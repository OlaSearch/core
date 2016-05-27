import types from './../constants/ActionTypes'
import storage from './../services/storage'

const CONTEXT_STORAGE_KEY = 'ola_context'

var initialState = storage.get(CONTEXT_STORAGE_KEY) || {
  location: null,
  fields: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CONTEXT:
      if (action.contextType === 'geo') {
        var _state = {
          ...state,
          location: action.value
        }
      }
      storage.set(CONTEXT_STORAGE_KEY, _state)
      return _state
    case types.REMOVE_CONTEXT:
      if (action.contextType === 'geo') {
        var _state = {
          ...state,
          location: null,
          fields: []
        }
      }
      storage.set(CONTEXT_STORAGE_KEY, _state)
      return _state

    case types.ADD_DYNAMIC_FIELD:
      let filtered = state.fields.filter((field) => field.name !== action.name)
      var _state = {
        ...state,
        fields: [...filtered, {
          name: action.name,
          value: action.value
        }]
      }
      storage.set(CONTEXT_STORAGE_KEY, _state)
      return _state

    case types.REMOVE_DYNAMIC_FIELD:
      var _state = {
        ...state,
        fields: state.fields.filter((field) => field.name !== action.name)
      }
      storage.set(CONTEXT_STORAGE_KEY, _state)
      return _state

    default:
      return state
  }
}
