import types from './../constants/ActionTypes';

var initialState = {
	query : {
		q: '',
		per_page: 20,
		page: 1,
		facet_query: []
	},
	totalResults: 0,
	results: [],
	facets: [],
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
				facets,
				totalResults,
				suggestedTerm
			} = action;

			return {
				...state, 
				results,
				facets,
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


		case types.ADD_FACET_AUTOSUGGEST:
            var { value, facet } = action;

			var { name, displayName, type, multiSelect, template, label } = facet;			

            return {
                ...state,
                query: {
                    ...state.query,
                    facet_query: [ {
						name, type, displayName, multiSelect, template, label,
						selected: [value]
					}]
                }
            };

		default:
			return state;
	}
}