import types from './../constants/ActionTypes'
import defaultTranslations from './../translations'

var initialState = {
  locale: 'zh',
  translations: defaultTranslations
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOCALE:
      return {
        ...state,
        locale: action.locale
      }

    case types.SET_TRANSLATIONS:
      return {
        ...state,
        translations: action.translations
      }

    default:
      return state
  }
}
