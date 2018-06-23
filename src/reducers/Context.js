// @flow
import types from './../constants/ActionTypes'
import flatten from 'ramda/src/flatten'
import { pick } from './../utilities'

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
  isNewSession: boolean,
  hasUsedVoice: boolean,
  filter_term_sequence: Array<string>,
  href: ?string,
  hostname: ?string,
  pathname: ?string
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
  isNewSession: false,

  /* Window */
  href: null,
  hostname: null,
  pathname: null,
  referrer: null,

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
      const { coords: { latitude, longitude } } = action.payload
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
      const fts = state.filter_term_sequence.filter(
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
      const {
        userSession,
        searchSession,
        isNewUser,
        isNewSession,
        userId,
        contextState
      } = action
      return {
        ...state,
        userSession,
        searchSession,
        ...contextState,
        userId: userId || userSession,
        isNewUser,
        isNewSession
      }

    case types.SET_NEW_USER_STATUS:
      return {
        ...state,
        isNewUser: action.isNewUser
      }

    case types.UPDATE_CONTEXT_STATE:
      return {
        ...state,
        ...pick(Object.keys(initialState), action.state)
      }

    default:
      return state
  }
}
