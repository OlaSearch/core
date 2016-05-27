'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.updateQueryTerm = updateQueryTerm;
exports.executeAutoSuggest = executeAutoSuggest;
exports.executeFromSpellSuggest = executeFromSpellSuggest;
exports.clearQueryTerm = clearQueryTerm;
exports.closeAutoSuggest = closeAutoSuggest;
exports.addFacet = addFacet;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function updateQueryTerm(term) {
  return {
    type: _ActionTypes2['default'].UPDATE_QUERY_TERM_AUTOSUGGEST,
    term: term
  };
}

function executeAutoSuggest() {
  return function (dispatch, getState) {
    var query = getState().AutoSuggest.query;

    var context = getState().Context;

    dispatch({
      types: [_ActionTypes2['default'].REQUEST_AUTOSUGGEST, _ActionTypes2['default'].REQUEST_AUTOSUGGEST_SUCCESS, _ActionTypes2['default'].REQUEST_AUTOSUGGEST_FAILURE],
      query: query,
      context: context,
      api: 'suggest',
      payload: {},
      executeFromSpellSuggest: executeFromSpellSuggest
    });
  };
}

function executeFromSpellSuggest(payload) {
  return function (dispatch, getState) {
    var suggestedTerm = payload.suggestedTerm;


    var query = _extends({}, getState().AutoSuggest.query, {
      q: suggestedTerm
    });
    var context = getState().Context;

    dispatch({
      types: [_ActionTypes2['default'].REQUEST_AUTOSUGGEST, _ActionTypes2['default'].REQUEST_AUTOSUGGEST_SUCCESS, _ActionTypes2['default'].REQUEST_AUTOSUGGEST_FAILURE],
      query: query,
      context: context,
      api: 'suggest',
      payload: {},
      suggestedTerm: suggestedTerm
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