module.exports = {
  /* Query */
  UPDATE_QUERY_TERM: 'UPDATE_QUERY_TERM',
  CLEAR_QUERY_TERM: 'CLEAR_QUERY_TERM',

  TERMINATE_SEARCH: 'TERMINATE_SEARCH',
  TERMINATE_AUTOSUGGEST: 'TERMINATE_AUTOSUGGEST',

  /* Sort */
  CHANGE_SORT: 'CHANGE_SORT',

  /* Search */
  REQUEST_SEARCH: 'REQUEST_SEARCH',
  REQUEST_SEARCH_SUCCESS: 'REQUEST_SEARCH_SUCCESS',
  REQUEST_SEARCH_FAILURE: 'REQUEST_SEARCH_FAILURE',

  /* For URL Routing */
  UPDATE_STATE_FROM_QUERY: 'UPDATE_STATE_FROM_QUERY',

  /* Facets */
  ADD_FACET: 'ADD_FACET',
  REMOVE_FACET: 'REMOVE_FACET',
  REMOVE_ALL_FACETS: 'REMOVE_ALL_FACETS',
  REPLACE_FACET: 'REPLACE_FACET',
  REMOVE_FACET_ITEM: 'REMOVE_FACET_ITEM',

  /* AutoSuggest */
  UPDATE_QUERY_TERM_AUTOSUGGEST: 'UPDATE_QUERY_TERM_AUTOSUGGEST',
  UPDATE_FUZZY_QUERY_TERM_AUTOSUGGEST: 'UPDATE_FUZZY_QUERY_TERM_AUTOSUGGEST',
  CLEAR_FUZZY_QUERY_TERM_AUTOSUGGEST: 'CLEAR_FUZZY_QUERY_TERM_AUTOSUGGEST',
  CLEAR_QUERY_TERM_AUTOSUGGEST: 'CLEAR_QUERY_TERM_AUTOSUGGEST',
  REQUEST_AUTOSUGGEST: 'REQUEST_AUTOSUGGEST',
  REQUEST_AUTOSUGGEST_SUCCESS: 'REQUEST_AUTOSUGGEST_SUCCESS',
  REQUEST_AUTOSUGGEST_FAILURE: 'REQUEST_AUTOSUGGEST_FAILURE',
  OPEN_AUTOSUGGEST: 'OPEN_AUTOSUGGEST',
  CLOSE_AUTOSUGGEST: 'CLOSE_AUTOSUGGEST',
  ADD_FACET_AUTOSUGGEST: 'ADD_FACET_AUTOSUGGEST',
  REMOVE_FACET_AUTOSUGGEST: 'REMOVE_FACET_AUTOSUGGEST',

  /* Bookmark */

  ADD_BOOKMARK: 'ADD_BOOKMARK',
  REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',

  /* History */

  ADD_HISTORY: 'ADD_HISTORY',
  CLEAR_HISTORY: 'CLEAR_HISTORY',
  UPDATE_HISTORY: 'UPDATE_HISTORY',
  REMOVE_HISTORY: 'REMOVE_HISTORY',

  /* Pagination */

  CHANGE_PAGE: 'CHANGE_PAGE',
  CHANGE_PER_PAGE: 'CHANGE_PER_PAGE',

  /* Locale */

  SET_LOCALE: 'SET_LOCALE',

  /* Filter */

  ADD_FILTER: 'ADD_FILTER',
  REMOVE_FILTER: 'REMOVE_FILTER',
  CLEAR_FILTERS: 'CLEAR_FILTERS',

  /* View */
  CHANGE_VIEW: 'CHANGE_VIEW',

  /* Fields */

  ADD_DYNAMIC_FIELD: 'ADD_DYNAMIC_FIELD',
  REMOVE_DYNAMIC_FIELD: 'REMOVE_DYNAMIC_FIELD',

  /* Context */

  ADD_CONTEXT: 'ADD_CONTEXT',
  REMOVE_CONTEXT: 'REMOVE_CONTEXT',
  ADD_CONTEXT_FIELD: 'ADD_CONTEXT_FIELD',

  REQUEST_GEO_LOCATION: 'REQUEST_GEO_LOCATION',
  REQUEST_GEO_LOCATION_SUCCESS: 'REQUEST_GEO_LOCATION_SUCCESS',
  REQUEST_GEO_LOCATION_FAILURE: 'REQUEST_GEO_LOCATION_FAILURE',

  /* Rehydrate */
  OLA_REHYDRATE: 'OLA_REHYDRATE',
  SET_NEW_USER_STATUS: 'SET_NEW_USER_STATUS',

  /* Search status: When searchOnLoad is false, we need to disable search elements */
  SET_SEARCH_STATUS: 'SET_SEARCH_STATUS',

  /* Answer */
  REQUEST_ANSWER: 'REQUEST_ANSWER',
  REQUEST_ANSWER_SUCCESS: 'REQUEST_ANSWER_SUCCESS',
  REQUEST_ANSWER_FAILURE: 'REQUEST_ANSWER_FAILURE',

  CLEAR_ENRICHED_QUERY: 'CLEAR_ENRICHED_QUERY',
  SET_SKIP_INTENT: 'SET_SKIP_INTENT',

  REQUEST_RESULT: 'REQUEST_RESULT',
  REQUEST_RESULT_SUCCESS: 'REQUEST_RESULT_SUCCESS',
  REQUEST_RESULT_FAILURE: 'REQUEST_RESULT_FAILURE',

  /* Update QueryState parameters */
  UPDATE_OLA_PARAMETERS: 'UPDATE_OLA_PARAMETERS',
  CHANGE_ENVIRONMENT: 'CHANGE_ENVIRONMENT',

  /* Sidebar */
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',

  /* Search source */
  SET_SEARCH_SOURCE: 'SET_SEARCH_SOURCE'
}
