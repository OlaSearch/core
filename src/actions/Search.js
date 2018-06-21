import types from './../constants/ActionTypes'
import { debounceAddHistory } from './History'
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
  sanitizeText,
  isTaxonomyField
} from './../utilities'
import {
  CREATE_FILTER_OBJECT,
  SEARCH_COLLECTION_IDENTIFIER,
  SEARCH_FIELD_TYPE_TAXO,
  EXTERNAL_EVENT_SEARCH_DONE
} from './../constants/Settings'
import omit from 'ramda/src/omit'

/* Update Browser URL */
const updateURL = debounce(pushState, 300)

/* Should route change */
var globalRouteChange = false

/* URL Parameter */

var historyType = 'pushState'

/**
 * Update query term
 * @param  {string}  term
 * @param  {string}  searchInput
 * @param  {Boolean} forcePageReset
 * @return {Object}
 */
export function updateQueryTerm (term, searchInput, forcePageReset = true) {
  return {
    type: types.UPDATE_QUERY_TERM,
    term: sanitizeText(term),
    searchInput,
    forcePageReset
  }
}

/**
 * Add a new filter
 * @param {Object} options.filter
 * @param {(string|Array)} options.selected
 */
export function addFilter ({ filter, selected }) {
  return {
    type: types.ADD_FILTER,
    filter,
    selected
  }
}

/**
 * Remove a filter by name
 * @param  {string} options.name
 * @return {Object}
 */
export function removeFilter ({ name }) {
  return {
    type: types.REMOVE_FILTER,
    name
  }
}

/**
 * Remove all filters
 * @return {Object}
 */
export function clearFilters () {
  return {
    type: types.CLEAR_FILTERS
  }
}

/**
 * Clear query term
 * @return {Object}
 */
export function clearQueryTerm () {
  return {
    type: types.CLEAR_QUERY_TERM
  }
}

/**
 * Action to skip intent engine
 * @param {Object} flag
 */
export function setSkipIntent (flag) {
  return {
    type: types.SET_SKIP_INTENT,
    flag
  }
}

/**
 * Skip Universal spellchecker
 * @param  {Boolean} flag
 * @return {Object}
 */
export function skipSpellcheck (flag) {
  return {
    type: types.SET_SKIP_SPELLCHECK,
    flag
  }
}

/**
 * Load more results
 * @return {function}
 */
export function loadMore () {
  return (dispatch, getState) => {
    var currentPage = getState().QueryState.page
    /* Increment page */
    dispatch(changePage(++currentPage))
    return dispatch(
      executeSearch({
        routeChange: false,
        appendResult: true
      })
    )
  }
}

/**
 * Change answer selection. Used in intent.olasearch.com to change selection of `Barack Obama` => Michelle Obama
 * @param  {number} index
 * @param  {string} key
 * @param  {Object} answer
 * @return {function}
 */
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

/**
 * Execute a search action
 * @param  {Object} payload
 * @param  {Object} options
 * @return {function}
 */
