'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQueryTerm = updateQueryTerm;
exports.executeAutoSuggest = executeAutoSuggest;
exports.executeFuzzyAutoSuggest = executeFuzzyAutoSuggest;
exports.clearQueryTerm = clearQueryTerm;
exports.closeAutoSuggest = closeAutoSuggest;
exports.addFacet = addFacet;
exports.removeFacet = removeFacet;
exports.terminateAutoSuggest = terminateAutoSuggest;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

var _xssFilters = require('xss-filters');

var _xssFilters2 = require('../../.babelhelper.js').interopRequireDefault(_xssFilters);

var _utilities = require('./../utilities');

function updateQueryTerm(term, searchInput) {
  return {
    type: _ActionTypes2['default'].UPDATE_QUERY_TERM_AUTOSUGGEST,
    term: _xssFilters2['default'].inHTMLData(term),
    searchInput: searchInput
  };
}

function executeAutoSuggest() {
  return function (dispatch, getState) {
    var state = getState();
    var _state$AutoSuggest = state.AutoSuggest;
    var q = _state$AutoSuggest.q;
    var page = _state$AutoSuggest.page;
    var per_page = _state$AutoSuggest.per_page;
    var facet_query = _state$AutoSuggest.facet_query;

    var context = state.Context;

    dispatch({
      types: [_ActionTypes2['default'].REQUEST_AUTOSUGGEST, _ActionTypes2['default'].REQUEST_AUTOSUGGEST_SUCCESS, _ActionTypes2['default'].REQUEST_AUTOSUGGEST_FAILURE],
      query: { q: q, per_page: per_page, page: page, facet_query: facet_query },
      context: context,
      api: 'suggest',
      payload: {}
    });
  };
}

function executeFuzzyAutoSuggest(q) {
  return function (dispatch, getState) {
    var query = { q: q };
    var context = getState().Context;
    return dispatch({
      types: [_ActionTypes2['default'].REQUEST_AUTOSUGGEST, _ActionTypes2['default'].REQUEST_AUTOSUGGEST_SUCCESS, _ActionTypes2['default'].REQUEST_AUTOSUGGEST_FAILURE],
      query: query,
      context: context,
      processData: function processData(response) {
        return (0, _utilities.pickDeep)(response.suggest, 'suggestions');
      },
      nullResponse: [],
      returnWithoutDispatch: true,
      api: 'fuzzySuggest',
      payload: {}
    });
  };
}

function clearQueryTerm() {
  return {
    type: _ActionTypes2['default'].CLEAR_QUERY_TERM_AUTOSUGGEST
  };
}

function closeAutoSuggest() {
  return {
    type: _ActionTypes2['default'].CLOSE_AUTOSUGGEST
  };
}

function addFacet(facet, value) {
  return {
    type: _ActionTypes2['default'].ADD_FACET_AUTOSUGGEST,
    facet: facet,
    value: value
  };
}

function removeFacet(facet) {
  return {
    type: _ActionTypes2['default'].REMOVE_FACET_AUTOSUGGEST,
    facet: facet
  };
}

function terminateAutoSuggest() {
  return {
    type: _ActionTypes2['default'].TERMINATE_AUTOSUGGEST
  };
}