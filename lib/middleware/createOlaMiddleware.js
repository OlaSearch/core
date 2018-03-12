'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports['default'] = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        var types = action.types,
            api = action.api,
            query = action.query,
            _action$context = action.context,
            context = _action$context === undefined ? {} : _action$context,
            _action$payload = action.payload,
            payload = _action$payload === undefined ? {} : _action$payload,
            _action$meta = action.meta,
            meta = _action$meta === undefined ? {} : _action$meta,
            _action$nullResponse = action.nullResponse,
            nullResponse = _action$nullResponse === undefined ? null : _action$nullResponse,
            _action$processData = action.processData,
            processData = _action$processData === undefined ? null : _action$processData,
            _action$beforeSuccess = action.beforeSuccessCallback,
            beforeSuccessCallback = _action$beforeSuccess === undefined ? null : _action$beforeSuccess,
            _action$shouldDispatc = action.shouldDispatchActions,
            shouldDispatchActions = _action$shouldDispatc === undefined ? true : _action$shouldDispatc,
            _action$returnWithout = action.returnWithoutDispatch,
            returnWithoutDispatch = _action$returnWithout === undefined ? false : _action$returnWithout;
        var suggestedTerm = action.suggestedTerm;

        // Normal action: pass it on

        if (!types) return next(action);

        var parser = options.parser,
            queryBuilder = options.queryBuilder,
            config = options.config,
            searchService = options.searchService;

        /**
         * When config is a function, Ola Search expects `engineConfig` in config file
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
          /**
           * Only used for admin console compatiblity
           * Disable intent engine so that config files are read from Javascript itself. If you enable intent engine, config file is used in the proxy
           */
          if (payload.disableIntentEngine) {
            config.proxy = false;
            config.intentEngineEnabled = false;
          }
          var currentEngine = options.engineConfig[config.search_engine_type];
          parser = new currentEngine.Parser(config);
          queryBuilder = new currentEngine.QueryBuilder(config);
          searchService = new currentEngine.SearchService(config);
        }

        if (!config) {
          throw new Error('No parser, queryBuilder, searchService, config file present in OlaMiddleWare options');
        }

        var _config = config,
            logger = _config.logger,
            proxy = _config.proxy,
            intentEngineEnabled = _config.intentEngineEnabled;


        if (!Array.isArray(types) || !types.length > 1 || !types.every(function (type) {
          return typeof type === 'string';
        })) {
          throw new Error('Expected an array of three string types.');
        }

        var requestType = types[0],
            successType = types[1],
            failureType = types[2];


        shouldDispatchActions && next((0, _extends3['default'])({}, payload, {
          type: requestType,
          api: api
        }));

        /* Add timestamp to query */
        var currentState = getState();
        var projectId = currentState.QueryState.projectId;
        var tokens = currentState.QueryState.tokens;
        var env = currentState.QueryState.env || 'staging';
        var timestampObj = {
          timestamp: currentState.Timestamp.timestamp[api],
          projectId: projectId,
          env: env

          /* ACL Rules */
        };var acl = currentState.Acl;
        var callApi = void 0;
        var bot = payload.bot;

        var skipIntentEngine = !bot /* 26/2/2018 @vinay: Removed this because the Intent engine selects boths `slots` and facet_query. In page 2, we are only sending facet_query, should we send slots too and skip_intent. */ /* query.page > 1 || */ &&
        // query.enriched_q !== '' ||
        query.q === '';
        var params = proxy ? (0, _extends3['default'])({}, query, {
          bot: bot /* Send to the intent engine */
        }, skipIntentEngine ? { skip_intent: true } : {}, payload.extraParams, payload.answer ? { answer: payload.answer } : {}, {
          api: api,
          userId: context.userId,
          userSession: context.userSession,
          searchSession: context.searchSession,
          context: context,
          projectId: projectId,
          env: env
        }) : api === _Settings.FUZZY_SUGGEST_KEY ? (0, _extends3['default'])({}, query, payload.extraParams) : queryBuilder.transform((0, _extends3['default'])({}, query, payload.extraParams), null, acl, context);

        var shouldLog = meta.log !== false;
        var apiOptions = meta.apiOptions ? meta.apiOptions : null;

        /* Api url when intent engine is active */
        var apiUrl = intentEngineEnabled && _Settings.INTENT_SUPPORTED_API_KEYS.indexOf(api) !== -1 ? config.api.intent : undefined;

        if (typeof api === 'function') {
          /* Should returns a promise */
          callApi = api(params);
        } else {
          callApi = searchService.hasOwnProperty(api) ? searchService[api](timestampObj, params, apiUrl, apiOptions) : null;
        }
        if ((typeof callApi === 'undefined' ? 'undefined' : (0, _typeof3['default'])(callApi)) !== 'object' || typeof callApi.then !== 'function') {
          throw new Error('Expect API call to return a promise.');
        }

        return callApi.then(function (xhr) {
          /* Validate resonse */
          var responseText = xhr.responseText;

          if (xhr && 'responseURL' in xhr) {
            var responseURL = xhr.responseURL.split('?').pop();
            var timestampFromResponse = parseInt(_queryString2['default'].parse(responseURL).timestamp);
            if (timestampFromResponse && getState().Timestamp.timestamp[api] !== timestampFromResponse) {
              return nullResponse;
            }
          }
          return (/^[\{\[]/.test(responseText) ? JSON.parse(responseText) : responseText
          );
        }).then(function (response) {
          /* If null response, pass it on */
          if (!response) return response;

          var type = successType;

          /* Check if process response is false */
          if (processData) {
            response = processData(response, payload, currentState);
          }

          /* For autocomplete */
          if (returnWithoutDispatch) return response;

          /* Parse only when the timestamp matches */
          var results;
          var spellSuggestions;
          var totalResults;
          var facets;
          var qt;
          var answer;
          var mc;
          var enrichedQuery;
          var skipSearchResultsUpdate = false;
          var responseTime;
          var extra = response.extra;
          var version;
          var spellCheckedQuery;
          var sortCondition;
          if (proxy) {
            results = response.results;
            spellSuggestions = response.spellSuggestions;
            totalResults = response.totalResults;
            facets = response.facets;
            qt = response.qt;
            enrichedQuery = response.enriched_q;
            skipSearchResultsUpdate = response.skipSearchResultsUpdate;
            responseTime = response.responseTime;
            version = response.version;

            /* Instant answer */
            answer = api === 'answer' ? response : response.answer;

            /* Query from the response */
            spellCheckedQuery = response.spellCheckedQuery;

            /* Machine comprehension */
            mc = api === 'mc' ? response : response.mc;
          } else {
            results = parser.normalizeResults(response);
            spellSuggestions = parser.normalizeSpellSuggestions(response);
            totalResults = parser.normalizeTotalResults(response);
            facets = parser.normalizeFacets(response);
            qt = parser.queryTime(response);
            responseTime = response.responseTime;
            version = parser.version();
          }
          /**
           * Set suggested term if response query is not equal to search query
           * Not release in Production yet
           */
          if (spellCheckedQuery && response.q && spellCheckedQuery !== response.q) {
            suggestedTerm = spellCheckedQuery;
          }

          /**
           * Check if bot is enabled
           */
          if (bot && answer && answer.error && answer.error === _Settings.ERROR_CODES['BOT_NO_EXISTS']) {
            /* Bot is disabled: Create a dummy message */
            answer = {
              id: (0, _utilities.uuid)(),
              search: {
                q: query.q
              },
              message: query.q
            };
          }

          /**
           * Another check if bot produces bad response
           */
          if (bot && (!answer || answer && !answer.reply && !answer.search && !answer.card && !answer.location)) {
            /* throw exception */
            throw new Error('Something went wrong');
            console.warn('The server could not respond in time with a message ID. Please try again. May be the intent engine is down. Please contact our customer support.');
          }

          /**
           * Get facets or filters selected by intent engine
           * Always reset facets from intent engine
           */

          var facetQuery = currentState.QueryState.facet_query;
          if (!bot /* Do not fill facet_query if its from bot */ && answer && answer.search && answer.search.slots && answer.search.slots.length) {
            var answerFacets = answer.search.slots.filter(function (_ref2) {
              var facet_query = _ref2.facet_query,
                  skip = _ref2.skip;
              return facet_query && !skip;
            }) /* Ignore skipped slots */
            .map(function (item) {
              return (0, _extends3['default'])({}, item, {
                selected: item.value,
                type: item.type === _Settings.SLOT_DATE ? 'daterange' : 'string',
                fromIntentEngine: true
              });
            });
            var answerFacetNames = answerFacets.map(function (_ref3) {
              var name = _ref3.name;
              return name;
            });
            /**
             * Remove from facet Query if `fromIntentEngine: true` and name is not contained in answerFacetNames
             */
            facetQuery = facetQuery.filter(function (_ref4) {
              var fromIntentEngine = _ref4.fromIntentEngine,
                  name = _ref4.name;

              return fromIntentEngine ? answerFacetNames.indexOf(name) !== -1 : true;
            }).map(function (item) {
              /**
               * If Intent engine selects a facet which is already selected by the user
               * Eg: user is in page:2 with type:article. He refreshes the page. article is selected by IE and we need to tag it as fromIntentEngine
               */
              if (answerFacetNames.indexOf(item.name) !== -1) {
                return (0, _extends3['default'])({}, item, {
                  fromIntentEngine: true
                });
              }
              return item;
            });

            var _loop = function _loop(i) {
              var _answerFacets$i = answerFacets[i],
                  name = _answerFacets$i.name,
                  selected = _answerFacets$i.selected,
                  rest = (0, _objectWithoutProperties3['default'])(_answerFacets$i, ['name', 'selected']);
              /* Check if it already exists */

              var exists = facetQuery.some(function (_ref5) {
                var _name = _ref5.name;
                return _name === name;
              });
              if (exists) {
                facetQuery = facetQuery.map(function (item) {
                  if (item.name === name) item.selected = selected;
                  /* from intent engine flag */
                  return item;
                });
              } else {
                facetQuery = [].concat(facetQuery, answerFacets[i]);
              }
            };

            for (var i = 0; i < answerFacets.length; i++) {
              _loop(i);
            }
          } else {
            /* Remove queries from intent engine */
            facetQuery = facetQuery.filter(function (_ref6) {
              var fromIntentEngine = _ref6.fromIntentEngine;
              return !fromIntentEngine;
            });
          }

          /**
           * Check if sort is filled
           */
          if (!bot && answer && answer.search && answer.search.sort) {
            sortCondition = answer.search.sort;
          }

          /**
           * Check for location
           */
          if (!bot && answer && answer.location /* Check if the intent requires location */ && !currentState.Context.location /* Check if location is already present */ && !currentState.Context.hasRequestedLocation /* Check if location was asked before */
          ) {
              dispatch((0, _Context.requestGeoLocation)(function () {
                dispatch({
                  types: types,
                  query: query,
                  api: api,
                  payload: payload,
                  context: getState().Context /* Get the new context */
                  , responseTime: responseTime,
                  facetQuery: facetQuery,
                  bot: bot
                });
              }));
            }

          /**
           * Check if
           * Total results = 0 && Has Spell Suggestions
           */
          /**
           * Check if
           * answer exists
           *  answer && answer.intent
           */
          if (totalResults === 0 && spellSuggestions.length &&
          // (!enrichedQuery || enrichedQuery === query.q) &&
          !(answer && answer.intent && _Settings.IGNORE_INTENTS.indexOf(answer.intent) === -1) && !currentState.QueryState.skip_spellcheck) {
            var term = spellSuggestions[0].term;

            return dispatch({
              types: types,
              query: (0, _extends3['default'])({}, query, {
                q: term
              }),
              suggestedTerm: term,
              api: api,
              payload: (0, _extends3['default'])({}, payload, {
                originalQuery: query.q,
                extraParams: {
                  spellchecked: true
                }
              }),
              processData: processData,
              beforeSuccessCallback: beforeSuccessCallback,
              context: context,
              responseTime: responseTime,
              facetQuery: facetQuery
            });
          }
          /**
           * Success handler
           */
          var successData = {
            payload: payload,
            results: results,
            spellSuggestions: spellSuggestions,
            totalResults: totalResults,
            facets: facets,
            type: type,
            suggestedTerm: suggestedTerm,
            qt: qt,
            answer: answer,
            mc: mc,
            enriched_q: enrichedQuery,
            error: null,
            skipSearchResultsUpdate: skipSearchResultsUpdate,
            api: api,
            responseTime: responseTime,
            facetQuery: facetQuery,
            sortCondition: sortCondition,
            extra: extra,
            version: version

            /**
             * Give the user chance to modify data before success
             */
          };if (beforeSuccessCallback) {
            successData = beforeSuccessCallback(successData);
          }

          /* Dispatch success */
          shouldDispatchActions && next(successData);

          /**
           * Logger
           * Parameters
           * Q or C
           * results
           * eventSource
           * searchInput = `voice`|`url`|`keyboard`
           */
          /* Query becomes empty for long conversations */
          var isBotReply = answer && 'awaiting_user_input' in answer;
          var sendImmediateLog = isBotReply && !answer.awaiting_user_input;
          var logFn = sendImmediateLog ? _Logger.submitLog : _Logger.debounceLog;
          if (logger && logger.enabled && _Settings.API_IGNORE_LOGGING.indexOf(api) === -1 && shouldLog) {
            logFn({
              dispatch: dispatch,
              eventType: 'Q',
              eventSource: currentState.QueryState.source || api,
              state: getState(),
              responseTime: responseTime,
              payload: payload,
              tokens: tokens
            });
          }

          /**
           * If answer is a callback
           * SPICE
           */
          if (answer && answer.callback) {
            dispatch((0, _Search.fetchAnswer)(answer.callback));
          }

          return successData;
        })['catch'](function (error) {
          shouldDispatchActions && next({
            payload: payload,
            error: error,
            type: failureType
          });
        });
      };
    };
  };
};

var _Logger = require('./../actions/Logger');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _Search = require('./../actions/Search');

var _Context = require('./../actions/Context');

var _Settings = require('./../constants/Settings');

var _utilities = require('./../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }