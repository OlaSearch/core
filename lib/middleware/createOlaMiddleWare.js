'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* Create middleware */


var _Logger = require('./../actions/Logger');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
        var executeFromSpellSuggest = action.executeFromSpellSuggest;
        var suggestedTerm = action.suggestedTerm;


        if (!types) {
          // Normal action: pass it on
          return next(action);
        }

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
          var engineConfig = options.engineConfig;

          parser = new engineConfig[config.search_engine_type].Parser(config);
          queryBuilder = new engineConfig[config.search_engine_type].QueryBuilder(config);
          searchService = new engineConfig[config.search_engine_type].SearchService(config);
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

        var _types = _slicedToArray(types, 3);

        var requestType = _types[0];
        var successType = _types[1];
        var failureType = _types[2];


        dispatch(_extends({}, payload, {
          type: requestType
        }));

        /* Add timestamp to query */

        var timestampObj = {
          timestamp: getState().Timestamp.timestamp
        };

        /* ACL Rules */
        var acl = getState().Acl;
        var callApi = void 0;
        var params = proxy ? _extends({}, query, { api: api }) : queryBuilder.transform(query, api === 'suggest' ? config.mappingAutoSuggest : null, acl, context);

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

          /* Parse only when the timestamp matches */
          var results;
          var spellSuggestions;
          var totalResults;
          var facets;
          var qt;
          if (!proxy) {
            results = parser.normalizeResults(response);
            spellSuggestions = parser.normalizeSpellSuggestions(response);
            totalResults = parser.normalizeTotalResults(response);
            facets = parser.normalizeFacets(response);
            qt = parser.queryTime(response);
          } else {
            results = response.results;
            spellSuggestions = results.spellSuggestions;
            totalResults = results.totalResults;
            facets = results.facets;
            qt = results.qt;
          }

          var type = successType;

          /**
           * Check if
           * Total results = 0 && Has Spell Suggestions
           */

          if (totalResults === 0 && spellSuggestions.length && executeFromSpellSuggest) {
            return dispatch(executeFromSpellSuggest(_extends({
              suggestedTerm: spellSuggestions[0].term
            }, payload)));
          }

          dispatch(_extends({}, payload, {
            results: results,
            spellSuggestions: spellSuggestions,
            totalResults: totalResults,
            facets: facets,
            type: type,
            suggestedTerm: suggestedTerm,
            qt: qt,
            appendResult: payload.appendResult,
            error: null
          }));

          /**
           * Logger
           * Parameters
           * Q or C
           * results
           * eventSource
           */
          logger && logger.enabled && dispatch((0, _Logger.log)('Q', null, api));
        }, function (error) {
          dispatch(_extends({}, payload, {
            error: error,
            type: failureType
          }));
        });
      };
    };
  };
};