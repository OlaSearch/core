'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * [createOlaMiddleWare description]
 * @param  {Object} options
 * options = {
 * 	parser,
 * 	queryBuilder,
 * 	config,
 * 	searchService
 * }
 */
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
				var _action$payload = action.payload;
				var payload = _action$payload === undefined ? {} : _action$payload;
				var executeFromSpellSuggest = action.executeFromSpellSuggest;
				var suggestedTerm = action.suggestedTerm;
				var parser = options.parser;
				var queryBuilder = options.queryBuilder;
				var config = options.config;
				var searchService = options.searchService;


				if (!parser || !queryBuilder || !config || !searchService) {
					throw new Error('No searchAdapter or searchService or config file present in OlaMiddleWare options');
				}

				if (!types) {
					// Normal action: pass it on
					return next(action);
				}

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

				var timestampedQuery = _extends({}, query, {
					timestamp: getState().Timestamp.timestamp
				});

				var CALL_API,
				    params = queryBuilder.transform(timestampedQuery, api == 'suggest' ? config.mappingAutoSuggest : null);

				switch (api) {

					case 'suggest':
						CALL_API = function CALL_API() {
							return searchService.suggest(config.api.suggest, params, config.mappingAutoSuggest);
						};
						break;

					case 'get':
						CALL_API = function CALL_API() {
							return searchService.get(config.api.suggest, params);
						};
						break;

					default:
						CALL_API = function CALL_API() {
							return searchService.search(config.api.search, params);
						};
						break;
				}

				if (typeof CALL_API !== 'function') {
					throw new Error('Expected CALL_API to be a function.');
				}

				return CALL_API().then(function (response) {

					var timestampFromResponse = parseInt(parser.requestParameters(response).timestamp);

					if (timestampFromResponse && getState().Timestamp.timestamp != timestampFromResponse) {
						return;
					}

					/* Parse only when the timestamp matches */

					var results = parser.normalizeResults(response);
					var spellSuggestions = parser.normalizeSpellSuggestions(response);
					var totalResults = parser.normalizeTotalResults(response);
					var facets = parser.normalizeFacets(response);
					var type = successType;

					/**
      * Check if 
      * Total results = 0 && Has Spell Suggestions
      */

					if (totalResults == 0 && spellSuggestions.length) {

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
						appendResult: payload.appendResult,
						error: null
					}));
				}, function (error) {

					throw new Error(error.status + ' The server could not be reached');

					dispatch(_extends({}, payload, {
						error: error,
						type: failureType
					}));
				});
			};
		};
	};
};