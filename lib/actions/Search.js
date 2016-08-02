'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQueryTerm = updateQueryTerm;
exports.addFilter = addFilter;
exports.removeFilter = removeFilter;
exports.clearFilters = clearFilters;
exports.clearQueryTerm = clearQueryTerm;
exports.loadMore = loadMore;
exports.executeSearch = executeSearch;
exports.terminateSearch = terminateSearch;
exports.addFacet = addFacet;
exports.removeFacet = removeFacet;
exports.replaceFacet = replaceFacet;
exports.removeAllFacets = removeAllFacets;
exports.changePage = changePage;
exports.changePerPage = changePerPage;
exports.changeSort = changeSort;
exports.changeView = changeView;
exports.updateStateFromQuery = updateStateFromQuery;
exports.setStorageKey = setStorageKey;
exports.initSearch = initSearch;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var _History = require('./History');

var _urlSync = require('./../services/urlSync');

var _utilities = require('./../utilities');

var _omit = require('ramda/src/omit');

var _omit2 = require('../../.babelhelper.js').interopRequireDefault(_omit);

/* Update Browser URL */
var updateURL = (0, _utilities.debounce)(_urlSync.pushState, 300);

/* Should route change */
var globalRouteChange = true;

/* Allowed characters */

var allowedCharacters = null;

/* URL Parameter */

var historyType = 'pushState';

function updateQueryTerm(term, searchInput) {
  return {
    type: _ActionTypes2['default'].UPDATE_QUERY_TERM,
    term: term,
    searchInput: searchInput
  };
}

function addFilter(payload) {
  return {
    type: _ActionTypes2['default'].ADD_FILTER,
    payload: payload
  };
}

function removeFilter(payload) {
  return {
    type: _ActionTypes2['default'].REMOVE_FILTER,
    payload: payload
  };
}

function clearFilters() {
  return {
    type: _ActionTypes2['default'].CLEAR_FILTERS
  };
}

function clearQueryTerm() {
  return {
    type: _ActionTypes2['default'].CLEAR_QUERY_TERM
  };
}

function loadMore() {
  return function (dispatch, getState) {
    var currentPage = getState().QueryState.page;

    dispatch(changePage(++currentPage));

    dispatch(executeSearch({
      routeChange: false,
      appendResult: true
    }));
  };
}

function executeSearch(payload) {
  return function (dispatch, getState) {
    /* Check if there is a suggested term */
    var state = getState();
    var query = state.QueryState;
    var q = query.q;
    var isSearchActive = query.isSearchActive;
    var facet_query = query.facet_query;
    var filters = query.filters;

    var context = state.Context;

    /* If no query and search is not active (searchOnLoad = false) */
    if (allowedCharacters && !(0, _utilities.checkForAllowedCharacters)(q, allowedCharacters) || !(isSearchActive || !!q || facet_query.length || filters.length)) {
      // Terminate search
      dispatch(terminateSearch());
      // Update the URL
      updateURL(query, historyType);
      return;
    }

    dispatch({
      types: [_ActionTypes2['default'].REQUEST_SEARCH, _ActionTypes2['default'].REQUEST_SEARCH_SUCCESS, _ActionTypes2['default'].REQUEST_SEARCH_FAILURE],
      query: query,
      context: context,
      api: 'search',
      payload: payload
    });

    /**
     * Check if route should be enabled
     * Implement debounce
     */

    if (!payload || payload.routeChange) {
      /* Update Browser URL */
      globalRouteChange && updateURL(query, historyType);

      /* Add History */
      (0, _History.debouceAddHistory)(dispatch);
    }
  };
}

function terminateSearch() {
  return {
    type: _ActionTypes2['default'].TERMINATE_SEARCH
  };
}

function addFacet(facet, value) {
  return function (dispatch, getState) {
    acceptSuggestedTerm(dispatch, getState);

    /**
     * Always convert Array to strings
     * [1, 2] => ["1", "2"]
     */
    if (value instanceof Array) value = (0, _utilities.castNumberToStringArray)(value);

    dispatch({
      type: _ActionTypes2['default'].ADD_FACET,
      facet: (0, _omit2['default'])('values', facet),
      value: value
    });
  };
}

