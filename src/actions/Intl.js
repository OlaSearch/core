import types from './../constants/ActionTypes'

/**
 * Set locale
 * @param {string} locale
 */
export function setLocale (locale) {
  return {
    type: types.SET_LOCALE,
    locale
  }
}
