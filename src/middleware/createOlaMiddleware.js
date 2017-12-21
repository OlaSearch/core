/**
 * Ola Middleware
 * # Functions
 * 1. Ajax requests for search adapters
 * 2. Set skip_intent to true if page > 1 or enriched_q !== ''
 */
import { debounceLog, submitLog } from './../actions/Logger'
import queryString from 'query-string'
import { fetchAnswer } from './../actions/Search'
import {
  FUZZY_SUGGEST_KEY,
  API_IGNORE_LOGGING,
  INTENT_SUPPORTED_API_KEYS
} from './../constants/Settings'

module.exports = (options = {}) => {
  return ({ dispatch, getState }) => (next) => (action) => {
    const {
      types,
      api,
      query,
      context = {},
      payload = {},
      meta = {},
      suggestedTerm,
      nullResponse = null,
      processResponse = true,
      processData = null,
      shouldDispatchActions = true,
      returnWithoutDispatch = false
    } = action

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
      /**
       * Only used for admin console compatiblity
       * Disable intent engine so that config files are read from Javascript itself. If you enable intent engine, config file is used in the proxy
       */
      if (payload.disableIntentEngine) {
        config.proxy = false
        config.intentEngineEnabled = false
      }
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
        userId: context.userId,
        userSession: context.userSession,
        searchSession: context.searchSession,
        context,
        projectId,
        env
      }
      : api === FUZZY_SUGGEST_KEY
        ? { ...query, ...payload.extraParams }
        : queryBuilder.transform(
            { ...query, ...payload.extraParams },
            null,
            acl,
            context
          )

    const shouldLog = meta.log !== false
    const apiOptions = meta.apiOptions ? meta.apiOptions : null

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
        ? searchService[api](timestampObj, params, apiUrl, apiOptions)
        : null
    }
    if (typeof callApi !== 'object' || typeof callApi.then !== 'function') {
      throw new Error('Expect API call to return a promise.')
    }

    return callApi
      .then((xhr) => {
        /* Validate resonse */
        let { responseText } = xhr
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
        return /^[\{\[]/.test(responseText)
          ? JSON.parse(responseText)
          : responseText
      })
      .then(
        (response) => {
          /* If null response, pass it on */
          if (!response) return response

          const type = successType

          /* Check if process response is false */

          if (processData) {
            response = processData(response, payload, currentState)
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
          var extra = response.extra
          var version
          if (proxy) {
            results = response.results
            spellSuggestions = response.spellSuggestions
            totalResults = response.totalResults
            facets = response.facets
            qt = response.qt
            enrichedQuery = response.enriched_q
            skipSearchResultsUpdate = response.skipSearchResultsUpdate
            responseTime = response.responseTime
            version = response.version

            /* Instant answer */
            answer = api === 'answer' ? response : response.answer
          } else {
            results = parser.normalizeResults(response)
            spellSuggestions = parser.normalizeSpellSuggestions(response)
            totalResults = parser.normalizeTotalResults(response)
            facets = parser.normalizeFacets(response)
            qt = parser.queryTime(response)
            responseTime = response.responseTime
            version = parser.version()
          }

          /**
         * Get facets or filters selected by intent engine
         * 1. Check if facet already exists
         */
          let facetQuery = currentState.QueryState.facet_query
          if (
            answer &&
            answer.search &&
            answer.search.facet_query &&
            answer.search.facet_query.length
          ) {
            for (let i = 0; i < answer.search.facet_query.length; i++) {
              let { name, selected, ...rest } = answer.search.facet_query[i]
              /* Check if it already exists */
              let exists = facetQuery.some(({ name: _name }) => _name === name)
              if (exists) {
                facetQuery = facetQuery.map((item) => {
                  if (item.name === name) item.selected = selected
                  return item
                })
              } else {
                facetQuery = [...facetQuery, ...answer.search.facet_query[i]]
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
              facetQuery,
              extra,
              version
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
          const isBotReply = answer && 'awaiting_user_input' in answer
          const sendImmediateLog = isBotReply && !answer.awaiting_user_input
          const logFn = sendImmediateLog ? submitLog : debounceLog
          if (
            logger &&
            logger.enabled &&
            API_IGNORE_LOGGING.indexOf(api) === -1 &&
            shouldLog
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
            responseTime,
            facetQuery
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
