import types from './../constants/ActionTypes'

export const initialState = {
  timestamp: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case undefined:
    default:
      return state

    case types.REQUEST_SEARCH:
    case types.REQUEST_GUIDE:
    case types.REQUEST_AUTOSUGGEST:
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
