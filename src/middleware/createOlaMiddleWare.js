/**
 * [createOlaMiddleWare description]
 * @param  {Object} options
 * options = {
 *  parser,
 *  queryBuilder,
 *  config,
 *  searchService
 * }
 */

import { log } from './../actions/Logger'
import querystring from 'query-string'

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

    if (!types) {
      // Normal action: pass it on
      return next(action)
    }

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
      let { engineConfig } = options
      parser = new engineConfig[config.search_engine_type].Parser(config)
      queryBuilder = new engineConfig[config.search_engine_type].QueryBuilder(config)
      searchService = new engineConfig[config.search_engine_type].SearchService(config)
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
          let timestampFromResponse = parseInt(querystring.parse(responseURL).timestamp)
          if (timestampFromResponse && getState().Timestamp.timestamp !== timestampFromResponse) return
        }

        /* Parse only when the timestamp matches */
        var results
        var spellSuggestions
        var totalResults
        var facets
        var qt
        if (!proxy) {
          results = parser.normalizeResults(response)
          spellSuggestions = parser.normalizeSpellSuggestions(response)
          totalResults = parser.normalizeTotalResults(response)
          facets = parser.normalizeFacets(response)
          qt = parser.queryTime(response)
        } else {
          results = response.results
          spellSuggestions = results.spellSuggestions
          totalResults = results.totalResults
          facets = results.facets
          qt = results.qt
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
