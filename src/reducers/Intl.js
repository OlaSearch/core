import types from './../constants/ActionTypes'

var initialState = {
  locale: 'zh'
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
