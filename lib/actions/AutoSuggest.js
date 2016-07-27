'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQueryTerm = updateQueryTerm;
exports.updateFuzzyQueryTerm = updateFuzzyQueryTerm;
exports.clearFuzzyQueryTerm = clearFuzzyQueryTerm;
exports.executeAutoSuggest = executeAutoSuggest;
exports.executeFuzzyAutoSuggest = executeFuzzyAutoSuggest;
exports.clearQueryTerm = clearQueryTerm;
exports.closeAutoSuggest = closeAutoSuggest;
exports.addFacet = addFacet;
exports.removeFacet = removeFacet;
exports.terminateAutoSuggest = terminateAutoSuggest;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

function updateQueryTerm(term, searchInput) {
  return {
    type: _ActionTypes2['default'].UPDATE_QUERY_TERM_AUTOSUGGEST,
    term: term,
    searchInput: searchInput
  };
}

function updateFuzzyQueryTerm(term) {
  return {
    type: _ActionTypes2['default'].UPDATE_FUZZY_QUERY_TERM_AUTOSUGGEST,
    term: term.replace(/(<[^>]+>)/gi, '') /* Remove html tags from terms */
  };
}

function clearFuzzyQueryTerm() {
  return {
    type: _ActionTypes2['default'].CLEAR_FUZZY_QUERY_TERM_AUTOSUGGEST
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

function executeFuzzyAutoSuggest() {
  var isFuzzySuggest = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

  return function (dispatch, getState) {
    var state = getState();
    var query = { q: state.AutoSuggest.q };
    var context = state.Context;

    dispatch({
      types: [_ActionTypes2['default'].REQUEST_AUTOSUGGEST, _ActionTypes2['default'].REQUEST_AUTOSUGGEST_SUCCESS, _ActionTypes2['default'].REQUEST_AUTOSUGGEST_FAILURE],
      query: query,
      context: context,
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
    facet: facet, value: value
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