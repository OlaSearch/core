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
      payload = {},
      executeFromSpellSuggest,
      suggestedTerm
    } = action

    const {
      parser,
      queryBuilder,
      config,
      searchService
    } = options

    if (!parser || !queryBuilder || !config || !searchService) {
      throw new Error('No parser, queryBuilder, searchService, config file present in OlaMiddleWare options')
    }

    const { logger } = config

    if (!types) {
      // Normal action: pass it on
      return next(action)
    }

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

    let callApi
    let params = queryBuilder.transform(query, api === 'suggest' ? config.mappingAutoSuggest : null)

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

        let results = parser.normalizeResults(response)
        let spellSuggestions = parser.normalizeSpellSuggestions(response)
        let totalResults = parser.normalizeTotalResults(response)
        let facets = parser.normalizeFacets(response)
        let qt = parser.queryTime(response)
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
