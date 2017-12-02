'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.updateQueryTerm = updateQueryTerm;
exports.addFilter = addFilter;
exports.removeFilter = removeFilter;
exports.clearFilters = clearFilters;
exports.clearQueryTerm = clearQueryTerm;
exports.setSkipIntent = setSkipIntent;
exports.loadMore = loadMore;
exports.changeAnswerSelection = changeAnswerSelection;
exports.executeSearch = executeSearch;
exports.fetchAnswer = fetchAnswer;
exports.fetchResult = fetchResult;
exports.terminateSearch = terminateSearch;
exports.addFacet = addFacet;
exports.removeFacet = removeFacet;
exports.replaceFacet = replaceFacet;
exports.removeAllFacets = removeAllFacets;
exports.removeFacetItem = removeFacetItem;
exports.changePage = changePage;
exports.changePerPage = changePerPage;
exports.changeSort = changeSort;
exports.changeView = changeView;
exports.updateStateFromQuery = updateStateFromQuery;
exports.setStorageKey = setStorageKey;
exports.changeEnvironment = changeEnvironment;
exports.initSearch = initSearch;
exports.setSearchSource = setSearchSource;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _History = require('./History');

var _urlSync = require('./../services/urlSync');

var _utilities = require('./../utilities');

var _omit = require('rambda/lib/omit');

var _omit2 = _interopRequireDefault(_omit);

var _xssFilters = require('xss-filters');

