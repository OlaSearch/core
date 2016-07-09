import queryString from 'query-string'
import { parseRangeValues } from './../utilities'
import { RANGE_FACETS } from './../constants/Settings'
import propEq from 'ramda/src/propEq'
import find from 'ramda/src/find'

var urlSync = {
  character: '?',
  pushState (qs, type) {
    var char = urlSync.getHistoryCharacter(type)
    if (window.history.pushState) {
      window.history.pushState(null, '', char + urlSync.buildQueryString(qs))
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
  buildQueryString (params) {
    var str = []

    for (var name in params) {
      var value = params[name]
      if (name === 'facet_query') {
        value = value.map((item) => item.name + ':' + item.selected)
      }

      if (name === 'filters') {
        value = value.map((item) => {
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
      if (p === 'page' || p === 'per_page') {
        if (isNaN(qs[p])) {
          qs[p] = initialState[p]
        } else {
          qs[p] = parseInt(qs[p])
        }
      }
    }

    /**
     * Facets
     */

    if (facetQuery) {
      var { facets: configFacets } = config

      if (typeof facetQuery === 'string') facetQuery = JSON.parse('["' + facetQuery + '"]')

      var fq = facetQuery.map((item) => {
        let [ name, value ] = item.split(':')
        value = value.split(',')

        let facet = configFacets.filter((facet) => facet.name === name).reduce((a, b) => a)
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
      if (typeof filters === 'string') filters = JSON.parse('["' + filters + '"]')

      var filterQuery = filters.map((filter) => {
        var [ name, value ] = filter.split(':')

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
