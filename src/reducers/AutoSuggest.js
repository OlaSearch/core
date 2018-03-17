// @flow
import types from './../constants/ActionTypes'
import omit from 'ramda/src/omit'
import { SEARCH_INPUTS } from './../constants/Settings'

type State = {
  q: string,
  per_page: number,
  page: number,
  facet_query: Array<Object>,
  totalResults: number,
  results: Array<Object>,
  facets: Array<Object>,
  spellSuggestions: Array<Object>,
  suggestedTerm: string,
  isLoading: boolean,
  isOpen: boolean,
  qt: ?number,
  searchInput: ?string,
  dictionary: ?string
}

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
  searchInput: null,
  dictionary: 'olaSuggester'
}

export default (state: State = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_QUERY_TERM_AUTOSUGGEST:
      return {
        ...state,
        q: action.term,
        searchInput: action.searchInput || SEARCH_INPUTS.KEYBOARD
      }

    case types.CLEAR_QUERY_TERM_AUTOSUGGEST:
      return {
        ...state,
        ...omit(['facet_query'], initialState)
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

      let isOpen =
        (!!results.length || !!spellSuggestions.length || !!suggestedTerm) &&
        !!state.q

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
      var {
        name,
        displayName,
        type,
        multiSelect,
        template,
        label
      } = action.facet
      return {
        ...state,
        facet_query: [
          {
            name,
            type,
            displayName,
            multiSelect,
            template,
            label,
            selected: [action.value]
          }
        ]
      }

    case types.OLA_REHYDRATE:
      let dict = action.configState
        ? action.configState.autocompleteDictionary || state.dictionary
        : state.dictionary
      return {
        ...state,
        dictionary: dict
      }

    case types.REMOVE_FACET_AUTOSUGGEST:
      return {
        ...state,
        facet_query: state.facet_query.filter((f) => f.name !== action.facet.name)
      }

    default:
      return state
  }
}
