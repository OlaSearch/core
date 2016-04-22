import types from './../constants/ActionTypes'
import storage from './../services/storage'
import { buildQueryString, character as hashCharacter } from './../services/urlSync'
import { flatten, equals, omit } from 'ramda'

var initialState = {
  totalResults: 0,
  results: [],
  facets: [],
  spellSuggestions: [],
  suggestedTerm: '',
  isLoading: false,
  bookmarks: storage.get('bookmarks') || [],
  history: storage.get('history') || [],
  locale: 'en-US',
  error: null,
  qt: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_SEARCH:
      return {
        ...state,
        isLoading: true
      }

    case types.REQUEST_SEARCH_SUCCESS:

      var { results, appendResult, spellSuggestions, qt, suggestedTerm, totalResults, facets } = action

      if (appendResult) {
        return {
          ...state,
          results: [ ...state.results, ...action.results ],
          isLoading: false,
          error: null
        }
      }

      return {
        ...state,
        results,
        facets,
        spellSuggestions: spellSuggestions.length ? spellSuggestions : state.spellSuggestions,
        totalResults,
        suggestedTerm,
        qt,
        isLoading: false,
        error: null
      }

    case types.REQUEST_SEARCH_FAILURE:

      var error = {
        status: action.error.status,
        statusText: action.error.statusText
      }

      return {
        ...state,
        error
      }

    case types.ADD_BOOKMARK:

      var bookmarks = [action.snippet, ...state.bookmarks]

      storage.set('bookmarks', bookmarks)

      return {
        ...state,
        bookmarks
      }

    case types.REMOVE_BOOKMARK:

      var _bookmarks = [
        ...state.bookmarks.filter(
          (bookmark) => bookmark.id !== action.snippet.id
        )
      ]

      storage.set('bookmarks', _bookmarks)

      return {
        ...state,
        bookmarks: _bookmarks
      }

    case types.ADD_HISTORY:

      var query = omit(['page', 'per_page', 'referrer'], action.query)

      var { q, facet_query } = query

      /* Get selected facets */

      var facets = flatten(facet_query.map((item) => item.selected))

      /* Check if it already exists */

      var exists = state.history
        .filter((item) => item.q === q && equals(item.facets, facets))

      /* Check if history already exists */

      if (exists.length) return state

      var history = [{
        q,
        url: hashCharacter + buildQueryString(query),
        dateAdded: new Date().getTime(),
        facets
      }, ...state.history]

      storage.set('history', history)

      return {
        ...state,
        history
      }

    case types.CLEAR_HISTORY:

      storage.set('history', [])

      return {
        ...state,
        history: []
      }

    case types.SET_LOCALE:
      return {
        ...state,
        locale: action.payload
      }

    default:
      return state
  }
}
