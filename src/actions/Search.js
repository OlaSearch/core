import types from './../constants/ActionTypes'
import { addHistory } from './History'
import { pushState } from './../services/urlSync'
import { debounce, checkForAllowedCharacters } from './../utilities'

/* Update Browser URL */
const updateURL = debounce(pushState, 300)

/* Adds to History */
const addToHistory = debounce(addOlaHistory, 600)

/* Should route change */
var globalRouteChange = true

/* Allowed characters */

var allowedCharacters = null

/* URL Parameter */

var historyType = 'pushState'

export function addOlaHistory (dispatchInstance, query) {
  dispatchInstance(addHistory(query))
}

export function updateQueryTerm (term) {
  return {
    type: types.UPDATE_QUERY_TERM,
    term
  }
}

export function addFilter (payload) {
  return {
    type: types.ADD_FILTER,
    payload
  }
}

export function removeFilter (payload) {
  return {
    type: types.REMOVE_FILTER,
    payload
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

    dispatch(
      executeSearch({
        routeChange: false,
        appendResult: true
      })
    )
  }
}

export function executeSearch (payload) {
  return (dispatch, getState) => {
    /* Check if there is a suggested term */
    var state = getState()
    var query = state.QueryState
    var context = state.Context

    if (allowedCharacters && !checkForAllowedCharacters(query.q, allowedCharacters)) {
      return dispatch(terminateSearch())
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
      payload,
      executeFromSpellSuggest
    })

    /**
     * Check if route should be enabled
     * Implement debounce
     */

    if (!payload || payload.routeChange) {
      /* Update Browser URL */

      globalRouteChange && updateURL(query, historyType)

      /* Add History */

      addToHistory(dispatch, query)
    }
  }
}

export function executeFromSpellSuggest (payload) {
  return (dispatch, getState) => {
    var { suggestedTerm } = payload
    var state = getState()
    var query = {
      ...state.QueryState,
      q: suggestedTerm
    }
    var context = state.Context

    dispatch({
      types: [
        types.REQUEST_SEARCH,
        types.REQUEST_SEARCH_SUCCESS,
        types.REQUEST_SEARCH_FAILURE
      ],
      shouldCallAPI: (state) => true,
      query,
      context,
      api: 'search',
      payload,
      suggestedTerm
    })
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

    dispatch({
      type: types.ADD_FACET,
      facet, value
    })
  }
}

export function removeFacet (facet, value) {
  return {
    type: types.REMOVE_FACET,
    facet, value
  }
}

export function replaceFacet (facet, value) {
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
  return {
    type: types.UPDATE_STATE_FROM_QUERY,
    config
  }
}

export function setStorageKey (key) {
  return {
    type: types.SET_STORAGE_KEY,
    key
  }
}

export function initSearch (options) {
  return (dispatch, getState) => {
    let { config, urlSync, searchOnLoad = true } = options
    let { history } = config

    /* Should Ola Search read state from query string */

    let shouldSyncURL = urlSync === undefined || urlSync

    historyType = history || historyType

    /* Always pass configuration to @parseQueryString handler */

    shouldSyncURL && dispatch(updateStateFromQuery(config))

    /* Set global variable */
    allowedCharacters = config.allowedCharacters

    /* Global setting */

    globalRouteChange = shouldSyncURL

    /* Bootstrap by adding filters */
    let { filters } = config

    filters.forEach((filter) => {
      let { selected } = filter
      if (selected) dispatch(addFilter({ filter, selected }))
    })

    /* Disable Route change initally */

    if (searchOnLoad) {
      dispatch(
        executeSearch({
          routeChange: false
        })
      )
    }
  }
}
