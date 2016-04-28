'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.addOlaHistory = addOlaHistory;
exports.updateQueryTerm = updateQueryTerm;
exports.addFilter = addFilter;
exports.removeFilter = removeFilter;
exports.clearFilters = clearFilters;
exports.setLocale = setLocale;
exports.clearQueryTerm = clearQueryTerm;
exports.loadMore = loadMore;
exports.executeSearch = executeSearch;
exports.executeFromSpellSuggest = executeFromSpellSuggest;
exports.addFacet = addFacet;
exports.removeFacet = removeFacet;
exports.replaceFacet = replaceFacet;
exports.removeAllFacets = removeAllFacets;
exports.changePage = changePage;
exports.changePerPage = changePerPage;
exports.changeSort = changeSort;
exports.changeView = changeView;
exports.updateStateFromQuery = updateStateFromQuery;
exports.initSearch = initSearch;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _History = require('./History');

var _urlSync = require('./../services/urlSync');

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* Update Browser URL */
var updateURL = (0, _utilities.debounce)(_urlSync.pushState, 300);

/* Adds to History */
var addToHistory = (0, _utilities.debounce)(addOlaHistory, 600);

/* Should route change */
var globalRouteChange = true;

/* URL Parameter */

var historyType = 'pushState';

function addOlaHistory(dispatchInstance, query) {
  dispatchInstance((0, _History.addHistory)(query));
}

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

function setLocale(locale) {
  return {
    type: _ActionTypes2['default'].SET_LOCALE,
    locale: locale
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

    var query = getState().QueryState;

    dispatch({
      types: [_ActionTypes2['default'].REQUEST_SEARCH, _ActionTypes2['default'].REQUEST_SEARCH_SUCCESS, _ActionTypes2['default'].REQUEST_SEARCH_FAILURE],
      query: query,
      api: 'search',
      payload: payload,
      executeFromSpellSuggest: executeFromSpellSuggest
    });

    /**
     * Check if route should be enabled
     * Implement debounce
     */

    if (!payload || payload.routeChange) {
      /* Update Browser URL */

      globalRouteChange && updateURL(query, historyType);

      /* Add History */

      addToHistory(dispatch, query);
    }
  };
}

function executeFromSpellSuggest(payload) {
  return function (dispatch, getState) {
    var suggestedTerm = payload.suggestedTerm;


    var query = _extends({}, getState().QueryState, {
      q: suggestedTerm
    });

    dispatch({
      types: [_ActionTypes2['default'].REQUEST_SEARCH, _ActionTypes2['default'].REQUEST_SEARCH_SUCCESS, _ActionTypes2['default'].REQUEST_SEARCH_FAILURE],
      shouldCallAPI: function shouldCallAPI(state) {
        return true;
      },
      query: query,
      api: 'search',
      payload: payload,
      suggestedTerm: suggestedTerm
    });
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

// function writeCookie(name,value,days) {
//     var date, expires;
//     if (days) {
//         date = new Date();
//         date.setTime(date.getTime()+(days*24*60*60*1000));
//         expires = "; expires=" + date.toGMTString();
//             }else{
//         expires = "";
//     }
//     document.cookie = name + "=" + value + expires + "; path=/";
// }

function initSearch(options) {
  return function (dispatch, getState) {
    var config = options.config;
    var urlSync = options.urlSync;
    var history = config.history;

    /* Should Ola Search read state from query string */

    var shouldSyncURL = urlSync === undefined || urlSync;

    historyType = history || historyType;

    // writeCookie('olasearch-cookie', Math.random())

    /* Always pass configuration to @parseQueryString handler */

    shouldSyncURL && dispatch(updateStateFromQuery(config));

    /* Global setting */

    globalRouteChange = shouldSyncURL;

    /* Bootstrap by adding filters */

    var filters = config.filters;


    filters.forEach(function (filter) {
      var selected = filter.selected;

      if (selected) dispatch(addFilter({ filter: filter, selected: selected }));
    });

    /* Disable Route change initally */

    dispatch(executeSearch({
      routeChange: false
    }));
  };
}