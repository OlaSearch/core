'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQueryTerm = updateQueryTerm;
exports.updateTempQueryTerm = updateTempQueryTerm;
exports.clearTempQueryTerm = clearTempQueryTerm;
exports.executeAutoSuggest = executeAutoSuggest;
exports.clearQueryTerm = clearQueryTerm;
exports.closeAutoSuggest = closeAutoSuggest;
exports.addFacet = addFacet;
exports.terminateAutoSuggest = terminateAutoSuggest;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = require('../../.babelhelper.js').interopRequireDefault(_ActionTypes);

function updateQueryTerm(term) {
  return {
    type: _ActionTypes2['default'].UPDATE_QUERY_TERM_AUTOSUGGEST,
    term: term
  };
}

function updateTempQueryTerm(term) {
  return {
    type: _ActionTypes2['default'].UPDATE_TEMP_QUERY_TERM_AUTOSUGGEST,
    term: term
  };
}

function clearTempQueryTerm() {
  return {
    type: _ActionTypes2['default'].CLEAR_TEMP_QUERY_TERM_AUTOSUGGEST
  };
}

function executeAutoSuggest() {
  var isFuzzySuggest = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

  return function (dispatch, getState) {
    var state = getState();
    var query = state.AutoSuggest.query;

    var context = state.Context;

    dispatch({
      types: [_ActionTypes2['default'].REQUEST_AUTOSUGGEST, _ActionTypes2['default'].REQUEST_AUTOSUGGEST_SUCCESS, _ActionTypes2['default'].REQUEST_AUTOSUGGEST_FAILURE],
      query: query,
      context: context,
      api: isFuzzySuggest ? 'fuzzySuggest' : 'suggest',
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

function terminateAutoSuggest() {
  return {
    type: _ActionTypes2['default'].TERMINATE_AUTOSUGGEST
  };
}