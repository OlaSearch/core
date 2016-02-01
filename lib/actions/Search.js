'use strict';

Object.defineProperty(exports, '__esModule', {
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
exports.updateStateFromQuery = updateStateFromQuery;
exports.initSearch = initSearch;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constantsActionTypes = require('./../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

var _History = require('./History');

var _servicesUrlSync = require('./../services/urlSync');

var _utilities = require('./../utilities');

/* Update Browser URL */
var updateUrl = (0, _utilities.debounce)(_servicesUrlSync.pushState, 300);

/* Adds to History */
var addToHistory = (0, _utilities.debounce)(addOlaHistory, 600);

function addOlaHistory(dispatchInstance, query) {

	dispatchInstance((0, _History.addHistory)(query));
}

function updateQueryTerm(term) {
	return {
		type: _constantsActionTypes2['default'].UPDATE_QUERY_TERM,
		term: term
	};
}

function addFilter(payload) {
	return {
		type: _constantsActionTypes2['default'].ADD_FILTER,
		payload: payload
	};
}

function removeFilter(payload) {
	return {
		type: _constantsActionTypes2['default'].REMOVE_FILTER,
		payload: payload
	};
}

function clearFilters() {
	return {
		type: _constantsActionTypes2['default'].CLEAR_FILTERS
	};
}

function setLocale(payload) {
	return {
		type: _constantsActionTypes2['default'].SET_LOCALE,
		payload: payload
	};
}

function clearQueryTerm() {

	return {
		type: _constantsActionTypes2['default'].CLEAR_QUERY_TERM
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
			types: [_constantsActionTypes2['default'].REQUEST_SEARCH, _constantsActionTypes2['default'].REQUEST_SEARCH_SUCCESS, _constantsActionTypes2['default'].REQUEST_SEARCH_FAILURE],
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

			updateUrl(query);

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
			types: [_constantsActionTypes2['default'].REQUEST_SEARCH, _constantsActionTypes2['default'].REQUEST_SEARCH_SUCCESS, _constantsActionTypes2['default'].REQUEST_SEARCH_FAILURE],
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
			type: _constantsActionTypes2['default'].ADD_FACET,
			facet: facet, value: value
		});
	};
}

function removeFacet(facet, value) {

	return {
		type: _constantsActionTypes2['default'].REMOVE_FACET,
		facet: facet, value: value
	};
}

function replaceFacet(facet, value) {

	return {
		type: _constantsActionTypes2['default'].REPLACE_FACET,
		facet: facet, value: value
	};
}

function removeAllFacets() {

	return {
		type: _constantsActionTypes2['default'].REMOVE_ALL_FACETS
	};
}

/* Change page */

function changePage(page) {

	return function (dispatch, getState) {

		acceptSuggestedTerm(dispatch, getState);

		dispatch({
			type: _constantsActionTypes2['default'].CHANGE_PAGE,
			page: page
		});
	};
}

/* Change per page */

function changePerPage(perPage) {
	return {
		type: _constantsActionTypes2['default'].CHANGE_PER_PAGE,
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
		type: _constantsActionTypes2['default'].CHANGE_SORT,
		sort: sort
	};
}

function updateStateFromQuery(config) {

	return {
		type: _constantsActionTypes2['default'].UPDATE_STATE_FROM_QUERY,
		config: config
	};
}

function initSearch(options) {

	return function (dispatch, getState) {
		var config = options.config;

		/* Always pass configuration to @parseQueryString handler */

		dispatch(updateStateFromQuery(config));

		/* Disable Route change initally */

		dispatch(executeSearch({
			routeChange: false
		}));
	};
}