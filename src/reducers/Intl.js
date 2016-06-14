import types from './../constants/ActionTypes'
import storage from './../services/storage'

const LOCALE_STORAGE_KEY = 'ola_locale'
const STORAGE_TTL = 30 /* 30 Days */

var localeFromStorage = storage.cookies.get(LOCALE_STORAGE_KEY)
var initialState = {
  locale: localeFromStorage || 'en'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOCALE:
      storage.cookies.set(LOCALE_STORAGE_KEY, action.locale, STORAGE_TTL)
      return {
        ...state,
        locale: action.locale
      }
    default:
      return state
  }
}
