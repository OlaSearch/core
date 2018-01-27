import queryString from 'query-string'
import { parseRangeValues } from './../utilities'
import { RANGE_FACETS, REMOVE_FROM_QUERY_STRING } from './../constants/Settings'
import propEq from 'ramda/src/propEq'
import find from 'ramda/src/find'
import flatten from 'ramda/src/flatten'
import xssFilters from 'xss-filters'

const QUERY_ALT_NAME = 'keywords'

export const character = '?'

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
      value = value.map((item) => {
        return item.name + ':' + flatten(item.selected).join('+')
      })
    }

    /* Filters */
    if (name === 'filters') {
      value = value.filter((item) => !item.hidden).map((item) => {
        var { name, selected } = item
        if (typeof selected === 'object') {
          selected = queryString.stringify(selected)
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
  var { filters, facet_query: facetQuery, tokens } = qs
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
    /* prevent XSS */
    qs[p] = xssFilters.inHTMLData(qs[p])

    if (config.replaceQueryParamName && p === QUERY_ALT_NAME) {
      qs['q'] = xssFilters.inHTMLData(qs[p])
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

    var fq = facetQuery
      .filter((item) => {
        let [name, value] = item.split(':')
        if (!value) return false
        return find(propEq('name', name))(configFacets)
      })
      .map((item) => {
        let [name, value] = item.split(
          /:(.+)?/
        ) /* Split the first : Date strings can contain : */
        value = value.split('+')
        let facet = find(propEq('name', name))(configFacets)
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
      var [name, value] = item.split(':')
      /* Parse query string */
      if (value.indexOf('=') !== -1) value = queryString.parse(value)

      var currentFilter = find(propEq('name', name))(config.filters)

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
    ...facetQueryObject,
    ...filtersObject,
    ...tokensObject
  }
}
