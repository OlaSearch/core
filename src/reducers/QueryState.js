// @flow
import types from './../constants/ActionTypes'
import { checkIfFacetExists } from './../utilities'
import { SEARCH_INPUTS } from './../constants/Settings'
import equals from 'ramda/src/equals'

type State = {
  q: string,
  enriched_q: string,
  page: number,
  per_page: number,
  facet_query: Array<Object>,
  sort: string,
  filters: Array<Object>,
  searchInput: ?string,
  skip_intent: boolean,
  skip_spellcheck: boolean,
  skip_facet_fields: Array<string>,
  debug: boolean,
  source: ?string,
  tokens: Array<Object>,
  projectId: ?string,
  env: ?string
}

export const initialState = {
  q: '',
  enriched_q: '' /* From Intent engine */,
  page: 1,
  per_page: 3,
  facet_query: [],
  sort: '',
  filters: [],
  searchInput: null,
  skip_intent: false,
  skip_spellcheck: false,
  skip_facet_fields: [],
  debug: false,
  source: null,

  /* Query tokens */
  tokens: [],

  /* project info */
  projectId: null,
  env: null
}

/* Prevents redeclared variables for `JS Standard` compatiblity */
var exists

export default (state: State = initialState, action: Object) => {
  switch (action.type) {
    case types.ADD_FILTER:
      const { filter, selected } = action
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

    case types.SET_SKIP_SPELLCHECK:
      return {
        ...state,
        skip_spellcheck: action.flag
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
        enriched_q: '',
        searchInput: SEARCH_INPUTS.URL
      }

    case types.UPDATE_QUERY_TERM:
      return {
        ...state,
        q: action.term,
        searchInput: action.searchInput || SEARCH_INPUTS.KEYBOARD,
        enriched_q: '',
        page: action.forcePageReset ? 1 : state.page,
        skip_intent: false,
        skip_spellcheck: false,
        skip_facet_fields: [],
        sort: '' /* Reset sort */
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
        enriched_q: '',
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
          .filter((item) => item.selected.length),
        tokens: state.tokens.filter(({ value }) => value !== action.value)
      }

    case types.REMOVE_INTENT_ENGINE_FACETS:
      return {
        ...state,
        facet_query: state.facet_query.filter(
          (item) => !('fromIntentEngine' in item)
        )
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

    case types.ADD_TOKEN:
      return {
        ...state,
        tokens: [...state.tokens, action.options]
      }

    case types.REMOVE_TOKEN:
      return {
        ...state,
        tokens: state.tokens.filter(({ value }) => value !== action.value)
      }

    case types.REPLACE_TOKENS:
      return {
        ...state,
        tokens: action.tokens,
        facet_query: state.facet_query.filter(({ isToken }) => !isToken)
      }

    case types.REMOVE_ALL_TOKENS:
      return {
        ...state,
        tokens: []
      }

    case types.REMOVE_TOKEN_FACETS:
      return {
        ...state,
        facet_query: state.facet_query // .filter(({ isToken, name }) => !isToken && action.tokenNames.indexOf(name) !== -1)
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

    case types.REQUEST_SEARCH_SUCCESS:
      return {
        ...state,
        enriched_q: action.enriched_q || '',
        sort:
          action.sortCondition || state.sort /* Fix bug where sort persists */,
        facet_query:
          action.facetQuery || state.facet_query /* From intent engine */,
        source: null
      }

    case types.OLA_REHYDRATE:
      return {
        ...state,
        projectId: action.projectId,
        env: action.env || state.env,
        per_page:
          action.configState && action.configState.perPage
            ? action.configState.perPage
            : initialState.per_page,
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
        projectId: action.projectId
      }

    case types.SET_SEARCH_SOURCE:
      return {
        ...state,
        source: action.source
      }

    case types.ADD_SKIP_FACET_FIELDS:
      return {
        ...state,
        skip_facet_fields: [...state.skip_facet_fields, action.facet.name]
      }

    case types.REMOVE_SKIP_FACET_FIELDS:
      return {
        ...state,
        skip_facet_fields: state.skip_facet_fields.filter(
          (name) => name !== action.name
        )
      }

    case types.CLEAR_SKIP_FACET_FIELDS:
      return {
        ...state,
        skip_facet_fields: []
      }

    default:
      return state
  }
}
