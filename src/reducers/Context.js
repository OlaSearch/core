// @flow
import types from './../constants/ActionTypes'
import flatten from 'ramda/src/flatten'

const LOCATION_FIELD = 'location'

type State = {
  location: ?string,
  fields: Array<Object>,
  isRequestingLocation: boolean,
  hasRequestedLocation: boolean,
  userSession: ?string,
  searchSession: ?string,
  userId: ?string,
  isNewUser: boolean,
  hasUsedVoice: boolean,
  filter_term_sequence: Array<string>
}

export const initialState = {
  fields: [],

  /* For Geo Location */
  location: null,
  isRequestingLocation: false,
  hasRequestedLocation: false,

  /* User information */
  userSession: null,
  searchSession: null,
  userId: null,
  isNewUser: false,

  /* Voice */
  hasUsedVoice: false,

  /* Filter sequence */
  filter_term_sequence: [] /* For logging the sequence of filters that the user used */
}

export default (state: State = initialState, action: Object) => {
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
        hasRequestedLocation: true,
        location: `${latitude},${longitude}`
      }

    case types.REQUEST_GEO_LOCATION_FAILURE:
      return {
        ...state,
        isRequestingLocation: false,
        hasRequestedLocation: true,
        location: null
      }

    /* Filter sequence from facet_query */
    case types.UPDATE_STATE_FROM_QUERY:
      return {
        ...state,
        filter_term_sequence: flatten(
          action.stateFromUrl.facet_query.map(({ name, selected }) =>
            selected.map((value) => `${name}:${value}`)
          )
        )
      }

    /** Filter sequence */
    case types.ADD_FACET:
      return {
        ...state,
        filter_term_sequence: [
          ...state.filter_term_sequence,
          `${action.facet.name}:${action.value}`
        ]
      }

    case types.REMOVE_FACET:
      return {
        ...state,
        filter_term_sequence: state.filter_term_sequence.filter(
          (item) => item !== `${action.facet.name}:${action.value}`
        )
      }

    case types.REPLACE_FACET:
      let fts = state.filter_term_sequence.filter(
        (item) => item.split(':')[0] === action.facet.name
      )
      return {
        ...state,
        filter_term_sequence: [...fts, `${action.facet.name}:${action.value}`]
      }

    case types.REMOVE_FACET_ITEM:
      return {
        ...state,
        filter_term_sequence: state.filter_term_sequence.filter(
          (item) => item.split(':')[0] !== action.facet.name
        )
      }

    case types.REMOVE_ALL_FACETS:
      return {
        ...state,
        filter_term_sequence: []
      }

    case types.ADD_CONTEXT_FIELD:
      if (!action.field) return state
      return {
        ...state,
        fields: [...state.fields, { name: action.field, value: action.value }]
      }

    case types.REMOVE_CONTEXT_FIELD:
      if (!action.field) return state
      return {
        ...state,
        fields: state.fields.filter(({ name }) => name !== action.field)
      }

    case types.REMOVE_CONTEXT_LOCATION:
      return {
        ...state,
        location: null
      }

    case types.OLA_REHYDRATE:
      let {
        userSession,
        searchSession,
        isNewUser,
        userId,
        contextState
      } = action
      return {
        ...state,
        userSession,
        searchSession,
        ...contextState,
        userId: userId || userSession,
        isNewUser
      }

    case types.SET_NEW_USER_STATUS:
      return {
        ...state,
        isNewUser: action.isNewUser
      }

    default:
      return state
  }
}
