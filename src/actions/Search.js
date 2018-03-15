import types from './../constants/ActionTypes'
import { debouceAddHistory } from './History'
import {
  parseQueryString,
  pushState,
  buildQueryString
} from './../services/urlSync'
import {
  debounce,
  checkForAllowedCharacters,
  castNumberToStringArray,
  getDisplayName,
  sanitizeText
} from './../utilities'
import {
  CREATE_FILTER_OBJECT,
  SEARCH_COLLECTION_IDENTIFIER,
  TAXO_ENTITY
} from './../constants/Settings'
import omit from 'ramda/src/omit'

/* Update Browser URL */
const updateURL = debounce(pushState, 300)

/* Should route change */
var globalRouteChange = true

/* URL Parameter */

var historyType = 'pushState'

export function updateQueryTerm (term, searchInput, forcePageReset = true) {
  return {
    type: types.UPDATE_QUERY_TERM,
    term: sanitizeText(term),
    searchInput,
    forcePageReset
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

export function skipSpellcheck (flag) {
  return {
    type: types.SET_SKIP_SPELLCHECK,
    flag
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

export function executeSearch (payload, options) {
  return (dispatch, getState) => {
    /* Check if there is a suggested term */
    var state = getState()
    var query = state.QueryState
    var { allowedCharacters, replaceQueryParamName, answer } = state.AppState
    var { q, isSearchActive, facet_query, page } = query
    const context = state.Context
    const resetSearch = page === 1

    /**
     * Remove facets from intent engine
     * Only reset on first search
     * Todo: Remove sort as well if its set by the intent engine
     */
    if (resetSearch) {
      facet_query = facet_query.filter(
        ({ fromIntentEngine }) => !fromIntentEngine
      )
    }

    /**
     * Check if sort is set by intent engine
     * Todo
     * 1. Clear sort if its from the intent engine
     * 2. make sure sortCondition
     */
    // const isSortFromIntentEngine = answer && answer.search && answer.search.sort

    /* If no query and search is not active (searchOnLoad = false) */
    if (
      (allowedCharacters && !checkForAllowedCharacters(q, allowedCharacters)) ||
      !(isSearchActive || (!!q || facet_query.length))
    ) {
      // Terminate search
      dispatch(terminateSearch())
      // Update the URL
      globalRouteChange && updateURL(query, historyType, replaceQueryParamName)
      return
    }

    /* Extend the query */
    query = {
      ...query,
      facet_query
      // sort: isSortFromIntentEngine ? '' : query.sort
    }

    /**
     * If searching from another page
     */
    if (payload && payload.forceRedirect) {
      window.location.href =
        payload.searchPageUrl +
        '?' +
        buildQueryString(query, replaceQueryParamName)
      return
    }

    return dispatch({
      types: [
        types.REQUEST_SEARCH,
        types.REQUEST_SEARCH_SUCCESS,
        types.REQUEST_SEARCH_FAILURE
      ],
      query,
      context,
      api: 'search',
      payload,
      ...options
    }).then((res) => {
      debouceAddHistory(dispatch)
      /**
       * Check if route should be enabled
       * Implement debounce
       * routeChange - Global configuration
       * urlSync - Used in InstantSearch
       */
      if (!payload || payload.routeChange || payload.urlSync) {
        /* Update Browser URL */
        globalRouteChange &&
          updateURL(query, historyType, replaceQueryParamName)
      }
      return res
    })
  }
}

/**
 * Removes token values from query
 * @param {String} q
 * @param {Array} tokenValues
 */
function removeTokenFromQuery (q, tokenValues) {
  return q
    .replace(new RegExp('\\b(' + tokenValues.join('|') + ')\\b', 'gi'), '')
    .trim()
}

/**
 * Search for facet values
 * @param {String} fullTerm Full query term, default is '*'
 * @param {String} term Partial query
 */
export function executeFacetSearch (
  fullTerm = '*',
  term,
  startToken,
  endToken,
  fieldTypeMapping = {}
) {
  /* Splice based on tokens */
  fullTerm = fullTerm.substr(0, startToken) + fullTerm.substr(endToken)
  /* replace backslash */
  term = term.replace(/\\/gi, '')
  term = sanitizeText(term)
  return (dispatch, getState) => {
    const state = getState()
    const context = state.Context
    const query = state.QueryState
    const { tokens } = query
    const facet_query = tokens.map(({ value, name }) => ({
      selected: [value],
      name,
      multiSelect: true
    }))
    const facets = Object.keys(fieldTypeMapping)
      .filter((key) => fieldTypeMapping[key] === TAXO_ENTITY)
      .concat(SEARCH_COLLECTION_IDENTIFIER)
      .map((name) => CREATE_FILTER_OBJECT({ name }))

    /* Exit early */
    if (!facets.length) return

    /* Remove tokens from the query */
    let initialStart = 0
    let q = removeTokenFromQuery(
      fullTerm,
      tokens.map(({ value }) => value) // .concat(term)
    )

    return dispatch({
      types: [
        types.REQUEST_FACET,
        types.REQUEST_FACET_SUCCESS,
        types.REQUEST_FACET_FAILURE
      ],
      query: {
        ...query,
        q,
        facet_query,
        facets /* Allowed facet fields */,
        skip_spellcheck: true,
        skip_intent: true,
        facetPrefix: term.toLowerCase() /* Always lowercase facet term */,
        per_page: 0
      },
      beforeSuccessCallback (response) {
        return {
          ...response,
          facets: response.facets.map(({ values, ...rest }) => ({
            ...rest,
            values: values.map(({ name, ...r }) => ({
              ...r,
              name: getDisplayName(null, name)
            }))
          }))
        }
      },
      context,
      meta: {
        log: false
      },
      api: 'search'
    })
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

export function fetchMc (key, payload) {
  return (dispatch, getState) => {
    dispatch({
      types: [
        types.REQUEST_MC,
        types.REQUEST_MC_SUCCESS,
        types.REQUEST_MC_FAILURE
      ],
      payload,
      query: { key },
      api: 'mc'
    })
  }
}

export function fetchResult (ids) {
  if (!Array.isArray(ids)) ids = [ids]
  let q = ids.map((id) => `id:${id}`).join(' OR ')
  return (dispatch, getState) => {
    dispatch({
      types: [
        types.REQUEST_RESULT,
        types.REQUEST_RESULT_SUCCESS,
        types.REQUEST_RESULT_FAILURE
      ],
      beforeSuccessCallback: (response) => {
        let { results } = response
        return {
          ...response,
          extra: {
            resultIds: results.map(({ id }) => id),
            resultsById: results.reduce((acc, obj) => {
              acc[obj.id] = obj
              return acc
            }, {})
          }
        }
      },
      query: { q, searchAdapterOptions: { disableBestBets: true }, wt: 'json' },
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
    /* Check if it already exists */
    let exists = getState().QueryState.facet_query.some(
      ({ name, selected }) =>
        name === facet.name && selected.indexOf(value) !== -1
    )
    if (exists) {
      /**
       * If the facet was added from a token and
       * facet has already been selected by intent engine,
       * we need to update that facet
       */
      if (facet.isToken) {
        // dispatch(removeFacet(facet, value))
        // dispatch(addFacet(facet, value))
      }
      return false
    }

    dispatch({
      type: types.ADD_FACET,
      facet: omit(['values'], facet),
      value
    })
  }
}

export function removeFacet (facet, value, resetAllFacets = false) {
  return (dispatch, getState) => {
    /**
     * Also check if
     * `articles about roger` => articles is selected. But user cant remove the filter using `Checkbox` filter
     */
    const intentEngineFacets = getState()
      .QueryState.facet_query.filter(
        ({ fromIntentEngine, isToken }) => fromIntentEngine || isToken
      )
      .map(({ name }) => name)
    const fromIntentEngine =
      facet.fromIntentEngine || intentEngineFacets.indexOf(facet.name) !== -1

    /**
     * Add to skip_facet_fields if the facet is from intent engine
     */
    if (fromIntentEngine) {
      dispatch({
        type: types.ADD_SKIP_FACET_FIELDS,
        facet
      })
    }

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
      dispatch({
        type: types.REMOVE_ALL_FACETS
      })
    }
    return dispatch({
      type: types.REMOVE_FACET,
      facet,
      value
    })
  }
}

export function removeIntentEngineFacets () {
  return {
    type: types.REMOVE_INTENT_ENGINE_FACETS
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
  if (
    facet.rootLevel &&
    parseInt(facet.rootLevel) === value.split('/').length
  ) {
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

export function changeEnvironment (env) {
  return {
    type: types.CHANGE_ENVIRONMENT,
    env
  }
}

/**
 * Initializes search
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
export function initSearch ({ config, urlSync = true, payload = {} }) {
  return (dispatch, getState) => {
    let { history, searchOnLoad = true } = config

    /* History type: pushState or hash */
    historyType = history || historyType

    /* Always pass configuration to @parseQueryString handler */
    urlSync && dispatch(updateStateFromQuery(config))

    /* Global setting */
    globalRouteChange = urlSync

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
        dispatch(
          executeSearch({
            routeChange: false,
            ...payload
          })
        )
      } else {
        dispatch(terminateSearch())
      }
    } else {
      dispatch(
        executeSearch({
          routeChange: false,
          ...payload
        })
      )
    }
  }
}

export function setSearchSource (source) {
  return {
    type: types.SET_SEARCH_SOURCE,
    source
  }
}

export function addToken (options) {
  return {
    type: types.ADD_TOKEN,
    options
  }
}

export function removeToken (value) {
  return {
    type: types.REMOVE_TOKEN,
    value
  }
}

export function removeAllTokens () {
  return {
    type: types.REMOVE_ALL_TOKENS
  }
}

export function replaceTokens (tokens) {
  return {
    type: types.REPLACE_TOKENS,
    tokens
  }
}

export function removeSkipFacetFields (name) {
  return {
    type: types.REMOVE_SKIP_FACET_FIELDS,
    name
  }
}
