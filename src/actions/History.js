import types from './../constants/ActionTypes'
import {
  buildQueryString,
  HASH_CHARACTER as hashCharacter
} from './../services/urlSync'
import omit from 'ramda/src/omit'
// import flatten from 'ramda/src/flatten'
import { debounce } from './../utilities'

/**
 * Add a query to history
 * @param {Object} options
 */
export function addHistory () {
  return (dispatch, getState) => {
    const { QueryState, AppState } = getState()
    const { q, tokens } = QueryState
    const { totalResults, history } = AppState
    if (!q || !totalResults || q === '*' || q.indexOf('*') !== -1) return

    /* Filtering history */
    const query = omit(
      ['page', 'per_page', 'referrer', 'facet_query', 'filters'],
      QueryState
    )
    /* We are not storing facets */
    const activeFacets = []
    /* Check if it already exists */
    const exists = history.some(
      (item) => item.q.toLowerCase() === q.toLowerCase()
    )
    /* Check if history already exists */
    if (exists) {
      return dispatch({
        type: types.UPDATE_HISTORY,
        q,
        dateAdded: new Date().getTime()
      })
    }

    dispatch({
      type: types.ADD_HISTORY,
      history: {
        q,
        url: hashCharacter + buildQueryString(query),
        dateAdded: new Date().getTime(),
        facets: activeFacets,
        tokens,
        popularity: 1
      }
    })
  }
}

export function clearHistory () {
  return {
    type: types.CLEAR_HISTORY
  }
}

export function removeHistory (result) {
  return {
    type: types.REMOVE_HISTORY,
    result
  }
}

/* Adds to History */
export const debounceAddHistory = debounce(_addHistory, 600)

/**
 * Takes dispatch as first argument
 * @param {function} dispatch
 */
function _addHistory (dispatch, options) {
  dispatch(addHistory(options))
}