function removeFacet(facet, value) {
  /**
   * Always convert Array to strings
   * [1, 2] => ["1", "2"]
   */
  if (value instanceof Array) value = (0, _utilities.castNumberToStringArray)(value);

  return {
    type: _ActionTypes2['default'].REMOVE_FACET,
    facet: facet,
    value: value
  };
}

function replaceFacet(facet, value) {
  /**
   * Always convert Array to strings
   * [1, 2] => ["1", "2"]
   */
  if (value instanceof Array) value = (0, _utilities.castNumberToStringArray)(value);

  return {
    type: _ActionTypes2['default'].REPLACE_FACET,
    facet: facet, value: value
  };
}

function removeAllFacets() {
  return {
    type: _ActionTypes2['default'].REMOVE_ALL_FACETS
  };
}

/* Change page */

function changePage(page) {
  return function (dispatch, getState) {
    acceptSuggestedTerm(dispatch, getState);

    dispatch({
      type: _ActionTypes2['default'].CHANGE_PAGE,
      page: page
    });
  };
}

/* Change per page */

function changePerPage(perPage) {
  return {
    type: _ActionTypes2['default'].CHANGE_PER_PAGE,
    perPage: perPage
  };
}

/*
 * When a new query is Suggested and User continues the search, update the term to the new suggested term
 */

function acceptSuggestedTerm(dispatch, getState) {
  var suggestedTerm = getState().AppState.suggestedTerm;


  if (suggestedTerm) {
    dispatch(updateQueryTerm(suggestedTerm));
  }
}

/* Change sort */

function changeSort(sort) {
  return {
    type: _ActionTypes2['default'].CHANGE_SORT,
    sort: sort
  };
}

/* Change view */

function changeView(view) {
  return {
    type: _ActionTypes2['default'].CHANGE_VIEW,
    view: view
  };
}

function updateStateFromQuery(config) {
  return function (dispatch, getState) {
    var stateFromUrl = (0, _urlSync.parseQueryString)(getState().QueryState, config);

    dispatch({
      type: _ActionTypes2['default'].UPDATE_STATE_FROM_QUERY,
      stateFromUrl: stateFromUrl
    });
  };
}

function setStorageKey(key) {
  return {
    type: _ActionTypes2['default'].SET_STORAGE_KEY,
    key: key
  };
}

/**
 * Initializes search
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function initSearch(_ref) {
  var config = _ref.config;
  var _ref$urlSync = _ref.urlSync;
  var urlSync = _ref$urlSync === undefined ? true : _ref$urlSync;

  return function (dispatch, getState) {
    var history = config.history;
    var filters = config.filters;
    var _config$searchOnLoad = config.searchOnLoad;
    var searchOnLoad = _config$searchOnLoad === undefined ? true : _config$searchOnLoad;

    /* History type: pushState or hash */

    historyType = history || historyType;

    /* Always pass configuration to @parseQueryString handler */

    urlSync && dispatch(updateStateFromQuery(config));

    /* Set global variable */
    allowedCharacters = config.allowedCharacters;

    /* Global setting */
    globalRouteChange = urlSync;

    /* Add filters */
    filters && filters.forEach(function (filter) {
      var selected = filter.selected;

      dispatch(addFilter({ filter: filter, selected: selected }));
    });

    /* De-activate search if searchOnLoad is false */
    if (!searchOnLoad) {
      var _getState$QueryState = getState().QueryState;
      var q = _getState$QueryState.q;
      var facet_query = _getState$QueryState.facet_query;
      var _filters = _getState$QueryState.filters;

      var shouldSearch = q || facet_query.length || _filters.length;

      /**
       * Use
       * !this.context.config.searchOnLoad && QueryState.isSearchActive
       * to show hide results
       */
      dispatch({
        type: _ActionTypes2['default'].SET_SEARCH_STATUS,
        status: searchOnLoad
      });

      if (shouldSearch) {
        dispatch(executeSearch({
          routeChange: false
        }));
      }
    } else {
      dispatch(executeSearch({
        routeChange: false
      }));
    }
  };
}