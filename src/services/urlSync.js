import queryString from 'query-string'
import { parseRangeValues } from './../utilities'

var urlSync = {
  character: '?',
  pushState (qs, type) {
    var char = urlSync.getHistoryCharacter(type)
    if (window.history.pushState) {
      window.history.pushState(null, '', char + urlSync.buildQueryString(qs))
    }
  },
  getHistoryCharacter (type) {
    return type == 'pushState' ? '?' : '#/?'
  },
  replaceState (qs, type) {
    var char = urlSync.getHistoryCharacter(type)
    if (window.history.replaceState) {
      window.history.replaceState(null, '', char + urlSync.buildQueryString(qs))
    }
  },
  buildQueryString (params) {
    var str = []

    for (var i in params) {
      var name = i
      var value = params[i]

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
        for (var j = 0; j < value.length; j++) {
          str.push(
            encodeURIComponent(name) + '=' +
            encodeURIComponent(value[j])
          )
        }
      } else {
        str.push(
          encodeURIComponent(name) + '=' +
          encodeURIComponent(value)
        )
      }
    }

    return str.join('&')
  },
  parseQueryString (initialState, config) {
    let loc = config.history ? config.history == 'pushState' ? window.location.search : window.location.hash.slice(2) : window.location.search
    var qs = queryString.parse(loc)

    /**
     * Facets
     */

    if (qs.hasOwnProperty('facet_query')) {
      var facetQuery = qs.facet_query
      var { facets: configFacets } = config

      if (typeof facetQuery === 'string') facetQuery = JSON.parse('[\"' + facetQuery + '\"]')

      var fq = facetQuery.map((item) => {
        var [ name, value ] = item.split(':')

        value = value.split(',')

        var facet = configFacets.filter((facet) => facet.name === name).reduce((a, b) => a)
        var { type } = facet

        if ((type === 'range' || type === 'rating' || type === 'daterange') && value.length > 1) {
          value = parseRangeValues(value)
        }

        return {
          ...facet,
          selected: value
        }
      })

      /* Extend */

      qs = {
        ...qs,
        facet_query: fq
      }
    }

    /**
     * Filters
     * Field level filtering
     */
    if (qs.hasOwnProperty('filters')) {
      var { filters } = qs
      var { filters: configFilters } = config

      if (typeof filters === 'string') filters = JSON.parse('[\"' + filters + '\"]')

      var filterQuery = filters.map((filter) => {
        var [ name, value ] = filter.split(':')

        /* Parse query string */

        if (value.indexOf('=') !== -1) value = queryString.parse(value)

        var currentFilter = configFilters.filter((filter) => filter.name === name).reduce((a, b) => a)

        return {
          ...currentFilter,
          selected: value
        }
      })

      qs = {
        ...qs,
        filters: filterQuery
      }
    }

    return {
      ...initialState,
      ...qs
    }
  }
}

module.exports = urlSync
