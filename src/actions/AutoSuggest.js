import types from './../constants/ActionTypes'

export function updateQueryTerm (term) {
  return {
    type: types.UPDATE_QUERY_TERM_AUTOSUGGEST,
    term
  }
}

export function updateTempQueryTerm (term) {
  return {
    type: types.UPDATE_TEMP_QUERY_TERM_AUTOSUGGEST,
    term
  }
}

export function clearTempQueryTerm () {
  return {
    type: types.CLEAR_TEMP_QUERY_TERM_AUTOSUGGEST
  }
}

export function executeAutoSuggest (isFuzzySuggest = false) {
  return (dispatch, getState) => {
    var state = getState()
    var { query } = state.AutoSuggest
    var context = state.Context

    dispatch({
      types: [
        types.REQUEST_AUTOSUGGEST,
        types.REQUEST_AUTOSUGGEST_SUCCESS,
        types.REQUEST_AUTOSUGGEST_FAILURE
      ],
      query,
      context,
      api: isFuzzySuggest ? 'fuzzySuggest' : 'suggest',
      payload: {}
    })
  }
}

export function clearQueryTerm () {
  return {
    type: types.CLEAR_QUERY_TERM_AUTOSUGGEST
  }
}

export function closeAutoSuggest () {
  return {
    type: types.CLOSE_AUTOSUGGEST
  }
}

export function addFacet (facet, value) {
  return {
    type: types.ADD_FACET_AUTOSUGGEST,
    facet, value
  }
}

export function terminateAutoSuggest () {
  return {
    type: types.TERMINATE_AUTOSUGGEST
  }
}
