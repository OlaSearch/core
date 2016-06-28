import types from './../constants/ActionTypes'

export function setLocale (locale) {
  return {
    type: types.SET_LOCALE,
    locale
  }
}
