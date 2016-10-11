/**
 * Ola Middleware
 * # Functions
 * 1. State persistence for Bookmarks, History and Context
 * 2. Ajax requests for search adapters
 */
import { debounceLog } from './../actions/Logger'
import { debouncePersistState, STATE_TYPE_KEYS } from './../store/persistState'
import queryString from 'query-string'
import { fetchAnswer } from './../actions/Search'

const FUZZY_SUGGEST_KEY = 'fuzzySuggest'

module.exports = (options = {}) => {
  return ({ dispatch, getState }) => (next) => (action) => {
    const {
      types,
      api,
      query,
      context,
      payload = {},
      suggestedTerm,
      processResponse = true,
      processData = null,
      shouldDispatchActions = true
    } = action

    /* Persist store state */
    if (STATE_TYPE_KEYS.indexOf(action.type) !== -1) {
      debouncePersistState(action, getState, options.config.namespace)
    }

    // Normal action: pass it on
    if (!types) return next(action)

    let { parser, queryBuilder, config, searchService } = options

    /**
     * When config is a function, Ola Search expects
     *  engineConfiguration
     *  engineConfig = {
     *    solr: { parser, queryBuilder, searchService },
     *    elastic: { parser, queryBuilder, searchService }
     *  }
     * search_engine_type: 'solr|elastic'
     * @param  {[type]} typeof config        [description]
     * @return {[type]}        [description]
     */
    if (typeof config === 'function') {
      config = config(getState)
      let currentEngine = options.engineConfig[config.search_engine_type]
      parser = new currentEngine.Parser(config)
      queryBuilder = new currentEngine.QueryBuilder(config)
      searchService = new currentEngine.SearchService(config)
    }

    if (!config) {
      throw new Error('No parser, queryBuilder, searchService, config file present in OlaMiddleWare options')
    }

    const { logger, proxy } = config

    if (
      !Array.isArray(types) ||
      !types.length > 1 ||
      !types.every((type) => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    /**
     * Fuzzy suggest
     */
    if (api === FUZZY_SUGGEST_KEY) {
      return searchService[api](timestampObj, query)
    }

    const [ requestType, successType, failureType ] = types

    shouldDispatchActions && next({
      ...payload,
      type: requestType
    })

    /* Add timestamp to query */
    var currentState = getState()
    let timestampObj = {
      timestamp: currentState.Timestamp.timestamp
    }

    /* ACL Rules */
    let acl = currentState.Acl
    let callApi
    let mapping = getMapping(api, config)
    let params = proxy
        ? { ...query, api }
        : queryBuilder.transform(query, mapping, acl, context)

    if (typeof api === 'function') {
      /* Returns a promise */
      callApi = () => api(params)
    } else {
      callApi = () => searchService.hasOwnProperty(api) ? searchService[api](timestampObj, params) : null
    }

    if (typeof callApi !== 'function') {
      throw new Error('Expected callApi to be a function. Check your dispatch call.')
    }

    return callApi().then(
      (response, xhr) => {
        if (xhr && 'responseURL' in xhr) {
          let responseURL = xhr.responseURL.split('?').pop()
          let timestampFromResponse = parseInt(queryString.parse(responseURL).timestamp)
          if (timestampFromResponse && getState().Timestamp.timestamp !== timestampFromResponse) return
        }

        let type = successType

        /* Check if process response is false */

        if (!processResponse) {
          return next({
            type,
            response: processData ? processData(response) : response
          })
        }

        /* Parse only when the timestamp matches */
        var results
        var spellSuggestions
        var totalResults
        var facets
        var qt
        var answer
        var enriched_q
        if (proxy) {
          results = response.results
          spellSuggestions = response.spellSuggestions
          totalResults = response.totalResults
          facets = response.facets
          qt = response.qt
          enriched_q = response.enriched_q

          /* Instant answer */
          answer = api === 'answer' ? response : response.answer
        } else {
          results = parser.normalizeResults(response)
          spellSuggestions = parser.normalizeSpellSuggestions(response)
          totalResults = parser.normalizeTotalResults(response)
          facets = parser.normalizeFacets(response)
          qt = parser.queryTime(response)
        }

        /**
         * Check if
         * Total results = 0 && Has Spell Suggestions
         */

        if (totalResults === 0 && spellSuggestions.length) {
          let { term } = spellSuggestions[0]
          return dispatch({
            types,
            query: {
              ...query,
              q: term
            },
            suggestedTerm: term,
            api,
            payload,
            context
          })
        }

        /**
         * If answer is a callback
         * SPICE
         */
        if (answer && answer.callback) {
          dispatch(fetchAnswer(answer.callback))
        }

        shouldDispatchActions && next({
          payload,
          results,
          spellSuggestions,
          totalResults,
          facets,
          type,
          suggestedTerm,
          qt,
          answer,
          enriched_q,
          error: null
        })

        /**
         * Logger
         * Parameters
         * Q or C
         * results
         * eventSource
         * searchInput = `voice`|`url`|`keyboard`
         */
        if (logger && logger.enabled) {
          debounceLog({
            dispatch,
            eventType: 'Q',
            eventSource: api,
            debounce: true,
            state: getState()
          })
        }

        return {
          results,
          spellSuggestions,
          totalResults,
          facets,
          type,
          suggestedTerm,
          qt,
          answer
        }
      },
      (error) => {
        shouldDispatchActions && next({
          payload,
          error,
          type: failureType
        })
      }
    )
  }
}

/**
 * Get Query mapping
 * @param  {string} type
 * @param  {object} config
 * @return {object}
 */
const getMapping = (type, config) => {
  switch (type) {
    case 'suggest':
      return config.mappingAutoSuggest

    case FUZZY_SUGGEST_KEY:
      return config.mappingFuzzySuggest

    default:
      return null
  }
}
