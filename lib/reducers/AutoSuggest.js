'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constantsActionTypes = require('./../constants/ActionTypes');

var _constantsActionTypes2 = _interopRequireDefault(_constantsActionTypes);

var initialState = {
	query: {
		q: '',
		per_page: 20,
		page: 1
	},
	totalResults: 0,
	results: [],
	spellSuggestions: [],
	suggestedTerm: '',
	isLoading: false,
	isOpen: false
};

exports['default'] = function (state, action) {
	if (state === undefined) state = initialState;

	switch (action.type) {

		case _constantsActionTypes2['default'].UPDATE_QUERY_TERM_AUTOSUGGEST:
			return _extends({}, state, {
				query: _extends({}, state.query, { q: action.term
				})
			});

		case _constantsActionTypes2['default'].CLEAR_QUERY_TERM_AUTOSUGGEST:
			return initialState;

		case _constantsActionTypes2['default'].REQUEST_AUTOSUGGEST:
			return _extends({}, state, {
				isLoading: true
			});

		case _constantsActionTypes2['default'].REQUEST_AUTOSUGGEST_SUCCESS:
			var spellSuggestions = action.spellSuggestions,
			    results = action.results,
			    totalResults = action.totalResults,
			    suggestedTerm = action.suggestedTerm;

			return _extends({}, state, {
				results: results,
				spellSuggestions: spellSuggestions,
				totalResults: totalResults,
				isLoading: false,
				suggestedTerm: suggestedTerm,
				isOpen: !!results.length || !!spellSuggestions.length || !!suggestedTerm
			});

		case _constantsActionTypes2['default'].OPEN_AUTOSUGGEST:
			return _extends({}, state, {
				isOpen: true
			});

		case _constantsActionTypes2['default'].CLOSE_AUTOSUGGEST:
			return _extends({}, state, {
				isOpen: false
			});

		default:
			return state;
	}
};

module.exports = exports['default'];