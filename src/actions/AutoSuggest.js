import types from './../constants/ActionTypes'

export function updateQueryTerm (term) {
  return {
    type: types.UPDATE_QUERY_TERM_AUTOSUGGEST,
    term
  }
}

export function executeAutoSuggest () {
  return (dispatch, getState) => {
    var { query } = getState().AutoSuggest
    var context = getState().Context

    dispatch({
      types: [
        types.REQUEST_AUTOSUGGEST,
        types.REQUEST_AUTOSUGGEST_SUCCESS,
        types.REQUEST_AUTOSUGGEST_FAILURE
      ],
      query,
      context,
      api: 'suggest',
      payload: {},
      executeFromSpellSuggest
    })
  }
}

export function executeFromSpellSuggest (payload) {
  return (dispatch, getState) => {
    var { suggestedTerm } = payload

    var query = {
      ...getState().AutoSuggest.query,
      q: suggestedTerm
    }
    var context = getState().Context

    dispatch({
      types: [
        types.REQUEST_AUTOSUGGEST,
        types.REQUEST_AUTOSUGGEST_SUCCESS,
        types.REQUEST_AUTOSUGGEST_FAILURE
      ],
      query,
      context,
      api: 'suggest',
      payload: {},
      suggestedTerm
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
