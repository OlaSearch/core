import types from './../constants/ActionTypes';

var initialState = {
	query : {
		q: '',
		per_page: 20,
		page: 1,
	},
	totalResults: 0,
	results: [],	
	spellSuggestions: [],
	suggestedTerm: '',
	isLoading: false,
	isOpen: false
}

export default (state = initialState, action) => {
	
	switch(action.type){

		case types.UPDATE_QUERY_TERM_AUTOSUGGEST:
			return {
				...state,
				query: {
					...state.query, q: action.term
				}
			};

		case types.CLEAR_QUERY_TERM_AUTOSUGGEST:
			return initialState;

		case types.REQUEST_AUTOSUGGEST:
			return {
				...state,
				isLoading: true
			};
		
		case types.REQUEST_AUTOSUGGEST_SUCCESS:

			var {
				spellSuggestions,
				results,
				totalResults,
				suggestedTerm
			} = action;

			return {
				...state, 
				results,
				spellSuggestions,
				totalResults,
				isLoading: false,
				suggestedTerm,
				isOpen: !!results.length || !!spellSuggestions.length || !!suggestedTerm
			};

		case types.OPEN_AUTOSUGGEST:
			return {
				...state,
				isOpen: true
			};

		case types.CLOSE_AUTOSUGGEST:
			return {
				...state,
				isOpen: false
			}

		default:
			return state;
	}
}