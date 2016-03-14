'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addHistory = addHistory;
exports.clearHistory = clearHistory;

var _ActionTypes = require('./../constants/ActionTypes');

var _ActionTypes2 = _interopRequireDefault(_ActionTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function addHistory(query) {

	return function (dispatch, getState) {
		var _getState = getState();

		var QueryState = _getState.QueryState;
		var AppState = _getState.AppState;
		var q = QueryState.q;
		var totalResults = AppState.totalResults;


		if (!q || !totalResults) return;

		dispatch({
			type: _ActionTypes2['default'].ADD_HISTORY,
			query: query
		});
	};
}

function clearHistory() {
	return {
		type: _ActionTypes2['default'].CLEAR_HISTORY
	};
}