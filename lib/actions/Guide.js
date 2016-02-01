'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.initGuide = initGuide;
exports.executeSearch = executeSearch;
exports.incrementIndex = incrementIndex;
exports.decrementIndex = decrementIndex;
exports.replaceFacet = replaceFacet;
exports.clearFacetAfterIndex = clearFacetAfterIndex;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constantsActionTypes = require('./../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

function initGuide(payload) {

	return {
		type: _constantsActionTypes2['default'].INIT_GUIDE,
		payload: payload
	};
}

function executeSearch(payload) {

	return function (dispatch, getState) {
		var query = getState().Guide.query;

		dispatch({
			types: [_constantsActionTypes2['default'].REQUEST_GUIDE, _constantsActionTypes2['default'].REQUEST_GUIDE_SUCCESS, _constantsActionTypes2['default'].REQUEST_GUIDE_FAILURE],
			query: query,
			api: 'search',
			payload: payload
		});
	};
}

function incrementIndex() {

	return {
		type: _constantsActionTypes2['default'].INCREMENT_GUIDE
	};
}

function decrementIndex() {

	return {
		type: _constantsActionTypes2['default'].DECREMENT_GUIDE
	};
}

function replaceFacet(facet, value) {

	return {
		type: _constantsActionTypes2['default'].REPLACE_FACET_GUIDE,
		facet: facet, value: value
	};
}

function clearFacetAfterIndex(index) {
	return {
		type: _constantsActionTypes2['default'].CLEAR_FACET_AFTER_INDEX,
		index: index
	};
}