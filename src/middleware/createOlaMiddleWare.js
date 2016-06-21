import { log } from './../actions/Logger'
import { debouncePersistState, STATE_TYPE_KEYS } from './../services/persistState'
import queryString from 'query-string'

module.exports = (options = {}) => {
  return ({ dispatch, getState }) => (next) => (action) => {
    const {
      types,
      api,
      query,
      context,
      payload = {},
      executeFromSpellSuggest,
      suggestedTerm
    } = action

    /* Persist store state */
    if (STATE_TYPE_KEYS.indexOf(action.type) !== -1) {
      debouncePersistState(action, getState, options.config.namespace)
    }

    // Normal action: pass it on
    if (!types) return next(action)

    let {
      parser,
      queryBuilder,
      config,
      searchService
    } = options

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

    const [ requestType, successType, failureType ] = types

    dispatch({
      ...payload,
      type: requestType
    })

    /* Add timestamp to query */

    let timestampObj = {
      timestamp: getState().Timestamp.timestamp
    }

    /* ACL Rules */
    let acl = getState().Acl
    let callApi
    let params = proxy
      ? { ...query, api }
      : queryBuilder.transform(query, api === 'suggest' ? config.mappingAutoSuggest : null, acl, context)

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

        /* Parse only when the timestamp matches */
        var results
        var spellSuggestions
        var totalResults
        var facets
        var qt
        if (proxy) {
          results = response.results
          spellSuggestions = results.spellSuggestions
          totalResults = results.totalResults
          facets = results.facets
          qt = results.qt
        } else {
          results = parser.normalizeResults(response)
          spellSuggestions = parser.normalizeSpellSuggestions(response)
          totalResults = parser.normalizeTotalResults(response)
          facets = parser.normalizeFacets(response)
          qt = parser.queryTime(response)
        }

        let type = successType

        /**
         * Check if
         * Total results = 0 && Has Spell Suggestions
         */

        if (totalResults === 0 && spellSuggestions.length && executeFromSpellSuggest) {
          return dispatch(
            executeFromSpellSuggest({
              suggestedTerm: spellSuggestions[0].term,
              ...payload
            })
          )
        }

        dispatch({
          ...payload,
          results,
          spellSuggestions,
          totalResults,
          facets,
          type,
          suggestedTerm,
          qt,
          appendResult: payload.appendResult,
          error: null
        })

        /**
         * Logger
         * Parameters
         * Q or C
         * results
         * eventSource
         */
        logger && logger.enabled && dispatch(log('Q', null, api))
      },
      (error) => {
        dispatch({
          ...payload,
          error,
          type: failureType
        })
      }
    )
  }
}
