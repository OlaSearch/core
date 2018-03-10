'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.updateQueryTerm = updateQueryTerm;
exports.addFilter = addFilter;
exports.removeFilter = removeFilter;
exports.clearFilters = clearFilters;
exports.clearQueryTerm = clearQueryTerm;
exports.setSkipIntent = setSkipIntent;
exports.skipSpellcheck = skipSpellcheck;
exports.loadMore = loadMore;
exports.changeAnswerSelection = changeAnswerSelection;
exports.executeSearch = executeSearch;
exports.executeFacetSearch = executeFacetSearch;
exports.fetchAnswer = fetchAnswer;
exports.fetchMc = fetchMc;
exports.fetchResult = fetchResult;
exports.terminateSearch = terminateSearch;
exports.addFacet = addFacet;
exports.removeFacet = removeFacet;
exports.removeIntentEngineFacets = removeIntentEngineFacets;
exports.replaceFacet = replaceFacet;
exports.removeAllFacets = removeAllFacets;
exports.removeFacetItem = removeFacetItem;
exports.changePage = changePage;
exports.changePerPage = changePerPage;
exports.changeSort = changeSort;
exports.updateStateFromQuery = updateStateFromQuery;
exports.setStorageKey = setStorageKey;
exports.changeEnvironment = changeEnvironment;
exports.initSearch = initSearch;
exports.setSearchSource = setSearchSource;
exports.addToken = addToken;
exports.removeToken = removeToken;
exports.removeAllTokens = removeAllTokens;
exports.replaceTokens = replaceTokens;
exports.removeSkipFacetFields = removeSkipFacetFields;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

var _History = require('./History');

var _urlSync = require('./../services/urlSync');

var _utilities = require('./../utilities');

var _omit = require('ramda/src/omit');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/* Update Browser URL */
var updateURL = (0, _utilities.debounce)(_urlSync.pushState, 300);

/* Should route change */
var globalRouteChange = true;

/* URL Parameter */

var historyType = 'pushState';

