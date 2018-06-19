/**
 * Ola Middleware
 * # Functions
 * 1. Ajax requests for search adapters
 * 2. Set skip_intent to true if page > 1 or enriched_q !== ''
 */
import { debounceLog, submitLog } from './../actions/Logger'
import queryString from 'query-string'
import { fetchAnswer } from './../actions/Search'
import { requestGeoLocation } from './../actions/Context'
import {
  FUZZY_SUGGEST_KEY,
  API_IGNORE_LOGGING,
  INTENT_SUPPORTED_API_KEYS,
  IGNORE_INTENTS,
  ERROR_CODES,
  SPELLCHECK_SOURCE_UNIVERSAL,
  SPELLCHECK_SOURCE_CONTENT
} from './../constants/Settings'
import { uuid, getFacetTypeFromSlot } from './../utilities'

/**
 * Ola Middleware accepts all http requests only if action types is an array with 3 values
 *
 * @param  {Object} options
 * @param  {Object} options.parser Search parser
 * @param  {Object} options.queryBuilder Search adapter query builder
 * @param  {Object} options.searchService Search adapter http service
 * @param  {Object} options.config Project configuration object
 * @return {function}
 */
export default function (options = {}) {
  return ({ dispatch, getState }) => (next) => (action) => {
    /* If no action pass it on */
    if (!action) return next(action)
    const {
      types,
      api,
      query = {},
      context = {},
      payload = {},
      meta = {},
      nullResponse = null,
      processData = null /* Executed once data is received from the server: Will break if intent engine is turned OFF */,
      beforeSuccessCallback = null /* Executed after adapters have done their work */,
      shouldDispatchActions = true,
      returnWithoutDispatch = false
    } = action
    let { suggestedTerm, spellCheckSource } = action

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
    const tokens = currentState.QueryState.tokens
    const env = currentState.QueryState.env || 'staging'
    const timestampObj = {
      timestamp: currentState.Timestamp.timestamp[api],
      projectId,
      env
    }

    /* ACL Rules */
    const acl = currentState.Acl
    let callApi
    const { bot } = payload
    const skipIntentEngine =
      !bot /* 26/2/2018 @vinay: Removed this because the Intent engine selects boths `slots` and facet_query. In page 2, we are only sending facet_query, should we send slots too and skip_intent. */ /* query.page > 1 || */ &&
      // query.enriched_q !== '' ||
      query.q === ''
    const params = proxy
      ? {
        ...query,
        bot /* Send to the intent engine */,
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
        const { responseText } = xhr
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
      .then((response) => {
        /* If null response, pass it on */
        if (!response) return response

        const type = successType

        /* Check if process response is false */
        if (processData) {
          response = processData(response, payload, currentState)
        }

        /* For autocomplete */
        if (returnWithoutDispatch) return response

        /* Parse only when the timestamp matches */
        var results
        var spellSuggestions
        var totalResults
        var facets
        var qt
        var answer
        var mc
        var enrichedQuery
        var skipSearchResultsUpdate = false
        var responseTime
        var extra = response.extra
        var version
        var spellCheckedQuery
        var sortCondition
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

          /* Query from the response */
          spellCheckedQuery = response.spellCheckedQuery

          /* Machine comprehension */
          mc = api === 'mc' ? response : response.mc
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
         * Set suggested term if response query is not equal to search query
         * Not release in Production yet
         */
        if (spellCheckedQuery) {
          suggestedTerm = spellCheckedQuery
          spellCheckSource = SPELLCHECK_SOURCE_UNIVERSAL
        }

        /**
         * Check if bot is enabled
         */
        if (
          bot &&
          INTENT_SUPPORTED_API_KEYS.indexOf(api) !== -1 &&
          (!intentEngineEnabled ||
            (answer &&
              answer.error &&
              answer.error === ERROR_CODES['BOT_NO_EXISTS']))
        ) {
          /* Bot is disabled: Create a dummy message */
          answer = {
            id: uuid(),
            search: {
              q: query.q
            },
            message: query.q
          }
        }

        /**
         * Another check if bot produces bad response
         */
        const invalidBotResponse =
          bot &&
          INTENT_SUPPORTED_API_KEYS.indexOf(api) !== -1 &&
          (!answer ||
            (answer && answer.error) ||
            (!answer.reply &&
              !answer.search &&
              !answer.card &&
              !answer.location &&
              !answer.message &&
              answer.awaiting_user_input))

        if (invalidBotResponse) {
          console.warn(
            'The server could not respond in time with a message ID. Please try again. May be the intent engine is down. Please contact our customer support.'
          )
          /* throw exception */
          throw new Error('Something went wrong')
        }

        /**
         * Get facets or filters selected by intent engine
         * Always reset facets from intent engine
         */

        let facetQuery = currentState.QueryState.facet_query
        if (
          !bot /* Do not fill facet_query if its from bot */ &&
          answer &&
          answer.search &&
          answer.search.slots &&
          answer.search.slots.length
        ) {
          const answerFacets = answer.search.slots
            .filter(
              ({ facet_query, skip }) => facet_query && !skip
            ) /* Ignore skipped slots */
            .map((item) => ({
              ...item,
              selected: item.value,
              type: getFacetTypeFromSlot(item.type, item.value),
              fromIntentEngine: true
            }))
          const answerFacetNames = answerFacets.map(({ name }) => name)
          /**
           * Remove from facet Query if `fromIntentEngine: true` and name is not contained in answerFacetNames
           */
          facetQuery = facetQuery
            .filter(({ fromIntentEngine, name }) => {
              return fromIntentEngine
                ? answerFacetNames.indexOf(name) !== -1
                : true
            })
            .map((item) => {
              /**
               * If Intent engine selects a facet which is already selected by the user
               * Eg: user is in page:2 with type:article. He refreshes the page. article is selected by IE and we need to tag it as fromIntentEngine
               */
              if (answerFacetNames.indexOf(item.name) !== -1) {
                return {
                  ...item,
                  fromIntentEngine: true
                }
              }
              return item
            })
          for (let i = 0; i < answerFacets.length; i++) {
            let { name, selected, ...rest } = answerFacets[i]
            /* Check if it already exists */
            let exists = facetQuery.some(({ name: _name }) => _name === name)
            if (exists) {
              facetQuery = facetQuery.map((item) => {
                if (item.name === name) item.selected = selected
                /* from intent engine flag */
                return item
              })
            } else {
              facetQuery = [...facetQuery, ...answerFacets[i]]
            }
          }
        } else {
          /* Remove queries from intent engine */
          facetQuery = facetQuery.filter(
            ({ fromIntentEngine }) => !fromIntentEngine
          )
        }

        /**
         * Check if sort is filled
         */
        if (!bot && answer && answer.search && answer.search.sort) {
          sortCondition = answer.search.sort
        }

        /**
         * Check for location
         */
        if (
          !bot &&
          answer &&
          /* Check if the intent requires location */

          answer.location &&
          /* Check if location is already present */
          !currentState.Context.location &&
          /* Check if location was asked before */
          !currentState.Context.hasRequestedLocation
        ) {
          dispatch(
            requestGeoLocation(() => {
              dispatch({
                types,
                query,
                api,
                payload,
                context: getState().Context /* Get the new context */,
                responseTime,
                facetQuery,
                bot
              })
            })
          )
        }

        /**
         * Check if
         * Total results = 0 && Has Spell Suggestions
         */
        /**
         * Check if
         * answer exists
         *  answer && answer.intent
         */
        if (
          totalResults === 0 &&
          spellSuggestions.length &&
          // (!enrichedQuery || enrichedQuery === query.q) &&
          !(
            answer &&
            answer.intent &&
            IGNORE_INTENTS.indexOf(answer.intent) === -1
          ) &&
          !currentState.QueryState.skip_spellcheck
        ) {
          let { term } = spellSuggestions[0]
          return dispatch({
            types,
            query: {
              ...query,
              q: term
            },
            suggestedTerm: term,
            spellCheckSource: SPELLCHECK_SOURCE_CONTENT,
            api,
            payload: {
              ...payload,
              originalQuery: query.q
            },
            processData,
            beforeSuccessCallback,
            context,
            responseTime,
            facetQuery
          })
        }
        /**
         * Success handler
         */
        let successData = {
          payload,
          results,
          spellSuggestions,
          totalResults,
          facets,
          type,
          suggestedTerm,
          spellCheckSource,
          qt,
          answer,
          mc,
          enriched_q: enrichedQuery,
          error: null,
          skipSearchResultsUpdate,
          api,
          responseTime,
          facetQuery,
          sortCondition,
          extra,
          version
        }

        /**
         * Give the user chance to modify data before success
         */
        if (beforeSuccessCallback) {
          successData = beforeSuccessCallback(successData)
        }

        /* Dispatch success */
        shouldDispatchActions && next(successData)

        /**
         * Logger
         * Parameters
         * Q or C
         * results
         * eventSource
         * searchInput = `voice`|`url`|`keyboard`
         */
        /* Query becomes empty for long conversations */
        // const isBotReply = answer && 'awaiting_user_input' in answer
        /**
         * Due to debouncing, logs are not properly sent in bot. There can be shopping cart requests right after a message which causes wrong logs to be sent. Hence removed debouncing logs in chatbot
         */
        const sendImmediateLog = !!bot
        const logFn = sendImmediateLog ? submitLog : debounceLog
        const eventSource =
          payload.eventSource || currentState.QueryState.source || api
        if (
          logger &&
          logger.enabled &&
          API_IGNORE_LOGGING.indexOf(api) === -1 &&
          shouldLog
        ) {
          logFn({
            dispatch,
            eventType: 'Q',
            eventSource,
            state: getState(),
            responseTime,
            payload,
            answer,
            tokens
          })
        }

        /**
         * If answer is a callback
         * SPICE
         */
        if (answer && answer.callback) {
          dispatch(fetchAnswer(answer.callback))
        }

        return successData
      })
      .catch((error) => {
        shouldDispatchActions &&
          next({
            payload,
            error,
            type: failureType
          })
        throw error
      })
  }
}
