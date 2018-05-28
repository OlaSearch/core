// @flow
import types from './../constants/ActionTypes'

type State = {
  timestamp: Object
}

export const initialState = {
  timestamp: {}
}

export default (state: State = initialState, action: Object) => {
  switch (action.type) {
    case undefined:
    default:
      return state

    case types.REQUEST_SEARCH:
    case types.REQUEST_GUIDE:
    case types.REQUEST_AUTOSUGGEST:
    case types.REQUEST_FACET:
    case types.ADD_TIMESTAMP:
      if (!action.api) return state
      return {
        ...state,
        timestamp: {
          ...state.timestamp,
          [`${action.api}`]: new Date().getTime()
        }
      }

    case types.CLOSE_AUTOSUGGEST:
      return {
        ...state,
        timestamp: {}
      }
  }
}
