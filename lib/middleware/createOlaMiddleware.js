'use strict';

var _Logger = require('./../actions/Logger');

var _persistState = require('./../store/persistState');

var _queryString = require('query-string');

var _queryString2 = require('../../.babelhelper.js').interopRequireDefault(_queryString);

var _utilities = require('./../utilities');

/**
 * Ola Middleware
 * # Functions
 * 1. State persistence for Bookmarks, History and Context
 * 2. Ajax requests for search adapters
 */
var FUZZY_SUGGEST_KEY = 'fuzzySuggest';

module.exports = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return function (_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;
    return function (next) {
      return function (action) {
        var types = action.types;
        var api = action.api;
        var query = action.query;
        var context = action.context;
        var _action$payload = action.payload;
        var payload = _action$payload === undefined ? {} : _action$payload;
        var suggestedTerm = action.suggestedTerm;
        var _action$processRespon = action.processResponse;
        var processResponse = _action$processRespon === undefined ? true : _action$processRespon;
        var _action$processData = action.processData;
        var processData = _action$processData === undefined ? null : _action$processData;
        var _action$shouldDispatc = action.shouldDispatchActions;
        var shouldDispatchActions = _action$shouldDispatc === undefined ? true : _action$shouldDispatc;

        /* Persist store state */

        if (_persistState.STATE_TYPE_KEYS.indexOf(action.type) !== -1) {
          (0, _persistState.debouncePersistState)(action, getState, options.config.namespace);
        }

        // Normal action: pass it on
        if (!types) return next(action);

        var parser = options.parser;
        var queryBuilder = options.queryBuilder;
        var config = options.config;
        var searchService = options.searchService;

        /**
         * When config is a function, Ola Search expects
         *  engineConfiguration
         *  engineConfig = {
         *    solr: { parser, queryBuilder, searchService },
         *    elastic: { parser, queryBuilder, searchService }
         *  }
         * search_engine_type: 'solr|elastic'
         * @param  {[type]} typeof config        [description]
         * @return {[type]}        [description]
         */

        if (typeof config === 'function') {
          config = config(getState);
          var currentEngine = options.engineConfig[config.search_engine_type];
          parser = new currentEngine.Parser(config);
          queryBuilder = new currentEngine.QueryBuilder(config);
          searchService = new currentEngine.SearchService(config);
        }

        if (!config) {
          throw new Error('No parser, queryBuilder, searchService, config file present in OlaMiddleWare options');
        }

        var _config = config;
        var logger = _config.logger;
        var proxy = _config.proxy;


        if (!Array.isArray(types) || !types.length > 1 || !types.every(function (type) {
          return typeof type === 'string';
        })) {
          throw new Error('Expected an array of three string types.');
        }

        /**
         * Fuzzy suggest
         */
        if (api === FUZZY_SUGGEST_KEY) {
          return searchService[api](timestampObj, query);
        }

        var _types = require('../../.babelhelper.js').slicedToArray(types, 3);

        var requestType = _types[0];
        var successType = _types[1];
        var failureType = _types[2];


        shouldDispatchActions && next(require('../../.babelhelper.js')['extends']({}, payload, {
          type: requestType
        }));

        /* Add timestamp to query */
        var currentState = getState();
        var timestampObj = {
          timestamp: currentState.Timestamp.timestamp
        };

        /* ACL Rules */
        var acl = currentState.Acl;
        var callApi = void 0;
        var mapping = getMapping(api, config);
        var params = proxy ? require('../../.babelhelper.js')['extends']({}, query, { api: api }) : queryBuilder.transform(query, mapping, acl, context);

        if (typeof api === 'function') {
          /* Returns a promise */
          callApi = function callApi() {
            return api(params);
          };
        } else {
          callApi = function callApi() {
            return searchService.hasOwnProperty(api) ? searchService[api](timestampObj, params) : null;
          };
        }

        if (typeof callApi !== 'function') {
          throw new Error('Expected callApi to be a function. Check your dispatch call.');
        }

        return callApi().then(function (response, xhr) {
          if (xhr && 'responseURL' in xhr) {
            var responseURL = xhr.responseURL.split('?').pop();
            var timestampFromResponse = parseInt(_queryString2['default'].parse(responseURL).timestamp);
            if (timestampFromResponse && getState().Timestamp.timestamp !== timestampFromResponse) return;
          }

          var type = successType;

          /* Check if process response is false */

          if (!processResponse) {
            return next({
              type: type,
              response: processData ? processData(response) : response
            });
          }

          /* Parse only when the timestamp matches */
          var results;
          var spellSuggestions;
          var totalResults;
          var facets;
          var qt;
          var answer;
          if (proxy) {
            results = response.results;
            spellSuggestions = response.spellSuggestions;
            totalResults = response.totalResults;
            facets = response.facets;
            qt = response.qt;

            /* Instant answer */
            answer = response.answer;
          } else {
            results = parser.normalizeResults(response);
            spellSuggestions = parser.normalizeSpellSuggestions(response);
            totalResults = parser.normalizeTotalResults(response);
            facets = parser.normalizeFacets(response);
            qt = parser.queryTime(response);
          }

          /**
           * Check if
           * Total results = 0 && Has Spell Suggestions
           */

          if (totalResults === 0 && spellSuggestions.length) {
            var term = spellSuggestions[0].term;

            return dispatch({
              types: types,
              query: require('../../.babelhelper.js')['extends']({}, query, {
                q: term
              }),
              suggestedTerm: term,
              api: api,
              payload: payload,
              context: context
            });
          }

          shouldDispatchActions && next({
            payload: payload,
            results: results,
            spellSuggestions: spellSuggestions,
            totalResults: totalResults,
            facets: facets,
            type: type,
            suggestedTerm: suggestedTerm,
            qt: qt,
            answer: answer,
            error: null
          });

          /**
           * Logger
           * Parameters
           * Q or C
           * results
           * eventSource
           * searchInput = `voice`|`url`|`keyboard`
           */
          if (logger && logger.enabled) {
            (0, _Logger.debounceLog)({
              dispatch: dispatch,
              eventType: 'Q',
              eventSource: api,
              debounce: true,
              state: getState()
            });
          }

          return {
            results: results,
            spellSuggestions: spellSuggestions,
            totalResults: totalResults,
            facets: facets,
            type: type,
            suggestedTerm: suggestedTerm,
            qt: qt,
            answer: answer
          };
        }, function (error) {
          next({
            payload: payload,
            error: error,
            type: failureType
          });
        });
      };
    };
  };
};

/**
 * Get Query mapping
 * @param  {string} type
 * @param  {object} config
 * @return {object}
 */
var getMapping = function getMapping(type, config) {
  switch (type) {
    case 'suggest':
      return config.mappingAutoSuggest;

    case FUZZY_SUGGEST_KEY:
      return config.mappingFuzzySuggest;

    default:
      return null;
  }
};