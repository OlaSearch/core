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

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _History = require('./History');

var _urlSync = require('./../services/urlSync');

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* Update Browser URL */
var updateURL = (0, _utilities.debounce)(_urlSync.pushState, 300);

/* Should route change */
var globalRouteChange = true;

/* Allowed characters */

var allowedCharacters = null;

/* URL Parameter */

var historyType = 'pushState';

function updateQueryTerm(term) {
  return {
    type: _ActionTypes2['default'].UPDATE_QUERY_TERM,
    term: term
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
    var context = state.Context;

    if (allowedCharacters && !(0, _utilities.checkForAllowedCharacters)(query.q, allowedCharacters)) {
      return dispatch(terminateSearch());
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

    dispatch({
      type: _ActionTypes2['default'].ADD_FACET,
      facet: facet, value: value
    });
  };
}

function removeFacet(facet, value) {
  return {
    type: _ActionTypes2['default'].REMOVE_FACET,
    facet: facet, value: value
  };
}

function replaceFacet(facet, value) {
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
  return {
    type: _ActionTypes2['default'].UPDATE_STATE_FROM_QUERY,
    config: config
  };
}

function setStorageKey(key) {
  return {
    type: _ActionTypes2['default'].SET_STORAGE_KEY,
    key: key
  };
}

function initSearch(options) {
  return function (dispatch, getState) {
    var config = options.config;
    var urlSync = options.urlSync;
    var _options$searchOnLoad = options.searchOnLoad;
    var searchOnLoad = _options$searchOnLoad === undefined ? true : _options$searchOnLoad;
    var history = config.history;

    /* Should Ola Search read state from query string */

    var shouldSyncURL = urlSync === undefined || urlSync;

    historyType = history || historyType;

    /* Always pass configuration to @parseQueryString handler */

    shouldSyncURL && dispatch(updateStateFromQuery(config));

    /* Set global variable */
    allowedCharacters = config.allowedCharacters;

    /* Global setting */

    globalRouteChange = shouldSyncURL;

    /* Bootstrap by adding filters */
    var filters = config.filters;


    filters.forEach(function (filter) {
      var selected = filter.selected;

      if (selected) dispatch(addFilter({ filter: filter, selected: selected }));
    });

    /* Disable Route change initally */

    if (searchOnLoad) {
      dispatch(executeSearch({
        routeChange: false
      }));
    }
  };
}