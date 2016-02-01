'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.addHistory = addHistory;
exports.clearHistory = clearHistory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constantsActionTypes = require('./../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

function addHistory(query) {

	return function (dispatch, getState) {
		var _getState = getState();

		var QueryState = _getState.QueryState;
		var AppState = _getState.AppState;
		var q = QueryState.q;
		var totalResults = AppState.totalResults;

		if (!q || !totalResults) return;

		dispatch({
			type: _constantsActionTypes2['default'].ADD_HISTORY,
			query: query
		});
	};
}

function clearHistory() {
	return {
		type: _constantsActionTypes2['default'].CLEAR_HISTORY
	};
}