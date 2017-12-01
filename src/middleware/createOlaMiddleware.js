/**
 * Ola Middleware
 * # Functions
 * 1. State persistence for Bookmarks, History and Context
 * 2. Ajax requests for search adapters
 * 3. Set skip_intent to true if page > 1 or enriched_q !== ''
 */
import { debounceLog, submitLog } from './../actions/Logger'
import { debouncePersistState, STATE_TYPE_KEYS } from './../store/persistState'
import queryString from 'query-string'
import { fetchAnswer } from './../actions/Search'
import {
  FUZZY_SUGGEST_KEY,
  INTENT_SUPPORTED_API_KEYS,
  API_IGNORE_LOGGING
} from './../constants/Settings'

module.exports = (options = {}) => {
  return ({ dispatch, getState }) => (next) => (action) => {
    const {
      types,
      api,
      query,
      context,
      payload = {},
      suggestedTerm,
      nullResponse = null,
      processResponse = true,
      processData = null,
      shouldDispatchActions = true,
      returnWithoutDispatch = false
    } = action

    /* Persist store state */
    if (STATE_TYPE_KEYS.indexOf(action.type) !== -1) {
      debouncePersistState(action, getState, options.config.namespace)
    }

    // Normal action: pass it on
    if (!types) return next(action)

    let { parser, queryBuilder, config, searchService } = options

    /**
     * When config is a function, Ola Search expects `engineConfig` in config file
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
      throw new Error(
        'No parser, queryBuilder, searchService, config file present in OlaMiddleWare options'
      )
    }

    const { logger, proxy, intentEngineEnabled } = config

    if (
      !Array.isArray(types) ||
      !types.length > 1 ||
      !types.every((type) => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    const [requestType, successType, failureType] = types

    shouldDispatchActions &&
      next({
        ...payload,
        type: requestType,
        api
      })

    /* Add timestamp to query */
    const currentState = getState()
    const projectId = currentState.QueryState.projectId
    const env = currentState.QueryState.env || 'staging'
    const timestampObj = {
      timestamp: currentState.Timestamp.timestamp[api],
      projectId,
      env
    }

    /* ACL Rules */
    const acl = currentState.Acl
    let callApi
    const skipIntentEngine = query.page > 1 || query.enriched_q !== ''
    const params = proxy
      ? {
        ...query,
        ...(skipIntentEngine ? { skip_intent: true } : {}),
        ...payload.extraParams,
        ...(payload.answer ? { answer: payload.answer } : {}),
        api,
        ...context,
        projectId,
        env
      }
      : api === FUZZY_SUGGEST_KEY
        ? query
        : queryBuilder.transform(query, null, acl, context)

    /* Api url when intent engine is active */
    const apiUrl =
      intentEngineEnabled && INTENT_SUPPORTED_API_KEYS.indexOf(api) !== -1
        ? config.api.intent
        : undefined

    if (typeof api === 'function') {
      /* Should returns a promise */
      callApi = api(params)
    } else {
      callApi = searchService.hasOwnProperty(api)
        ? searchService[api](timestampObj, params, apiUrl)
        : null
    }
    if (typeof callApi !== 'object' || typeof callApi.then !== 'function') {
      throw new Error('Expect API call to return a promise.')
    }

    return callApi.then(
      (response, xhr) => {
        if (xhr && 'responseURL' in xhr) {
          const responseURL = xhr.responseURL.split('?').pop()
          const timestampFromResponse = parseInt(
            queryString.parse(responseURL).timestamp
          )
          if (
            timestampFromResponse &&
            getState().Timestamp.timestamp[api] !== timestampFromResponse
          ) {
            return nullResponse
          }
        }
        const type = successType

        /* Check if process response is false */

        if (processData) {
          response = processData(response)
        }

        /* For autocomplete */
        if (returnWithoutDispatch) return response

        if (!processResponse) {
          return next({
            type,
            response
          })
        }

        /* Parse only when the timestamp matches */
        var results
        var spellSuggestions
        var totalResults
        var facets
        var qt
        var answer
        var enrichedQuery
        var skipSearchResultsUpdate = false
        var responseTime
        if (proxy) {
          results = response.results
          spellSuggestions = response.spellSuggestions
          totalResults = response.totalResults
          facets = response.facets
          qt = response.qt
          enrichedQuery = response.enriched_q
          skipSearchResultsUpdate = response.skipSearchResultsUpdate
          responseTime = response.responseTime

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
         * Get facets or filters selected by intent engine
         */
        let facetQuery = null
        if (
          answer &&
          answer.search &&
          answer.search.facet_query &&
          answer.search.facet_query.length
        ) {
          facetQuery = []
          for (let i = 0; i < answer.search.facet_query.length; i++) {
            let selectedFacet = facets.filter(
              ({ name }) => name === answer.search.facet_query[i].name
            )
            if (selectedFacet.length) {
              facetQuery.push({
                ...selectedFacet.reduce((a, b) => a),
                ...answer.search.facet_query[i],
                values: []
              })
            }
          }
        }

        /**
         * Check if
         * Total results = 0 && Has Spell Suggestions
         */
        if (
          totalResults === 0 &&
          spellSuggestions.length &&
          !enrichedQuery &&
          !(answer && (answer.card !== null || answer.reply))
        ) {
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
            context,
            responseTime,
            facetQuery
          })
        }

        shouldDispatchActions &&
          next({
            payload,
            results,
            spellSuggestions,
            totalResults,
            facets,
            type,
            suggestedTerm,
            qt,
            answer,
            enriched_q: enrichedQuery,
            error: null,
            skipSearchResultsUpdate,
            api,
            responseTime,
            facetQuery
          })

        /**
         * Logger
         * Parameters
         * Q or C
         * results
         * eventSource
         * searchInput = `voice`|`url`|`keyboard`
         */
        /* Query becomes empty for long conversations */
        let isBotReply = answer && 'awaiting_user_input' in answer
        let sendImmediateLog = isBotReply && !answer.awaiting_user_input
        let logFn = sendImmediateLog ? submitLog : debounceLog
        if (
          logger &&
          logger.enabled &&
          API_IGNORE_LOGGING.indexOf(api) === -1
        ) {
          logFn({
            dispatch,
            eventType: 'Q',
            eventSource: currentState.QueryState.source || api,
            state: getState(),
            responseTime
          })
        }

        /**
         * If answer is a callback
         * SPICE
         */
        if (answer && answer.callback) {
          dispatch(fetchAnswer(answer.callback))
        }

        return {
          results,
          spellSuggestions,
          totalResults,
          facets,
          type,
          suggestedTerm,
          qt,
          answer,
          responseTime
        }
      },
      (error) => {
        shouldDispatchActions &&
          next({
            payload,
            error,
            type: failureType
          })
      }
    )
  }
}
