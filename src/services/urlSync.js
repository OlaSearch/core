import queryString from 'query-string'
import { parseRangeValues, getDisplayName, sanitizeText } from './../utilities'
import {
  RANGE_FACETS,
  REMOVE_FROM_QUERY_STRING,
  QUERY_ALT_NAME,
  CREATE_FILTER_OBJECT
} from './../constants/Settings'
import propEq from 'ramda/src/propEq'
import find from 'ramda/src/find'
import flatten from 'ramda/src/flatten'

export function pushState (qs, type, replaceQueryParamName) {
  var char = getHistoryCharacter(type)
  if (window.history.pushState) {
    /* Deprecated hash */
    window.history.pushState(
      null,
      '',
      char + buildQueryString(qs, replaceQueryParamName)
    )
  }
}

export function getHistoryCharacter (type) {
  return type === 'pushState' ? '?' : '#/?'
}

export function replaceState (qs, type) {
  var char = getHistoryCharacter(type)
  if (window.history.replaceState) {
    window.history.replaceState(null, '', char + buildQueryString(qs))
  }
}

export function buildQueryString (params, replaceQueryParamName) {
  var str = []
  /* Loop */
  for (let name in params) {
    /* Omit */
    if (REMOVE_FROM_QUERY_STRING.indexOf(name) !== -1) continue
    if (replaceQueryParamName && name === QUERY_ALT_NAME) continue
    var value = params[name]
    if (name === 'q' && replaceQueryParamName) {
      name = QUERY_ALT_NAME
    }
    /* Facets */
    if (name === 'facet_query') {
      value = value
        .filter(
          ({ fromIntentEngine }) => !fromIntentEngine
        ) /* Remove facets set by intent engine */
        .map((item) => {
          return item.name + ':' + flatten(item.selected).join('+')
        })
    }

    /* Filters */
    if (name === 'filters') {
      value = value.filter((item) => !item.hidden).map((item) => {
        var { name, selected } = item
        if (typeof selected === 'object') {
          selected = flatten(selected).join('+')
        }
        return name + ':' + selected
      })
    }

    /* Tokens */
    if (name === 'tokens') {
      value = value.map(({ startToken, endToken, value: val, name }) => {
        return `${name}:${val}:${startToken}:${endToken}`
      })
    }

    /**
     * Check if Value is an array
     */

    if (Array.isArray(value)) {
      for (let i = 0, len = value.length; i < len; i++) {
        str.push(encodeURIComponent(name) + '=' + encodeURIComponent(value[i]))
      }
    } else {
      value &&
        str.push(encodeURIComponent(name) + '=' + encodeURIComponent(value))
    }
  }

  return str.join('&')
}

export function parseQueryString (initialState, config) {
  let loc = window.location.search /* Deprecated hash */
  var qs = queryString.parse(loc)
  var { filters, facet_query: facetQuery, tokens, sort } = qs
  var facetQueryObject = { facet_query: [] }
  /**
   * Default filters from config
   */
  let defaultFilters = []
  if (config.filters && config.filters.length) {
    for (let i = 0, len = config.filters.length; i < len; i++) {
      let { selected } = config.filters[i]
      defaultFilters.push({ ...config.filters[i], selected })
    }
  }
  var filtersObject = { filters: defaultFilters }
  var tokensObject = { tokens: [] }
  /**
   * If no qs
   */
  if (!Object.keys(qs).length) qs = { q: '' }

  /**
   * If no q
   */
  if (!qs['q']) qs['q'] = ''

  /**
   * Validate query string
   */
  for (let p in qs) {
    /**
     * Validate type
     * TODO: Validate all incoming query strings
     */
    if (p === 'skip_facet_fields' && !Array.isArray(qs[p])) {
      qs[p] = [qs[p]]
      continue
    }
    /* prevent XSS */
    qs[p] = sanitizeText(qs[p])

    if (config.replaceQueryParamName && p === QUERY_ALT_NAME) {
      qs['q'] = sanitizeText(qs[p])
    }

    if (p === 'skip_facet_fields') {
      qs[p] = qs[p].split(',')
    }

    if (p === 'page' || p === 'per_page') {
      if (isNaN(qs[p])) {
        qs[p] = initialState[p]
      } else {
        qs[p] = parseInt(qs[p])
      }
    }
  }

  /**
   * tokens
   */
  if (tokens) {
    if (typeof tokens === 'string') {
      tokens = [tokens]
    }
    tokensObject = {
      tokens: tokens.map((t) => {
        let [name, value, startToken, endToken] = t.split(':')
        return {
          name,
          value,
          startToken: parseInt(startToken),
          endToken: parseInt(endToken)
        }
      })
    }
  }

  /**
   * Facets
   */

  if (facetQuery) {
    var { facets: configFacets } = config
    if (typeof facetQuery === 'string') {
      facetQuery = [facetQuery]
    }
    /**
     * Create facet_query
     * 26 Feb 2018 @vinay: I was accepting only facets that are in the config file. Validate facet names from fieldMapping instead
     */
    const fq = facetQuery
      .filter((item) => {
        let [name, value] = item.split(':')
        return Object.values(config.fieldMappings).indexOf(name) !== -1
        // if (!value) return false
        // return find(propEq('name', name))(configFacets)
      })
      .map((item) => {
        /* Split the first : Date strings can contain : */
        let [name, value] = item.split(/:(.+)?/)
        value = value.split('+')
        let facet = find(propEq('name', name))(configFacets)
        /**
         * Create a facet if it doesnt exist
         */
        if (!facet) {
          facet = CREATE_FILTER_OBJECT({
            name,
            displayName: config.fieldLabels[name],
            type: 'string'
          })
        }

        if (RANGE_FACETS.indexOf(facet.type) !== -1 && value.length > 1) {
          value = parseRangeValues(value)
        }
        return {
          ...facet,
          selected: value,
          isToken: tokensObject.tokens.some(
            ({ name: n, value: v }) => n === name && value.indexOf(v) !== -1
          )
        }
      })

    /* Extend */
    facetQueryObject = {
      facet_query: fq
    }
  }

  /**
   * Filters
   * Field level filtering
   */
  if (filters) {
    if (typeof filters === 'string') {
      filters = [filters]
    }

    var filterQuery = filters.map((item) => {
      var [name, value] = item.split(/:(.+)?/)
      /* Split the value + */
      value = value.split('+')

      const currentFilter = find(propEq('name', name))(config.filters)

      return {
        ...currentFilter,
        selected: value
      }
    })

    filtersObject = {
      filters: [...defaultFilters, ...filterQuery]
    }
  }

  return {
    ...initialState,
    ...qs,
    sort /* Set sort */,
    ...facetQueryObject,
    ...filtersObject,
    ...tokensObject
  }
}
