import types from './../constants/ActionTypes'
import { CONTEXT_STORAGE_KEY, USER_SESSION_KEY } from './../constants/Settings'
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
  ...valueFromStorage ? JSON.parse(valueFromStorage) : {},
  /* Filter sequence */
  filter_term_sequence: [] /* For logging the sequence of filters that the user used */
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

    /* Filter sequence from url */
    case types.UPDATE_STATE_FROM_QUERY:
      let seq = []
      let fq = action.stateFromUrl.facet_query
      for (let i = 0, len = fq.length; i < len; i++) {
        for (let j = 0; j < fq[i].selected.length; j++) {
          seq.push(`${fq[i].name}:${fq[i].selected[j]}`)
        }
      }
      return {
        ...state,
        filter_term_sequence: seq
      }

    /** Filter sequence */
    case types.ADD_FACET:
      return {
        ...state,
        filter_term_sequence: [...state.filter_term_sequence, `${action.facet.name}:${action.value}`]
      }

    case types.REMOVE_FACET:
      return {
        ...state,
        filter_term_sequence: state.filter_term_sequence.filter((item) => item !== `${action.facet.name}:${action.value}`)
      }

    case types.OLA_REHYDRATE:
      let userSession = storage.cookies.get(USER_SESSION_KEY, action.namespace)
      return {
        ...state,
        userSession,
        userId: action.userId || userSession,
        isNewUser: action.isNewUser
      }

    default:
      return state
  }
}