export function executeSearch (payload, options) {
  return (dispatch, getState) => {
    /* Check if there is a suggested term */
    const state = getState()
    var query = state.QueryState
    const {
      allowedCharacters,
      replaceQueryParamName,
      answer,
      searchOnLoad
    } = state.AppState
    var { q, facet_query, page } = query
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
      (!searchOnLoad && !q && !facet_query.length)
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
      debounceAddHistory(dispatch)
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

      /**
       * Do a callback after results are loaded
       */
      document.dispatchEvent(new Event(EXTERNAL_EVENT_SEARCH_DONE))

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
  fieldTypeMapping = {},
  tokens
) {
  /* Splice based on tokens */
  fullTerm = fullTerm.substr(0, startToken) + fullTerm.substr(endToken)
  /**
   * Santize text using xssFilters after remove backslash
   */
  term = sanitizeText(term.replace(/\\/gi, ''))
  return (dispatch, getState) => {
    const state = getState()
    const context = state.Context
    const query = state.QueryState
    const { tokens: queryTokens } = query
    /**
     * Check if user has provided tokens
     */
    const tokensToFilter = tokens || queryTokens
    const facet_query = tokensToFilter.map(({ value, name }) => ({
      selected: [value],
      name,
      multiSelect: true
    }))
    const facets = Object.keys(fieldTypeMapping)
      .filter((key) => isTaxonomyField(key, fieldTypeMapping))
      .concat(SEARCH_COLLECTION_IDENTIFIER)
      .map((name) =>
        CREATE_FILTER_OBJECT({ name: name + SEARCH_FIELD_TYPE_TAXO })
      )

    /* Exit early */
    if (!facets.length) return

    /* Remove tokens from the query */
    const initialStart = 0
    const q = removeTokenFromQuery(
      fullTerm,
      tokensToFilter.map(({ value }) => value) // .concat(term)
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

/**
 * Fetch answer from an URL
 * @param  {string} url
 * @return {function}
 */
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

/**
 * Fetch machine comprehension answer
 * @param {string} key
 * @param {Object} payload
 */
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

/**
 * Get a single result by id from the search engine
 * @param {(string|Array|number)} ids
 */
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

/**
 * Terminate search if
 * 1. allowedCharacters
 * 2. searchOnLoad = false
 */
export function terminateSearch () {
  return {
    type: types.TERMINATE_SEARCH
  }
}

/**
 * Add a facet
 *
 * @param {Object} facet
 * @param {(string|number)} value
 */
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

/**
 * Remove a facet
 * @param  {Object}  facet
 * @param  {(string|number)}  value
 * @param  {Boolean} resetAllFacets
 * @return {function}
 */
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

/**
 * Remove all facets added by intent engine
 * @return {Object}
 */
export function removeIntentEngineFacets () {
  return {
    type: types.REMOVE_INTENT_ENGINE_FACETS
  }
}

/**
 * Replace a facet's selected value
 * @param  {Object} facet
 * @param  {(string|number)} value
 * @return {Object}
 */
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

/**
 * Remove all selected facets
 * @return {function}
 */
export function removeAllFacets () {
  return (dispatch, getState) => {
    /**
     * Check if there any intent engine facets
     */
    let facetsFromIntentEngine = getState().QueryState.facet_query.filter(
      ({ fromIntentEngine }) => fromIntentEngine
    )
    if (facetsFromIntentEngine.length) {
      for (let i = 0; i < facetsFromIntentEngine.length; i++) {
        dispatch({
          type: types.ADD_SKIP_FACET_FIELDS,
          facet: facetsFromIntentEngine[i]
        })
      }
    }
    /**
     * Now clear all filters
     */
    dispatch({
      type: types.REMOVE_ALL_FACETS
    })
  }
}

/**
 * Remove a specific facet
 * @param  {Object} facet
 * @return {Object}
 */
export function removeFacetItem (facet) {
  return {
    type: types.REMOVE_FACET_ITEM,
    facet
  }
}

/**
 * Change page
 * @param  {(number)} page
 * @return {function}
 */
export function changePage (page) {
  return (dispatch, getState) => {
    acceptSuggestedTerm(dispatch, getState)

    dispatch({
      type: types.CHANGE_PAGE,
      page
    })
  }
}

/**
 * Change per page
 * @param  {number} perPage
 * @return {Object}
 */
export function changePerPage (perPage) {
  return {
    type: types.CHANGE_PER_PAGE,
    perPage
  }
}

/**
 * When a new query is Suggested and User continues the search, update the term to the new suggested term
 * @param  {function} dispatch
 * @param  {function} getState
 */
function acceptSuggestedTerm (dispatch, getState) {
  var { suggestedTerm } = getState().AppState

  if (suggestedTerm) {
    dispatch(clearSuggestedTerm())
    dispatch(updateQueryTerm(suggestedTerm))
  }
}

/**
 * Remove suggested term
 */
function clearSuggestedTerm () {
  return {
    type: types.CLEAR_SUGGESTED_TERM
  }
}

/**
 * Change sort parameter
 * @param  {string} sort
 * @return {Object}
 */
export function changeSort (sort) {
  return {
    type: types.CHANGE_SORT,
    sort
  }
}

export function updateStateFromQuery (config, urlParser) {
  return (dispatch, getState) => {
    var stateFromUrl = parseQueryString(getState().QueryState, config)
    /**
     * Add a custom url parser
     */
    if (urlParser && typeof urlParser === 'function') {
      stateFromUrl = urlParser(stateFromUrl)
    }

    dispatch({
      type: types.UPDATE_STATE_FROM_QUERY,
      stateFromUrl
    })
  }
}

/**
 * Change current environment
 * @param  {string} env
 * @return {Object}
 */
export function changeEnvironment (env) {
  return {
    type: types.CHANGE_ENVIRONMENT,
    env
  }
}

/**
 * Initialize search
 * @param  {Object}  options.config
 * @param  {Boolean} options.urlSync
 * @param  {Object}  options.payload
 * @param  {Object}  options
 * @return {function}
 */
export function initSearch ({
  config,
  urlSync = true,
  payload = {},
  options = {},
  urlParser = null
}) {
  return (dispatch, getState) => {
    const { history, searchOnLoad = true } = config

    /* History type: pushState or hash */
    historyType = history || historyType

    /* Always pass configuration to @parseQueryString handler */
    if (urlSync) dispatch(updateStateFromQuery(config, urlParser))

    /* Global setting */
    globalRouteChange = urlSync

    /* De-activate search if searchOnLoad is false */
    if (!searchOnLoad) {
      const { q, facet_query } = getState().QueryState
      const shouldSearch = q || facet_query.length

      if (shouldSearch) {
        return dispatch(
          executeSearch(
            {
              routeChange: false,
              ...payload
            },
            options
          )
        )
      } else {
        dispatch(terminateSearch())
      }
    } else {
      return dispatch(
        executeSearch(
          {
            routeChange: false,
            ...payload
          },
          options
        )
      )
    }
  }
}

/**
 * Set source of the search request
 * @param {string} source
 */
export function setSearchSource (source) {
  return {
    type: types.SET_SEARCH_SOURCE,
    source
  }
}

/**
 * Add a token
 * @param {Object} options
 */
export function addToken (options) {
  return {
    type: types.ADD_TOKEN,
    options
  }
}

/**
 * Remove a token by value
 * @param  {string} value
 * @return {Object}
 */
export function removeToken (value) {
  return {
    type: types.REMOVE_TOKEN,
    value
  }
}

/**
 * Remove all tokens
 * @return {Object}
 */
export function removeAllTokens () {
  return {
    type: types.REMOVE_ALL_TOKENS
  }
}

/**
 * Replace all token
 * @param  {Array} tokens
 * @return {Object}
 */
export function replaceTokens (tokens) {
  return {
    type: types.REPLACE_TOKENS,
    tokens
  }
}

/**
 * Skip facet field
 * @param  {string} name
 * @return {Object}
 */
export function removeSkipFacetFields (name) {
  return {
    type: types.REMOVE_SKIP_FACET_FIELDS,
    name
  }
}

/**
 * Trigger a rehydrate action
 * @param  {Object} params
 * @return {Object}
 */
export function reHydrate (params) {
  return {
    type: types.OLA_REHYDRATE,
    ...params
  }
}

/**
 * Add a start timestamp to an api
 * @param {string} api
 */
export function addTimestamp (api) {
  return {
    type: types.ADD_TIMESTAMP,
    api
  }
}
