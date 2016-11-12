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
      let { selected, template, dateFormat, type } = item
      switch (type) {
        case 'range':
          if (typeof selected === 'string') {
            return selected
          } else {
            let [from, to] = selected
            return supplant(template, {from, to})
          }
        case 'daterange':
          let [ from, to ] = selected[0]
          let fromDate = new Date(parseInt(from))
          let toDate = new Date(parseInt(to))
          return supplant(template, {
            from: DateParser.format(fromDate, dateFormat),
            to: DateParser.format(toDate, dateFormat)
          })

        default:
          return selected
      }
    }))

    /* Check if it already exists */
    var exists = history.filter((item) => item.q === q && equals(item.facets, activeFacets))

    /* Check if history already exists */
    if (exists.length) return

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
