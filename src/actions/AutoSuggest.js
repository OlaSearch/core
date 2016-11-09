import types from './../constants/ActionTypes'
import xssFilters from 'xss-filters'
import { pickDeep } from './../utilities'

export function updateQueryTerm (term, searchInput) {
  return {
    type: types.UPDATE_QUERY_TERM_AUTOSUGGEST,
    term: xssFilters.inHTMLData(term),
    searchInput
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

export function executeFuzzyAutoSuggest (q) {
  return (dispatch, getState) => {
    var query = { q }
    var context = getState().Context
    return dispatch({
      types: [
        types.REQUEST_AUTOSUGGEST,
        types.REQUEST_AUTOSUGGEST_SUCCESS,
        types.REQUEST_AUTOSUGGEST_FAILURE
      ],
      query,
      context,
      processData: (response) => pickDeep(response.suggest, 'suggestions'),
      nullResponse: [],
      returnWithoutDispatch: true,
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

export function removeFacet (facet) {
  return {
    type: types.REMOVE_FACET_AUTOSUGGEST,
    facet
  }
}

export function terminateAutoSuggest () {
  return {
    type: types.TERMINATE_AUTOSUGGEST
  }
}
