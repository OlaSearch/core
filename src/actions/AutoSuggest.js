import types from './../constants/ActionTypes'

export function updateQueryTerm (term) {
  return {
    type: types.UPDATE_QUERY_TERM_AUTOSUGGEST,
    term
  }
}

export function updateFuzzyQueryTerm (term) {
  return {
    type: types.UPDATE_FUZZY_QUERY_TERM_AUTOSUGGEST,
    term: term.replace(/(<[^>]+>)/gi, '') /* Remove html tags from terms */
  }
}

export function clearFuzzyQueryTerm () {
  return {
    type: types.CLEAR_FUZZY_QUERY_TERM_AUTOSUGGEST
  }
}

export function executeAutoSuggest () {
  return (dispatch, getState) => {
    var state = getState()
    var { q, page, per_page, facet_query } = state.AutoSuggest
    var context = state.Context

    dispatch({
      types: [
        types.REQUEST_AUTOSUGGEST,
        types.REQUEST_AUTOSUGGEST_SUCCESS,
        types.REQUEST_AUTOSUGGEST_FAILURE
      ],
      query: { q, per_page, page, facet_query },
      context,
      api: 'suggest',
      payload: {}
    })
  }
}

export function executeFuzzyAutoSuggest (isFuzzySuggest = false) {
  return (dispatch, getState) => {
    var state = getState()
    var query = { q: state.AutoSuggest.q }
    var context = state.Context

    dispatch({
      types: [
        types.REQUEST_AUTOSUGGEST,
        types.REQUEST_AUTOSUGGEST_SUCCESS,
        types.REQUEST_AUTOSUGGEST_FAILURE
      ],
      query,
      context,
      api: 'fuzzySuggest',
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
