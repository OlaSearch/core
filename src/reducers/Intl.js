import types from './../constants/ActionTypes'
import { LOCALE_STORAGE_KEY } from './../constants/Settings'
import storage from './../services/storage'

var initialState = {
  locale: storage.cookies.get(LOCALE_STORAGE_KEY) || 'en'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOCALE:
      return {
        ...state,
        locale: action.locale
      }
    default:
      return state
  }
}
