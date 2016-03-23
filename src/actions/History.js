import types from './../constants/ActionTypes'

export function addHistory (query) {
  return (dispatch, getState) => {
    var { QueryState, AppState } = getState()

    var { q } = QueryState
    var { totalResults } = AppState

    if (!q || !totalResults) return

    dispatch({
      type: types.ADD_HISTORY,
      query
    })
  }
}

export function clearHistory () {
  return {
    type: types.CLEAR_HISTORY
  }
}
