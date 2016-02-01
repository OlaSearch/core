'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.updateQueryTerm = updateQueryTerm;
exports.executeAutoSuggest = executeAutoSuggest;
exports.executeFromSpellSuggest = executeFromSpellSuggest;
exports.clearQueryTerm = clearQueryTerm;
exports.closeAutoSuggest = closeAutoSuggest;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constantsActionTypes = require('./../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

function updateQueryTerm(term) {

	return {
		type: _constantsActionTypes2['default'].UPDATE_QUERY_TERM_AUTOSUGGEST,
		term: term
	};
}

;

function executeAutoSuggest() {

	return function (dispatch, getState) {
		var query = getState().AutoSuggest.query;

		dispatch({
			types: [_constantsActionTypes2['default'].REQUEST_AUTOSUGGEST, _constantsActionTypes2['default'].REQUEST_AUTOSUGGEST_SUCCESS, _constantsActionTypes2['default'].REQUEST_AUTOSUGGEST_FAILURE],
			query: query,
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

		dispatch({
			types: [_constantsActionTypes2['default'].REQUEST_AUTOSUGGEST, _constantsActionTypes2['default'].REQUEST_AUTOSUGGEST_SUCCESS, _constantsActionTypes2['default'].REQUEST_AUTOSUGGEST_FAILURE],
			query: query,
			api: 'suggest',
			payload: {},
			suggestedTerm: suggestedTerm
		});
	};
}

function clearQueryTerm() {
	return {
		type: _constantsActionTypes2['default'].CLEAR_QUERY_TERM_AUTOSUGGEST
	};
}

function closeAutoSuggest() {

	return {
		type: _constantsActionTypes2['default'].CLOSE_AUTOSUGGEST
	};
}