import types from './../constants/ActionTypes'
import { checkIfFacetExists } from './../utilities'
import { SEARCH_INPUTS } from './../constants/Settings'

export const initialState = {
  q: '',
  page: 1,
  per_page: 10,
  facet_query: [],
  sort: '',
  filters: [],
  view: '',
  isSearchActive: true,
  searchInput: null
}

/* Prevents redeclared variables for `JS Standard` compatiblity */
var exists

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_FILTER:
      let { filter, selected } = action
      exists = checkIfFacetExists(state.filters, filter.name)
      if (exists) {
        return {
          ...state,
          filters: state.filters.map((item) => {
            if (item.name === filter.name) {
              return {
                ...item,
                selected
              }
            }
            return item
          })
        }
      } else {
        return {
          ...state,
          filters: [ ...state.filters, { ...filter, selected } ]
        }
      }

    case types.REMOVE_FILTER:
      return {
        ...state,
        filters: state.filters.filter((item) => item.name !== action.name),
        page: 1
      }

    case types.CLEAR_FILTERS:
      return {
        ...state,
        filters: []
      }

    case types.UPDATE_STATE_FROM_QUERY:
      return {
        ...state,
        ...action.stateFromUrl,
        referrer: '',
        searchInput: SEARCH_INPUTS.URL
      }

    case types.UPDATE_QUERY_TERM:
      return {
        ...state,
        q: action.term,
        searchInput: action.searchInput || SEARCH_INPUTS.KEYBOARD,
        page: 1
      }

    case types.CLEAR_QUERY_TERM:
      return {
        ...state,
        q: '',
        page: 1
      }

    case types.ADD_FACET:
      exists = checkIfFacetExists(state.facet_query, action.facet.name)
      if (exists) {
        return {
          ...state,
          facet_query: state.facet_query.map((item) => {
            if (item.name === action.facet.name) {
              return {
                ...item,
                selected: [ ...item.selected, action.value ]
              }
            }
            return item
          })
        }
      } else {
        return {
          ...state,
          facet_query: [ ...state.facet_query, {
            ...action.facet,
            selected: [action.value]
          }]
        }
      }

    case types.REMOVE_FACET:
      return {
        ...state,
        facet_query: state.facet_query.map((item) => {
          if (item.name === action.facet.name) {
            return {
              ...item,
              selected: item.selected.filter((val) => {
                return val !== action.value
              })
            }
          }
          return item
        })
        .filter((item) => item.selected.length)
      }

    case types.REPLACE_FACET:
      exists = checkIfFacetExists(state.facet_query, action.facet.name)
      if (exists) {
        return {
          ...state,
          facet_query: state.facet_query.map((item) => {
            if (item.name === action.facet.name) {
              return {
                ...item,
                selected: [action.value]
              }
            }
            return item
          })
        }
      } else {
        return {
          ...state,
          facet_query: [ ...state.facet_query, {
            ...action.facet,
            selected: [action.value]
          }]
        }
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

    case types.SET_SEARCH_STATUS:
      return {
        ...state,
        isSearchActive: action.status
      }

    default:
      return state
  }
}
