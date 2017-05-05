import types from './../constants/ActionTypes'
import { LOCALE_STORAGE_KEY } from './../constants/Settings'
import storage from './../services/storage'

var DEFAULT_LOCALE = 'en'
var initialState = {
  locale: DEFAULT_LOCALE
}

export default (state = initialState, action) => {
  switch (action.type) {
    case undefined:
    default:
      return state

    case types.OLA_REHYDRATE:
      return {
        ...state,
        locale: storage.cookies.get(LOCALE_STORAGE_KEY) || DEFAULT_LOCALE
      }

    case types.SET_LOCALE:
      return {
        ...state,
        locale: action.locale
      }
  }
}