var _xssFilters2 = _interopRequireDefault(_xssFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* Update Browser URL */
var updateURL = (0, _utilities.debounce)(_urlSync.pushState, 300);

/* Should route change */
var globalRouteChange = true;

/* Allowed characters */

var allowedCharacters = null;

/* URL Parameter */

var historyType = 'pushState';
var replaceQueryParamName = false;

function updateQueryTerm(term, searchInput) {
  var forcePageReset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return {
    type: _ActionTypes2['default'].UPDATE_QUERY_TERM,
    term: _xssFilters2['default'].inHTMLData(term),
    searchInput: searchInput,
    forcePageReset: forcePageReset
  };
}

function addFilter(_ref) {
  var filter = _ref.filter,
      selected = _ref.selected;

  return {
    type: _ActionTypes2['default'].ADD_FILTER,
    filter: filter,
    selected: selected
  };
}

function removeFilter(_ref2) {
  var name = _ref2.name;

  return {
    type: _ActionTypes2['default'].REMOVE_FILTER,
    name: name
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

function setSkipIntent(flag) {
  return {
    type: _ActionTypes2['default'].SET_SKIP_INTENT,
    flag: flag
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

function changeAnswerSelection(index, key, answer) {
  /* Clone */
  var newAnswer = JSON.parse((0, _stringify2['default'])(answer));
  newAnswer['suggestions'][key].selection = index;
  return function (dispatch, getState) {
    /* Clear enriched query for Intent engine */
    dispatch({ type: _ActionTypes2['default'].CLEAR_ENRICHED_QUERY });
    /* Execute search */
    dispatch(executeSearch({ answer: newAnswer }));
  };
}

function executeSearch(payload) {
  return function (dispatch, getState) {
    /* Check if there is a suggested term */
    var state = getState();
    var query = state.QueryState;
    var q = query.q,
        isSearchActive = query.isSearchActive,
        facet_query = query.facet_query;

    var context = state.Context;

    /* If no query and search is not active (searchOnLoad = false) */
    if (allowedCharacters && !(0, _utilities.checkForAllowedCharacters)(q, allowedCharacters) || !(isSearchActive || !!q || facet_query.length)) {
      // Terminate search
      dispatch(terminateSearch());
      // Update the URL
      globalRouteChange && updateURL(query, historyType, replaceQueryParamName);
      return;
    }

    /**
     * If searching from another page
     */
    if (payload && payload.forceRedirect) {
      window.location.href = payload.searchPageUrl + '?' + (0, _urlSync.buildQueryString)(query, payload.replaceQueryParamName);
      return;
    }

    dispatch({
      types: [_ActionTypes2['default'].REQUEST_SEARCH, _ActionTypes2['default'].REQUEST_SEARCH_SUCCESS, _ActionTypes2['default'].REQUEST_SEARCH_FAILURE],
      query: query,
      context: context,
      api: 'search',
      payload: payload
    }).then(function () {
      return (0, _History.debouceAddHistory)(dispatch);
    });

    /**
     * Check if route should be enabled
     * Implement debounce
     * routeChange - Global configuration
     * urlSync - Used in InstantSearch
     */

    if (!payload || payload.routeChange || payload.urlSync) {
      /* Update Browser URL */
      globalRouteChange && updateURL(query, historyType, replaceQueryParamName);
    }
  };
}

function fetchAnswer(url) {
  return function (dispatch, getState) {
    dispatch({
      types: [_ActionTypes2['default'].REQUEST_ANSWER, _ActionTypes2['default'].REQUEST_ANSWER_SUCCESS, _ActionTypes2['default'].REQUEST_ANSWER_FAILURE],
      query: { url: url },
      api: 'answer'
    });
  };
}

function fetchResult(id) {
  return function (dispatch, getState) {
    dispatch({
      types: [_ActionTypes2['default'].REQUEST_RESULT, _ActionTypes2['default'].REQUEST_RESULT_SUCCESS, _ActionTypes2['default'].REQUEST_RESULT_FAILURE],
      query: { q: 'id:' + id, searchAdapterOptions: { disableBestBets: true } },
      api: 'get'
    });
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
  var resetAllFacets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  /**
   * Always convert Array to strings
   * [1, 2] => ["1", "2"]
   */
  if (value instanceof Array) value = (0, _utilities.castNumberToStringArray)(value);

  /*
    Reset facets is a Root facet (Tabs or Collection)
    Used in admin console
  */
  if (resetAllFacets || facet.resetOnDeSelect) {
    return {
      type: _ActionTypes2['default'].REMOVE_ALL_FACETS
    };
  }
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

  /**
   * For heirarchical facet
   */
  if (facet.rootLevel && parseInt(facet.rootLevel) === value.split('/').length) {
    return {
      type: _ActionTypes2['default'].REMOVE_FACET_ITEM,
      facet: facet
    };
  }

  return {
    type: _ActionTypes2['default'].REPLACE_FACET,
    facet: facet,
    value: value
  };
}

function removeAllFacets() {
  return {
    type: _ActionTypes2['default'].REMOVE_ALL_FACETS
  };
}

function removeFacetItem(facet) {
  return {
    type: _ActionTypes2['default'].REMOVE_FACET_ITEM,
    facet: facet
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

function changeEnvironment(env) {
  return {
    type: _ActionTypes2['default'].CHANGE_ENVIRONMENT,
    env: env
  };
}

/**
 * Initializes search
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
function initSearch(_ref3) {
  var config = _ref3.config,
      _ref3$urlSync = _ref3.urlSync,
      urlSync = _ref3$urlSync === undefined ? true : _ref3$urlSync;

  return function (dispatch, getState) {
    var history = config.history,
        filters = config.filters,
        _config$searchOnLoad = config.searchOnLoad,
        searchOnLoad = _config$searchOnLoad === undefined ? true : _config$searchOnLoad;

    /* History type: pushState or hash */

    historyType = history || historyType;

    /* Replace `q` with `keywords` */
    if (config.replaceQueryParamName) replaceQueryParamName = true;

    /* Always pass configuration to @parseQueryString handler */

    urlSync && dispatch(updateStateFromQuery(config));

    /* Set global variable */
    allowedCharacters = config.allowedCharacters;

    /* Global setting */
    globalRouteChange = urlSync;

    /* Add filters */
    if (filters) {
      for (var i = 0, len = filters.length; i < len; i++) {
        var selected = filters[i].selected;

        dispatch(addFilter({ filter: filters[i], selected: selected }));
      }
    }

    /* De-activate search if searchOnLoad is false */
    if (!searchOnLoad) {
      var _getState$QueryState = getState().QueryState,
          q = _getState$QueryState.q,
          facet_query = _getState$QueryState.facet_query;

      var shouldSearch = q || facet_query.length;

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
      } else {
        dispatch(terminateSearch());
      }
    } else {
      dispatch(executeSearch({
        routeChange: false
      }));
    }
  };
}

function setSearchSource(source) {
  return {
    type: _ActionTypes2['default'].SET_SEARCH_SOURCE,
    source: source
  };
}