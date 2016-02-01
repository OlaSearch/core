'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _constantsActionTypes = require('./../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

var _servicesStorage = require('./../services/storage');

var _servicesStorage2 = _interopRequireDefault(_servicesStorage);

var _servicesUrlSync = require('./../services/urlSync');

var _ramda = require('ramda');

var initialState = {
	totalResults: 0,
	results: [],
	facets: [],
	spellSuggestions: [],
	suggestedTerm: '',
	isLoading: false,
	bookmarks: _servicesStorage2['default'].get('bookmarks') || [],
	history: _servicesStorage2['default'].get('history') || [],
	locale: 'en-US',
	error: null
};

exports['default'] = function (state, action) {
	if (state === undefined) state = initialState;

	switch (action.type) {

		case _constantsActionTypes2['default'].REQUEST_SEARCH:
			return _extends({}, state, {
				isLoading: true
			});

		case _constantsActionTypes2['default'].REQUEST_SEARCH_SUCCESS:
			var results = action.results,
			    appendResult = action.appendResult;

			if (appendResult) {

				return _extends({}, state, {
					results: [].concat(_toConsumableArray(state.results), _toConsumableArray(action.results)),
					isLoading: false
				});
			}

			return _extends({}, state, {
				results: results,
				facets: action.facets,
				spellSuggestions: action.spellSuggestions,
				totalResults: action.totalResults,
				suggestedTerm: action.suggestedTerm,
				isLoading: false
			});

		case _constantsActionTypes2['default'].REQUEST_SEARCH_FAILURE:

			var error = {
				status: action.error.status,
				statusText: action.error.statusText
			};

			return _extends({}, state, {
				error: error
			});

		case _constantsActionTypes2['default'].ADD_BOOKMARK:

			var _bookmarks = [].concat(_toConsumableArray(state.bookmarks), [action.snippet]);

			_servicesStorage2['default'].set('bookmarks', _bookmarks);

			return _extends({}, state, {
				bookmarks: _bookmarks
			});

		case _constantsActionTypes2['default'].REMOVE_BOOKMARK:

			var _bookmarks = [].concat(_toConsumableArray(state.bookmarks.filter(function (bookmark) {
				return bookmark.id != action.snippet.id;
			})));

			_servicesStorage2['default'].set('bookmarks', _bookmarks);

			return _extends({}, state, {
				bookmarks: _bookmarks
			});

		case _constantsActionTypes2['default'].ADD_HISTORY:

			var query = _extends({}, action.query);

			var q = query.q;

			/* Remove Page, perPage and referrer */

			delete query['page'];
			delete query['per_page'];
			delete query['referrer'];

			/* Get selected facets */

			var facets = (0, _ramda.flatten)(query.facet_query.map(function (item) {
				return item.selected;
			}));

			/* Check if it already exists */

			var exists = state.history.filter(function (item) {
				return item.q == q && (0, _ramda.equals)(item.facets, facets);
			});

			/* Check if history already exists */

			if (exists.length) return state;

			var _history = [{
				q: q,
				url: _servicesUrlSync.character + (0, _servicesUrlSync.buildQueryString)(query),
				dateAdded: new Date().getTime(),
				facets: facets
			}].concat(_toConsumableArray(state.history));

			_servicesStorage2['default'].set('history', _history);

			return _extends({}, state, {
				history: _history
			});

		case _constantsActionTypes2['default'].CLEAR_HISTORY:

			_servicesStorage2['default'].set('history', []);

			return _extends({}, state, {
				history: []
			});

		case _constantsActionTypes2['default'].SET_LOCALE:
			return _extends({}, state, {
				locale: action.payload
			});

		default:
			return state;
	}
};

module.exports = exports['default'];