import types from './../constants/ActionTypes'
import { parseQueryString } from './../services/urlSync'
import { checkIfFacetExists, castNumberToStringArray } from './../utilities'
import indexOf from 'ramda/src/indexOf'
import omit from 'ramda/src/omit'

var initialState = {
  q: '',
  page: 1,
  per_page: 10,
  facet_query: [],
  sort: '',
  filters: [],
  view: ''
}

/* Prevents redeclared variables for `JS Standard` compatiblity */
var fq, facet, value, index, props

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_FILTER:
      /* Remove duplicate */
      let { filter, selected } = action.payload
      index = checkIfFacetExists(state.filters, filter.name)

      if (index === null) {
        return {
          ...state,
          filters: [ ...state.filters, { ...filter, selected } ]
        }
      } else {
        /* Update the value */
        let newFilter = state.filters.slice(0)
        newFilter[index].selected = selected

        return {
          ...state,
          filters: newFilter,
          page: 1
        }
      }

    case types.REMOVE_FILTER:
      var { name } = action.payload

      return {
        ...state,
        filters: state.filters.filter((item) => item.name !== name),
        page: 1
      }

    case types.CLEAR_FILTERS:
      return {
        ...state,
        filters: []
      }

    case types.UPDATE_STATE_FROM_QUERY:
      return {
        ...parseQueryString(state, action.config),
        referrer: ''
      }

    case types.UPDATE_QUERY_TERM:
      return {
        ...state,
        q: action.term,
        page: 1
      }

    case types.CLEAR_QUERY_TERM:
      return {
        ...state,
        q: '',
        page: 1
      }

    case types.ADD_FACET:
      /* Check if key exists then update selected =[] OR Add new record with selected[] */
      value = action.value
      facet = action.facet
      props = omit('values', facet)
      fq = state.facet_query.slice(0)
      index = checkIfFacetExists(fq, facet.name)

      /**
       * Always convert Array to strings
       * [1, 2] => ["1", "2"]
       */
      if (value instanceof Array) value = castNumberToStringArray(value)

      if (index === null) {
        fq.push({
          ...props,
          selected: [value]
        })
      } else {
        fq[index].selected.push(value)
      }

      return {
        ...state,
        facet_query: fq,
        page: 1
      }

    case types.REMOVE_FACET:
      fq = state.facet_query.slice(0)
      facet = action.facet
      value = action.value

      if (value instanceof Array) value = castNumberToStringArray(value)

      for (var i = fq.length - 1; i >= 0; i--) {
        let cur = fq[i]
        let { selected } = cur

        if (cur.name === facet.name) {
          /* Remove selections if No value is supplied */

          if (!value) selected = []

          selected.splice(
            indexOf(value, selected), 1
          )

          if (!selected.length) fq = [ ...fq.slice(0, i), ...fq.slice(i + 1) ]
        }
      }

      return {
        ...state,
        facet_query: fq,
        page: 1
      }

    case types.REPLACE_FACET:
      /* Check if key exists then update selected =[] OR Add new record with selected[] */
      value = action.value
      facet = action.facet
      props = omit('values', facet)
      fq = state.facet_query.slice(0)
      index = checkIfFacetExists(fq, facet.name)

      if (index === null) {
        fq = [...fq, {
          ...props,
          selected: [value]
        }]
      } else {
        fq[index].selected = [value]
      }

      return {
        ...state,
        facet_query: fq,
        page: 1
      }

    case types.REMOVE_ALL_FACETS:
      return {
        ...state,
        facet_query: [],
        page: 1
      }

    case types.CHANGE_SORT:
      return {
        ...state,
        sort: action.sort || '',
        page: 1
      }

    case types.CHANGE_PAGE:
      return {
        ...state,
        page: action.page
      }

    case types.CHANGE_PER_PAGE:
      return {
        ...state,
        per_page: action.perPage
      }

    case types.CHANGE_VIEW:
      return {
        ...state,
        view: action.view
      }

    default:
      return state
  }
}