function updateQueryTerm(term, searchInput) {
  var forcePageReset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return {
    type: _ActionTypes2['default'].UPDATE_QUERY_TERM,
    term: (0, _utilities.sanitizeText)(term),
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

function skipSpellcheck(flag) {
  return {
    type: _ActionTypes2['default'].SET_SKIP_SPELLCHECK,
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

function executeSearch(payload, options) {
  return function (dispatch, getState) {
    /* Check if there is a suggested term */
    var state = getState();
    var query = state.QueryState;
    var _state$AppState = state.AppState,
        allowedCharacters = _state$AppState.allowedCharacters,
        replaceQueryParamName = _state$AppState.replaceQueryParamName,
        answer = _state$AppState.answer;
    var _query = query,
        q = _query.q,
        isSearchActive = _query.isSearchActive,
        facet_query = _query.facet_query,
        page = _query.page;

    var context = state.Context;
    var resetSearch = page === 1;

    /**
     * Remove facets from intent engine
     * Only reset on first search
     * Todo: Remove sort as well if its set by the intent engine
     */
    if (resetSearch) {
      facet_query = facet_query.filter(function (_ref3) {
        var fromIntentEngine = _ref3.fromIntentEngine;
        return !fromIntentEngine;
      });
    }

    /**
     * Check if sort is set by intent engine
     * Todo
     * 1. Clear sort if its from the intent engine
     * 2. make sure sortCondition
     */
    // const isSortFromIntentEngine = answer && answer.search && answer.search.sort

    /* If no query and search is not active (searchOnLoad = false) */
    if (allowedCharacters && !(0, _utilities.checkForAllowedCharacters)(q, allowedCharacters) || !(isSearchActive || !!q || facet_query.length)) {
      // Terminate search
      dispatch(terminateSearch());
      // Update the URL
      globalRouteChange && updateURL(query, historyType, replaceQueryParamName);
      return;
    }

    /* Extend the query */
    query = (0, _extends3['default'])({}, query, {
      facet_query: facet_query
      // sort: isSortFromIntentEngine ? '' : query.sort


      /**
       * If searching from another page
       */
    });if (payload && payload.forceRedirect) {
      window.location.href = payload.searchPageUrl + '?' + (0, _urlSync.buildQueryString)(query, replaceQueryParamName);
      return;
    }

    return dispatch((0, _extends3['default'])({
      types: [_ActionTypes2['default'].REQUEST_SEARCH, _ActionTypes2['default'].REQUEST_SEARCH_SUCCESS, _ActionTypes2['default'].REQUEST_SEARCH_FAILURE],
      query: query,
      context: context,
      api: 'search',
      payload: payload
    }, options)).then(function (res) {
      (0, _History.debouceAddHistory)(dispatch);
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
      return res;
    });
  };
}

/**
 * Removes token values from query
 * @param {String} q
 * @param {Array} tokenValues
 */
function removeTokenFromQuery(q, tokenValues) {
  return q.replace(new RegExp('\\b(' + tokenValues.join('|') + ')\\b', 'gi'), '').trim();
}

/**
 * Search for facet values
 * @param {String} fullTerm Full query term, default is '*'
 * @param {String} term Partial query
 */
function executeFacetSearch() {
  var fullTerm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
  var term = arguments[1];
  var startToken = arguments[2];
  var endToken = arguments[3];

  /* Splice based on tokens */
  fullTerm = fullTerm.substr(0, startToken) + fullTerm.substr(endToken);
  /* replace backslash */
  term = term.replace(/\\/gi, '');
  term = (0, _utilities.sanitizeText)(term);
  return function (dispatch, getState) {
    var state = getState();
    var context = state.Context;
    var query = state.QueryState;
    var tokens = query.tokens;

    var facet_query = tokens.map(function (_ref4) {
      var value = _ref4.value,
          name = _ref4.name;
      return {
        selected: [value],
        name: name,
        multiSelect: true
      };
    });
    /* Remove tokens from the query */
    var initialStart = 0;
    var q = removeTokenFromQuery(fullTerm, tokens.map(function (_ref5) {
      var value = _ref5.value;
      return value;
    }) // .concat(term)
    );

    return dispatch({
      types: [_ActionTypes2['default'].REQUEST_FACET, _ActionTypes2['default'].REQUEST_FACET_SUCCESS, _ActionTypes2['default'].REQUEST_FACET_FAILURE],
      query: (0, _extends3['default'])({}, query, {
        q: q,
        facet_query: facet_query,
        skip_intent: true
      }),
      beforeSuccessCallback: function beforeSuccessCallback(response) {
        return (0, _extends3['default'])({}, response, {
          facets: response.facets.map(function (_ref6) {
            var values = _ref6.values,
                rest = (0, _objectWithoutProperties3['default'])(_ref6, ['values']);
            return (0, _extends3['default'])({}, rest, {
              values: values.map(function (_ref7) {
                var name = _ref7.name,
                    r = (0, _objectWithoutProperties3['default'])(_ref7, ['name']);
                return (0, _extends3['default'])({}, r, {
                  name: (0, _utilities.getDisplayName)(null, name)
                });
              })
            });
          })
        });
      },

      context: context,
      payload: {
        extraParams: {
          facetPrefix: term.toLowerCase() /* Always lowercase facet term */
          , per_page: 0
        }
      },
      meta: {
        log: false
      },
      api: 'search'
    });
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

function fetchMc(key, payload) {
  return function (dispatch, getState) {
    dispatch({
      types: [_ActionTypes2['default'].REQUEST_MC, _ActionTypes2['default'].REQUEST_MC_SUCCESS, _ActionTypes2['default'].REQUEST_MC_FAILURE],
      payload: payload,
      query: { key: key },
      api: 'mc'
    });
  };
}

function fetchResult(ids) {
  if (!Array.isArray(ids)) ids = [ids];
  var q = ids.map(function (id) {
    return 'id:' + id;
  }).join(' OR ');
  return function (dispatch, getState) {
    dispatch({
      types: [_ActionTypes2['default'].REQUEST_RESULT, _ActionTypes2['default'].REQUEST_RESULT_SUCCESS, _ActionTypes2['default'].REQUEST_RESULT_FAILURE],
      beforeSuccessCallback: function beforeSuccessCallback(response) {
        var results = response.results;

        return (0, _extends3['default'])({}, response, {
          extra: {
            resultIds: results.map(function (_ref8) {
              var id = _ref8.id;
              return id;
            }),
            resultsById: results.reduce(function (acc, obj) {
              acc[obj.id] = obj;
              return acc;
            }, {})
          }
        });
      },
      query: { q: q, searchAdapterOptions: { disableBestBets: true }, wt: 'json' },
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
    /* Check if it already exists */
    var exists = getState().QueryState.facet_query.some(function (_ref9) {
      var name = _ref9.name,
          selected = _ref9.selected;
      return name === facet.name && selected.indexOf(value) !== -1;
    });
    if (exists) {
      /**
       * If the facet was added from a token and
       * facet has already been selected by intent engine,
       * we need to update that facet
       */
      if (facet.isToken) {
        // dispatch(removeFacet(facet, value))
        // dispatch(addFacet(facet, value))
      }
      return false;
    }

    dispatch({
      type: _ActionTypes2['default'].ADD_FACET,
      facet: (0, _omit2['default'])(['values'], facet),
      value: value
    });
  };
}

function removeFacet(facet, value) {
  var resetAllFacets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  return function (dispatch, getState) {
    /**
     * Also check if
     * `articles about roger` => articles is selected. But user cant remove the filter using `Checkbox` filter
     */
    var intentEngineFacets = getState().QueryState.facet_query.filter(function (_ref10) {
      var fromIntentEngine = _ref10.fromIntentEngine,
          isToken = _ref10.isToken;
      return fromIntentEngine || isToken;
    }).map(function (_ref11) {
      var name = _ref11.name;
      return name;
    });
    var fromIntentEngine = facet.fromIntentEngine || intentEngineFacets.indexOf(facet.name) !== -1;

    /**
     * Add to skip_facet_fields if the facet is from intent engine
     */
    if (fromIntentEngine) {
      dispatch({
        type: _ActionTypes2['default'].ADD_SKIP_FACET_FIELDS,
        facet: facet
      });
    }

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
      dispatch({
        type: _ActionTypes2['default'].REMOVE_ALL_FACETS
      });
    }
    return dispatch({
      type: _ActionTypes2['default'].REMOVE_FACET,
      facet: facet,
      value: value
    });
  };
}

function removeIntentEngineFacets() {
  return {
    type: _ActionTypes2['default'].REMOVE_INTENT_ENGINE_FACETS
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
function initSearch(_ref12) {
  var config = _ref12.config,
      _ref12$urlSync = _ref12.urlSync,
      urlSync = _ref12$urlSync === undefined ? true : _ref12$urlSync,
      _ref12$payload = _ref12.payload,
      payload = _ref12$payload === undefined ? {} : _ref12$payload;

  return function (dispatch, getState) {
    var history = config.history,
        _config$searchOnLoad = config.searchOnLoad,
        searchOnLoad = _config$searchOnLoad === undefined ? true : _config$searchOnLoad;

    /* History type: pushState or hash */

    historyType = history || historyType;

    /* Always pass configuration to @parseQueryString handler */
    urlSync && dispatch(updateStateFromQuery(config));

    /* Global setting */
    globalRouteChange = urlSync;

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
        dispatch(executeSearch((0, _extends3['default'])({
          routeChange: false
        }, payload)));
      } else {
        dispatch(terminateSearch());
      }
    } else {
      dispatch(executeSearch((0, _extends3['default'])({
        routeChange: false
      }, payload)));
    }
  };
}

function setSearchSource(source) {
  return {
    type: _ActionTypes2['default'].SET_SEARCH_SOURCE,
    source: source
  };
}

function addToken(options) {
  return {
    type: _ActionTypes2['default'].ADD_TOKEN,
    options: options
  };
}

function removeToken(value) {
  return {
    type: _ActionTypes2['default'].REMOVE_TOKEN,
    value: value
  };
}

function removeAllTokens() {
  return {
    type: _ActionTypes2['default'].REMOVE_ALL_TOKENS
  };
}

function replaceTokens(tokens) {
  return {
    type: _ActionTypes2['default'].REPLACE_TOKENS,
    tokens: tokens
  };
}

function removeSkipFacetFields(name) {
  return {
    type: _ActionTypes2['default'].REMOVE_SKIP_FACET_FIELDS,
    name: name
  };
}