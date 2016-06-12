import types from './../constants/ActionTypes'

export function setLocale (locale) {
  return {
    type: types.SET_LOCALE,
    locale
  }
}

export function setTranslations (translations) {
  return {
    type: types.SET_TRANSLATIONS,
    translations
  }
}
