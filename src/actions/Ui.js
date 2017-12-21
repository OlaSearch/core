import types from './../constants/ActionTypes'

export function toggleSidebar () {
  return {
    type: types.TOGGLE_SIDEBAR
  }
}

/* Change view */
export function toggleView (view) {
  return {
    type: types.CHANGE_VIEW,
    view
  }
}
