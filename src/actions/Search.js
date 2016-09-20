import types from './../constants/ActionTypes'
import { debouceAddHistory } from './History'
import { parseQueryString, pushState } from './../services/urlSync'
import { debounce, checkForAllowedCharacters, castNumberToStringArray } from './../utilities'
import omit from 'ramda/src/omit'
import xss from 'xss'

/* Update Browser URL */
const updateURL = debounce(pushState, 300)

/* Should route change */
var globalRouteChange = true

/* Allowed characters */

var allowedCharacters = null

/* URL Parameter */

var historyType = 'pushState'

export function updateQueryTerm (term, searchInput) {
  return {
    type: types.UPDATE_QUERY_TERM,
    term: xss(term),
    searchInput
  }
}

export function addFilter ({ filter, selected }) {
  return {
    type: types.ADD_FILTER,
    filter, selected
  }
}

export function removeFilter ({ name }) {
  return {
    type: types.REMOVE_FILTER,
    name
  }
}

export function clearFilters () {
  return {
    type: types.CLEAR_FILTERS
  }
}

export function clearQueryTerm () {
  return {
    type: types.CLEAR_QUERY_TERM
  }
}

export function loadMore () {
  return (dispatch, getState) => {
    var currentPage = getState().QueryState.page

    dispatch(changePage(++currentPage))

    dispatch(executeSearch({
      routeChange: false,
      appendResult: true
    }))
  }
}

export function executeSearch (payload) {
  return (dispatch, getState) => {
    /* Check if there is a suggested term */
    var state = getState()
    var query = state.QueryState
    var { q, isSearchActive, facet_query, filters } = query
    var context = state.Context

    /* If no query and search is not active (searchOnLoad = false) */
    if (allowedCharacters &&
      !checkForAllowedCharacters(q, allowedCharacters) ||
      !(isSearchActive || (!!q || facet_query.length || filters.length))
    ) {
      // Terminate search
      dispatch(terminateSearch())
      // Update the URL
      updateURL(query, historyType)
      return
    }

    dispatch({
      types: [
        types.REQUEST_SEARCH,
        types.REQUEST_SEARCH_SUCCESS,
        types.REQUEST_SEARCH_FAILURE
      ],
      query,
      context,
      api: 'search',
      payload
    })

    /**
     * Check if route should be enabled
     * Implement debounce
     * routeChange - Global configuration
     * urlSync - Used in InstantSearch
     */

    if (!payload || payload.routeChange || payload.urlSync) {
      /* Update Browser URL */
      globalRouteChange && updateURL(query, historyType)

      /* Add History */
      debouceAddHistory(dispatch)
    }
  }
}

export function terminateSearch () {
  return {
    type: types.TERMINATE_SEARCH
  }
}

export function addFacet (facet, value) {
  return (dispatch, getState) => {
    acceptSuggestedTerm(dispatch, getState)

    /**
     * Always convert Array to strings
     * [1, 2] => ["1", "2"]
     */
    if (value instanceof Array) value = castNumberToStringArray(value)

    dispatch({
      type: types.ADD_FACET,
      facet: omit('values', facet),
      value
    })
  }
}

export function removeFacet (facet, value) {
  /**
   * Always convert Array to strings
   * [1, 2] => ["1", "2"]
   */
  if (value instanceof Array) value = castNumberToStringArray(value)

  return {
    type: types.REMOVE_FACET,
    facet,
    value
  }
}

export function replaceFacet (facet, value) {
  /**
   * Always convert Array to strings
   * [1, 2] => ["1", "2"]
   */
  if (value instanceof Array) value = castNumberToStringArray(value)

  return {
    type: types.REPLACE_FACET,
    facet, value
  }
}

export function removeAllFacets () {
  return {
    type: types.REMOVE_ALL_FACETS
  }
}

/* Change page */

export function changePage (page) {
  return (dispatch, getState) => {
    acceptSuggestedTerm(dispatch, getState)

    dispatch({
      type: types.CHANGE_PAGE,
      page
    })
  }
}

/* Change per page */

export function changePerPage (perPage) {
  return {
    type: types.CHANGE_PER_PAGE,
    perPage
  }
}

/*
 * When a new query is Suggested and User continues the search, update the term to the new suggested term
 */

function acceptSuggestedTerm (dispatch, getState) {
  var { suggestedTerm } = getState().AppState

  if (suggestedTerm) {
    dispatch(updateQueryTerm(suggestedTerm))
  }
}

/* Change sort */

export function changeSort (sort) {
  return {
    type: types.CHANGE_SORT,
    sort
  }
}

/* Change view */

export function changeView (view) {
  return {
    type: types.CHANGE_VIEW,
    view
  }
}

export function updateStateFromQuery (config) {
  return (dispatch, getState) => {
    let stateFromUrl = parseQueryString(getState().QueryState, config)

    dispatch({
      type: types.UPDATE_STATE_FROM_QUERY,
      stateFromUrl
    })
  }
}

export function setStorageKey (key) {
  return {
    type: types.SET_STORAGE_KEY,
    key
  }
}

/**
 * Initializes search
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
export function initSearch ({ config, urlSync = true }) {
  return (dispatch, getState) => {
    let { history, filters, searchOnLoad = true } = config

    /* History type: pushState or hash */
    historyType = history || historyType

    /* Always pass configuration to @parseQueryString handler */

    urlSync && dispatch(updateStateFromQuery(config))

    /* Set global variable */
    allowedCharacters = config.allowedCharacters

    /* Global setting */
    globalRouteChange = urlSync

    /* Add filters */
    filters && filters.forEach((filter) => {
      let { selected } = filter
      dispatch(addFilter({ filter, selected }))
    })

    /* De-activate search if searchOnLoad is false */
    if (!searchOnLoad) {
      let { q, facet_query, filters } = getState().QueryState
      let shouldSearch = q || facet_query.length || filters.length

      /**
       * Use
       * !this.context.config.searchOnLoad && QueryState.isSearchActive
       * to show hide results
       */
      dispatch({
        type: types.SET_SEARCH_STATUS,
        status: searchOnLoad
      })

      if (shouldSearch) {
        dispatch(executeSearch({
          routeChange: false
        }))
      }
    } else {
      dispatch(executeSearch({
        routeChange: false
      }))
    }
  }
}
