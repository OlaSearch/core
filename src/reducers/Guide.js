import types from './../constants/ActionTypes';
import { checkIfFacetExists } from './../utilities';

var initialState = {
	query: {
		facet_field: [],
		per_page: 0,
		page: 1,
        facet_limit: 2000,
		facet_query: [],
	},
    index: 0,
	facets: [],	
	isLoading: false
};

export default (state = initialState, action) => {
	switch(action.type){        

        case types.INIT_GUIDE:

            var { questions, fields } = action.payload;

            return {
                ...state,
                query: {
                    ...state.query,
                    facet_field: fields
                },
                facets: questions
            }
		
        case types.INCREMENT_GUIDE:
            return {
                ...state,
                index: Math.min(state.facets.length - 1, ++state.index)
            }
        
        case types.DECREMENT_GUIDE:
            return {
                ...state,
                index: Math.max(0, --state.index)
            }		

		case types.REQUEST_GUIDE:
			return {
				...state,
				isLoading: true
			};

		case types.REQUEST_GUIDE_SUCCESS:
            
            var fl = action.fl;
            if(!fl) return { ...state, isLoading: false }
            
            var _facet = action.facets.filter( (f) => f.name == fl)
                        .reduce( (a, b) => a);
            
            var _stateFacet = state.facets.slice(0)
            
            _stateFacet[ action.index ] = _facet;
            
			return {
				...state,
				isLoading: false,
                facets: _stateFacet
            }
        
        case types.REPLACE_FACET_GUIDE:
            var { value, facet } = action;

			var { name, displayName, type, multiSelect, template, label } = facet;
			var fq = state.query.facet_query;

			var index = checkIfFacetExists(fq, name);
			
			if(index == null){
				fq.push({
					name, type, displayName, multiSelect, template, label,
					selected: [value]
				});

			}else{
				
				fq[index].selected = [value]
			}
            return {
                ...state,
                query: {
                    ...state.query,
                    facet_query: fq
                }
            };
        
        case types.CLEAR_FACET_AFTER_INDEX:
            var { facet_query } = state.query;
            
            facet_query.splice(action.index + 1, facet_query.length)
            
            return {
                ...state,
                query: {
                    ...state.query,
                    facet_query: facet_query
                }
            }
                
		default:
			return state;
	}
};