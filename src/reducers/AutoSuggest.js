import types from './../constants/ActionTypes'
import omit from 'ramda/src/omit'

export const initialState = {
  q: '',
  per_page: 20,
  page: 1,
  facet_query: [],
  totalResults: 0,
  results: [],
  facets: [],
  spellSuggestions: [],
  suggestedTerm: '',
  isLoading: false,
  isOpen: false,
  qt: null,
  fuzzyQuery: null
}

/* Prevents redeclared variables for `JS Standard` compatiblity */
var facet, value

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_QUERY_TERM_AUTOSUGGEST:
      return {
        ...state,
        q: action.term,
        fuzzyQuery: null
      }

    case types.UPDATE_FUZZY_QUERY_TERM_AUTOSUGGEST:
      return {
        ...state,
        fuzzyQuery: action.term
      }

    case types.CLEAR_QUERY_TERM_AUTOSUGGEST:
      return {
        ...state,
        ...omit(['facet_query'], initialState)
      }

    case types.CLEAR_FUZZY_QUERY_TERM_AUTOSUGGEST:
      return {
        ...state,
        fuzzyQuery: null
      }

    case types.REQUEST_AUTOSUGGEST:
      return {
        ...state,
        isLoading: true
      }

    case types.REQUEST_AUTOSUGGEST_SUCCESS:

      var {
        spellSuggestions,
        results,
        facets,
        totalResults,
        suggestedTerm,
        qt
      } = action

      let isOpen = (!!results.length || !!spellSuggestions.length || !!suggestedTerm) && !!state.q

      return {
        ...state,
        results,
        facets,
        spellSuggestions,
        totalResults,
        isLoading: false,
        suggestedTerm,
        qt,
        isOpen
      }

    case types.OPEN_AUTOSUGGEST:
      return {
        ...state,
        isOpen: true
      }

    case types.CLOSE_AUTOSUGGEST:
      return {
        ...state,
        isOpen: false
      }

    case types.ADD_FACET_AUTOSUGGEST:
      facet = action.facet
      value = action.value
      var { name, displayName, type, multiSelect, template, label } = facet

      return {
        ...state,
        facet_query: [{
          name, type, displayName, multiSelect, template, label,
          selected: [value]
        }]
      }

    case types.REMOVE_FACET_AUTOSUGGEST:
      facet = action.facet
      value = action.value

      return {
        ...state,
        facet_query: state.facet_query.filter((f) => f.name !== facet.name)
      }

    default:
      return state
  }
}
