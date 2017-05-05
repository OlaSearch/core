import types from './../constants/ActionTypes'
import { debouceAddHistory } from './History'
import { parseQueryString, pushState, buildQueryString } from './../services/urlSync'
import { debounce, checkForAllowedCharacters, castNumberToStringArray } from './../utilities'
import omit from 'ramda/src/omit'
import xssFilters from 'xss-filters'

/* Update Browser URL */
const updateURL = debounce(pushState, 300)

/* Should route change */
var globalRouteChange = true

/* Allowed characters */

var allowedCharacters = null

/* URL Parameter */

var historyType = 'pushState'
var replaceQueryParamName = false

export function updateQueryTerm (term, searchInput) {
  return {
    type: types.UPDATE_QUERY_TERM,
    term: xssFilters.inHTMLData(term),
    searchInput
  }
}

export function addFilter ({ filter, selected }) {
  return {
    type: types.ADD_FILTER,
    filter,
    selected
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

export function setSkipIntent (flag) {
  return {
    type: types.SET_SKIP_INTENT,
    flag
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

export function changeAnswerSelection (index, key, answer) {
  /* Clone */
  let newAnswer = JSON.parse(JSON.stringify(answer))
  newAnswer['suggestions'][key].selection = index
  return (dispatch, getState) => {
    /* Clear enriched query for Intent engine */
    dispatch({ type: types.CLEAR_ENRICHED_QUERY })
    /* Execute search */
    dispatch(executeSearch({ answer: newAnswer }))
  }
}

export function executeSearch (payload) {
  return (dispatch, getState) => {
    /* Check if there is a suggested term */
    var state = getState()
    var query = state.QueryState
    var { q, isSearchActive, facet_query } = query
    var context = state.Context

    /* If no query and search is not active (searchOnLoad = false) */
    if (
        (
          allowedCharacters &&
          !checkForAllowedCharacters(q, allowedCharacters)
        ) ||
        !(isSearchActive || (!!q || facet_query.length))
    ) {
      // Terminate search
      dispatch(terminateSearch())
      // Update the URL
      updateURL(query, historyType, replaceQueryParamName)
      return
    }

    /**
     * If searching from another page
     */
    if (payload && payload.forceRedirect) {
      window.location.href = payload.searchPageUrl + '?' + buildQueryString(query, payload.replaceQueryParamName)
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
      globalRouteChange && updateURL(query, historyType, replaceQueryParamName)

      /* Add History */
      debouceAddHistory(dispatch)
    }
  }
}

export function fetchAnswer (url) {
  return (dispatch, getState) => {
    dispatch({
      types: [
        types.REQUEST_ANSWER,
        types.REQUEST_ANSWER_SUCCESS,
        types.REQUEST_ANSWER_FAILURE
      ],
      query: { url },
      api: 'answer'
    })
  }
}

export function fetchResult (id) {
  return (dispatch, getState) => {
    dispatch({
      types: [
        types.REQUEST_RESULT,
        types.REQUEST_RESULT_SUCCESS,
        types.REQUEST_RESULT_FAILURE
      ],
      query: { q: `id:${id}`, projectId: getState().QueryState.projectId, env: getState().QueryState.env },
      api: 'get'
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

export function removeFacet (facet, value, resetAllFacets = false) {
  /**
   * Always convert Array to strings
   * [1, 2] => ["1", "2"]
   */
  if (value instanceof Array) value = castNumberToStringArray(value)

  /*
    Reset facets is a Root facet (Tabs or Collection)
    Used in admin console
  */
  if (resetAllFacets || facet.resetOnDeSelect) {
    return {
      type: types.REMOVE_ALL_FACETS
    }
  }
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

  /**
   * For heirarchical facet
   */
  if (facet.rootLevel && parseInt(facet.rootLevel) === value.split('/').length) {
    return {
      type: types.REMOVE_FACET_ITEM,
      facet
    }
  }

  return {
    type: types.REPLACE_FACET,
    facet,
    value
  }
}

export function removeAllFacets () {
  return {
    type: types.REMOVE_ALL_FACETS
  }
}

export function removeFacetItem (facet) {
  return {
    type: types.REMOVE_FACET_ITEM,
    facet
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

    /* Replace `q` with `keywords` */
    if (config.replaceQueryParamName) replaceQueryParamName = true

    /* Always pass configuration to @parseQueryString handler */

    urlSync && dispatch(updateStateFromQuery(config))

    /* Set global variable */
    allowedCharacters = config.allowedCharacters

    /* Global setting */
    globalRouteChange = urlSync

    /* Add filters */
    if (filters) {
      for (let i = 0, len = filters.length; i < len; i++) {
        let { selected } = filters[i]
        dispatch(addFilter({ filter: filters[i], selected }))
      }
    }

    /* De-activate search if searchOnLoad is false */
    if (!searchOnLoad) {
      let { q, facet_query } = getState().QueryState
      let shouldSearch = q || facet_query.length

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
