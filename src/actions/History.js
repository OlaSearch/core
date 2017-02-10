import types from './../constants/ActionTypes'
import { buildQueryString, character as hashCharacter } from './../services/urlSync'
import omit from 'ramda/src/omit'
import flatten from 'ramda/src/flatten'
import equals from 'ramda/src/equals'
import { debounce, supplant } from './../utilities'
import DateParser from './../utilities/dateParser'

export function addHistory (options) {
  return (dispatch, getState) => {
    let { QueryState, AppState } = getState()
    let { q, facet_query } = QueryState
    let { totalResults, history } = AppState
    if (!q || !totalResults) return

    /* Filtering history */
    var query = omit(['page', 'per_page', 'referrer'], QueryState)
    var activeFacets = flatten(facet_query.map((item) => {
      let { selected, template, dateFormat, type, name } = item
      switch (type) {
        case 'range':
        case 'daterange':
          if (typeof selected === 'string') {
            return selected
          } else {
            return selected.map((item) => {
              let [from, to] = item
              return `${name}:${supplant(template, {
                from: dateFormat ? DateParser.format(from, dateFormat) : from,
                to: dateFormat ? DateParser.format(to, dateFormat) : to
              })}`
            })
          }

        default:
          return `${name}:${selected}`
      }
    }))

    /* Check if it already exists */
    var exists = history.some((item) => item.q === q && equals(item.facets, activeFacets))

    /* Check if history already exists */
    if (exists) return

    dispatch({
      type: types.ADD_HISTORY,
      history: {
        q,
        url: hashCharacter + buildQueryString(query),
        dateAdded: new Date().getTime(),
        facets: activeFacets
      }
    })
  }
}

export function clearHistory () {
  return {
    type: types.CLEAR_HISTORY
  }
}

/* Adds to History */
export const debouceAddHistory = debounce(_addHistory, 600)

/**
 * Takes dispatch as first argument
 * @param {function} dispatch
 */
function _addHistory (dispatch, options) {
  dispatch(addHistory(options))
}
