// @flow
import types from './../constants/ActionTypes'
import { DEFAULT_LOCALE } from './../constants/Settings'

type State = {
  locale: string
}

var initialState = {
  locale: DEFAULT_LOCALE
}

export default (state: State = initialState, action: Object) => {
  switch (action.type) {
    case undefined:
    default:
      return state

    case types.OLA_REHYDRATE:
      return {
        ...state,
        locale: action.locale
      }

    case types.SET_LOCALE:
      return {
        ...state,
        locale: action.locale
      }
  }
}
