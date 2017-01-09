import queryString from 'query-string'
import { parseRangeValues } from './../utilities'
import { RANGE_FACETS, REMOVE_FROM_QUERY_STRING } from './../constants/Settings'
import propEq from 'ramda/src/propEq'
import find from 'ramda/src/find'
import flatten from 'ramda/src/flatten'
import xssFilters from 'xss-filters'

var urlSync = {
  character: '?',
  pushState (qs, type, replaceQueryParamName) {
    var char = urlSync.getHistoryCharacter(type)
    if (window.history.pushState) {
      if (type !== 'pushState') {
        let r = new RegExp(/\/(.*)?\//gi)
        let matches = r.exec(window.location.hash)
        if (matches) {
          window.location.hash = char + urlSync.buildQueryString(qs, replaceQueryParamName)
        }
      }
      window.history.pushState(null, '', char + urlSync.buildQueryString(qs, replaceQueryParamName))
    }
  },
  getHistoryCharacter (type) {
    return type === 'pushState' ? '?' : '#/?'
  },
  replaceState (qs, type) {
    var char = urlSync.getHistoryCharacter(type)
    if (window.history.replaceState) {
      window.history.replaceState(null, '', char + urlSync.buildQueryString(qs))
    }
  },
  buildQueryString (params, replaceQueryParamName) {
    var str = []
    /* Loop */
    for (let name in params) {
      /* Omit */
      if (REMOVE_FROM_QUERY_STRING.indexOf(name) !== -1) continue
      var value = params[name]
      if (replaceQueryParamName && name === 'keywords') continue
      if (name === 'q' && replaceQueryParamName) {
        name = 'keywords'
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
          if (typeof selected === 'object') selected = queryString.stringify(selected)
          return name + ':' + selected
        })
      }

      /**
       * Check if Value is an array
       */

      if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
          str.push(
            encodeURIComponent(name) + '=' +
            encodeURIComponent(value[i])
          )
        }
      } else {
        value && str.push(
          encodeURIComponent(name) + '=' +
          encodeURIComponent(value)
        )
      }
    }

    return str.join('&')
  },
  parseQueryString (initialState, config) {
    let loc = config.history ? config.history === 'pushState' ? window.location.search : window.location.hash.slice(2) : window.location.search
    var qs = queryString.parse(loc)
    var { filters, facet_query: facetQuery } = qs
    var facetQueryObject = {}
    var filtersObject = {}
    /**
     * Validate query string
     */
    for (let p in qs) {
      /* prevent XSS */
      qs[p] = xssFilters.inHTMLData(qs[p])

      if (config.replaceQueryParamName && p === 'keywords') {
        qs['q'] = xssFilters.inHTMLData(qs[p])
      }

      if (p === 'page' || p === 'per_page') {
        if (isNaN(qs[p])) {
          qs[p] = initialState[p]
        } else {
          qs[p] = parseInt(qs[p])
        }
      }
      /* Validate states: Prevent over-ride */
      if (!qs['per_page']) qs['per_page'] = initialState['per_page']
      if (!qs['page']) qs['page'] = initialState['page']
      if (!qs['q']) qs['q'] = ''
    }

    /**
     * Facets
     */
    if (facetQuery) {
      var { facets: configFacets } = config
      if (typeof facetQuery === 'string') {
        try {
          facetQuery = JSON.parse('["' + facetQuery + '"]')
        } catch (e) {
          facetQuery = []
        }
      }

      var fq = facetQuery
        .filter((item) => {
          let [ name ] = item.split(':')
          return find(propEq('name', name))(configFacets)
        })
        .map((item) => {
          let [ name, value ] = item.split(/:(.+)?/) /* Split the first : Date strings can contain : */
          value = value.split('+')
          let facet = find(propEq('name', name))(configFacets)

          let { type } = facet
          if (RANGE_FACETS.indexOf(type) !== -1 && value.length > 1) {
            value = parseRangeValues(value)
          }

          return {
            ...facet,
            selected: value
          }
        })

      /* Extend */
      facetQueryObject = {
        facet_query: fq
      }
    } else {
      facetQueryObject = {
        facet_query: []
      }
    }

    /**
     * Filters
     * Field level filtering
     */
    if (filters) {
      if (typeof filters === 'string') {
        try {
          filters = JSON.parse('["' + filters + '"]')
        } catch (e) {
          filters = []
        }
      }

      var filterQuery = filters
        .map((item) => {
          var [ name, value ] = item.split(':')
          /* Parse query string */
          if (value.indexOf('=') !== -1) value = queryString.parse(value)

          var currentFilter = find(propEq('name', name))(config.filters)

          return {
            ...currentFilter,
            selected: value
          }
        })

      filtersObject = {
        filters: filterQuery
      }
    } else {
      filtersObject = {
        filters: []
      }
    }

    return {
      ...initialState,
      ...qs,
      ...facetQueryObject,
      ...filtersObject
    }
  }
}

module.exports = urlSync
