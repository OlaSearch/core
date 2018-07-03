import types from './../constants/ActionTypes'
import { pickDeep, sanitizeText } from './../utilities'

/**
 * Update Auto Suggest query term
 * @param  {string} term
 * @param  {string} searchInput
 * @return {Object}
 */
export function updateQueryTerm (term, searchInput) {
  return {
    type: types.UPDATE_QUERY_TERM_AUTOSUGGEST,
    term: sanitizeText(term),
    searchInput
  }
}

/**
 * Execute autosuggest search
 * @return {Object}
 */
export function executeAutoSuggest () {
  return (dispatch, getState) => {
    const state = getState()
    const { q, page, per_page, facet_query } = state.AutoSuggest
    const context = state.Context

    return dispatch({
      types: [
        types.REQUEST_AUTOSUGGEST,
        types.REQUEST_AUTOSUGGEST_SUCCESS,
        types.REQUEST_AUTOSUGGEST_FAILURE
      ],
      query: { q, per_page, page, facet_query },
      context,
      api: 'search',
      payload: {}
    })
  }
}

/**
 * Execute a fuzzy search
 * @param  {string} q
 * @param  {number} limit
 * @param  {string} contextField Filter by a specific type (query or entity)
 * @return {Object}
 */
export function executeFuzzyAutoSuggest ({
  q,
  limit = 10,
  contextField = 'query',
  config = {}
}) {
  return (dispatch, getState) => {
    const { autocompleteDictionary: dictionary = 'olaSuggester' } = config
    const query = {
      q,
      'suggest.count': limit,
      'suggest.dictionary': dictionary,
      'suggest.cfq': contextField
    }
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
      returnWithoutDispatch: true,
      api: 'suggest',
      payload: {}
    })
  }
}

/**
 * Clear Autosuggest query term
 * @return {Object}
 */
export function clearQueryTerm () {
  return {
    type: types.CLEAR_QUERY_TERM_AUTOSUGGEST
  }
}

/**
 * Close autosuggest
 * @return {Object}
 */
export function closeAutoSuggest () {
  return {
    type: types.CLOSE_AUTOSUGGEST
  }
}

/**
 * Add a facet to autosuggest search
 * @param {Object} facet
 * @param {string} value
 */
export function addFacet (facet, value) {
  return {
    type: types.ADD_FACET_AUTOSUGGEST,
    facet,
    value
  }
}

/**
 * Remove a facet from autosuggest search
 * @param  {Object} facet
 * @return {Object}
 */
export function removeFacet (facet) {
  return {
    type: types.REMOVE_FACET_AUTOSUGGEST,
    facet
  }
}

/**
 * Stop autosuggest
 * @return {Object}
 */
export function terminateAutoSuggest () {
  return {
    type: types.TERMINATE_AUTOSUGGEST
  }
}
