import types from './../constants/ActionTypes'

export const initialState = {
  timestamp: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case undefined:
    default:
      return state

    case types.REQUEST_SEARCH:
    case types.REQUEST_GUIDE:
    case types.REQUEST_AUTOSUGGEST:
      return {
        ...state,
        timestamp: new Date().getTime()
      }

    case types.CLOSE_AUTOSUGGEST:
      return {
        ...state,
        timestamp: null
      }
  }
}
