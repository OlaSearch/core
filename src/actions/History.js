import types from './../constants/ActionTypes'

export function addHistory (query) {
  return (dispatch, getState) => {
    let { QueryState, AppState } = getState()
    let { q } = QueryState
    let { totalResults } = AppState

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
