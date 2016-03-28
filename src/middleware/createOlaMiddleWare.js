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

    var timestampedQuery = {
      ...query,
      timestamp: getState().Timestamp.timestamp
    }

    var CALL_API
    var params = queryBuilder.transform(timestampedQuery, api === 'suggest' ? config.mappingAutoSuggest : null)

    if (typeof api === 'function') {
      /* Returns a promise */
      CALL_API = () => api(params)
    } else {
      switch (api) {
        case 'suggest':
          CALL_API = () => searchService.suggest(params, config.mappingAutoSuggest)
          break

        case 'get':
          CALL_API = () => searchService.get(params)
          break

        default:
          CALL_API = () => searchService.search(params)
          break
      }
    }

    if (typeof CALL_API !== 'function') {
      throw new Error('Expected CALL_API to be a function.')
    }

    return CALL_API().then(
      (response) => {
        var timestampFromResponse = parseInt(parser.requestParameters(response).timestamp)

        if (timestampFromResponse && getState().Timestamp.timestamp !== timestampFromResponse) return

        /* Parse only when the timestamp matches */

        var results = parser.normalizeResults(response)
        var spellSuggestions = parser.normalizeSpellSuggestions(response)
        var totalResults = parser.normalizeTotalResults(response)
        var facets = parser.normalizeFacets(response)
        var qt = parser.queryTime(response)
        var type = successType

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
          error: error,
          type: failureType
        })

        throw new Error(error.status + ' The server could not be reached')
      }
    )
  }
}
