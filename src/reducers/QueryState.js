import types from './../constants/ActionTypes'
import { checkIfFacetExists } from './../utilities'
import { SEARCH_INPUTS } from './../constants/Settings'
import equals from 'rambda/modules/equals'

export const initialState = {
  q: '',
  enriched_q: '' /* From Intent engine */,
  page: 1,
  per_page: 10,
  facet_query: [],
  sort: '',
  filters: [],
  view: '',
  isSearchActive: true,
  searchInput: null,
  skip_intent: false,
  debug: false,
  source: null,

  /* project info */
  projectId: null,
  env: null
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
          filters: [...state.filters, { ...filter, selected }]
        }
      }

    case types.SET_SKIP_INTENT:
      return {
        ...state,
        skip_intent: action.flag
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
        page: 1,
        filters: []
      }

    case types.UPDATE_STATE_FROM_QUERY:
      /* Reason: tennis players => click on snippet => come back to listing page from detail */
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
        enriched_q: '',
        page: action.forcePageReset ? 1 : state.page,
        skip_intent: false
      }

    case types.CLEAR_ENRICHED_QUERY:
      return {
        ...state,
        enriched_q: ''
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
          page: 1,
          facet_query: state.facet_query.map((item) => {
            if (item.name === action.facet.name) {
              return {
                ...item,
                selected: [...item.selected, action.value]
              }
            }
            return item
          })
        }
      } else {
        return {
          ...state,
          page: 1,
          facet_query: [
            ...state.facet_query,
            {
              ...action.facet,
              selected: [action.value]
            }
          ]
        }
      }

    case types.REMOVE_FACET:
      return {
        ...state,
        page: 1,
        facet_query: state.facet_query
          .map((item) => {
            if (item.name === action.facet.name) {
              return {
                ...item,
                selected: item.selected.filter((val) => {
                  return !equals(val, action.value)
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
          page: 1,
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
          page: 1,
          facet_query: [
            ...state.facet_query,
            {
              ...action.facet,
              selected: [action.value]
            }
          ]
        }
      }

    case types.REMOVE_FACET_ITEM:
      return {
        ...state,
        page: 1,
        facet_query: state.facet_query.filter(
          (item) => item.name !== action.facet.name
        )
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

    case types.REQUEST_SEARCH_SUCCESS:
      return {
        ...state,
        enriched_q: action.enriched_q || '',
        facet_query: action.facetQuery ? action.facetQuery : state.facet_query,
        /* Reset source */
        source: null
      }

    case types.OLA_REHYDRATE:
      return {
        ...state,
        projectId: action.projectId,
        env: action.env,
        debug: action.debug
      }

    case types.CHANGE_ENVIRONMENT:
      return {
        ...state,
        env: action.env
      }

    case types.UPDATE_OLA_PARAMETERS:
      return {
        ...state,
        ...action.params
      }

    case types.SET_SEARCH_SOURCE:
      return {
        ...state,
        source: action.source
      }

    default:
      return state
  }
}
